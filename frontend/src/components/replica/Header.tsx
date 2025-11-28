// components/replica/Header.tsx
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@/hooks/useWindowSize";
import { px } from "framer-motion";
import { error } from "console";
import Dialogs from "@/components/ui/Dialogs";
import { div } from "framer-motion/client";
// type HeaderProps = {
//     onToggleSidebar: () => void;
// }
// { onToggleSidebar }: HeaderProps
export function Header() {
    const { width, height } = useWindowSize();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [sideopen, setSideopen] = useState<any>(false);
    const [openSearch, setOpenSearch] = useState(false);
    const logout = () => {
        signOut(auth);
        return router.push('/');
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('ユーザー情報取得・完了');
                setUser(user);
            } else {
                console.log('未ログイン');
                setUser(null)
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    const SidebarAction = () => {
        try {
            const isMobile = width < 768;
            if (isMobile) {
                return () => window.dispatchEvent(new CustomEvent("toggle-mobile-sidebar", { detail: true }));
            };
        } catch (error) {
            console.error('Error', error);
        }
    };
    // bg-gradient-to-br from-[#0a0a0f] via-[#111122] to-[#1a1a2e]
    // bg-[#050510]
    // md:left-60 sm:left-0
    // cursor-pointer select-none   
    return (
        <div>
            <header className="fixed top-0 md:left-60 sm:left-0 inset-x-0 h-14  bg-[#050510] backdrop-blur z-30">
                <div className="max-w-9xl mx-auto h-full px-6 flex items-center gap-3">
                    <div className="flex items-center justify-between " >
                        <span className="md:hidden text-2xl font-bold tracking-tighter text-white">
                            Replica.
                        </span>
                        <div className="md:hidden">
                            <button onClick={SidebarAction()} className="text-gray-700 hover:text-white rounded-xl hover:bg-white/10 p-2 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-layout-sidebar-inset-reverse" viewBox="0 0 16 16">
                                    <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
                                    <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-6 text-sm">
                        <button onClick={() => setOpenSearch(true)} className="text-gray-700 hover:text-white duration-300 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                        <div className="relative">
                            {loading ?
                                <p>loading...</p>
                                : user ?
                                    <button onClick={() => setOpen((v) => !v)} className="p-2 text-white rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-sm backdrop-blur-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" /> </svg>
                                    </button>
                                    : <button onClick={() => router.push("/auth/login")} className="px-4 py-1.5 rounded-full bg-white/10 text-cyan-300 hover:bg-white/20 transition">
                                        ログイン
                                    </button>
                            }
                        </div>
                        {open && (
                            <div className="absolute right-0 mt-40 w-56 rounded-xl border border-white/10  bg-[#0b0b14]/95 backdrop-blur p-3 text-sm shadow-xl">
                                <div className="mb-2">
                                    <div className="text-xs text-slate-400 mb-0.5">
                                        サインイン中
                                    </div>
                                    <div className="font-medium truncate">{user?.email}</div>
                                </div>
                                <div className="my-2 h-px bg-white/5" />
                                <button onClick={logout} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 text-red-300">
                                    ログアウト
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            {/* <Dialogs open={openSearch} onClose= {() => setOpenSearch(false)} title="検索"></Dialogs> */}
        </div>
    );
}