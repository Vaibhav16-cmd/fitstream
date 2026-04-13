import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  setTrack: (track) => set({ currentTrack: track }),
  setQueue: (queue) => set({ queue }),
  setIsPlaying: (isPlaying) => set({ isPlaying })
}));
