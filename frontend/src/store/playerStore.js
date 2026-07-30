import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  queueIndex: 0,
  setTrack: (track) => set({ currentTrack: track }),
  setQueue: (queue, selectedTrackId) =>
    set(() => ({
      queue,
      queueIndex: Math.max(
        0,
        selectedTrackId ? queue.findIndex((track) => (track._id || track.id) === selectedTrackId) : 0
      )
    })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setProgress: ({ currentTime, duration }) => set({ currentTime, duration }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playTrack: ({ track, queue }) =>
    set(() => ({
      currentTrack: track,
      queue: queue || [],
      queueIndex: Math.max(
        0,
        queue ? queue.findIndex((queueTrack) => (queueTrack._id || queueTrack.id) === (track._id || track.id)) : 0
      ),
      isPlaying: true
    })),
  playNext: () =>
    set((state) => {
      if (state.queue.length === 0) {
        return state;
      }

      const nextIndex = (state.queueIndex + 1) % state.queue.length;
      return {
        queueIndex: nextIndex,
        currentTrack: state.queue[nextIndex],
        isPlaying: true
      };
    }),
  playPrevious: () =>
    set((state) => {
      if (state.queue.length === 0) {
        return state;
      }

      const previousIndex = state.queueIndex === 0 ? state.queue.length - 1 : state.queueIndex - 1;
      return {
        queueIndex: previousIndex,
        currentTrack: state.queue[previousIndex],
        isPlaying: true
      };
    })
}));
