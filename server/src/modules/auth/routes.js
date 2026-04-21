import express from "express";
import { 
  register, 
  verifyEmail, 
  forgotPassword, 
  resetPassword,
  resendOTP,
  login,
  googleLogin,
  getMe,
  logout
} from "./controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 👤 Get Current User
router.get("/me", protect, getMe);

// 📝 Register & Auth
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);
router.post("/login", login);

// 🚪 Logout
router.post("/logout", logout);

// 🔐 Google Login
router.post("/google", googleLogin);

export default router;