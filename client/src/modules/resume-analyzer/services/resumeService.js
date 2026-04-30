import { apiRequest } from "../../../services/apiClient";

export const analyzeResume = async (file, jobDescription = "") => {
  const formData = new FormData();
  formData.append("resume", file);
  
  if (jobDescription) {
    formData.append("jobDescription", jobDescription);
  }

  // Ensure jobSkills is passed so the skillEvaluator isn't starved
  formData.append("jobSkills", JSON.stringify([
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Docker",
    "AWS"
  ]));

  // Get token from storage using the correct key from authSlice
  const TOKEN_KEY = "skillssphere.auth.token";
  const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

  return apiRequest("/api/resume/analyze", {
    method: "POST",
    body: formData,
    token,
  });
};
