"use client";
import Link from "next/link";
import { Header } from "@/components/replica/Header";
import { Sidebar } from "@/components/replica/SideBar";
import { MainShell } from "@/components/replica/MainShell";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Dialogs from "@/components/ui/Dialogs";
import CreateUpdate from "@/components/replica/createUpdate";
import CreateProgress from "@/components/replica/createProgress";
import { Plus, Github, ArrowRight, Layers, Activity } from 'lucide-react';
export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updates, setUpdates] = useState<any>([]);
    const [progress, setProgress] = useState<any>([]);
    const [openUpdate, setOpenUpdated] = useState(false);
    const [openProgress, setOpenProgress] = useState(false);
    const [openDrawer, setDrawerOpen] = useState(false);
    const cardStyle = "group relative overflow-hidden rounded-2xl bg-[#161617] border border-white/10 p-6 transition-all duration-300 hover:bg-[#1c1c1e] hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 cursor-pointer";
    // 初期読み込み時に localStorage の値を参照
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('ログインユーザー：', user);
                setUser(user);
            } else {
                console.log('非ログイン');
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();

    }, []);
    useEffect(() => {
        const fetchUpdates = async () => {
            const snap = await getDocs(
                query(collection(db, "update"), orderBy("createdAt", "desc"))
            );
            setUpdates(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        };
        fetchUpdates();
        const fetchProgress = async () => {
            const snap = await getDocs(
                query(collection(db, "progress"), orderBy("createdAt", "desc"))
            );
            setProgress(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        };
        fetchProgress();
    })

    return (
        // <div className="min-h-screen bg-[#000000] text-slate-100 flex">
        //     <div className="flex-1 min-h-screen flex flex-col">
        //         <MainShell>
        //             <main className="px-6 py-8 space-y-14">
        //                 <section>
        //                     <h2 className="text-2xl font-bold mb-3">Replica - ダッシュボード</h2>

        //                     <p className="text-slate-300 max-w-2xl leading-relaxed">
        //                         自分が作成したアプリやプロジェクトの進行状況をまとめているページです。
        //                         公開中のもの、進行中のものをシンプルに整理しています。
        //                     </p>
        //                 </section>

        //                 <section className="space-y-6">
        //                     <div className="flex items-center gap-6">
        //                         <h3 className="text-xl font-semibold">最近の更新</h3>
        //                         <button
        //                             onClick={() => setOpenUpdated(true)}
        //                             className="hover:bg-white/10 px-3 py-1 bg-white/5 rounded-xl border border-white/10"
        //                         >
        //                             + add
        //                         </button>
        //                     </div>
        //                     <div className="grid md:grid-cols-2 gap-4">
        //                         <div className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08]">
        //                             <p className="text-sm text-slate-300">2025/11/17</p>
        //                             <p className="text-lg font-semibold mt-1">Whisper 音声認識の精度を改善</p>
        //                             <p className="text-slate-400 text-sm mt-1">
        //                                 認識の重複語句除去アルゴリズムを改善し精度が上昇。
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </section>

        //                 <section className="space-y-6">
        //                     <div className="flex items-center gap-6">
        //                         <h3 className="text-xl font-semibold">進行中</h3>
        //                         <button
        //                             onClick={() => setOpenProgress(true)}
        //                             className="hover:bg-white/10 px-3 py-1 bg-white/5 rounded-xl border border-white/10"
        //                         >
        //                             + add
        //                         </button>
        //                     </div>
        //                     <div className="grid md:grid-cols-3 gap-6">
        //                         <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.08]">
        //                             <p className="font-semibold text-lg">Replica ID</p>
        //                             <p className="text-slate-400 text-sm mb-3">分散型デジタルIDの仕組みを構築中。</p>
        //                             <span className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300">
        //                                 構築中
        //                             </span>
        //                         </div>
        //                     </div>
        //                 </section>
        //                 <section className="space-y-6 pb-20">
        //                     <h3 className="text-xl font-semibold">省略</h3>

        //                     <div className="grid md:grid-cols-3 gap-4">
        //                         <a href="/studio" className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition">
        //                             <p className="font-semibold text-lg">Studios</p>
        //                             <p className="text-slate-400 text-sm">アプリ一覧を見る</p>
        //                         </a>

        //                         <a href="https://github.com/tkt0605" target="_blank" className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition">
        //                             <p className="font-semibold text-lg">GitHub</p>
        //                             <p className="text-slate-400 text-sm">コードとリポジトリ</p>
        //                         </a>

        //                         <a href="/about" className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition">
        //                             <p className="font-semibold text-lg">About</p>
        //                             <p className="text-slate-400 text-sm">開発者について</p>
        //                         </a>
        //                     </div>
        //                 </section>
        //             </main>
        //             <Dialogs open={openUpdate} onClose={() => setOpenUpdated(false)} title="最新の更新">
        //                 <CreateUpdate open={openUpdate} onClose={() => setOpenUpdated(false)} />
        //             </Dialogs>

        //             <Dialogs open={openProgress} onClose={() => setOpenProgress(false)} title="進行中のプロジェクト">
        //                 <CreateProgress open={openProgress} onClose={() => setOpenProgress(false)} />
        //             </Dialogs>
        //         </MainShell>
        //     </div>
        // </div>
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-white/20">
            {/* --- メイン領域 --- */}
            <div className="flex-1 min-h-screen flex flex-col max-w-7xl mx-auto">
                <main className="px-6 py-12 md:py-20 space-y-20">

                    {/* --- 1. Dashboard Header (巨大なタイポグラフィ) --- */}
                    <section className="space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                            Replica.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-medium">
                            The new original.<br/>
                            <span className="text-base md:text-lg text-gray-500 font-normal mt-2 block">
                                作成したアプリ、進行中のプロジェクト、そして思考の断片。<br/>
                                すべてをシンプルに、美しく整理するダッシュボード。
                            </span>
                        </p>
                    </section>

                    {/* --- 2. Updates Section (タイムライン風) --- */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-gray-500" />
                                Recent Updates
                            </h2>
                            <button
                                onClick={() => setOpenUpdated(true)}
                                className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add New
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Update Card */}
                            <div className={cardStyle}>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-md">2025.11.17</span>
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    Whisper 音声認識の精度を改善
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    認識の重複語句除去アルゴリズムをゼロから再構築。<br/>
                                    ノイズ耐性が30%向上し、より自然な文字起こしが可能に。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- 3. In Progress (Bento Grid) --- */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                                <Layers className="w-5 h-5 text-gray-500" />
                                In Progress
                            </h2>
                            <button
                                onClick={() => setOpenProgress(true)}
                                className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add Project
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Project Card */}
                            <div className={cardStyle}>
                                <div className="mb-8">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                        Building
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Replica ID</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    分散型デジタルIDの仕組みを構築中。<br/>
                                    次世代の認証基盤。
                                </p>
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    <ArrowRight className="text-white w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- 4. Quick Links (Glass Footer) --- */}
                    <section className="pt-10 pb-20">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-bold">Menu</h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <a href="/studio" className={`${cardStyle} flex flex-col justify-center items-center text-center py-10`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                    <Layers className="w-6 h-6 text-white" />
                                </div>
                                <p className="font-bold text-lg text-white">Studios</p>
                                <p className="text-gray-500 text-xs mt-1">アプリ一覧</p>
                            </a>

                            <a href="https://github.com/tkt0605" target="_blank" className={`${cardStyle} flex flex-col justify-center items-center text-center py-10`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                    <Github className="w-6 h-6 text-white" />
                                </div>
                                <p className="font-bold text-lg text-white">GitHub</p>
                                <p className="text-gray-500 text-xs mt-1">ソースコード</p>
                            </a>

                            <a href="/about" className={`${cardStyle} flex flex-col justify-center items-center text-center py-10`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                    <div className="w-6 h-6 rounded-full border-2 border-white"></div>
                                </div>
                                <p className="font-bold text-lg text-white">About</p>
                                <p className="text-gray-500 text-xs mt-1">開発者</p>
                            </a>
                        </div>
                    </section>

                </main>
            </div>
            
            {/* Dialogs はそのまま配置 */}
        </div>
    );
}
