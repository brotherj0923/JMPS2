import { analytics } from "../firebase";
import { logEvent } from "firebase/analytics";

export const logGAEvent = (eventName, params = {}) => {
    try {
        if (!analytics) {
            console.warn("⚠️ GA가 초기화되지 않았습니다.");
            return;
        }
        logEvent(analytics, eventName, params);
    } catch (err) {
        console.error("🔥 GA 이벤트 기록 실패:", err);
    }
};