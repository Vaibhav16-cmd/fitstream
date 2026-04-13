import Song from "../models/Song.js";

export const listSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    return res.json(songs);
  } catch (error) {
    return next(error);
  }
};

export const createSong = async (req, res, next) => {
  try {
    const song = await Song.create(req.body);
    return res.status(201).json(song);
  } catch (error) {
    return next(error);
  }
};
