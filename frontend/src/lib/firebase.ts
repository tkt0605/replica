import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function initApp(): FirebaseApp | undefined {
  if (!firebaseConfig.apiKey) {
    if (typeof window !== "undefined") {
      console.error(
        "[Replica] Firebase 環境変数が未設定です。\n" +
        "Vercel ダッシュボード → Settings → Environment Variables に\n" +
        "NEXT_PUBLIC_FIREBASE_* を全て追加してから再デプロイしてください。"
      );
    }
    return undefined;
  }
  return !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
}

const app = initApp();

export const auth: Auth | null = app ? getAuth(app) : null;
export const provider = new GoogleAuthProvider();
export const db: Firestore | null = app ? getFirestore(app) : null;
export const storage: FirebaseStorage | null = app ? getStorage(app) : null;