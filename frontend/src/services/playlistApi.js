import api from "../lib/axios.js";

export const fetchPlaylists = async () => {
  const response = await api.get("/playlists");
  return response.data;
};

export const fetchRecommendedPlaylists = async (workoutCategory) => {
  const response = await api.get(`/playlists/recommended?workoutCategory=${workoutCategory}`);
  return response.data;
};

export const createPlaylist = async (payload) => {
  const response = await api.post("/playlists", payload);
  return response.data;
};
