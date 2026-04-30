import express from "express";
import { protect, authorizeRoles } from "../../middleware/authMiddleware.js";
import {
  createJobPosting,
  getRecruiterJobs,
  getJobPostingById,
} from "./controller.js";

const router = express.Router();

// Protect all routes and restrict to recruiters
router.use(protect);
router.use(authorizeRoles("recruiter"));

router
  .route("/")
  .get(getRecruiterJobs)
  .post(createJobPosting);

router
  .route("/:id")
  .get(getJobPostingById);

export default router;
