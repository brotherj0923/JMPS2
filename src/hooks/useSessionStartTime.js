import { useEffect } from "react";

const useSessionStartTime = () => {
    useEffect(() => {
        const now = Date.now();
        sessionStorage.setItem("session_start_time", now.toString());
    }, []);
};

export default useSessionStartTime;