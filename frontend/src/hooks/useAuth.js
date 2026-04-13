import { useAuthStore } from "../store/authStore.js";

export const useAuth = (selector = (state) => state) => useAuthStore(selector);
