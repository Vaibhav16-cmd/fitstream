import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import { playlistSeed } from "../seed/playlists.seed.js";
import { songSeed } from "../seed/songs.seed.js";
import { getRecommendationSummary } from "../services/recommendationService.js";

const ensureSeedSongs = async () => {
  const existingSongs = await Song.find();

  if (existingSongs.length > 0) {
    return existingSongs;
  }

  return Song.insertMany(songSeed);
};

const ensureSystemPlaylists = async () => {
  const existingPlaylists = await Playlist.find({ isSystem: true }).populate("songs");

  if (existingPlaylists.length > 0) {
    return existingPlaylists;
  }

  const songs = await ensureSeedSongs();
  const songsByMood = songs.reduce((accumulator, song) => {
    accumulator[song.mood] = accumulator[song.mood] || [];
    accumulator[song.mood].push(song._id);
    return accumulator;
  }, {});

  const playlists = await Playlist.insertMany(
    playlistSeed.map((playlist) => ({
      ...playlist,
      songs: songsByMood[playlist.mood] || songs.slice(0, 2).map((song) => song._id),
      isSystem: true
    }))
  );

  return Playlist.find({ _id: { $in: playlists.map((playlist) => playlist._id) } }).populate("songs");
};

export const listPlaylists = async (req, res, next) => {
  try {
    const systemPlaylists = await ensureSystemPlaylists();
    const userPlaylists = await Playlist.find({ user: req.user.id }).populate("songs");

    return res.json({
      system: systemPlaylists,
      personal: userPlaylists
    });
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

export const listRecommendedPlaylists = async (req, res, next) => {
  try {
    const { workoutCategory = "cardio" } = req.query;
    const systemPlaylists = await ensureSystemPlaylists();

    return res.json(getRecommendationSummary({ category: workoutCategory, playlists: systemPlaylists }));
  } catch (error) {
    return next(error);
  }
};
