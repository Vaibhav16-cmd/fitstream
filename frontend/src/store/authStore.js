import { create } from "zustand";

const SESSION_STORAGE_KEY = "fitstream-session";

const readStoredSession = () => {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

  if (!rawSession) {
    return { token: null, user: null };
  }

  try {
    return JSON.parse(rawSession);
  } catch (error) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return { token: null, user: null };
  }
};

export const useAuthStore = create((set) => ({
  ...readStoredSession(),
  setSession: ({ token, user }) =>
    set(() => {
      const session = { token, user };

      if (typeof window !== "undefined") {
        window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      }

      return session;
    }),
  clearSession: () =>
    set(() => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      }

      return { token: null, user: null };
    })
}));
