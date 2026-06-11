import express from "express";

import { getUsers, approveFaculty, deleteFaculty } from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getUsers
);

router.put(
  "/approve/:id",
  protect,
  authorizeRoles("admin"),
  approveFaculty
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteFaculty
);

router.delete(
  "/:id",
  protect,
   authorizeRoles("admin"),
  deleteFaculty
);




export default router;