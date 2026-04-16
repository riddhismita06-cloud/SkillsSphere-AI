import { validateRegisterInput } from "../../validations/authValidation.js";
import { registerUserAndIssueToken } from "./service.js";

export const register = async (req, res) => {
  const validation = validateRegisterInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid registration payload",
      errors: validation.errors
    });
  }

  try {
    const authResult = await registerUserAndIssueToken(validation.data);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: authResult.token,
      user: authResult.user
    });
  } catch (error) {
    if (error.code === "USER_ALREADY_EXISTS" || error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists"
      });
    }

    if (error.code === "MISSING_JWT_SECRET") {
      return res.status(500).json({
        success: false,
        message: "Server configuration error: JWT secret is missing"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to register user right now"
    });
  }
};
