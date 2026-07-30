import api from "../lib/axios.js";

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
