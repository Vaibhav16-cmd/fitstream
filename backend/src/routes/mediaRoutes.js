import express from "express";
import { createSong, listSongs } from "../controllers/mediaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/songs", listSongs);
router.post("/songs", protect, createSong);

export default router;
