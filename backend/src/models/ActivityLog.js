import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    steps: { type: Number, default: 0 },
    waterMl: { type: Number, default: 0 },
    sleepHours: { type: Number, default: 0 },
    caloriesConsumed: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activityLogSchema);
