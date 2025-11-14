"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();

  //// 仮のAuth（本番ではContext化推奨）
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //// LocalStorage → Next.js Client Componentでのみ読み取る/ Djangoと統合をしていないので、今は削除
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) setUser({ email: "test@example.com" });
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/auth/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#111122] to-[#1a1a2e] text-white">

      {/* 背景の流体エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-500/30 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/30 blur-[180px] rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-gradient-to-br from-[#0a0a0f] via-[#111122] to-[#1a1a2e] backdrop-blur border-b border-gray-700 z-50">
        <div className="h-full max-w-6xl mx-auto px-4 flex items-center justify-between">

          {/* Replicaロゴ */}
          <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 transition-transform">
            <div className="flex gap-2">
              <div className="h-7 w-7 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
              <span
                className="text-lg font-extrabold bg-clip-text text-transparent 
                  bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
                  drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]"
              >
                Replica
              </span>
            </div>
          </div>
          {/* {loading ? (
            <div className="text-gray-300 text-sm">Loading...</div>
          ) : user ? (
            <div className="w-10 flex justify-center items-center">
              <button
                onClick={handleLogout}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-sm backdrop-blur-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 20c1.5-3.5 11.5-3.5 13 0" />
                </svg>
              </button>
            </div>
          ) : (
            <button onClick={() => router.push("/auth/login")}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition">
              ログイン
            </button>
          )} */}
          <button onClick={() => router.push("/auth/login")}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition">
            ログイン
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        >
          Replica
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 max-w-xl text-lg text-gray-300 leading-relaxed"
        >
          <span className="text-white/90 font-semibold">「現実のもう一つの写像」</span>。
          Replica は、あなたの思想・感情・創造をデジタルに再構築し、
          <span className="text-cyan-400">もう一人のあなた</span>を生み出すプロジェクトです。
        </motion.p>

        {/* ボタン群 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 flex flex-col md:flex-row gap-4"
        >
          <Link
            href="/studio"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-500/30">
            Replica Studio へ飛ぶ
          </Link>

          <button className="px-6 py-3 border border-gray-500/50 rounded-full font-semibold text-gray-300 hover:bg-white/10 transition">
            プロジェクトを見る
          </button>
        </motion.div>
      </section>

      {/* Meaning Section */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-[#10101a] to-[#0b0b14] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="text-4xl font-bold mb-8 text-cyan-400"
        >
          Replicaとは
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="max-w-xl mx-auto text-gray-300 leading-relaxed text-lg"
        >
          Replica は、あなたの <strong>創造・思考・意識</strong> を記録し、
          それを「もう一つのあなた」として進化させるための空間です。
          この世界での一行のコード、一つのデザイン、一つの言葉が、
          デジタルの宇宙にあなた自身を残す<strong>レプリカ</strong>となるのです。
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-white/10">
        © 2025 Replica — Produced by <span className="text-cyan-400">tkt0605.dev</span>
      </footer>
    </div>
  );
}
