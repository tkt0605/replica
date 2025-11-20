"use client";
// src/components/SearchDialog.tsx
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
interface CreateUpdateDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function CreateUpdate({open, onClose}: CreateUpdateDialogProps){
// const : React.FC<CreateUpdateDialogProps> = ({ open, onClose }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [title, SetTitle] = useState('');
  const [nemo, setNemo] = useState('');
  const [updated_at, setUpdated_at] = useState('');
  useEffect(() => {
    if(!open) return;
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
  const hundleSubmit = async () => {
    if (!user) return alert('ログインして');
    if (!title) return alert('タイトルくれメンス');
    try {
      await addDoc(collection(db, "update"), {
        ownerId: user.id,
        title: title,
        nemo: nemo,
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0f] p-6 rounded-2xl shadow-xl w-80 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">検索</h2>

        <input
          type="text"
          placeholder="キーワードを入力"
          className="w-full px-3 py-2 rounded bg-white/10 text-white outline-none"
        />

        <button
          className="mt-4 w-full py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}