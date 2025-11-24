"use client";
import Link from "next/link";
import { Header } from "@/components/replica/Header";
import { Sidebar } from "@/components/replica/SideBar";
import { MainShell } from "@/components/replica/MainShell";
import { useRouter } from "next/navigation";
import { Plus, FolderOpen, ArrowRight, LayoutGrid } from 'lucide-react';
import { motion } from "framer-motion";
// import { AvatarViewer } from "@/components/avatar/Avatarviewer";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import StudioCard from "@/components/StudioCard";
export default function Studio() {
    const router = useRouter();
    // const categories = ["すべて", "💻WEBアプリ", "📱iOSアプリ"];
    const [selectedCategory, SetselectedCategory] = useState("すべて");
    const [studios, setStudios] = useState<any[]>([]);
    const categories = ["All", "iOS", "Web", "Concept"];
    // const [selectedCategory, setSelectedCategory] = useState("All");
    // const studios = []; // テスト用: 空配列ならエンプティステート、データがあればグリッド表示

    // フィルタリングロジック（仮）
    // const filteringCategory = studios;
    // 初期読み込み時に localStorage の値を参照
    useEffect(() => {
        const hash = decodeURIComponent(window.location.hash.replace('#', ''));
        if (categories.includes(hash)) {
            SetselectedCategory(hash);
        }
    }, []);
    const handleCategoryClick = (category: string) => {
        SetselectedCategory(category);
        window.location.hash = category;
    };
    const filteringCategory =
        selectedCategory === 'すべて'
            ? studios
            : studios.filter((s) => s.category === selectedCategory);


    useEffect(() => {
        const fetchStudios = async () => {
            const snap = await getDocs(
                query(collection(db, "studios"), orderBy("createdAt", "desc"))
            );
            setStudios(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        };
        fetchStudios();
    }, []);
    return (
        <MainShell>
            <div className="min-h-screen flex bg-black text-[#f5f5f7] font-sans selection:bg-blue-500/30">

                {/* Sidebarコンポーネントがある場合 */}
                {/* <div className="hidden md:block w-64 border-r border-white/10">...</div> */}

                <div className="flex flex-1 flex-col">
                    <main className="flex-1 px-6 py-12 max-w-7xl mx-auto w-full">

                        {/* --- Page Title --- */}
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                                Studios.
                            </h1>
                            <p className="text-[#86868b] text-lg">
                                すべてのプロジェクトと実験室。
                            </p>
                        </div>

                        {/* --- Category Filter (Apple Style Segmented Control) --- */}
                        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar">
                            {categories.map((item, i) => {
                                const isActive = selectedCategory === item;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => SetselectedCategory(item)}
                                        className={`
                                        relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                                        ${isActive
                                                ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-105"
                                                : "bg-[#1c1c1e] text-[#86868b] border-transparent hover:bg-[#2c2c2e] hover:text-white"
                                            }
                                    `}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </div>

                        {/* --- Empty State (macOS Style) --- */}
                        {studios?.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center py-32 text-center"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-[#1c1c1e] flex items-center justify-center mb-6 border border-white/5">
                                    <FolderOpen className="w-10 h-10 text-[#86868b]" />
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-2">
                                    まだスタジオがありません
                                </h3>
                                <p className="text-[#86868b] text-sm max-w-md mx-auto leading-relaxed mb-8">
                                    マジですみません。まだ完成してません。<br />
                                    現在、最高のものを作るために準備中です。
                                </p>

                                <button
                                    onClick={() => { return router.push('/studio/new') }}
                                    className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] text-white font-medium hover:bg-[#0077ed] transition-all shadow-[0_0_20px_rgba(0,113,227,0.3)] hover:shadow-[0_0_30px_rgba(0,113,227,0.5)]"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>新しくスタジオを作成</span>
                                </button>
                            </motion.div>
                        )}

                        {/* --- Grid List (Pro Cards) --- */}
                        {studios?.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteringCategory.map((studio) => (
                                    <motion.div
                                        key={studio.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="group relative flex flex-col justify-between p-6 rounded-3xl bg-[#161617] border border-white/[0.05] hover:bg-[#1c1c1e] transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                                    >
                                        <div>
                                            {/* サムネイルエリア (画像がなければプレースホルダー) */}
                                            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-[#2c2c2e] to-[#1c1c1e] mb-6 overflow-hidden border border-white/[0.05]">
                                                {/* studio.image があれば <img src={...} /> */}
                                                <div className="w-full h-full flex items-center justify-center text-[#3a3a3c]">
                                                    <LayoutGrid className="w-8 h-8 opacity-20" />
                                                </div>
                                            </div>

                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                {studio.title}
                                            </h2>
                                            <p className="text-sm text-[#86868b] leading-relaxed line-clamp-2">
                                                {studio.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            詳細を見る <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </MainShell>
    );
}
