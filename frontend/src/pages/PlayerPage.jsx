import MainLayout from "../layouts/MainLayout.jsx";
import { useSongs } from "../hooks/useSongs.js";
import { usePlayer } from "../hooks/usePlayer.js";
import { formatTime } from "../utils/formatTime.js";

export default function PlayerPage() {
  const { songs, isLoading, error } = useSongs();
  const currentTrack = usePlayer((state) => state.currentTrack);
  const queue = usePlayer((state) => state.queue);
  const isPlaying = usePlayer((state) => state.isPlaying);
  const currentTime = usePlayer((state) => state.currentTime);
  const duration = usePlayer((state) => state.duration);
  const playTrack = usePlayer((state) => state.playTrack);
  const togglePlaying = usePlayer((state) => state.togglePlaying);
  const playNext = usePlayer((state) => state.playNext);
  const playPrevious = usePlayer((state) => state.playPrevious);

  const handlePlayTrack = (track) => {
    playTrack({ track, queue: songs });
  };

  return (
    <MainLayout>
      <section style={pageStyle}>
        <section style={heroStyle}>
          <p style={eyebrowStyle}>Player</p>
          <h2 style={headingStyle}>Keep the workout energy moving.</h2>
          <p style={subTextStyle}>
            Pick a track, set the queue, and keep playback visible in every page footer.
          </p>
        </section>

        <div style={gridStyle}>
          <section style={panelStyle}>
            <h3 style={{ marginTop: 0 }}>Library</h3>
            {error ? <p style={errorStyle}>{error}</p> : null}
            {isLoading ? (
              <p>Loading songs...</p>
            ) : (
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {songs.map((song) => (
                  <button
                    key={song._id || `${song.title}-${song.artist}`}
                    type="button"
                    onClick={() => handlePlayTrack(song)}
                    style={{
                      textAlign: "left",
                      border: "1px solid rgba(15,118,110,0.1)",
                      borderRadius: "18px",
                      background:
                        currentTrack?._id === song._id ? "rgba(15,118,110,0.08)" : "#fffdfa",
                      padding: "1rem",
                      cursor: "pointer"
                    }}
                  >
                    <strong>{song.title}</strong>
                    <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                      {song.artist} | {song.mood} | {formatTime(song.durationSeconds)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section style={panelStyle}>
            <h3 style={{ marginTop: 0 }}>Now playing</h3>
            {currentTrack ? (
              <div style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <strong style={{ fontSize: "1.3rem" }}>{currentTrack.title}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                    {currentTrack.artist} | {currentTrack.mood}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="button" onClick={playPrevious} style={secondaryButtonStyle}>
                    Previous
                  </button>
                  <button type="button" onClick={togglePlaying} style={accentButtonStyle}>
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button type="button" onClick={playNext} style={secondaryButtonStyle}>
                    Next
                  </button>
                </div>
                <p style={{ margin: 0, color: "#4b5563" }}>
                  {formatTime(Math.round(currentTime))} /{" "}
                  {formatTime(Math.round(duration || currentTrack.durationSeconds || 0))}
                </p>
                <div>
                  <p style={{ marginTop: 0, fontWeight: 700 }}>Queue</p>
                  <p style={{ margin: 0, color: "#4b5563" }}>{queue.length} tracks loaded</p>
                </div>
              </div>
            ) : (
              <p style={{ color: "#4b5563" }}>Pick a song from the library to start playback.</p>
            )}
          </section>
        </div>
      </section>
    </MainLayout>
  );
}

const pageStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "2rem",
  display: "grid",
  gap: "1.5rem"
};

const heroStyle = {
  borderRadius: "28px",
  padding: "2rem",
  background: "linear-gradient(135deg, rgba(239,125,87,0.12), rgba(15,118,110,0.14))",
  display: "grid",
  gap: "1rem"
};

const eyebrowStyle = {
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-primary)",
  fontWeight: 700
};

const headingStyle = {
  margin: 0,
  fontSize: "clamp(2rem, 5vw, 3.25rem)"
};

const subTextStyle = {
  margin: 0,
  color: "#4b5563"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(300px, 0.8fr)",
  gap: "1rem"
};

const panelStyle = {
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)"
};

const accentButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "0.85rem 1rem",
  background: "var(--color-accent)",
  color: "white",
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryButtonStyle = {
  border: "1px solid rgba(15,118,110,0.18)",
  borderRadius: "999px",
  padding: "0.85rem 1rem",
  background: "white",
  color: "var(--color-text)",
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer"
};

const errorStyle = {
  margin: "0 0 1rem",
  background: "#fff1f0",
  color: "#9f1239",
  padding: "0.85rem 1rem",
  borderRadius: "16px"
};
