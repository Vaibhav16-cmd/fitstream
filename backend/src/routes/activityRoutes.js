import express from "express";
import { createActivityLog, listActivityLogs } from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listActivityLogs);
router.post("/", protect, createActivityLog);

export default router;
