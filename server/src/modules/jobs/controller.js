import * as jobService from "./service.js";
import asyncHandler from "../../utils/asyncHandler.js";

/**
 * @desc Create a new job posting
 * @route POST /api/jobs
 * @access Private (Recruiter)
 */
export const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.body, req.user._id);
  
  res.status(201).json({
    status: "success",
    data: { job },
  });
});

/**
 * @desc Get all jobs
 * @route GET /api/jobs
 * @access Public
 */
export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await jobService.getAllJobs(req.query);
  
  res.status(200).json({
    status: "success",
    results: jobs.length,
    data: { jobs },
  });
});

/**
 * @desc Get job by ID
 * @route GET /api/jobs/:id
 * @access Public
 */
export const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.id);
  
  res.status(200).json({
    status: "success",
    data: { job },
  });
});

/**
 * @desc Update job
 * @route PATCH /api/jobs/:id
 * @access Private (Recruiter)
 */
export const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body, req.user._id);
  
  res.status(200).json({
    status: "success",
    data: { job },
  });
});

/**
 * @desc Delete job
 * @route DELETE /api/jobs/:id
 * @access Private (Recruiter)
 */
export const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req.params.id, req.user._id);
  
  res.status(200).json({
    status: "success",
    message: "Job deleted successfully",
    data: null,
  });
});
