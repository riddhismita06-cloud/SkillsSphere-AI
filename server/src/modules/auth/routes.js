import express from "express";
import { 
  register, 
  verifyEmail, 
  forgotPassword, 
  resetPassword,
  resendOTP
} from "./controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

export default router;
