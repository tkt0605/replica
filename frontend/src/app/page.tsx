"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
export default function HomePage() {
  const router = useRouter();
  // Auth（簡易）
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const transition = { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("ログイン中ユーザー:", user);
        console.log("UID:", user.uid);
        console.log("Email:", user.email);
        console.log("DisplayName:", user.displayName);
        console.log("PhotoURL:", user.photoURL);
        setUser(user);
        // router.push('/home');
      } else {
        console.log('未ログイン');
        setUser(null);
        router.push('/');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const JampTopage = () => {
    if (user) {
      return router.push('/home');
    } else {
      return router.push('/auth/login');
    }
  }
  return (
    // <div className="relative min-h-screen overflow-hidden bg-[#050509] text-white">
    //   <div className="absolute inset-0 pointer-events-none">
    //     <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-cyan-500/20 blur-[160px] rounded-full opacity-60 animate-pulse" />
    //     <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-purple-600/25 blur-[200px] rounded-full opacity-70 animate-pulse" />
    //     <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/20 blur-[180px] rounded-full opacity-60" />
    //   </div>
    //   <header className="fixed top-0 left-0 right-0 h-16 bg-[#050509]/70 backdrop-blur-md border-b border-white/10 z-50">
    //     <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between">
    //       <div
    //         onClick={() => router.push("/")}
    //         className="flex items-center gap-3 cursor-pointer select-none"
    //       >
    //         <span className="text-2xl font-bold tracking-tighter text-white">
    //           Replica
    //         </span>
    //       </div>

    //       <div className="flex items-center gap-6 text-sm">
    //         {loading ?
    //           <p>Loading...</p>
    //           : user ?
    //             <button
    //               className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-sm backdrop-blur-sm"
    //             >
    //               <svg xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="1.8"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 className="w-6 h-6"
    //               >
    //                 <circle cx="12" cy="7" r="4" />
    //                 <path d="M5.5 20c1.5-3.5 11.5-3.5 13 0" />
    //               </svg>
    //             </button>
    //             : <button onClick={() => router.push("/auth/login")} className="px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 hover:bg-white/20 transition">
    //               ログイン
    //             </button>
    //         }

    //       </div>
    //     </div>
    //   </header>
    //   <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">

    //     <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-[62px] md:text-[84px] font-extrabold leading-none bg-clip-text text-transparent  bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]">
    //       Replica
    //     </motion.h1>

    //     <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }} className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed">
    //       Replica は、僕が作るすべての
    //       <span className="text-white font-semibold">アプリ</span> と
    //       <span className="text-cyan-300 font-semibold">思想</span> をまとめる
    //       <span className="text-purple-300 font-semibold">公式スタジオ</span>です。
    //       僕が作ったアプリをここに発表します。
    //       ここは、僕のApp Storeです。
    //     </motion.p>

    //     {/* CTA */}
    //     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }} className="mt-12 flex flex-col md:flex-row gap-4">
    //       <button onClick={JampTopage} className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-[1.05] transition-transform duration-300 shadow-lg shadow-cyan-500/30">
    //         Replica をはじめる
    //       </button>
    //     </motion.div>
    //   </section>

    //   {/* --------------------- Concept --------------------- */}
    //   <section id="concept" className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-[#10101A] to-[#0A0A12] text-center">
    //     <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl md:text-5xl font-bold text-cyan-300 mb-8">
    //       Replica とは
    //     </motion.h2>

    //     <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">

    //       Replicaは,<span className="text-white font-semibold">０から１</span>ではなく。<span className="text-purple-300 font-semibold">１から２</span>を作り出す。
    //       <br />
    //       <span className="text-cyan-300 font-semibold">僕の僕による僕のためのサイトです。</span>
    //       <br /><br />
    //       <span>僕が生み出すすべてのアプリ、構想、プロトタイプを</span>
    //       <span>「**作品**」として世界に公開するための</span>

    //       <strong className="text-white">公式プラットフォーム</strong>です。

    //       <br /><br />
    //       ここに並ぶアプリは、すべて僕自身の
    //       <span className="text-cyan-300 font-semibold">表現のレプリカ</span>。
    //       そして世界と繋げる “窓” になる。
    //     </motion.p>
    //   </section>

    //   {/* --------------------- Footer --------------------- */}
    //   <footer className="relative z-10 py-8 text-center text-gray-500 text-sm border-t border-white/10">
    //     © 2025 Replica — Produced by <span className="text-cyan-400">tkt0605.dev</span>
    //   </footer>

    // </div>
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-blue-500/30">
      
      {/* --- Ambient Light (Apple風の「ほのかな光」) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 上部中央からのスポットライト（神々しさ） */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full" />
        {/* ほのかな青み（Proモデルの高級感） */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-900/[0.05] blur-[150px] rounded-full" />
      </div>

      {/* --- Header (Glassmorphism Pro) --- */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#1d1d1f]/70 backdrop-blur-xl border-b border-white/[0.05] z-50">
        <div className="h-full max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
            {/* Appleロゴのようなシンプルなアイコンか文字 */}
            <span className="text-xl font-semibold tracking-tight text-white">Replica</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-[#e8e8ed]">
            {loading ? (
              <p className="opacity-50">Loading...</p>
            ) : user ? (
              <button className="p-1.5 rounded-full bg-[#2c2c2e] hover:bg-[#3a3a3c] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 20c1.5-3.5 11.5-3.5 13 0" />
                </svg>
              </button>
            ) : (
              <button onClick={() => router.push('/auth/login')} className="bg-white text-black px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors">
                サインイン
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        
        {/* Title: 巨大かつ詰まった文字 */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          // transition={transition}
          className="text-7xl md:text-9xl font-semibold tracking-tighter text-white mb-6"
        >
          Replica.
        </motion.h1>

        {/* Subtext: グレーから白へのグラデーションではなく、洗練されたグレー */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          // transition={{ ...transition, delay: 0.2 }}
          className="max-w-2xl text-xl md:text-3xl font-medium leading-tight text-[#86868b]"
        >
          <p>
            <span className="text-[#f5f5f7]">My Vision.</span> Your Experience.
          </p>
          <p className="mt-4 text-lg md:text-xl font-normal text-[#86868b] max-w-lg mx-auto leading-relaxed">
            僕が作るすべてのアプリと思想をここに。<br />
            それは、<span className="text-[#f5f5f7]">僕だけのApp Store</span>。
          </p>
        </motion.div>

        {/* CTA: Appleの「購入」ボタンのようなスタイル */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          // transition={{ ...transition, delay: 0.4 }}
          className="mt-12 flex items-center gap-4"
        >
          <button className="px-6 py-2.5 rounded-full bg-[#0071e3] text-white text-base font-medium hover:bg-[#0077ed] transition-colors shadow-[0_0_20px_rgba(0,113,227,0.4)]">
            Replicaへ。
          </button>
          <button className="px-6 py-2.5 rounded-full text-[#2997ff] text-base font-medium hover:underline flex items-center gap-1">
            詳しく見る <span className="text-xs">›</span>
          </button>
        </motion.div>
      </section>

      {/* --- Concept Section (Scrolltelling) --- */}
      <section id="concept" className="relative z-10 py-40 px-6 bg-[#101010]">
        <div className="max-w-4xl mx-auto text-center space-y-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold text-[#86868b] tracking-widest uppercase mb-4">
              The Philosophy
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#f5f5f7] leading-tight">
              0から1ではない。<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-[#86868b]">
                1から、無限へ。
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-white">Archives.</h3>
              <p className="text-[#86868b] text-lg leading-relaxed">
                Replicaは、僕が生み出すプロトタイプ、構想、完成品、そのすべてを「作品」として記録するアーカイブです。
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
               <h3 className="text-2xl font-semibold text-white">Platform.</h3>
              <p className="text-[#86868b] text-lg leading-relaxed">
                単なるポートフォリオではありません。ここは世界とつながる窓であり、表現のレプリカ（分身）たちが生きる場所です。
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- Footer (Simple) --- */}
      <footer className="py-12 bg-[#000000] border-t border-white/[0.05] text-center">
        <p className="text-xs text-[#86868b]">
          Copyright © 2025 Replica. All rights reserved. <br/>
          Designed by <span className="text-[#f5f5f7]">tkt0605</span>
        </p>
      </footer>

    </div>
  );
}
