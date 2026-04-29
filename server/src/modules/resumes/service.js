import Resume from "../../database/models/Resume.js";

/**
 * Upsert a resume for a user.
 * Each user keeps only one stored parsed resume record, 
 * always replacing the previous one with the most recent upload.
 * 
 * @param {string} userId - The ID of the user
 * @param {Object} resumeData - The parsed resume data to save
 * @returns {Promise<Object>} The saved resume document
 */
export const upsertResume = async (userId, resumeData) => {
  // Use findOneAndUpdate with upsert: true to ensure only one record per user
  return await Resume.findOneAndUpdate(
    { user: userId },
    { 
      ...resumeData, 
      user: userId 
    },
    { 
      new: true, 
      upsert: true, 
      runValidators: true 
    }
  );
};

/**
 * Fetch the user's latest (and only) parsed resume record.
 * Enforces ownership by filtering by userId and excludes raw resumeText.
 * 
 * @param {string} userId - The ID of the user
 * @returns {Promise<Object|null>} The resume document or null if not found
 */
export const getLatestResume = async (userId) => {
  return await Resume.findOne({ user: userId })
    .select("-resumeText") // Ensure raw resumeText is excluded if it exists
    .lean();
};
