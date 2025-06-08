import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOu0tmHdX9NcqioNImOpItHgCQoFZBr6Q",
    authDomain: "daterandomslotjmps.firebaseapp.com",
    projectId: "daterandomslotjmps",
    storageBucket: "daterandomslotjmps.firebasestorage.app",
    messagingSenderId: "865464708093",
    appId: "1:865464708093:web:6096561313ec8c96d9c794",
    measurementId: "G-TMDBGCZRLP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);