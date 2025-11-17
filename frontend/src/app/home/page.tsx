"use client";

import { Header } from "@/components/replica/Header";
import { Sidebar } from "@/components/replica/SideBar";
import { MainShell } from "@/components/replica/MainShell";
// import { AvatarViewer } from "@/components/avatar/Avatarviewer";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import StudioCard from "@/components/StudioCard";
export default function Home() {
    const [isOpen, setIsOpen] = useState(false);

    // 初期読み込み時に localStorage の値を参照
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("aside_open");
            setIsOpen(saved === "true");
        }
    }, []);

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
    }
    const [studios, setStudios] = useState<any[]>([]);

    // useEffect(() => {
    //     const fetchStudios = async () => {
    //         const snap = await getDocs(
    //             query(collection(db, "studios"), orderBy("createdAt", "desc"))
    //         );
    //         setStudios(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    //     };
    //     fetchStudios();
    // }, []);
    return (
        <div className="min-h-screen flex flex-col bg-[#050510] text-slate-100">
            <Header onToggleSidebar={toggleSidebar} />

            <div className="flex flex-1">
                {/* Sidebar */}
                {isOpen && (
                    <Sidebar onClose={closeSidebar} />
                )}

                {/* Main */}
                <MainShell>
                    {studios ?
                        <main className="max-h-screen px-6 bg-[#050510] text-white relative overflow-hidden">
                            <div className="absolute inset-0 -z-10 pointer-events-none">
                                <div className="absolute -top-40 -left-24 w-[600px] h-[600px] bg-cyan-500/15 blur-[150px] rounded-full opacity-60" />
                                <div className="absolute top-1/2 right-0 w-[520px] h-[520px] bg-purple-500/20 blur-[200px] rounded-full opacity-60" />
                                <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] bg-blue-500/15 blur-[180px] rounded-full opacity-60" />
                            </div>
                            <div className="text-center mb-16">
                                <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 text-transparent bg-clip-text drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">
                                    Studio - スタジオ
                                </h1>

                                <p className="text-gray-400 mt-3">
                                    ここは、僕が生み出したアプリの一覧です。気になるものはどうぞ使って見てください。
                                </p>
                            </div>
                            <div className="max-w-6xl mx-auto flex justify-end mb-6">
                                <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition">
                                    最新順
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {studios.map((s) => (
                                    <StudioCard key={s.id} data={s} />
                                ))}
                            </div>
                        </main>
                        :
                        <div className="flex flex-col items-center justify-center text-center py-32 relative">
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 blur-[160px] rounded-full" />
                                <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/20 blur-[200px] rounded-full" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 drop-shadow-sm">
                                まだStudioがありません。
                            </h2>

                            <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                                最初のアプリを作成して、あなたの世界を“形”にしましょう。
                            </p>
                            <button
                                className="mt-8 px-8 py-3 rounded-full text-sm md:text-base font-mediumbg-gradient-to-r from-cyan-500 to-purple-500hover:opacity-90 transition-allshadow-lg shadow-cyan-500/10"
                            >
                                新しいスタヂオを作る
                            </button>
                        </div>
                    }
                </MainShell>
            </div>
        </div>
    );
}
