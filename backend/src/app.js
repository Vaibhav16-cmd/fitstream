import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FitStream API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/progress", progressRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
