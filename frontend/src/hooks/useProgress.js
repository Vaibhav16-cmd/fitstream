import { useEffect, useState } from "react";
import { fetchProgressStats } from "../services/progressApi.js";

export const useProgress = (enabled) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      setStats([]);
      setError("");
      setIsLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchProgressStats();
        setStats(data);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Could not load progress.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [enabled]);

  return { stats, isLoading, error };
};
