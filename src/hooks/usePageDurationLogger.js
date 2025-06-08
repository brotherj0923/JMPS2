import { useEffect } from "react";
import { logEvent } from "../utils/logToFirestore"; // 이전에 만든 공통 로깅 함수

const usePageDurationLogger = (pageName) => {
    useEffect(() => {
        const enterTime = Date.now();

        return () => {
        const leaveTime = Date.now();
        const durationSec = Math.round((leaveTime - enterTime) / 1000);

        logEvent("page_duration", {
            page: pageName,
            seconds: durationSec,
        });
        };
    }, [pageName]);
};

export default usePageDurationLogger;