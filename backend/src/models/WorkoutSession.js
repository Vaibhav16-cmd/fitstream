import mongoose from "mongoose";

const workoutSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active"
    },
    startedAt: {
      type: Date,
      required: true
    },
    endedAt: Date,
    durationMinutes: Number,
    caloriesBurned: Number
  },
  { timestamps: true }
);

export default mongoose.model("WorkoutSession", workoutSessionSchema);
