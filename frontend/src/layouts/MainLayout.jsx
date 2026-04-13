import PlayerBar from "../components/media/PlayerBar.jsx";
import { usePlayer } from "../hooks/usePlayer.js";

export default function MainLayout({ children }) {
  const currentTrack = usePlayer((state) => state.currentTrack);

  return (
    <div>
      <header>
        <h1>FitStream</h1>
      </header>
      <main>{children}</main>
      <PlayerBar currentTrack={currentTrack} />
    </div>
  );
}
