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
