import express from "express";

import {
  createReportArchive,
  getAllReportArchives,
  updateReportArchive,
  deleteReportArchive,
} from "../controllers/reportArchiveController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all archived reports
router.get("/", protect, getAllReportArchives);

// Create new archived report
router.post("/", protect, createReportArchive);

// Update archived report
router.put("/:id", protect, updateReportArchive);

// Delete archived report
router.delete("/:id", protect, deleteReportArchive);

export default router;