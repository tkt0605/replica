/**
 * Worker bindings 型定義
 */
export interface Env {
  FIREBASE_API_KEY: string;
  PUBLIC_URL: string;
  BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 1. CORSヘッダーの定義
    // フロントエンドからのアクセスを許可するために必須です
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // 本番環境では "http://localhost:3000" など特定のドメインに絞ることを推奨
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // 2. Preflightリクエスト (OPTIONS) への対応
    // これがないと "Response to preflight request doesn't pass..." エラーになります
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // POST 以外のメソッドを拒否 (CORSヘッダー付きで返す)
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    try {
      // ---- Firebase Token チェック ----
      const authorization = request.headers.get("Authorization");
      if (!authorization) {
        return new Response(JSON.stringify({ error: "No authorization header" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const token = authorization.replace("Bearer ", "").trim();

      // Firebase REST API による ID Token 検証
      const firebaseVerifyURL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.FIREBASE_API_KEY}`;

      const verifyRes = await fetch(firebaseVerifyURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      const verifyData: any = await verifyRes.json();

      if (!verifyData.users || verifyData.error) {
        console.error("Firebase Auth Error:", verifyData.error); // ログ確認用
        return new Response(JSON.stringify({ error: "Invalid Firebase ID Token" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userInfo = verifyData.users[0];

      // ---- アップロードファイル取得 ----
      const form = await request.formData();
      const file = form.get("file") as File | null;

      if (!file) {
        return new Response(JSON.stringify({ error: "No file attached" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // ---- 保存先キー作成 ----
      // ファイル名の衝突を避けるためタイムスタンプなどを付与
      const fileName = `${Date.now()}-${file.name}`;
      // ユーザーIDごとにフォルダを分ける構成
      const key = `${userInfo.localId}/${fileName}`;

      // ---- R2 にファイルアップロード ----
      await env.BUCKET.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
      });

      // ---- 公開URL ----
      // env.PUBLIC_URL の末尾にスラッシュがあるかないかを考慮して結合
      const baseUrl = env.PUBLIC_URL.endsWith("/") ? env.PUBLIC_URL.slice(0, -1) : env.PUBLIC_URL;
      const publicUrl = `${baseUrl}/${key}`;

      // 成功レスポンス (CORSヘッダー付き)
      return new Response(
        JSON.stringify({
          status: "success",
          url: publicUrl,
          key,
          user: userInfo.email,
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );

    } catch (e: any) {
      // 予期せぬエラーのキャッチ
      return new Response(
        JSON.stringify({ error: e.message || "Internal Server Error" }),
        {
          status: 500,
          headers: {
            ...corsHeaders, // エラー時もここが重要
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};