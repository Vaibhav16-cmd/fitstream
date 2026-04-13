import ActivityLog from "../models/ActivityLog.js";

export const listActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({ user: req.user.id }).sort({ date: -1 });
    return res.json(logs);
  } catch (error) {
    return next(error);
  }
};

export const createActivityLog = async (req, res, next) => {
  try {
    const log = await ActivityLog.create({
      ...req.body,
      user: req.user.id
    });

    return res.status(201).json(log);
  } catch (error) {
    return next(error);
  }
};
