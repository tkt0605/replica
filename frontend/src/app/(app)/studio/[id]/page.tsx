"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getFirestore,
  DocumentData,
} from "firebase/firestore";

interface Studio {
  id: string;
  title: string;
  description: string;
  imageURL?: string;
  tags?: string[];
  ownerId: string;
  url: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export default function StudioDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const ref = doc(db, "studios", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setStudio({ id: snap.id, ...snap.data() } as Studio);
        } else {
          console.log("Studio not found.");
        }
      } catch (e) {
        console.error("Error fetching studio:", e);
      }

      setLoading(false);
    };

    fetchStudio();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050510] text-white flex items-center justify-center">
        <p className="animate-pulse">読み込み中...</p>
      </main>
    );
  }

  if (!studio) {
    return (
      <main className="min-h-screen bg-[#050510] text-white flex items-center justify-center">
        <p>データが見つかりません。</p>
      </main>
    );
  }

  const formattedDate = new Date(
    studio.createdAt?.seconds * 1000
  ).toLocaleDateString("ja-JP");
  const createdAtDate = new Date(studio.createdAt.seconds * 1000);
  return (
    <main className="min-h-screen bg-[#050510] text-white px-6 py-14 relative overflow-hidden">

    {/* --- Liquid Aurora Background --- */}
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div className="absolute -top-40 -left-24 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full opacity-60" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/25 blur-[200px] rounded-full opacity-70" />
      <div className="absolute bottom-0 left-1/3 w-[380px] h-[380px] bg-blue-500/20 blur-[200px] rounded-full opacity-70" />
    </div>

    <div className="max-w-4xl mx-auto">

      {/* ---------- Hero ---------- */}
      <section className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide
          bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 
          text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]">
          {studio.title}
        </h1>

        <div className="flex items-center gap-3 text-gray-400 text-sm">
          <span>{createdAtDate.toLocaleDateString()}</span>
          <span className="px-2 py-1 bg-white/5 rounded-md border border-white/10">
            投稿者: {studio.ownerId}
          </span>
        </div>

        {/* URL がある場合: CTA */}
        {studio.url && (
          <a
            href={studio.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 rounded-xl 
              bg-gradient-to-r from-cyan-500 to-blue-500 
              font-medium text-black shadow-[0_0_18px_rgba(56,189,248,0.6)] 
              hover:scale-[1.02] transition-all duration-300"
          >
            🚀 プロジェクトを見る
          </a>
        )}
      </section>

      {/* ---------- Thumbnail ---------- */}
      {studio.imageURL && (
        <div className="overflow-hidden rounded-2xl mb-8 shadow-[0_0_25px_rgba(56,189,248,0.25)]">
          <img
            src={studio.imageURL}
            alt={studio.title}
            className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      {/* ---------- Description ---------- */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-cyan-300">概要</h2>
        <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
          {studio.description}
        </p>
      </section>

      {/* ---------- Tech Stack ---------- */}
      {studio.tags && (
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">
            技術スタック
          </h3>

          <div className="flex flex-wrap gap-3">
            {studio.tags.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/40
                  rounded-full text-sm tracking-wide shadow-[0_0_8px_rgba(56,189,248,0.25)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Footer ---------- */}
      <footer className="mt-4 pt-6 border-t border-white/10">
        <p className="text-gray-400 text-sm">
          Studio ID: <span className="text-gray-300">{studio.id}</span>
        </p>
      </footer>
    </div>
  </main>
  );
}
