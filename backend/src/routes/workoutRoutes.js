import express from "express";
import {
  completeWorkoutSession,
  createWorkout,
  getWorkoutById,
  listWorkouts,
  startWorkoutSession
} from "../controllers/workoutController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateWorkoutInput } from "../validations/workoutValidation.js";

const router = express.Router();

router.get("/", listWorkouts);
router.get("/:workoutId", getWorkoutById);
router.post("/", protect, validateRequest(validateWorkoutInput), createWorkout);
router.post("/:workoutId/start", protect, startWorkoutSession);
router.patch("/sessions/:sessionId/complete", protect, completeWorkoutSession);

export default router;
