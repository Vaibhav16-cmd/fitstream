import Workout from "../models/Workout.js";
import WorkoutSession from "../models/WorkoutSession.js";
import { estimateCaloriesBurned } from "../utils/calculateCalories.js";
import { workoutSeed } from "../seed/workouts.seed.js";

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

export const startWorkoutSession = async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const session = await WorkoutSession.create({
      user: req.user.id,
      workout: workout._id,
      startedAt: new Date(),
      status: "active"
    });

    return res.status(201).json(session);
  } catch (error) {
    return next(error);
  }
};

export const completeWorkoutSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
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
    session.caloriesBurned = estimateCaloriesBurned({
      durationMinutes,
      intensity: session.workout?.intensity || "medium"
    });

    await session.save();

    return res.json(session);
  } catch (error) {
    return next(error);
  }
};
