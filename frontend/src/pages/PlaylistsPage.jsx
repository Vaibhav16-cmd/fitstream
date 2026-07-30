import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { usePlaylists } from "../hooks/usePlaylists.js";

export default function PlaylistsPage() {
  const token = useAuth((state) => state.token);
  const [form, setForm] = useState({ name: "", mood: "focus", category: "mixed", songs: [] });
  const { playlistGroups, recommendation, isLoading, error, createPlaylist } = usePlaylists({
    enabled: Boolean(token),
    workoutCategory: "cardio"
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createPlaylist(form);
    setForm({ name: "", mood: "focus", category: "mixed", songs: [] });
  };

  return (
    <MainLayout>
      <section style={pageStyle}>
        <section style={heroStyle}>
          <p style={eyebrowStyle}>Playlists</p>
          <h2 style={headingStyle}>Build mixes that match your training style.</h2>
          <p style={subTextStyle}>
            Personal playlists live beside workout-based recommendations so music feels intentional.
          </p>
        </section>

        {!token ? (
          <section style={panelStyle}>
            <p style={{ margin: 0 }}>Log in to create and save playlists.</p>
          </section>
        ) : (
          <div style={gridStyle}>
            <section style={panelStyle}>
              <h3 style={{ marginTop: 0 }}>Recommended for cardio</h3>
              <p style={{ color: "#4b5563" }}>Suggested mood: {recommendation.mood || "focus"}</p>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {recommendation.playlists.map((playlist) => (
                  <article key={playlist._id} style={cardStyle}>
                    <strong>{playlist.name}</strong>
                    <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                      {playlist.description || "Workout-ready mix"} | {playlist.songs?.length || 0} tracks
                    </p>
                  </article>
                ))}
              </div>
            </section>
            <section style={panelStyle}>
              <h3 style={{ marginTop: 0 }}>Create personal playlist</h3>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.85rem" }}>
                <input
                  placeholder="Playlist name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  required
                  style={inputStyle}
                />
                <select
                  value={form.mood}
                  onChange={(event) => setForm((current) => ({ ...current, mood: event.target.value }))}
                  style={inputStyle}
                >
                  <option value="focus">Focus</option>
                  <option value="energetic">Energetic</option>
                  <option value="calm">Calm</option>
                  <option value="recovery">Recovery</option>
                </select>
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  style={inputStyle}
                >
                  <option value="mixed">Mixed</option>
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="yoga">Yoga</option>
                  <option value="mobility">Mobility</option>
                  <option value="hiit">HIIT</option>
                </select>
                <button type="submit" style={buttonStyle}>Create playlist</button>
              </form>
            </section>
          </div>
        )}

        <section style={panelStyle}>
          <h3 style={{ marginTop: 0 }}>Your playlist library</h3>
          {error ? <p style={errorStyle}>{error}</p> : null}
          {isLoading ? (
            <p>Loading playlists...</p>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {[...(playlistGroups.personal || []), ...(playlistGroups.system || [])].map((playlist) => (
                <article key={playlist._id} style={cardStyle}>
                  <strong>{playlist.name}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                    {playlist.mood} | {playlist.category} | {playlist.songs?.length || 0} tracks
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
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
  background: "linear-gradient(135deg, rgba(15,118,110,0.12), rgba(239,125,87,0.14))"
};

const eyebrowStyle = {
  margin: 0,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
  fontWeight: 700
};

const headingStyle = {
  margin: "0.4rem 0 0",
  fontSize: "clamp(2rem, 5vw, 3.1rem)"
};

const subTextStyle = {
  margin: "0.65rem 0 0",
  color: "#4b5563",
  maxWidth: "54ch"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1rem"
};

const panelStyle = {
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)"
};

const cardStyle = {
  border: "1px solid rgba(15,118,110,0.1)",
  borderRadius: "18px",
  padding: "1rem",
  background: "#fffdfa"
};

const inputStyle = {
  border: "1px solid rgba(15, 118, 110, 0.18)",
  borderRadius: "14px",
  padding: "0.85rem 0.95rem",
  font: "inherit",
  background: "#fffdfa"
};

const buttonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "0.9rem 1rem",
  background: "var(--color-primary)",
  color: "white",
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
