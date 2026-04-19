import { 
  validateRegisterInput, 
  validateVerifyEmailInput, 
  validateForgotPasswordInput, 
  validateResetPasswordInput,
  validateResendOTPInput 
} from "../../validations/authValidation.js";
import { 
  registerUserAndIssueToken, 
  verifyUserEmail, 
  forgotPasswordRequest, 
  resetUserPassword,
  resendUserOTP 
} from "./service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";

export const register = asyncHandler(async (req, res, next) => {
  const validation = validateRegisterInput(req.body);

  if (!validation.isValid) {
    return next(new AppError("Invalid registration payload", 400));
  }

  const authResult = await registerUserAndIssueToken(validation.data);

  return res.status(201).json({
    success: true,
    message: "User registered successfully. Please check your email for verification code.",
    token: authResult.token,
    user: authResult.user
  });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const validation = validateVerifyEmailInput(req.body);

  if (!validation.isValid) {
    return next(new AppError("Invalid verification data", 400));
  }

  const result = await verifyUserEmail(validation.data.email, validation.data.otp);
  return res.status(200).json(result);
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const validation = validateForgotPasswordInput(req.body);

  if (!validation.isValid) {
    return next(new AppError("Invalid email address", 400));
  }

  const result = await forgotPasswordRequest(validation.data.email);
  return res.status(200).json(result);
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const validation = validateResetPasswordInput(req.body);

  if (!validation.isValid) {
    return next(new AppError("Invalid reset data", 400));
  }

  const result = await resetUserPassword(
    validation.data.email, 
    validation.data.otp, 
    validation.data.newPassword
  );
  return res.status(200).json(result);
});

export const resendOTP = asyncHandler(async (req, res, next) => {
  const validation = validateResendOTPInput(req.body);

  if (!validation.isValid) {
    return next(new AppError("Invalid email address", 400));
  }

  const result = await resendUserOTP(validation.data.email);
  return res.status(200).json(result);
});
