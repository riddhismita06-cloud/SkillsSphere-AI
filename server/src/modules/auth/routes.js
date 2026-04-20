import express from "express";
import { 
  register, 
  verifyEmail, 
  forgotPassword, 
  resetPassword,
  resendOTP,
  googleLogin
} from "./controller.js";

const router = express.Router();

// 📝 Register & Auth
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

// 🔐 Google Login
router.post("/google", googleLogin);

export default router;