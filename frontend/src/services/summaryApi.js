import api from "../lib/axios.js";

export const fetchProgressSummary = async () => {
  const response = await api.get("/progress/summary");
  return response.data;
};
