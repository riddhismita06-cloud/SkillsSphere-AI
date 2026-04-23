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
  logout,
  googleOAuthCallback //to be used for google callback route
} from "./controller.js";
import { protect } from "../../middleware/authMiddleware.js";
import { authRateLimiter } from "../../middleware/rateLimiter.js";

const router = express.Router();

// 👤 Get Current User
router.get("/me", protect, getMe);

// Initiate Google OAuth
router.get("/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=email%20profile`;
  res.redirect(url);
});

// Callback from Google
router.get("/google/callback", googleOAuthCallback);

// 📝 Register & Auth (Rate Limited)
router.post("/register", authRateLimiter, register);
router.post("/verify-email", authRateLimiter, verifyEmail);
router.post("/forgot-password", authRateLimiter, forgotPassword);
router.post("/reset-password", authRateLimiter, resetPassword);
router.post("/resend-otp", authRateLimiter, resendOTP);
router.post("/login", authRateLimiter, login);

// 🚪 Logout
router.post("/logout", logout);

// 🔐 Google Login
router.post("/google", googleLogin);

export default router;