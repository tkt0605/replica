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
    <div className="relative min-h-screen overflow-hidden bg-[#0b0c14] text-white">

      {/* --- Subtle floating lights instead of heavy blur --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-purple-600/25 blur-[160px] rounded-full animate-pulse" />
      </div>

      {/* --------------------- Header --------------------- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0b0c14]/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="h-full max-w-6xl mx-auto px-5 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-lg shadow-cyan-400/30" />
            <span className="text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
              Replica
            </span>
          </div>

          {/* ログイン */}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-sm text-cyan-300 hover:text-cyan-200 transition font-medium"
          >
            ログイン
          </button>
        </div>
      </header>

      {/* --------------------- Hero --------------------- */}
      <section className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[64px] md:text-[82px] font-extrabold leading-none 
                 bg-clip-text text-transparent 
                 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300
                 drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]"
        >
          Replica
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1 }}
          className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed"
        >
          Replica は、<span className="text-white">アプリ</span> のための
          <span className="text-cyan-400 font-semibold">デジタルスタジオ</span>です。
          僕自身の表現を世界へ届けるためのプラットフォーム。
        </motion.p>

        {/* ボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 flex flex-col md:flex-row gap-4"
        >
          <Link
            href="/auth/login"
            className="px-7 py-3 rounded-full font-semibold 
                   bg-gradient-to-r from-cyan-500 to-purple-500
                   hover:scale-[1.04] transition-transform duration-300 shadow-lg shadow-cyan-500/30">
            Replica をはじめる
          </Link>

          <button className="px-7 py-3 rounded-full border border-white/20 text-gray-300 font-semibold hover:bg-white/10 transition">
            Studio を見る
          </button>
        </motion.div>
      </section>

      {/* --------------------- Concept Section --------------------- */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-[#12121e] to-[#0a0a13] text-center">

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-cyan-300 mb-7"
        >
          Replica とは
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed"
        >
          Replica は、 <strong className="text-white">創造・設計・思想</strong> を
          <span className="text-purple-300 font-semibold">Studio</span> という形で具現化し、
          それを世界へ発信するための「スタジオ」であり「ストア」です。
          <br /><br />
          ここで生み出されるすべてが <strong className="text-cyan-300">レプリカ</strong> となるのです。
        </motion.p>
      </section>

      {/* --------------------- Footer --------------------- */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-white/10">
        © 2025 Replica — Produced by <span className="text-cyan-400">tkt0605.dev</span>
      </footer>

    </div>

  );
}
