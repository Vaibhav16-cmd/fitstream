import { Link } from "react-router-dom";

export default function AuthLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background:
          "radial-gradient(circle at top right, rgba(15,118,110,0.14), transparent 30%), var(--color-background)"
      }}
    >
      <div
        style={{
          width: "min(100%, 1040px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "stretch"
        }}
      >
        <section
          style={{
            padding: "2rem",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #0f766e, #115e59)",
            color: "white",
            display: "grid",
            gap: "1rem"
          }}
        >
          <p style={{ margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            FitStream
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(2.5rem, 6vw, 4.2rem)", lineHeight: 1 }}>
            Train hard. Stream smart.
          </h1>
          <p style={{ margin: 0, maxWidth: "36ch", color: "rgba(255,255,255,0.86)" }}>
            One place for workouts, progress, activity, and music that matches your pace.
          </p>
          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <Link
              to="/workouts"
              style={{
                textDecoration: "none",
                color: "white",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "999px",
                padding: "0.8rem 1rem"
              }}
            >
              Explore workouts
            </Link>
            <Link
              to="/player"
              style={{
                textDecoration: "none",
                color: "white",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "999px",
                padding: "0.8rem 1rem"
              }}
            >
              Open player
            </Link>
          </div>
        </section>
        <section
          style={{
            padding: "2rem",
            borderRadius: "28px",
            background: "var(--color-surface)",
            border: "1px solid rgba(15, 118, 110, 0.12)"
          }}
        >
          {children}
        </section>
      </div>
    </div>
  );
}
