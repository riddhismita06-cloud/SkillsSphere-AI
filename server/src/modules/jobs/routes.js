import express from "express";
import * as jobController from "./controller.js";
import { protect, authorizeRoles } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);

// Protected routes (Logged in users only)
router.use(protect);

// Recruiter only routes
router.post("/", authorizeRoles("recruiter"), jobController.createJob);
router.patch("/:id", authorizeRoles("recruiter"), jobController.updateJob);
router.delete("/:id", authorizeRoles("recruiter"), jobController.deleteJob);

export default router;
