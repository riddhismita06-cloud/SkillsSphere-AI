import { apiRequest } from "../../../services/apiClient";

/**
 * Service for managing recruiter job postings.
 * Logic is structured to use the apiRequest helper for backend integration.
 */

export const getRecruiterJobs = async (token) => {
  // Real API implementation (uncomment when backend is ready)
  // return apiRequest("/recruiter/jobs", { token });
  
  // Current mock implementation for development/demo
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedJobs = localStorage.getItem("recruiter_jobs");
      resolve({
        success: true,
        jobs: storedJobs ? JSON.parse(storedJobs) : []
      });
    }, 800);
  });
};

export const createJobPosting = async (jobData, token) => {
  // Real API implementation (uncomment when backend is ready)
  /*
  return apiRequest("/recruiter/jobs", {
    method: "POST",
    body: jobData,
    token
  });
  */

  // Current mock implementation using localStorage for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedJobs = JSON.parse(localStorage.getItem("recruiter_jobs") || "[]");
      const newJob = {
        id: `job_${Date.now()}`,
        ...jobData,
        createdAt: new Date().toISOString(),
        status: "active"
      };
      
      localStorage.setItem("recruiter_jobs", JSON.stringify([newJob, ...storedJobs]));
      
      resolve({
        success: true,
        job: newJob
      });
    }, 1000);
  });
};
