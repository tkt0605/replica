import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const SignInWithGoogle = () => {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            alert("Google ログイン成功！");
        } catch (err: any) {
            console.error(err);
            alert("Google ログインに失敗しました");
        }
    };

    return (
    <div className="mt-6">
      {/* 仕切り線 */}
      <div className="flex items-center mb-4">
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
      >
        {/* Googleアイコン（SVG） */}
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#EA4335"
            d="M12 10.2v3.6h5.1c-.2 1.2-.8 2.2-1.7 3l2.7 2.1c1.6-1.5 2.6-3.7 2.6-6.3 0-.6 0-1.1-.1-1.6H12z"
          />
          <path
            fill="#34A853"
            d="M6.5 14.6c-.3-.9-.5-1.8-.5-2.6s.2-1.8.5-2.6L3.8 6.5A9.99 9.99 0 0 0 2 12c0 1.6.4 3.2 1.2 4.5l3.3-2z"
          />
          <path
            fill="#4285F4"
            d="M12 5.2c1.4 0 2.7.5 3.7 1.4l2.7-2.7A9.93 9.93 0 0 0 12 2 10 10 0 0 0 3.8 6.5l3.3 2.1C7.4 6.6 9.5 5.2 12 5.2z"
          />
          <path
            fill="#FBBC05"
            d="M12 22c2.7 0 5.1-1 6.9-2.6l-2.7-2.1c-1 .7-2.3 1.1-3.7 1.1-2.5 0-4.6-1.4-5.6-3.5l-3.3 2a10 10 0 0 0 9.4 5.1z"
          />
        </svg>

        <span>Googleでログイン</span>
      </button>
    </div>
    );
};
