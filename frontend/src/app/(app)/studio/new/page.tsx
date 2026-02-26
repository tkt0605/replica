"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createStudio } from '@/lib/firestore';
export default function NewStudioPage() {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
    const [loading, isLoading] = useState(true);
    const [tags, settag] = useState<string[]>([]);
    const router = useRouter();
    const [url, setUrl] = useState<string>("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setfile] = useState<File | null>(null);
    const availableTags = [
        "アカウント",
        "WEBアプリ",
        "iOSアプリ",
        "AI",
        "デザイン",
        "ブロックチェーン",
        "ゲーム開発",
    ];
    const [uploading, setUploading] = useState(false);
    interface UploadResult{
        url: string;
    }
    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u ?? null);
            isLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const sanitize = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "");
    // async function uploadStudioImages(file: File, userId: String) {
    //     const fileName = `${Date.now()}-${sanitize(file.name)}`;
    //     const filePath = `${userId}/${fileName}`; // ここ重要 studio を付けない

    //     const { data, error } = await supabase.storage
    //         .from("studio") // ← bucket 名
    //         .upload(filePath, file, {
    //             upsert: true,
    //         });
    //     if (error) throw error;

    //     const { data: urlData } = supabase.storage
    //         .from("studio")
    //         .getPublicUrl(filePath);


    //     return urlData.publicUrl;
    // };
    const ToogleTags = (tag: string) => {
        if (tags.includes(tag)) {
            settag(tags.filter((t) => t !== tag));
        } else {
            settag([...tags, tag]);
        }
    };
    // const handleSubmit = async () => {
    //     if (!user) return alert("ログインが必要です");

    //     if (!title.trim()) return alert("タイトルを入力してください");

    //     let FileURL = "";

    //     try {
    //         // 画像アップロード
    //         if (file) {
    //             FileURL = await uploadStudioImages(file, user.uid);
    //         }
    //         await createStudio(
    //             user.id,
    //             title,
    //             desc,
    //             url || "",
    //             tags,
    //             FileURL
    //         )
    //         router.push("/home");

    //     } catch (error) {
    //         console.error("投稿エラー:", error);
    //         alert("投稿中にエラーが発生しました");
    //     }
    // };
    //clouadFlare R2

    async function uploadToR2(file: File) {
        if (!file) return;
        setUploading(true);
        const auth = getAuth();
        const token = await auth.currentUser?.getIdToken();
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT!, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (!res.ok) {
            console.error(await res.text());
            throw new Error("Cloudflare R2 アップロード失敗");
        }
        return await res.json() as UploadResult;
    };
    const handleSubmit = async () => {
        if (!user) return alert("ログインが必要です");
        if (!title.trim()) return alert("タイトルを入力してください");

        let coverUrl = "";

        try {
            if (file) {
                // 🔥 R2 にアップロード
                const result = await uploadToR2(file);
                // Worker のURL
                if (result) {
                    coverUrl = result.url;
                }
            }

            // 投稿を保存
            await createStudio(
                user.uid,
                title,
                desc,
                url || "",
                tags,
                coverUrl
            );

            router.push("/home");
        } catch {
            alert("投稿中にエラーが発生しました");
        }
    };

    return (
        <main className="min-h-screen py-14 px-6 bg-[#050510] text-white relative overflow-hidden">

            {/* --- 背景オーロラ --- */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute -top-40 -left-24 w-[650px] h-[650px] bg-cyan-500/25 blur-[160px] rounded-full opacity-60" />
                <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-purple-600/30 blur-[200px] rounded-full opacity-70" />
                <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] bg-pink-500/20 blur-[200px] rounded-full opacity-60" />
            </div>

            {/* タイトル */}
            <h1 className="text-center text-4xl font-bold tracking-wide 
                bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
                text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                Studio — 作品投稿
            </h1>

            <p className="text-center text-gray-400 mt-3 mb-10">
                入力内容はリアルタイムでプレビューに反映されます。
            </p>

            {/* ------------------------------ */}
            {/*   スマホ用 タブ切り替え UI     */}
            {/* ------------------------------ */}
            <div className="lg:hidden flex items-center justify-center mb-6">
                <div className="flex bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full">
                    <button
                        onClick={() => setActiveTab("form")}
                        className={`px-5 py-2 rounded-full text-sm transition ${activeTab === "form"
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold"
                            : "text-gray-300"
                            }`}
                    >
                        フォーム
                    </button>

                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`px-5 py-2 rounded-full text-sm transition ${activeTab === "preview"
                            ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-semibold"
                            : "text-gray-300"
                            }`}
                    >
                        確認用
                    </button>
                </div>
            </div>

            {/* ------------------------------ */}
            {/*     メインレイアウト (PC)      */}
            {/* ------------------------------ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

                {/* ------------------------------ */}
                {/*    左：プレビュー（PC & SP）   */}
                {/* ------------------------------ */}
                <div
                    className={`
                        ${activeTab === "preview" ? "block" : "hidden"}
                        lg:block
                        p-6 rounded-2xl h-fit bg-white/5 border border-white/10 
                        backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]
                        relative overflow-hidden
                    `}
                >
                    <h2 className="text-xl font-semibold mb-4">プレビュー</h2>

                    <div className="rounded-xl p-5 border border-white/10 bg-white/5 backdrop-blur-xl relative">

                        {/* カバー */}
                        <button className="w-full h-48 rounded-lg bg-black/30 border border-white/10 overflow-hidden flex items-center justify-center">
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500">＋カバー画像を追加</span>
                            )}
                        </button>

                        <h3 className="text-lg font-bold mt-4">
                            {title || "タイトルがここに表示されます"}
                        </h3>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {tags.map((t) => (
                                    <div
                                        key={t}
                                        className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-cyan-500/20 border border-cyan-500 text-cyan-300"
                                    >
                                        {t}
                                        <button
                                            onClick={() => ToogleTags(t)}
                                            className="text-cyan-300 hover:text-red-400 ml-1"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="text-gray-400 mt-2">
                            {desc || "作品の説明がここに表示されます。"}
                        </p>
                        {url && (
                            <a
                                href={url}
                                target="_blank"
                                className="block mt-4 text-cyan-400 hover:underline text-sm"
                            >
                                🔗{url}
                            </a>
                        )}
                    </div>
                </div>

                {/* ------------------------------ */}
                {/*   右：フォーム（PC & SP）      */}
                {/* ------------------------------ */}
                <div
                    className={`
                        ${activeTab === "form" ? "block" : "hidden"}
                        lg:block
                        p-8 rounded-2xl border border-white/10 
                        bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)]
                    `}
                >
                    {/* タイトル */}
                    <label className="text-sm text-gray-300 font-semibold">タイトル</label>
                    <input
                        className="w-full mt-1 p-3 rounded-lg bg-[#0c0c0e]/70 border border-white/10
                            focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="例：Replica Identity Layer / Studio Design"
                    />

                    {/* 説明 */}
                    <label className="block mt-6 text-sm text-gray-300 font-semibold">説明</label>
                    <textarea
                        className="w-full mt-1 p-3 rounded-lg bg-[#0c0c0e]/70 border border-white/10
                            focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition"
                        rows={5}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="作品説明を入力してください"
                    />
                    <label className="block mt-6 text-sm text-gray-300 font-semibold">
                        タグ（複数選択可）
                    </label>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {availableTags.map((t) => (
                            <button
                                key={t}
                                onClick={() => ToogleTags(t)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${tags.includes(t) ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-black border-transparent" : "bg-white/5 border-white/10 text-gray-300 hover:border-cyan-400"}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                    {/* URL */}
                    <label className="block mt-6 text-sm text-gray-300 font-semibold">URL</label>
                    <input
                        className="w-full mt-1 p-3 rounded-lg bg-[#0c0c0e]/70 border border-white/10
                            focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://github.com/your-project"
                    />

                    {/* 画像 */}
                    <label className="block mt-6 text-sm text-gray-300 font-semibold">カバー画像</label>
                    <input
                        type="file"
                        className="mt-2 text-sm file:bg-cyan-600 file:px-4 file:py-2 file:border-none 
                            file:rounded-md file:text-white hover:file:bg-cyan-500 transition"
                        onChange={(e) => setfile(e.target.files?.[0] ?? null)}
                    />

                    {/* ボタン */}
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-10 py-3 rounded-full
                            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 
                            font-semibold text-black hover:brightness-110 transition 
                            shadow-lg shadow-cyan-500/30"
                    >
                        投稿する
                    </button>
                </div>
            </div>
        </main>


    );
}
