import api from "../lib/axios.js";

export const fetchProgressStats = async () => {
  const response = await api.get("/progress");
  return response.data;
};
