import { Link } from "react-router-dom";

export default function PlayerBar({ currentTrack, isPlaying }) {
  return (
    <section
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        margin: "0 auto",
        maxWidth: "1100px",
        background: "rgba(255, 250, 243, 0.94)",
        border: "1px solid rgba(15, 118, 110, 0.12)",
        borderRadius: "22px",
        padding: "1rem 1.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        backdropFilter: "blur(14px)"
      }}
    >
      <div>
        <strong>Now Playing</strong>
        <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
          {currentTrack ? `${currentTrack.title} - ${currentTrack.artist}` : "Nothing selected"}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ color: isPlaying ? "var(--color-primary)" : "#6b7280", fontWeight: 700 }}>
          {isPlaying ? "Playing" : "Paused"}
        </span>
        <Link
          to="/player"
          style={{
            textDecoration: "none",
            color: "white",
            background: "var(--color-accent)",
            padding: "0.75rem 1rem",
            borderRadius: "999px"
          }}
        >
          Open player
        </Link>
      </div>
    </section>
  );
}
