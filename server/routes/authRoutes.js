import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { sendOtp, verifyOtp, sendResetOtp } from "../controllers/otpController.js";
import {
  registerUser,
  loginUser,
  resetPassword,
} from "../controllers/authController.js";

import { testEmail } from "../controllers/userController.js";
const router = express.Router();


// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});


router.post(
  "/send-otp",
  sendOtp
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post(
  "/reset-password",
  resetPassword
);

router.post("/send-reset-otp", sendResetOtp);

router.get(
  "/test-email",
  testEmail
);

export default router;