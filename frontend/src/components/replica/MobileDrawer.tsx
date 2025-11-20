"use client";

import { useEffect, useState } from "react";

export default function MobileDrawer({ open, onClose, items }) {

  // ESC で閉じる
  useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="md:hidden fixed inset-0 z-[999]">

      {/* --- 背景（タップで閉じる） --- */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* --- Drawer 本体 --- */}
      <div
        className="
          absolute left-0 top-0 h-full w-72 
          bg-[#0a0a0f]/95
          border-r border-white/10
          shadow-[10px_0_40px_rgba(0,0,0,0.5)]
          p-6 flex flex-col
          animate-slideIn
        "
      >
        <h2 className="text-xl font-bold mb-4 text-white">メニュー</h2>

        <nav className="space-y-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="
                flex items-center px-3 py-2 rounded-lg
                text-slate-300 hover:bg-white/10 hover:text-white
              "
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
