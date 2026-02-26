// lib/firestore.ts
import { db } from "@/lib/firebase";
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

function getDb(): Firestore {
  if (!db) throw new Error("Firestore が初期化されていません。NEXT_PUBLIC_FIREBASE_* 環境変数を確認してください。");
  return db;
}

/* ---------- フロント側で扱う型 ---------- */

export type Studios = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  
  tags: string[];
  imageURL: string;
  createdAt: string; // ISO文字列
};

export type LatestUpdate = {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt: string;
};

export type Progress = {
  id: string;
  userId: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
};

/* =========================================================
   Studio
========================================================= */

export const createStudio = async (
  ownerId: string,
  title: string,
  description: string,
  url: string,
  tags: string[],
  imageURL: string
): Promise<void> => {
  await addDoc(collection(getDb(), "studios"), {
    ownerId,
    title,
    description,
    url: url || "",
    tags,
    imageURL,
    createdAt: serverTimestamp(), // ここは型を縛らない
  });
};

export const getStudios = async (): Promise<Studios[]> => {
  const snap = await getDocs(collection(getDb(), "studios"));

  return snap.docs.map((d) => {
    const data = d.data() as {
      ownerId: string;
      title: string;
      description: string;
      url: string;
      tags?: string[];
      imageURL: string;
      createdAt?: Timestamp;
    };

    const createdAtIso =
      data.createdAt?.toDate().toISOString() ?? "";

    return {
      id: d.id,
      ownerId: data.ownerId,
      title: data.title,
      description: data.description,
      url: data.url,
      tags: data.tags ?? [],
      imageURL: data.imageURL,
      createdAt: createdAtIso,
    };
  });
};

export const updateStudio = async (
  id: string,
  data: Partial<Studios>
): Promise<void> => {
  await updateDoc(doc(getDb(), "studios", id), data);
};

export const deleteStudio = async (id: string): Promise<void> => {
  await deleteDoc(doc(getDb(), "studios", id));
};

/* =========================================================
   最新の更新 (updates)
========================================================= */

export const createLatestUpdate = async (
  userId: string,
  title: string,
  description?: string
): Promise<void> => {
  await addDoc(collection(getDb(), "updates"), {
    userId,
    title,
    description: description ?? "",
    createdAt: serverTimestamp(),
  });
};

export const getLatestUpdates = async (): Promise<LatestUpdate[]> => {
  const snap = await getDocs(collection(getDb(), "updates"));

  return snap.docs.map((d) => {
    const data = d.data() as {
      userId: string;
      title: string;
      description?: string;
      createdAt?: Timestamp;
    };

    const createdAtIso =
      data.createdAt?.toDate().toISOString() ?? "";

    return {
      id: d.id,
      userId: data.userId,
      title: data.title,
      description: data.description ?? "",
      createdAt: createdAtIso,
    };
  });
};

export const deleteUpdates = async (id: string): Promise<void> => {
  await deleteDoc(doc(getDb(), "updates", id));
};

/* =========================================================
   進行中 (progress)
========================================================= */

export const createProgress = async (
  userId: string,
  title: string,
  description: string,
  tags: string[]
): Promise<void> => {
  await addDoc(collection(getDb(), "progress"), {
    userId,
    title,
    description,
    tags,
    createdAt: serverTimestamp(),
  });
};

export const getProgress = async (): Promise<Progress[]> => {
  const snap = await getDocs(collection(getDb(), "progress"));

  return snap.docs.map((d) => {
    const data = d.data() as {
      userId: string;
      title: string;
      description?: string;
      tags?: string[];
      createdAt?: Timestamp;
    };

    const createdAtIso =
      data.createdAt?.toDate().toISOString() ?? "";

    return {
      id: d.id,
      userId: data.userId,
      title: data.title,
      description: data.description ?? "",
      tags: data.tags ?? [],
      createdAt: createdAtIso,
    };
  });
};

export const deleteProgress = async (id: string): Promise<void> => {
  await deleteDoc(doc(getDb(), "progress", id));
};
