"use client";

import { useState, useContext } from "react";
import { db, storage } from "@/firebase";
import { AuthContext } from "@/components/FirebaseProvider";
import { useRouter } from "next/navigation";

import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

export default function NewStudioPage() {
    const user = useContext(AuthContext);
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const handleSubmit = async () => {
        if (!user) return alert("ログインが必要です");

        if (!title.trim()) return alert("タイトルを入力してください");

        let imageURL = "";

        try {
            // 画像アップロード
            if (image) {
                const fileRef = ref(storage, `studio/${user.uid}/${image.name}`);
                await uploadBytes(fileRef, image);
                imageURL = await getDownloadURL(fileRef);
            }

            // Firestore へ投稿
            await addDoc(collection(db, "studios"), {
                ownerId: user.uid,
                title: title,
                description: desc,
                url: url || "",  // ← URLを追加（空なら空文字）
                imageURL: imageURL,
                createdAt: serverTimestamp(),
            });

            router.push("/studio");

        } catch (error) {
            console.error("投稿エラー:", error);
            alert("投稿中にエラーが発生しました");
        }
    };


    return (
        <main className="min-h-screen py-20 px-6 bg-[#050510] text-white relative overflow-hidden">

            {/* 背景の光 */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute -top-40 -left-24 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full opacity-60" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/25 blur-[200px] rounded-full opacity-70" />
                <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-blue-500/20 blur-[180px] rounded-full opacity-60" />
            </div>

            {/* タイトル */}
            <h1 className="text-center text-4xl font-bold tracking-wide 
                 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
                 text-transparent bg-clip-text drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                Studio — 作品投稿
            </h1>

            <p className="text-center text-gray-400 mt-3 mb-12">
                あなたの作品を公開しよう。
            </p>

            {/* 投稿カード */}
            <div className="max-w-2xl mx-auto p-8 rounded-2xl 
                  border border-white/10 
                  bg-white/5 backdrop-blur-xl
                  shadow-[0_0_40px_rgba(0,0,0,0.5)]">

                {/* タイトル */}
                <label className="text-sm text-gray-300 font-semibold">タイトル</label>
                <input
                    className="w-full mt-1 p-3 rounded-lg bg-[#0c0c0e]/70 border border-white/10
                 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
                    placeholder="例：Replica Identity Layer / Persona UI / Studio Design"
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* 説明 */}
                <label className="block mt-6 text-sm text-gray-300 font-semibold">説明</label>
                <textarea
                    className="w-full mt-1 p-3 rounded-lg bg-[#0c0c0e]/70 border border-white/10
                 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition"
                    placeholder="作品の背景 / 概念 / 技術 / Replicaとの繋がり を自由に書いてください。"
                    rows={5}
                    onChange={(e) => setDesc(e.target.value)}
                />

                {/* URL（追加） */}
                <label className="block mt-6 text-sm text-gray-300 font-semibold">
                    URL（任意）
                </label>
                <input
                    className="w-full mt-1 p-3 rounded-lg bg-[#0c0c0e]/70 border border-white/10
                 placeholder:text-gray-500
                 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 
                 outline-none transition"
                    placeholder="GitHub / プレビューURL / App公開ページなど"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                {/* 画像 */}
                <label className="block mt-6 text-sm text-gray-300 font-semibold">カバー画像</label>

                <div className="mt-2 flex items-center gap-4">
                    <input
                        type="file"
                        className="text-sm file:bg-cyan-600 file:px-4 file:py-2 file:border-none file:rounded-md
                   file:text-white hover:file:bg-cyan-500 transition cursor-pointer"
                        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    />
                </div>

                {/* 投稿ボタン */}
                <button
                    onClick={handleSubmit}
                    className="w-full mt-10 py-3 rounded-full 
              bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 
              font-semibold text-black hover:brightness-110 transition shadow-lg shadow-cyan-500/30"
                >
                    投稿する
                </button>

            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-10">
                © 2025 Replica Studio
            </p>

        </main>

    );
}
