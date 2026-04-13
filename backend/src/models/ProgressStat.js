import mongoose from "mongoose";

const progressStatSchema = new mongoose.Schema(
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
    weightKg: Number,
    workoutMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 }
  },
  { timestamps: true }
);

progressStatSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("ProgressStat", progressStatSchema);
