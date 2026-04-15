import express from "express";
import {
  uploadResume,
  analyzeResume,
  getResumeResult
} from "./controller.js";

const router = express.Router();


router.post("/upload", uploadResume);
router.post("/analyze", analyzeResume);
router.get("/result/:id", getResumeResult);

export default router;