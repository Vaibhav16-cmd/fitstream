import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5001"}/api`
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const session = window.localStorage.getItem("fitstream-session");

  if (!session) {
    return config;
  }

  try {
    const { token } = JSON.parse(session);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    window.localStorage.removeItem("fitstream-session");
  }

  return config;
});

export default api;
