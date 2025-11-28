// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGiUqmYAlufKyOLnjG97UJsm9d-egcy0c",
  authDomain: "replica-tec.firebaseapp.com",
  projectId: "replica-tec",
  storageBucket: "replica-tec.firebasestorage.app",
  messagingSenderId: "408883474332",
  appId: "1:408883474332:web:02cc009da57a815cd2a259",
  measurementId: "G-KS0N40VS2K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
// const app = initializeApp(firebaseConfig);
// ★ Auth を export（どこからでも使える）
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);