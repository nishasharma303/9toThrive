// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhrU06aU_sNrWJuuUqtx98IDlwgmJl0cI",
  authDomain: "fir-d1524.firebaseapp.com",
  projectId: "fir-d1524",
  storageBucket: "fir-d1524.firebasestorage.app",
  messagingSenderId: "513523745801",
  appId: "1:513523745801:web:754cb7b1cd9c0606d124d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);

export const db = getFirestore(app);
