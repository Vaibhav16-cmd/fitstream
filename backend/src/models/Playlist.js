import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    mood: {
      type: String,
      enum: ["calm", "focus", "energetic", "recovery"],
      default: "focus"
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistSchema);
