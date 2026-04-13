import api from "../lib/axios.js";

export const fetchActivityLogs = async (token) => {
  const response = await api.get("/activity", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
