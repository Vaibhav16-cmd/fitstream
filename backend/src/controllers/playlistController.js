import Playlist from "../models/Playlist.js";

export const listPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate("songs");
    return res.json(playlists);
  } catch (error) {
    return next(error);
  }
};

export const createPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.create({
      ...req.body,
      user: req.user.id
    });

    return res.status(201).json(playlist);
  } catch (error) {
    return next(error);
  }
};
