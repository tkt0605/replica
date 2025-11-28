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
  techStack?: string[];
  ownerId: string;
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

  return (
    <main className="max-h-screen bg-[#050510] text-white max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{studio.title}</h1>

      {studio.imageURL && (
        <img
          src={studio.imageURL}
          alt="thumbnail"
          className="rounded-xl mb-6 w-full h-64 object-cover shadow-lg"
        />
      )}

      <div className="text-gray-300 mb-6">{formattedDate}</div>

      <p className="mb-4 leading-relaxed text-gray-200">
        {studio.description}
      </p>

      {studio.techStack && (
        <div className="flex flex-wrap gap-2 mt-4">
          {studio.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-cyan-600/30 border border-cyan-600/50 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-sm text-gray-400">
          投稿者 ID: {studio.ownerId}
        </p>
      </div>
    </main>
  );
}
