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
  }, []);
  const ToogleTags = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };
  const hundleSubmit = async () => {
    if (!user) return alert('ログインして');
    if (!title) return alert('タイトルくれメンス');
    try {
      await addDoc(collection(db, "progress"), {
        ownerId: user.id,
        title: title,
        nemo: nemo,
        tags,
        createdAt: serverTimestamp(),
      });
      return router.push('/home');
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿中にエラーが発生しました");
    }
  };
  return (
    <div
      className=" p-6 "
      onClick={(e) => e.stopPropagation()}
    >
      {/* <h2 className="text-xl font-bold mb-4 text-cyan-300 tracking-wide">
    Create Progress
  </h2> */}

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => SetTitle(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f0f1f] border border-cyan-400/30 rounded outline-none text-white focus:border-cyan-300"
        />

        <textarea
          placeholder="内容"
          rows={3}
          value={nemo}
          onChange={(e) => setNemo(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f0f1f] border border-cyan-400/30 rounded outline-none text-white focus:border-cyan-300"
        />
      </div>

      <p className="mb-2 text-sm text-cyan-400">タグ</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => ToogleTags(tag)}
            className={`px-3 py-1 rounded-sm text-sm border transition ${tags.includes(tag)
                ? "bg-cyan-400/20 border-cyan-300 text-cyan-200"
                : "bg-[#0f0f1f] border-cyan-300/20 text-cyan-300 hover:border-cyan-300"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={hundleSubmit}
          className="w-24 py-2 rounded bg-cyan-400 text-black hover:bg-cyan-300 "
        >
          投稿
        </button>

        <button
          onClick={onClose}
          className="w-24 py-2 rounded bg-[#0f0f1f] border border-cyan-400/20 text-cyan-200 hover:bg-[#131326]"
        >
          閉じる
        </button>
      </div>
    </div>

  );
}