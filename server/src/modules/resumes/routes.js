import express from "express";
import { uploadResumeMiddleware } from "../../middleware/uploadResume.js";
import {
  uploadResume,
  analyzeResume,
  getResumeResult
} from "./controller.js";

import { protect, authorizeRoles } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Only Students can upload and analyze resumes in this example
router.post("/upload", protect, authorizeRoles("student"), uploadResumeMiddleware, uploadResume);
router.post("/analyze", protect, authorizeRoles("student"), uploadResumeMiddleware, analyzeResume);
router.get("/result/:id", protect, getResumeResult);

export default router;
