import Workout from "../models/Workout.js";
import WorkoutSession from "../models/WorkoutSession.js";
import ProgressStat from "../models/ProgressStat.js";
import Playlist from "../models/Playlist.js";
import { estimateCaloriesBurned } from "../utils/calculateCalories.js";
import { workoutSeed } from "../seed/workouts.seed.js";
import { getRecommendedMoodForWorkout } from "../services/recommendationService.js";

export const listWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });

    if (workouts.length === 0) {
      const seededWorkouts = await Workout.insertMany(workoutSeed);
      return res.json(seededWorkouts);
    }

    return res.json(workouts);
  } catch (error) {
    return next(error);
  }
};

export const getWorkoutById = async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    return res.json(workout);
  } catch (error) {
    return next(error);
  }
};

export const createWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.create(req.body);
    return res.status(201).json(workout);
  } catch (error) {
    return next(error);
  }
};

export const listWorkoutSessions = async (req, res, next) => {
  try {
    const sessions = await WorkoutSession.find({ user: req.user.id })
      .populate("workout playlist")
      .sort({ createdAt: -1 })
      .limit(20);

    return res.json(sessions);
  } catch (error) {
    return next(error);
  }
};

export const startWorkoutSession = async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const { playlistId } = req.body;
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const playlist = playlistId ? await Playlist.findById(playlistId) : null;
    const recommendedMood = getRecommendedMoodForWorkout(workout.category);

    const session = await WorkoutSession.create({
      user: req.user.id,
      workout: workout._id,
      playlist: playlist?._id,
      recommendedMood,
      startedAt: new Date(),
      status: "active"
    });

    return res.status(201).json(
      await WorkoutSession.findById(session._id).populate("workout playlist")
    );
  } catch (error) {
    return next(error);
  }
};

export const completeWorkoutSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { notes } = req.body;
    const session = await WorkoutSession.findById(sessionId).populate("workout");

    if (!session) {
      return res.status(404).json({ message: "Workout session not found" });
    }

    const endedAt = new Date();
    const durationMinutes = Math.max(
      1,
      Math.round((endedAt.getTime() - new Date(session.startedAt).getTime()) / 60000)
    );

    session.endedAt = endedAt;
    session.durationMinutes = durationMinutes;
    session.status = "completed";
    session.notes = notes || session.notes;
    session.caloriesBurned = estimateCaloriesBurned({
      durationMinutes,
      intensity: session.workout?.intensity || "medium"
    });

    await session.save();

    const date = endedAt.toISOString().slice(0, 10);
    const previousStat = await ProgressStat.findOne({ user: req.user.id, date });

    const existingMinutes = previousStat?.workoutMinutes || 0;
    const existingCalories = previousStat?.caloriesBurned || 0;
    const streakDays = Math.max(previousStat?.streakDays || 0, 1);

    await ProgressStat.findOneAndUpdate(
      { user: req.user.id, date },
      {
        user: req.user.id,
        date,
        workoutMinutes: existingMinutes + durationMinutes,
        caloriesBurned: existingCalories + session.caloriesBurned,
        streakDays
      },
      { new: true, upsert: true }
    );

    return res.json(session);
  } catch (error) {
    return next(error);
  }
};
