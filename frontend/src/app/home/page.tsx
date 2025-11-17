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

    useEffect(() => {
        const fetchStudios = async () => {
            const snap = await getDocs(
                query(collection(db, "studios"), orderBy("createdAt", "desc"))
            );
            setStudios(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        };
        fetchStudios();
    }, []);
    const studioCounter = () => {

    }
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
                    <main className="max-h-screen px-6 bg-[#050510] text-white relative overflow-hidden">

                        {/* --- 背景光（Replica共通テーマ） --- */}
                        <div className="absolute inset-0 -z-10 pointer-events-none">
                            <div className="absolute -top-40 -left-24 w-[600px] h-[600px] bg-cyan-500/15 blur-[150px] rounded-full opacity-60" />
                            <div className="absolute top-1/2 right-0 w-[520px] h-[520px] bg-purple-500/20 blur-[200px] rounded-full opacity-60" />
                            <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] bg-blue-500/15 blur-[180px] rounded-full opacity-60" />
                        </div>

                        {/* --- タイトル --- */}
                        <div className="text-center mb-16">
                            <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 text-transparent bg-clip-text drop-shadow-[0_0_16px_rgba(56,189,248,0.4)]">
                                Studio - スタジオ
                            </h1>

                            <p className="text-gray-400 mt-3">
                                ここは、僕が生み出したアプリの一覧です。気になるものはどうぞ使って見てください。
                            </p>
                        </div>

                        {/* --- フィルタ / ソート（未来拡張対応） --- */}
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
                        {/* 
                        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                            {studios.map((s) => (
                                <div
                                    key={s.id}
                                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl 
                   shadow-[0_0_40px_rgba(0,0,0,0.45)] overflow-hidden transition transform 
                   hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(0,0,0,0.6)] cursor-pointer"
                                >
                                    {s.imageURL ? (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={s.imageURL}
                                                alt={s.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-[#111] flex items-center justify-center text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h2 className="text-lg font-semibold mb-1">{s.title}</h2>

                                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-3">
                                            {s.description}
                                        </p>
                                        {s.url && (
                                            <a
                                                href={s.url}
                                                target="_blank"
                                                className="inline-block px-3 py-1 text-[11px] rounded-full bg-cyan-500/20 text-cyan-300 
                         border border-cyan-400/20 hover:bg-cyan-500/30 transition"
                                            >
                                                外部リンク ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </main>

                </MainShell>
            </div>
        </div>
    );
}
