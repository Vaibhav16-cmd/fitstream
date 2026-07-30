import { useEffect, useState } from "react";
import { fetchSongs } from "../services/mediaApi.js";

export const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchSongs();
        setSongs(data);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Could not load songs.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
  }, []);

  return { songs, isLoading, error };
};
