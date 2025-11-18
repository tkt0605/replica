// components/replica/Header.tsx
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { p } from "framer-motion/client";
type HeaderProps = {
    onToggleSidebar: () => void;
}
export function Header({ onToggleSidebar }: HeaderProps) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
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

    return (
        <header className="fixed top-0 inset-x-0 h-14 bg-gradient-to-br from-[#0a0a0f] via-[#111122] to-[#1a1a2e] border-b border-white/5 backdrop-blur z-30">
            <div className="max-w-9xl mx-auto h-full px-6 flex items-center gap-3">
                {/* 左：ロゴ */}
                <div className="flex items-center gap-3 cursor-pointer select-none" >
                    <button onClick={onToggleSidebar} className="h-7 w-7 hover:h-8 hover:w-8 transition-all duration-300 ease-out hover:scale-110  rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
                    <span className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                        Replica
                    </span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-6 text-sm">
                    <button className="text-gray-700 hover:text-white duration-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </button>
                    <div className="relative">
                        {loading ?
                            <p>loading...</p>
                            : user ?
                                <button onClick={() => setOpen((v) => !v)} className="h-9 w-9 rounded-full border border-white/10 bg-white/5  flex items-center justify-center text-sm font-semibold hover:bg-white/10 transition">
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
                                <div className="font-medium truncate">{user.displayName}</div>
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
    );
}
