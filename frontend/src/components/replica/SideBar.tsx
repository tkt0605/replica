// components/replica/Sidebar.tsx
"use client";
import { useState } from "react";
import searchDialog from "../searchDialog";
import { usePathname } from "next/navigation";
import { aside, label } from "framer-motion/client";
// type SideBarProps = {
//     onClose: () => void;
// }
// type HeaderProps = {
//     onToggleSidebar: () => void;
// }
export function cn(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}


const items = [
    { label: "ホーム", href: "/home" },
    { label: "作品一覧", href: "/studio" },
    { label: "詳細ページ", href: "/about" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState();
    return (

        <aside className="hidden sm:flex flex-col fixed w-60 top-0 left-0 h-screen bg-[#000000] p-4 gap-2 z-10 ">
            <div className="mb-[187px]">
                <div className=" flex items-center justify-between " >
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Replica
                    </span>
                </div>
            </div>
            <nav className="space-y-2 gap-2">
                {items.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <a key={item.label} href={item.href} className={cn("flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition", active ? "bg-white/10 text-white shadow-[0_0_18px_rgba(56,189,248,0.6)]" : "text-slate-400 hover:bg-white/5 hover:text-slate-50")}>
                            <span>{item.label}</span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}