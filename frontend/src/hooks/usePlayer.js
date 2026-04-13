import { usePlayerStore } from "../store/playerStore.js";

export const usePlayer = (selector = (state) => state) => usePlayerStore(selector);
