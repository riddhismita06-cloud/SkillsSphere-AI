import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import { sendOTP } from "../../utils/emailService.js";
import AppError from "../../utils/AppError.js";

const SALT_ROUNDS = 12;
const OTP_EXPIRY_MINUTES = 5;
const MAX_OTP_ATTEMPTS = 5;

const buildAuthToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new AppError("Missing JWT_SECRET in environment variables", 500);
  }

  return jwt.sign(
    { userId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUserAndIssueToken = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists with this email", 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    verificationToken: otp,
    verificationTokenExpires: otpExpiry,
    isVerified: false,
  });

  await sendOTP(email, otp, "verification");

  const token = buildAuthToken(user);
  return {
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, isVerified: false }
  };
};

export const verifyUserEmail = async (email, otp) => {
  const user = await User.findOne({ email });

  if (!user || user.isVerified) {
    throw new AppError("Invalid request", 400);
  }

  if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
    throw new AppError("Too many attempts. Please request a new OTP.", 429);
  }

  const isMatch = user.verificationToken === otp;
  const isExpired = user.verificationTokenExpires < Date.now();

  if (!isMatch || isExpired) {
    user.otpAttempts += 1;
    await user.save();
    throw new AppError(isExpired ? "OTP expired" : "Invalid OTP", 400);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  user.otpAttempts = 0;
  await user.save();

  return { success: true, message: "Email verified successfully" };
};

export const forgotPasswordRequest = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("No account found with this email address", 404);
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  user.resetPasswordToken = otp;
  user.resetPasswordExpires = otpExpiry;
  user.otpAttempts = 0;
  await user.save();

  await sendOTP(email, otp, "reset");

  return { success: true, message: "A reset code has been sent to your email." };
};

export const resetUserPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({ email });

  if (!user || !user.resetPasswordToken) {
    throw new AppError("Invalid request", 400);
  }

  if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
    throw new AppError("Too many attempts. Please request a new code.", 429);
  }

  const isMatch = user.resetPasswordToken === otp;
  const isExpired = user.resetPasswordExpires < Date.now();

  if (!isMatch || isExpired) {
    user.otpAttempts += 1;
    await user.save();
    throw new AppError(isExpired ? "Code expired" : "Invalid code", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.otpAttempts = 0;
  await user.save();

  return { success: true, message: "Password reset successfully" };
};

export const resendUserOTP = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("No account found with this email address", 404);
  }

  if (user.isVerified) {
    throw new AppError("User is already verified", 400);
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  user.verificationToken = otp;
  user.verificationTokenExpires = otpExpiry;
  user.otpAttempts = 0;
  await user.save();

  await sendOTP(email, otp, "verification");

  return { success: true, message: "A new verification code has been sent to your email." };
};
