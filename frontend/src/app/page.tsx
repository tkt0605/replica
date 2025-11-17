"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();

  // Auth（簡易）
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="relative min-h-screen overflow-hidden bg-[#050509] text-white">

      {/* 背景：深い Apple 風グラデーション */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-purple-600/25 blur-[200px] rounded-full opacity-70 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/20 blur-[180px] rounded-full opacity-60" />
      </div>

      {/* --------------------- Header --------------------- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#050509]/70 backdrop-blur-md border-b border-white/10 z-50">
        <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 shadow-lg shadow-cyan-400/40" />
            <span className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
              Replica
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="#concept" className="text-gray-300 hover:text-white transition">
              コンセプト
            </Link>
            <Link href="/studio" className="text-gray-300 hover:text-white transition">
              Studio
            </Link>
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 hover:bg-white/20 transition"
            >
              ログイン
            </button>
          </div>
        </div>
      </header>

      {/* --------------------- Hero --------------------- */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-[62px] md:text-[84px] font-extrabold leading-none bg-clip-text text-transparent 
                     bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300
                     drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]"
        >
          Replica
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Replica は、僕が作るすべての
          <span className="text-white font-semibold">アプリ</span> と  
          <span className="text-cyan-300 font-semibold">思想</span> をまとめる
          <span className="text-purple-300 font-semibold">公式スタジオ</span>です。
          世界に届けるべき作品は、すべてここから生まれる。
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-12 flex flex-col md:flex-row gap-4"
        >
          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-cyan-500 to-purple-500
                       hover:scale-[1.05] transition-transform duration-300 shadow-lg shadow-cyan-500/30">
            Replica をはじめる
          </Link>

          {/* <Link
            href="/studio"
            className="px-8 py-3 rounded-full border border-white/20 text-gray-300 font-semibold hover:bg-white/10 transition">
            Studio を見る
          </Link> */}
        </motion.div>
      </section>

      {/* --------------------- Concept --------------------- */}
      <section id="concept" className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-[#10101A] to-[#0A0A12] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold text-cyan-300 mb-8"
        >
          Replica とは
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Replica は、<span className="text-white font-semibold">創造</span> と  
          <span className="text-purple-300 font-semibold">表現</span> に特化した  
          <span className="text-cyan-300 font-semibold">デジタル・スタジオ</span>。

          <br /><br />
          僕が生み出すすべてのアプリ、構想、プロトタイプを  
          「**作品**」として世界に公開するための  
          <strong className="text-white">公式プラットフォーム</strong>です。

          <br /><br />
          ここに並ぶアプリは、すべて僕自身の  
          <span className="text-cyan-300 font-semibold">思想のレプリカ</span>。
          そして世界と繋げる “窓” になる。
        </motion.p>
      </section>

      {/* --------------------- Footer --------------------- */}
      <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-white/10">
        © 2025 Replica — Produced by <span className="text-cyan-400">tkt0605.dev</span>
      </footer>

    </div>
  );
}
