// components/replica/Sidebar.tsx
"use client";
import { useState } from "react";
import  searchDialog  from "../searchDialog";
import { usePathname } from "next/navigation";
import { aside, label } from "framer-motion/client";
type SideBarProps = {
    onClose: () => void;
}
export function cn(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}


const items = [
    { label: "ホーム", href: "/home" },
    { label: "作品一覧", href: "/studio" },
    { label: "詳細ページ", href: "/about"},
    //   { label: "使用中のデバイス", href: "/devices" },
    //   { label: "設定", icon: "⚙️", href: "/settings" },
];

export function Sidebar({onClose}: SideBarProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState();
    return (
        <aside className=" flex flex-col fixed top-1/2 -translate-y-1/2 left-6 justify-center  hidden md:flex flex-col w-50 pb-6 px-4 ">
            <nav className="space-y-1">
                {items.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <a key={item.label} href={item.href} className={cn("flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition",active ? "bg-white/10 text-white shadow-[0_0_18px_rgba(56,189,248,0.6)]" : "text-slate-400 hover:bg-white/5 hover:text-slate-50")}>
                            <span>{item.label}</span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}