// components/replica/Header.tsx
"use client";

import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
type HeaderProps = {
    onToggleSidebar: () => void;
}
export function Header({ onToggleSidebar }: HeaderProps) {
    const [open, setOpen] = useState(false);
    const logout = () => {
        signOut(auth);
    }
    return (
        <header className="fixed top-0 inset-x-0 h-14 bg-gradient-to-br from-[#0a0a0f] via-[#111122] to-[#1a1a2e] border-b border-white/5 backdrop-blur z-30">
            <div className="max-w-9xl mx-auto h-full px-6 flex items-center gap-3">
                {/* 左：ロゴ */}
                <div className="flex items-center gap-2 P-2" >
                    <button onClick={onToggleSidebar} className="h-7 w-7 hover:h-8 hover:w-8 transition-all duration-300 ease-out hover:scale-110  rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
                    <span className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                        Replica
                    </span>
                </div>
                <div className="flex-1"/>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button onClick={() => setOpen((v) => !v)} className="h-9 w-9 rounded-full border border-white/10 bg-white/5  flex items-center justify-center text-sm font-semibold hover:bg-white/10 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"> <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" /> </svg>
                        </button>
                        {open && (
                            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10  bg-[#0b0b14]/95 backdrop-blur p-3 text-sm shadow-xl">
                                <div className="mb-2">
                                    <div className="text-xs text-slate-400 mb-0.5">
                                        サインイン中
                                    </div>
                                    <div className="font-medium truncate"></div>
                                </div>
                                <div className="my-2 h-px bg-white/5" />
                                {/* <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5">
                                    プロフィール
                                </button>
                                <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5">
                                    設定
                                </button> */}
                                <button onClick={logout} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 text-red-300">
                                    ログアウト
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
