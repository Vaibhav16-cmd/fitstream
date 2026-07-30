import { Link, useNavigate } from "react-router-dom";
import AudioEngine from "../components/media/AudioEngine.jsx";
import PlayerBar from "../components/media/PlayerBar.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { usePlayer } from "../hooks/usePlayer.js";

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const user = useAuth((state) => state.user);
  const clearSession = useAuth((state) => state.clearSession);
  const currentTrack = usePlayer((state) => state.currentTrack);
  const isPlaying = usePlayer((state) => state.isPlaying);

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <Link to="/" style={brandStyle}>
            FitStream
          </Link>
          <nav style={navStyle}>
            <Link to="/" style={navLinkStyle}>
              Dashboard
            </Link>
            <Link to="/workouts" style={navLinkStyle}>
              Workouts
            </Link>
            <Link to="/activity" style={navLinkStyle}>
              Activity
            </Link>
            <Link to="/player" style={navLinkStyle}>
              Player
            </Link>
            <Link to="/playlists" style={navLinkStyle}>
              Playlists
            </Link>
            <Link to="/profile" style={navLinkStyle}>
              Profile
            </Link>
            {user ? (
              <>
                <span style={{ color: "#4b5563" }}>Hi, {user.name}</span>
                <button type="button" onClick={handleLogout} style={logoutButtonStyle}>
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" style={loginButtonStyle}>
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <AudioEngine />
      <PlayerBar currentTrack={currentTrack} isPlaying={isPlaying} />
    </div>
  );
}

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  backdropFilter: "blur(14px)",
  background: "rgba(245, 241, 232, 0.84)",
  borderBottom: "1px solid rgba(15, 118, 110, 0.12)"
};

const headerInnerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  flexWrap: "wrap"
};

const brandStyle = {
  color: "inherit",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: "2rem"
};

const navStyle = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  alignItems: "center"
};

const navLinkStyle = {
  color: "inherit",
  textDecoration: "none"
};

const logoutButtonStyle = {
  border: "none",
  background: "var(--color-primary)",
  color: "white",
  padding: "0.7rem 1rem",
  borderRadius: "999px",
  cursor: "pointer"
};

const loginButtonStyle = {
  textDecoration: "none",
  color: "white",
  background: "var(--color-primary)",
  padding: "0.7rem 1rem",
  borderRadius: "999px"
};
