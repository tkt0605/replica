import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";
export const SignInWithGoogle = () => {
  // const supabase = createClient();
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    if (!auth) {
      alert("Firebase が初期化されていません。環境変数を確認してください。");
      return;
    }
    try {
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch {
      alert("Google ログインでエラーが発生しました");
    }
  };

  return (
    <div className="mt-6">
      {/* 仕切り線 */}
      <div className="flex items-center mb-4">
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      {/* Google Login Button */}
      <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-5 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
        <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
          {/* Blue */}
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.08-.38-4.55H24v9.02h12.94c-.6 3.08-2.36 5.69-5.02 7.45l7.73 6C43.89 38.52 46.98 32.16 46.98 24.55z"
          />
          {/* Green */}
          <path
            fill="#34A853"
            d="M24 47c6.48 0 11.93-2.13 15.9-5.82l-7.73-6c-2.15 1.44-4.92 2.31-8.17 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.63 47 24 47z"
          />
          {/* Yellow */}
          <path
            fill="#FBBC05"
            d="M10.54 28.59c-.48-1.43-.76-2.94-.76-4.59 0-1.59.28-3.11.76-4.54l-7.98-6.19C1.03 16.07 0 19.41 0 23c0 3.59 1.03 6.93 2.56 9.73l7.98-6.19z"
          />
          {/* Red */}
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.63 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
        </svg>

        <span>Googleで続ける</span>
      </button>
    </div>
  );
};
