export const buildQueue = (songs = []) =>
  songs.map((song, index) => ({
    order: index + 1,
    title: song.title,
    artist: song.artist,
    audioUrl: song.audioUrl
  }));
