import ProgressStat from "../models/ProgressStat.js";

export const listProgressStats = async (req, res, next) => {
  try {
    const stats = await ProgressStat.find({ user: req.user.id }).sort({ date: -1 });
    return res.json(stats);
  } catch (error) {
    return next(error);
  }
};

export const upsertProgressStat = async (req, res, next) => {
  try {
    const { date, ...updates } = req.body;

    const stat = await ProgressStat.findOneAndUpdate(
      { user: req.user.id, date },
      { ...updates, user: req.user.id, date },
      { new: true, upsert: true }
    );

    return res.json(stat);
  } catch (error) {
    return next(error);
  }
};

export const getProgressSummary = async (req, res, next) => {
  try {
    const stats = await ProgressStat.find({ user: req.user.id }).sort({ date: -1 }).limit(30);

    const summary = stats.reduce(
      (accumulator, stat) => {
        accumulator.totalWorkoutMinutes += stat.workoutMinutes || 0;
        accumulator.totalCaloriesBurned += stat.caloriesBurned || 0;
        accumulator.bestStreak = Math.max(accumulator.bestStreak, stat.streakDays || 0);
        accumulator.entries += 1;
        return accumulator;
      },
      {
        totalWorkoutMinutes: 0,
        totalCaloriesBurned: 0,
        bestStreak: 0,
        entries: 0
      }
    );

    return res.json({
      ...summary,
      latest: stats[0] || null
    });
  } catch (error) {
    return next(error);
  }
};
