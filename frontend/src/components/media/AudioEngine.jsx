import { useEffect, useRef } from "react";
import { usePlayer } from "../../hooks/usePlayer.js";

export default function AudioEngine() {
  const audioRef = useRef(null);
  const currentTrack = usePlayer((state) => state.currentTrack);
  const isPlaying = usePlayer((state) => state.isPlaying);
  const playNext = usePlayer((state) => state.playNext);
  const setProgress = usePlayer((state) => state.setProgress);

  useEffect(() => {
    if (!audioRef.current || !currentTrack?.audioUrl) {
      return;
    }

    audioRef.current.src = currentTrack.audioUrl;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={(event) =>
        setProgress({
          currentTime: event.currentTarget.currentTime,
          duration: event.currentTarget.duration || 0
        })
      }
      onLoadedMetadata={(event) =>
        setProgress({
          currentTime: event.currentTarget.currentTime,
          duration: event.currentTarget.duration || 0
        })
      }
      onEnded={playNext}
    />
  );
}
