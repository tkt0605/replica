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
import MobileDrawer from "@/components/replica/MobileDrawer";
export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [updates, setUpdates] = useState<any>([]);
    const [progress, setProgress] = useState<any>([]);
    const [openUpdate, setOpenUpdated] = useState(false);
    const [openProgress, setOpenProgress] = useState(false);
    const [openDrawer, setDrawerOpen] = useState(false);
    // 初期読み込み時に localStorage の値を参照
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("aside_open");
            setIsOpen(saved === "true");
        }
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

    // Sidebar を開く
    const toggleSidebar = () => {
        setIsOpen(prev => {
            const next = !prev;
            if (next) {
                localStorage.setItem("aside_open", "true");
            } else {
                localStorage.removeItem("aside_open");
            }
            return next;
        });
    };
    // Sidebar を閉じる
    const closeSidebar = () => {
        setIsOpen(false);
        localStorage.removeItem("aside_open");
    };
    return (
        // <div className="min-h-screen flex flex-col bg-[#050510] text-slate-100">
        //     <Header onToggleSidebar={toggleSidebar} />

        //     <div className="flex flex-1">
        //         {isOpen && (
        //             <Sidebar onClose={closeSidebar} />
        //         )}

        //         <MainShell>
        //             <main className="px-6 py-8 text-slate-100 space-y-14">
        //                 <section>
        //                     <h1 className="text-4xl mb-4 font-bold font-extrabold leading-none bg-clip-text text-transparent  bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]">
        //                         こんにちは <span className="text-white">{user?.displayName}</span>
        //                     </h1>
        //                     <h2 className="text-3xl font-bold mb-3">Replica - ダッシュボード</h2>
        //                     <p className="text-slate-300 max-w-2xl leading-relaxed">
        //                         自分が作成したアプリやプロジェクトの進行状況をまとめているページです。
        //                         公開中のもの、進行中のものをシンプルに整理しています。
        //                     </p>
        //                 </section>
        //                 <section className="space-y-6">
        //                     <div className="flex items-center gap-6">
        //                         <h3 className="text-2xl font-semibold">最近の更新</h3>
        //                         <span>
        //                             <button onClick={()=>{setOpenUpdated(true)}} className="hover:bg-white/10 px-2 flex items-center bg-white/5 rounded-xl border border-white/10">+ add</button>
        //                         </span>
        //                     </div>
        //                     {updates ?
        //                         <div className="grid md:grid-cols-2 gap-4">
        //                             <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        //                                 <p className="text-sm text-slate-300">2025/11/17</p>
        //                                 <p className="text-lg font-semibold mt-1">
        //                                     Whisper 音声認識の精度を改善
        //                                 </p>
        //                                 <p className="text-slate-400 text-sm mt-1">
        //                                     認識の重複語句除去アルゴリズムを改善し精度が上昇。
        //                                 </p>
        //                             </div>
        //                         </div>
        //                         :
        //                         <div></div>
        //                     }
        //                 </section>
        //                 <section className="space-y-6">
        //                     <div className="flex items-center gap-6">
        //                         <h3 className="text-2xl font-semibold">進行中</h3>
        //                         <span>
        //                             <button onClick={()=>{setOpenProgress(true)}} className="hover:bg-white/10 px-2 flex items-center bg-white/5 rounded-xl border border-white/10">+ add</button>
        //                         </span>
        //                     </div>
        //                     <div className="grid md:grid-cols-3 gap-6">
        //                         {progress ?
        //                             <div className="bg-white/5 p-5 rounded-xl border border-white/10">
        //                                 <p className="font-semibold text-lg mb-1">Replica ID</p>
        //                                 <p className="text-slate-400 text-sm mb-3">
        //                                     分散型デジタルIDの仕組みを構築中。
        //                                 </p>
        //                                 <span className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300">
        //                                     構築中
        //                                 </span>
        //                             </div>
        //                             :
        //                             <div></div>
        //                         }
        //                     </div>
        //                 </section>
        //                 <section className="space-y-4 pb-20">
        //                     <h3 className="text-2xl font-semibold">省略</h3>

        //                     <div className="grid md:grid-cols-3 gap-4">

        //                         <a href="/studio" className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transitio">
        //                             <p className="font-semibold text-lg mb-1">Studios</p>
        //                             <p className="text-slate-400 text-sm">アプリ一覧を見る</p>
        //                         </a>

        //                         <a href="https://github.com/tkt0605" target="_blank"
        //                             className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
        //                             <p className="font-semibold text-lg mb-1">GitHub</p>
        //                             <p className="text-slate-400 text-sm">コードとリポジトリ</p>
        //                         </a>

        //                         <a href="/about" className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transitio">
        //                             <p className="font-semibold text-lg mb-1">About</p>
        //                             <p className="text-slate-400 text-sm">開発者について</p>
        //                         </a>

        //                     </div>
        //                 </section>
        //                 <Dialogs open={openUpdate} onClose={() => {setOpenUpdated(false)}} title="最新の更新">
        //                     <CreateUpdate open={openUpdate} onClose={() => {setOpenUpdated(false)}}/>
        //                 </Dialogs>
        //                 <Dialogs open={openProgress} onClose={()=>{setOpenProgress(false)}} title="進行中のプロジェクト">
        //                     <CreateProgress open={openProgress} onClose={() => {setOpenProgress(false)}}/>
        //                 </Dialogs>
        //             </main>

        //         </MainShell>
        //     </div>
        // </div>
        // <div className="min-h-screen bg-[#050510] text-slate-100 flex">
        //     {/* --- メイン領域 --- */}
        //     <div className="flex-1 md:ml-60 min-h-screen flex flex-col">
        //         {/* MainShell：自然な余白を統合 */}
        <MainShell>
            <main className="px-6 py-8 space-y-14">

                {/* --- Dashboard Header --- */}
                <section>
                    <h1 className="text-4xl mb-4 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]">
                        こんにちは <span className="text-white">{/* user.name */}</span>
                    </h1>
                    <h2 className="text-2xl font-bold mb-3">Replica - ダッシュボード</h2>

                    <p className="text-slate-300 max-w-2xl leading-relaxed">
                        自分が作成したアプリやプロジェクトの進行状況をまとめているページです。
                        公開中のもの、進行中のものをシンプルに整理しています。
                    </p>
                </section>

                {/* --- Recent Updates --- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-6">
                        <h3 className="text-xl font-semibold">最近の更新</h3>
                        <button
                            onClick={() => setOpenUpdated(true)}
                            className="hover:bg-white/10 px-3 py-1 bg-white/5 rounded-xl border border-white/10"
                        >
                            + add
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08]">
                            <p className="text-sm text-slate-300">2025/11/17</p>
                            <p className="text-lg font-semibold mt-1">Whisper 音声認識の精度を改善</p>
                            <p className="text-slate-400 text-sm mt-1">
                                認識の重複語句除去アルゴリズムを改善し精度が上昇。
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- Work in Progress --- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-6">
                        <h3 className="text-xl font-semibold">進行中</h3>
                        <button
                            onClick={() => setOpenProgress(true)}
                            className="hover:bg-white/10 px-3 py-1 bg-white/5 rounded-xl border border-white/10"
                        >
                            + add
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/[0.04] p-5 rounded-xl border border-white/[0.08]">
                            <p className="font-semibold text-lg">Replica ID</p>
                            <p className="text-slate-400 text-sm mb-3">分散型デジタルIDの仕組みを構築中。</p>
                            <span className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300">
                                構築中
                            </span>
                        </div>
                    </div>
                </section>

                {/* --- Quick Links --- */}
                <section className="space-y-6 pb-20">
                    <h3 className="text-xl font-semibold">省略</h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        <a href="/studio" className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition">
                            <p className="font-semibold text-lg">Studios</p>
                            <p className="text-slate-400 text-sm">アプリ一覧を見る</p>
                        </a>

                        <a href="https://github.com/tkt0605" target="_blank" className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition">
                            <p className="font-semibold text-lg">GitHub</p>
                            <p className="text-slate-400 text-sm">コードとリポジトリ</p>
                        </a>

                        <a href="/about" className="bg-white/[0.04] p-4 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition">
                            <p className="font-semibold text-lg">About</p>
                            <p className="text-slate-400 text-sm">開発者について</p>
                        </a>
                    </div>
                </section>
            </main>

            {/* ダイヤログ */}
            <Dialogs open={openUpdate} onClose={() => setOpenUpdated(false)} title="最新の更新">
                <CreateUpdate open={openUpdate} onClose={() => setOpenUpdated(false)} />
            </Dialogs>

            <Dialogs open={openProgress} onClose={() => setOpenProgress(false)} title="進行中のプロジェクト">
                <CreateProgress open={openProgress} onClose={() => setOpenProgress(false)} />
            </Dialogs>
        </MainShell>
        //     </div>
        // </div>
    );
}
