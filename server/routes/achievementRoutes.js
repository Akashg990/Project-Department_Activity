import express from "express";

import {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

import { protect } from "../middleware/authMiddleware.js";
// Change the above path if your auth middleware has a different name

const router = express.Router();

// Get All Achievements
router.get("/", protect, getAchievements);

// Get Single Achievement
router.get("/:id", protect, getAchievementById);

// Create Achievement
router.post("/", protect, createAchievement);

// Update Achievement
router.put("/:id", protect, updateAchievement);

// Delete Achievement
router.delete("/:id", protect, deleteAchievement);

export default router;