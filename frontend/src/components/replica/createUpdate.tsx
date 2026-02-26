import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createLatestUpdate } from '@/lib/firestore';
interface CreateUpdateDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateUpdate({ open, onClose }: CreateUpdateDialogProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState("");
  const [nemo, setNemo] = useState("");

  // open の変化に合わせてユーザー情報を同期
  useEffect(() => {
    if (!open) return; // ダイアログが閉じられてるときは実行しない

    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
    });

    return () => unsubscribe();
  }, [open]);

  // open=false のときは何も描画しない
  if (!open) return null;

  const handleSubmit = async () => {
    if (!user) return alert("ログインが必要です");
    if (!title) return alert("タイトルを入力してください");

    if (title.length > 100) return alert("タイトルは100文字以内で入力してください");
    if (nemo.length > 1000) return alert("内容は1000文字以内で入力してください");

    try {
      await createLatestUpdate(user.uid, title.trim(), nemo.trim());
      onClose();
      router.push("/home");
    } catch {
      alert("投稿中にエラーが発生しました");
    }
  };

  return (
<div
  className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50 p-4"
  onClick={onClose}
>
  <div
    className="w-full max-w-md bg-[#0a0a0f]/90 border border-white/10 rounded-2xl p-6 shadow-xl shadow-cyan-500/10 select-none"
    onClick={(e) => e.stopPropagation()}
  >
    {/* --- Header --- */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-white tracking-wide">
        最新の更新を追加
      </h2>
      {/* 青い小さなドット（Replicaの更新カードと統一） */}
      <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(0,140,255,0.8)]" />
    </div>

    {/* --- Keyword Input --- */}
    <input
      type="text"
      placeholder="タイトルを入力"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      className="
        w-full px-4 py-3 rounded-lg bg-[#0c0c17] text-white 
        placeholder-gray-500 border border-white/10
        outline-none focus:border-cyan-400/50 transition
      "
    />

    {/* --- Description Input --- */}
    <textarea
      placeholder="内容（オプション）"
      rows={4}
      value={nemo}
      onChange={(e)=> setNemo(e.target.value)}
      className="
        w-full mt-3 px-4 py-3 rounded-lg bg-[#0c0c17] text-white 
        placeholder-gray-500 border border-white/10
        outline-none focus:border-cyan-400/50 transition resize-none
      "
    />

    {/* --- Buttons --- */}
    <div className="flex justify-end gap-3 mt-6">
      <button
        onClick={onClose}
        className="
          px-4 py-2 rounded-lg bg-[#0c0c17] border border-white/10 
          text-gray-300 hover:bg-[#12121f] transition
        "
      >
        閉じる
      </button>

      <button
        onClick={handleSubmit}
        className="
          px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 
          text-black font-semibold shadow-lg shadow-cyan-500/20
          hover:from-cyan-300 hover:to-blue-400 transition
        "
      >
        投稿
      </button>
    </div>
  </div>
</div>

  );
}
