import express from "express";
import { getProfile, login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateAuthInput } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validateRequest(validateAuthInput), register);
router.post("/login", validateRequest(validateAuthInput), login);
router.get("/me", protect, getProfile);

export default router;
