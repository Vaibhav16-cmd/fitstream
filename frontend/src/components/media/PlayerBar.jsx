export default function PlayerBar({ currentTrack }) {
  return (
    <section>
      <strong>Now Playing</strong>
      <p>{currentTrack ? `${currentTrack.title} - ${currentTrack.artist}` : "Nothing selected"}</p>
    </section>
  );
}
