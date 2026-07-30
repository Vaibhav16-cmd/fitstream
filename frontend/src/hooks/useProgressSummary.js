import { useEffect, useState } from "react";
import { fetchProgressSummary } from "../services/summaryApi.js";

export const useProgressSummary = (enabled) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) {
      setSummary(null);
      setError("");
      setIsLoading(false);
      return;
    }

    const loadSummary = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchProgressSummary();
        setSummary(data);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Could not load summary.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, [enabled]);

  return { summary, isLoading, error };
};
