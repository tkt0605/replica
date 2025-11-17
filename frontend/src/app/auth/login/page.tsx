// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase";

// export default function Login() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center  bg-[#050510] text-slate-100 px-4">
//       <div className="flex ">
//         <div className="h-12 w-12 rounded-4xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
//       </div>
//       {/* ロゴ or タイトル */}

//       {/* フォームコンテナ */}
//       <div className="w-full max-w-sm rounded-2xl p-6 backdrop-blur-xl shadow-xl">
//         <div className="mt-10 text-center">
//             <h2 className="text-2xl font-extrabold bg-clip-text text-white">
//                 おかえりなさい
//             </h2>
//         </div>
//         {/* メール */}
//         <div className="p-4">
//           <div className="mb-4">
//             <input
//                 type="email"
//                 className="w-full px-6 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-500/50 outline-none"
//                 placeholder="メールアドレス"
//             />
//             </div>
//             <div className="mb-6">
//                 <input
//                     type="password"
//                     className="w-full px-6 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-slate-100 focus:ring-2 focus:ring-purple-500/50 outline-none"
//                     placeholder="パスワード"
//                 />
//             </div>
//             <button
//                 className="w-full py-2.5 rounded-xl font-semibold text-sm 
//                 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500
//                 hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
//             >
//                 ログイン
//             </button>
//             <div className="mt-4 text-center text-[11px] text-slate-100">
//                 アカウントをお持ちではないですか。{" "}
//                 <a href="/auth/signup" className="text-cyan-400 underline hover:text-cyan-300 cursor-pointer">
//                     サインアップ
//                 </a>
//             </div>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client"
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { SignInWithGoogle } from "@/components/SignInWithGoogle";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("ログイン成功！");
      return router.push('/home');
    } catch (err: any) {
      setError(err.message);
      return router.push('/auth/login');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center  bg-[#050510] text-slate-100 px-4">
      <div className="flex ">
        <div className="h-12 w-12 rounded-4xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
      </div>
      {/* ロゴ or タイトル */}

      {/* フォームコンテナ */}
      <div className="w-full max-w-sm rounded-2xl p-6 backdrop-blur-xl shadow-xl">
        <div className="mt-10 text-center">
            <h2 className="text-2xl font-extrabold bg-clip-text text-white">
                おかえりなさい
            </h2>
        </div>
        {/* メール */}
        <div className="p-4">
          <div className="mb-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-slate-100 focus:ring-2 focus:ring-cyan-500/50 outline-none"
                placeholder="メールアドレス"
            />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-slate-100 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    placeholder="パスワード"
                />
            </div>
            <button onClick={handleLogin} className="w-full py-2.5 rounded-xl font-semibold text-sm  bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg shadow-cyan-500/20">
                ログイン
            </button>
            <div className="mt-4 text-center text-[11px] text-slate-100">
                アカウントをお持ちではないですか。{" "}
                <a href="/auth/signup" className="text-cyan-400 underline hover:text-cyan-300 cursor-pointer">
                    サインアップ
                </a>
            </div>
            <SignInWithGoogle />
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      </div>
    </main>
  );

}
