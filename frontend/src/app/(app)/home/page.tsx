"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import CreateUpdate from "@/components/replica/createUpdate";
import CreateProgress from "@/components/replica/createProgress";
import { Plus, Github, ArrowRight,Instagram , Layers, Activity } from 'lucide-react';
import {
    getLatestUpdates,
    getProgress,
    LatestUpdate,
    Progress,
} from '@/lib/firestore';
export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [updates, setUpdates] = useState<LatestUpdate[]>([]);
    const [progress, setProgress] = useState<Progress[]>([]);
    const [openUpdate, setOpenUpdated] = useState(false);
    const [openProgress, setOpenProgress] = useState(false);
    const [openDrawer, setDrawerOpen] = useState(false);
    const cardStyle = "group relative overflow-hidden rounded-2xl bg-[#161617] border border-white/10 p-6 transition-all duration-300 hover:bg-[#1c1c1e] hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 cursor-pointer";
    // 初期読み込み時に localStorage の値を参照
    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u ?? null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        (async () => {
            const data = await getLatestUpdates();
            setUpdates(data);
        })();
        (async () => {
            const data = await getProgress();
            setProgress(data);
        })();
    })
    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-white/20">
            {/* --- メイン領域 --- */}
            <div className="flex-1 min-h-screen flex flex-col max-w-7xl mx-auto">
                <main className="px-6 py-12 md:py-20 space-y-20">

                    {/* --- 1. Dashboard Header (巨大なタイポグラフィ) --- */}
                    <section className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                            Replica  レプリカ
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-medium">
                            新しいオリジナル。<br />
                            <span className="text-base md:text-lg text-gray-500 font-normal mt-2 block">
                                作成したアプリ、進行中のプロジェクト、思ったこと等。<br />
                                すべてをシンプルに、美しく整理するダッシュボード。
                            </span>
                        </p>
                    </section>

                    {/* --- 2. Updates Section (タイムライン風) --- */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-gray-500" />
                                最新の更新
                            </h2>
                            { user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                                                            <button 
                                
                                                            onClick={() => setOpenUpdated(true)}
                                                            className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                                                        >
                                                            <Plus className="w-4 h-4" /> Add New
                                                        </button>
                            )}
                        </div>
                        {updates?.length === 0 && (
                            <div className="w-full flex flex-col items-start py-8 text-left">

                                {/* アイコン + オーラ */}
                                <div className="flex items-center gap-3 mb-3 opacity-80">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg  bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <svg width="18" height="18" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="1.5"
                                            className="text-slate-400">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 6v6l4 2m6-4a10 10 0 11-20 0 10 10 0 0120 0z" />
                                        </svg>
                                    </div>

                                    <span className="text-[15px] text-slate-400">
                                        現在、目新しい更新はありません。
                                    </span>
                                </div>

                                {/* 下に薄いライン */}
                                <div className="w-full border-b border-white/5 mt-3"></div>

                            </div>

                        )}
                        {updates?.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Update Card */}
                                {updates.map((s) => 
                                    <div className={cardStyle} key={s.id}>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-md">{new Date(s.createdAt).toLocaleDateString("ja-JP")}</span>
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                            {s.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {s.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    {/* --- 3. In Progress (Bento Grid) --- */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                                <Layers className="w-5 h-5 text-gray-500" />
                                進行中のプロジェクト
                            </h2>
                            {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                                                            <button
                                                                onClick={() => setOpenProgress(true)}
                                                                className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                                                            >
                                                                <Plus className="w-4 h-4" /> Add Project
                                                            </button>
                            )}
                        </div>
                        {progress?.length === 0 && (
                            <div className="w-full flex flex-col items-start py-8 text-left">

                                {/* アイコン + オーラ */}
                                <div className="flex items-center gap-3 mb-3 opacity-80">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <svg width="18" height="18" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="1.5"
                                            className="text-slate-400">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 6v6l4 2m6-4a10 10 0 11-20 0 10 10 0 0120 0z" />
                                        </svg>
                                    </div>

                                    <span className="text-[15px] text-slate-400">
                                        現在、進行中のプロジェクトはありません。
                                    </span>
                                </div>

                                {/* 下に薄いライン */}
                                <div className="w-full border-b border-white/5 mt-3"></div>

                            </div>

                        )}
                        {progress?.length > 0 && (
                            <div className="grid md:grid-cols-3 gap-6">
                                {progress.map((s) => 
                                    <div className={cardStyle} key={s.id}>
                                        <div className="mb-8">
                                            {/* tags は複数 */}
                                            <div className="flex gap-2 flex-wrap">
                                                {s.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                                        <p className="text-gray-400 text-sm mb-6">{s.description}</p>
                                    </div>
                                )}
                            </div>

                        )}
                    </section>

                    {/* --- 4. Quick Links (Glass Footer) --- */}
                    <section className="pt-10 pb-20">
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-bold">メニュー</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                            <a href="https://www.instagram.com/replica.dev/"className={`${cardStyle} flex flex-col justify-center items-center text-center py-10`}>
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                    <Instagram className="w-6 h-6 text-white" />
                                </div>
                                <p className="font-bold text-lg text-white">instagram</p>
                                <p className="text-gray-500 text-xs mt-1">公式アカウント</p>
                            </a>
                        </div>
                    </section>

                </main>
            </div>

            {/* Dialogs はそのまま配置 */}
            <CreateProgress open={openProgress} onClose={() => setOpenProgress(false)} />
            <CreateUpdate open={openUpdate} onClose={() => setOpenUpdated(false)} />
        </div>
    );
}
