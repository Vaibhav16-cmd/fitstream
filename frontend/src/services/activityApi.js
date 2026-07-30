import api from "../lib/axios.js";

export const fetchActivityLogs = async (token) => {
  const response = await api.get("/activity", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const createActivityLog = async ({ token, payload }) => {
  const response = await api.post("/activity", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
