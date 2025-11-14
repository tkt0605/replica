"use client";

import { Header } from "@/components/replica/Header";
import { Sidebar } from "@/components/replica/SideBar";
import { MainShell } from "@/components/replica/MainShell";
import { useEffect, useState } from "react";

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
            if (next){
                localStorage.setItem("aside_open", "true");
            }else{
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

    return (
        <div className="min-h-screen flex flex-col bg-[#050510] text-slate-100">
            <Header onToggleSidebar={toggleSidebar} />

            <div className="flex flex-1">
                {/* Sidebar */}
                {isOpen && (
                    <Sidebar />
                )}

                {/* Main */}
                <MainShell>
                    <div></div>
                </MainShell>
            </div>
        </div>
    );
}
