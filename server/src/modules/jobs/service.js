import JobPosting from "../../database/models/JobPosting.js";
import AppError from "../../utils/AppError.js";

/**
 * Create a new job posting
 * @param {Object} jobData - Job data
 * @param {string} recruiterId - ID of the recruiter posting the job
 * @returns {Promise<Object>} - Created job
 */
export const createJob = async (jobData, recruiterId) => {
  const job = await JobPosting.create({
    ...jobData,
    postedBy: recruiterId,
  });
  return job;
};

/**
 * Get all published jobs
 * @param {Object} query - Query filters
 * @returns {Promise<Array>} - List of jobs
 */
export const getAllJobs = async (query = {}) => {
  // Only return published jobs by default
  const filters = { status: "published", ...query };
  const jobs = await JobPosting.find(filters)
    .populate("postedBy", "name email company")
    .sort("-createdAt");
  return jobs;
};

/**
 * Get job by ID
 * @param {string} id - Job ID
 * @returns {Promise<Object>} - Job details
 */
export const getJobById = async (id) => {
  const job = await JobPosting.findById(id).populate("postedBy", "name email company");
  
  if (!job) {
    throw new AppError("Job not found", 404);
  }
  
  return job;
};

/**
 * Update a job posting
 * @param {string} id - Job ID
 * @param {Object} updateData - Data to update
 * @param {string} recruiterId - ID of the recruiter
 * @returns {Promise<Object>} - Updated job
 */
export const updateJob = async (id, updateData, recruiterId) => {
  const job = await JobPosting.findById(id);
  
  if (!job) {
    throw new AppError("Job not found", 404);
  }
  
  // Check if the recruiter owns this job
  if (job.postedBy.toString() !== recruiterId.toString()) {
    throw new AppError("You do not have permission to update this job", 403);
  }
  
  const updatedJob = await JobPosting.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  
  return updatedJob;
};

/**
 * Delete a job posting
 * @param {string} id - Job ID
 * @param {string} recruiterId - ID of the recruiter
 * @returns {Promise<void>}
 */
export const deleteJob = async (id, recruiterId) => {
  const job = await JobPosting.findById(id);
  
  if (!job) {
    throw new AppError("Job not found", 404);
  }
  
  // Check if the recruiter owns this job
  if (job.postedBy.toString() !== recruiterId.toString()) {
    throw new AppError("You do not have permission to delete this job", 403);
  }
  
  await JobPosting.findByIdAndDelete(id);
};
