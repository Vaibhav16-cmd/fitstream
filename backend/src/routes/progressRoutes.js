import express from "express";
import {
  getProgressSummary,
  listProgressStats,
  upsertProgressStat
} from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getProgressSummary);
router.get("/", protect, listProgressStats);
router.put("/", protect, upsertProgressStat);

export default router;
