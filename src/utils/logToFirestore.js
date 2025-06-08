import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const logEvent = async (eventType, data = {}) => {
    try {
        await addDoc(collection(db, "user_logs"), {
        eventType,
        ...data,
        timestamp: new Date(),
        });
    } catch (err) {
        console.error("🔥 Firebase 기록 실패:", err);
    }
};