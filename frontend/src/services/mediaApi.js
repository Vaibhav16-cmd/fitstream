import api from "../lib/axios.js";

export const fetchSongs = async () => {
  const response = await api.get("/media/songs");
  return response.data;
};
