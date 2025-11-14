// components/replica/Header.tsx
"use client";

import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 h-14 bg-gradient-to-br from-[#0a0a0f] via-[#111122] to-[#1a1a2e] border-b border-white/5 backdrop-blur z-30">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center gap-3">
        {/* 左：ロゴ */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_20px_rgba(56,189,248,0.7)]" />
          <span
            className="text-lg font-extrabold bg-clip-text text-transparent 
              bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
              drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]"
          >
            Replica
          </span>
        </div>

        {/* 中央スペーサ */}
        <div className="flex-1" />

        {/* 右：ユーザー / ボタン */}
        <div className="flex items-center gap-3">
          <button
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium rounded-full
              border border-white/10 bg-white/5 hover:bg-white/10 transition
              whitespace-nowrap"
          >
            Docs
          </button>
          <button
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium rounded-full
              bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500
              text-slate-950 shadow-lg hover:brightness-110 transition"
          >
            Launch Studio
          </button>

          {/* Avatar + メニュー */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 
                flex items-center justify-center text-sm font-semibold
                hover:bg-white/10 transition"
            >
              TK
            </button>
            {open && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 
                  bg-[#0b0b14]/95 backdrop-blur p-3 text-sm shadow-xl"
              >
                <div className="mb-2">
                  <div className="text-xs text-slate-400 mb-0.5">
                    Signed in as
                  </div>
                  <div className="font-medium truncate">takato@replica.id</div>
                </div>
                <div className="my-2 h-px bg-white/5" />
                <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5">
                  Profile
                </button>
                <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5">
                  Settings
                </button>
                <button className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-white/5 text-red-300">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
