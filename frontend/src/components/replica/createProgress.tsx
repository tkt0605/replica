"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { db, storage } from "@/firebase";
import { AuthContext } from "@/components/FirebaseProvider";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { supabase } from "@/supabaseClient";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  createProgress,
} from '@/lib/firestore';
interface CreateProgressDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function CreateProgress({ open, onClose }: CreateProgressDialogProps) {
  // const ProgressDialog: React.FC<CreateProgressDialogProps> = ({open, onClose}) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [title, SetTitle] = useState('');
  const [nemo, setNemo] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [created_at, setCreated_at] = useState('');

  const availableTags = [
    "構築中",
    "構想中",
    "リサーチ中",
    "実験中",
  ]
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!open) return;
      if (user) {
        console.log('ログイン・ユーザ', user);
        setUser(user);
      } else {
        console.log('非ログインユーザー');
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [open]);
  if (!open) return;
  const ToogleTags = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };
  const hundleSubmit = async () => {
    try {
      await createProgress(
        user.uid,
        title,
        nemo,
        tags
      )
      onClose();
      return router.push('/home');
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿中にエラーが発生しました");
    }
  };
  return (
<div
  className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50 p-4"
  onClick={onClose}
>

  <div
    className="w-full max-w-lg bg-[#0a0a0f]/90 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 p-6 space-y-6 relative"
    onClick={(e) => e.stopPropagation()}
  >

    {/* --- Header --- */}
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-white tracking-wide">
        新規投稿
      </h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition"
      >
        ✕
      </button>
    </div>

    {/* --- Title --- */}
    <input
      type="text"
      placeholder="タイトル"
      value={title}
      onChange={(e) => SetTitle(e.target.value)}
      className="w-full px-4 py-3 bg-[#0c0c17] border border-white/10 
                 rounded-lg outline-none text-white placeholder-gray-500
                 focus:border-cyan-400/50 transition"
    />

    {/* --- Content --- */}
    <textarea
      placeholder="内容を入力..."
      rows={4}
      value={nemo}
      onChange={(e) => setNemo(e.target.value)}
      className="w-full px-4 py-3 bg-[#0c0c17] border border-white/10 
                 rounded-lg outline-none text-white placeholder-gray-500
                 focus:border-cyan-400/50 transition resize-none"
    />

    {/* --- Tags --- */}
    <div>
      <p className="mb-2 text-sm text-cyan-300 font-medium">タグ</p>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const active = tags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => ToogleTags(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                ${
                  active
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.25)]"
                    : "bg-[#0c0c17] border-white/10 text-gray-300 hover:border-cyan-300 hover:text-cyan-200"
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>

    {/* --- Buttons --- */}
    <div className="flex justify-end gap-3 pt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg bg-[#0c0c17] border border-white/10 
                  text-gray-300 hover:bg-[#12121f] transition"
      >
        閉じる
      </button>

      <button
        onClick={hundleSubmit}
        className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 
                   text-black font-semibold shadow-lg shadow-cyan-500/20
                   hover:from-cyan-300 hover:to-blue-400 transition"
      >
        投稿
      </button>
    </div>
  </div>
</div>

  );
}