import express from "express";
import { createPlaylist, listPlaylists } from "../controllers/playlistController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validatePlaylistInput } from "../validations/playlistValidation.js";

const router = express.Router();

router.get("/", protect, listPlaylists);
router.post("/", protect, validateRequest(validatePlaylistInput), createPlaylist);

export default router;
