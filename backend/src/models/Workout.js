import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["strength", "cardio", "yoga", "mobility", "hiit"],
      default: "cardio"
    },
    intensity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    durationMinutes: { type: Number, default: 20 },
    description: { type: String, default: "" },
    mediaType: {
      type: String,
      enum: ["audio", "video", "guided"],
      default: "guided"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
