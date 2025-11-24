"use client";
import { useEffect, useState } from "react";
import { Sidebar } from "./SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
const items = [
  { label: "ホーム", href: "/home" },
  { label: "作品一覧", href: "/studio" },
  { label: "詳細ページ", href: "/about" },
];
export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setOpen(e.detail);
    };
    window.addEventListener('toggle-mobile-sidebar', handler as EventListener);
    return () =>
      window.removeEventListener('toggle-mobile-sidebar', handler as EventListener);
  }, []);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm-a-[998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed left-0 top-0 h-full w-60 bg-[#0a0a0f] border-r border-white/10 z-[999] p-6 shadow-xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="md:hidden text-2xl font-bold tracking-tighter text-white">
                Replica
              </span>
              {/* 閉じるボタン */}
              <button
                className=" text-white"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Sidebar の内容をそのまま使う */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}