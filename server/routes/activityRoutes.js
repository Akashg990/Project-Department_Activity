import express from "express";

import {
  createActivity,
  getActivities,
  deleteActivity,
  updateActivity,
  getSingleActivity,
  getDashboardStats,
  deleteActivityImage,
} from "../controllers/activityController.js";
import upload from "../middleware/uploadMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Create Activity
router.post(
  "/",
  protect,
   authorizeRoles("admin", "faculty"),
  upload.array("images", 4),
  createActivity
);


// Get Activities
router.get("/", protect, getActivities);
router.get("/stats/dashboard", protect, getDashboardStats);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "faculty"),
  upload.array("images", 4),
  updateActivity
);
router.get("/:id", protect, getSingleActivity);
//delete Activities
router.delete(
  "/:activityId/image",
  protect,
  authorizeRoles("admin", "faculty"),
  deleteActivityImage
);
router.delete("/:id", protect, authorizeRoles("admin", "faculty"), deleteActivity);


export default router;