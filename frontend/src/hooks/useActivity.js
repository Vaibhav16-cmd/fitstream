import { useEffect, useState } from "react";
import { fetchActivityLogs } from "../services/activityApi.js";

export const useActivity = (token) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadActivity = async () => {
    if (!token) {
      setLogs([]);
      setError("");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const data = await fetchActivityLogs(token);
      setLogs(data);
    } catch (loadError) {
      setError(loadError.response?.data?.message || "Could not load activity logs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadActivity();
  }, [token]);

  return { logs, isLoading, error, refresh: loadActivity, setLogs };
};
