import api from "../lib/axios.js";

export const fetchPlaylists = async (token) => {
  const response = await api.get("/playlists", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
