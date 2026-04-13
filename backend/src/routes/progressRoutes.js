import express from "express";
import { listProgressStats, upsertProgressStat } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listProgressStats);
router.put("/", protect, upsertProgressStat);

export default router;
