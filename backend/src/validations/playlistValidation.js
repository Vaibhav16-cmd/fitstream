export const validatePlaylistInput = ({ name }) => {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Playlist name is required.");
  }

  return errors;
};
