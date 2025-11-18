"use client";
import Link from "next/link";
import { Header } from "@/components/replica/Header";
import { Sidebar } from "@/components/replica/SideBar";
import { MainShell } from "@/components/replica/MainShell";
import { useRouter } from "next/navigation";
// import { AvatarViewer } from "@/components/avatar/Avatarviewer";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import StudioCard from "@/components/StudioCard";
export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const categories = ["すべて", "💻WEBアプリ", "📱iOSアプリ"];
    const [selectedCategory, SetselectedCategory] = useState("すべて");
    const [studios, setStudios] = useState<any[]>([]);
    // 初期読み込み時に localStorage の値を参照
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("aside_open");
            setIsOpen(saved === "true");
        }
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
        <div className="min-h-screen flex flex-col bg-[#050510] text-slate-100">
            <Header onToggleSidebar={toggleSidebar} />

            <div className="flex flex-1">
                {/* Sidebar */}
                {isOpen && (
                    <Sidebar onClose={closeSidebar} />
                )}

                {/* Main */}
                <MainShell>
                    {/* カテゴリーメニュー */}
                    <div className="flex items-center gap-4 mb-6 mt-2">
                        {categories.map((item, i) => {
                            const isActive = selectedCategory === item;

                            return (
                                <button key={i} onClick={() => handleCategoryClick(item)} className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border backdrop-blur-sm ${isActive ? "text-white bg-white/20 border-cyan-400/50" : "text-slate-300 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"}`}>
                                    {/* hover / active グラデーション光 */}
                                    <span className={`absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-500${isActive ? "opacity-100" : "opacity-0 hover:opacity-100"}`} />

                                    <span className="relative z-10">{item}</span>
                                </button>
                            );
                        })}
                    </div>
                    {studios?.length === 0 && (
                        <div className="text-center py-20 opacity-80">
                            <div className="text-lg font-semibold mb-3 text-slate-300">
                                まだスタジオがありません
                            </div>
                            <div className="text-sm text-slate-500 mb-6">
                                マジですみません。まだ完成してません。
                            </div>

                            <button className="px-6 py-3 rounded-xl font-medium text-smbg-gradient-to-r from-cyan-500 to-purple-500shadow-lg shadow-cyan-500/30hover:shadow-purple-500/40 hover:scale-105transition-transform duration-300 text-white">
                                新しくスタジオを作成
                            </button>
                        </div>
                    )}
                    {/* フィルタ後のスタジオ一覧 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteringCategory.map((studio) => (
                            <div key={studio.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg">
                                <h2 className="text-lg font-semibold mb-2">{studio.title}</h2>
                                <p className="text-sm text-slate-400 mb-3">{studio.description}</p>
                                <button className="text-sm text-cyan-400 hover:underline">
                                    詳細を見る →
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* カテゴリに該当なし */}
                    {/* {filteringCategory.length === 0 && (
                        <div className="text-center text-slate-400 py-20">
                            このカテゴリのスタジオはまだありません。
                        </div>
                    )} */}
                </MainShell>
                {/* <MainShell>
                    <div className="flex items-center gap-4 mb-6 mt-2">
                        {categories.map((item, i) => (
                            <button key={i} className=" relative px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10">
                                <span className=" absolute inset-0 rounded-xl  bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20  opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
                                <span className="relative z-10">{item}</span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-6">
                        {studios?.length === 0 && (
                            <div className="text-center py-20 opacity-80">
                                <div className="text-lg font-semibold mb-3 text-slate-300">
                                    まだスタジオがありません
                                </div>
                                <div className="text-sm text-slate-500 mb-6">
                                    マジですみません。まだ完成してません。
                                </div>

                                <button className="px-6 py-3 rounded-xl font-medium text-smbg-gradient-to-r from-cyan-500 to-purple-500shadow-lg shadow-cyan-500/30hover:shadow-purple-500/40 hover:scale-105transition-transform duration-300 text-white">
                                    新しくスタジオを作成
                                </button>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {studios?.map((studio) => (
                                <div
                                    key={studio.id}
                                    className="group relative rounded-2xl p-5bg-white/5 border border-white/10 backdrop-blur-mdhover:bg-white/10 transition-all duration-500shadow-lg hover:shadow-cyan-500/20"
                                >
                                    <div className=" absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10">
                                        <h2 className="text-lg font-semibold text-white mb-1">
                                            {studio.title}
                                        </h2>
                                        <p className="text-sm text-slate-400 mb-4">
                                            {studio.description}
                                        </p>

                                        <button className=" px-4 py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-all duration-300">
                                            詳細を見る →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </MainShell> */}

            </div>
        </div>
    );
}
