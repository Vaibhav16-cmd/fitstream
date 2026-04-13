import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    durationSeconds: { type: Number, default: 0 },
    mood: {
      type: String,
      enum: ["calm", "focus", "energetic", "recovery"],
      default: "focus"
    },
    audioUrl: { type: String, default: "" },
    coverImageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
