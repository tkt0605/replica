// components/replica/Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
// import { cn } from "@/lib/cn"; // なければ後ろで関数定義します
// lib/cn.ts
export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const items = [
  { label: "Home", icon: "🏠", href: "/" },
  { label: "Replica Studio", icon: "🧬", href: "/studio" },
  { label: "Libraries", icon: "📚", href: "/libraries" },
  { label: "Devices", icon: "💾", href: "/devices" },
  { label: "Settings", icon: "⚙️", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col w-60 pt-16 pb-6 px-4
        bg-gradient-to-b from-[#0a0a0f] via-[#111122] to-[#050510]
        border-r border-white/5"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">
        Navigation
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition",
                active
                  ? "bg-white/10 text-white shadow-[0_0_18px_rgba(56,189,248,0.6)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-50"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="mt-8 text-xs text-slate-500">Identity Status</div>
        <div className="mt-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">Replica Sync</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300">
              LIVE
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Your devices and personas are synced on-chain.
          </div>
        </div>
      </div>
    </aside>
  );
}
