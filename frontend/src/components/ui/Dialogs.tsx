"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";
interface DialogProps {
  open: boolean,
  onClose: () => void,
  title?: string,
  children: React.ReactNode
}

export default function Dialogs({ open, onClose, title, children }: DialogProps) {
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* 黒背景（サイバー調：少し青味を入れる） */}
          <div
            className="absolute inset-0 bg-[#03040a]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* ダイヤログ本体（Cyber Panel） */}
          <div
            className="
          relative z-10 w-full max-w-lg 
          bg-[#0d0f15]/95 
          rounded-lg
          border border-cyan-400/30
          shadow-[0_0_25px_rgba(0,255,255,0.15)]
          p-6
        "
            onClick={(e) => e.stopPropagation()}
          >

            {/* タイトル */}
            {title && (
              <h2
                className="
              text-xl font-bold mb-5 
              text-cyan-300 tracking-widest
              border-b border-cyan-400/30 pb-2
            "
              >
                {title}
              </h2>
            )}

            {/* コンテンツ部分 */}
            <div className="text-cyan-100">{children}</div>
          </div>
        </div>
      )}
    </div>

  );
}