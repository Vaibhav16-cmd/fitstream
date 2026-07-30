import { useEffect, useState } from "react";
import {
  createPlaylist as createPlaylistRequest,
  fetchPlaylists,
  fetchRecommendedPlaylists
} from "../services/playlistApi.js";

export const usePlaylists = ({ enabled, workoutCategory } = {}) => {
  const [playlistGroups, setPlaylistGroups] = useState({ system: [], personal: [] });
  const [recommendation, setRecommendation] = useState({ mood: "", playlists: [] });
  const [isLoading, setIsLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  const loadData = async () => {
    if (!enabled) {
      setPlaylistGroups({ system: [], personal: [] });
      setRecommendation({ mood: "", playlists: [] });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const [playlistsData, recommendationData] = await Promise.all([
        fetchPlaylists(),
        fetchRecommendedPlaylists(workoutCategory || "cardio")
      ]);
      setPlaylistGroups(playlistsData);
      setRecommendation(recommendationData);
    } catch (loadError) {
      setError(loadError.response?.data?.message || "Could not load playlists.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [enabled, workoutCategory]);

  const createPlaylist = async (payload) => {
    const playlist = await createPlaylistRequest(payload);
    await loadData();
    return playlist;
  };

  return {
    playlistGroups,
    recommendation,
    isLoading,
    error,
    createPlaylist,
    refresh: loadData
  };
};
