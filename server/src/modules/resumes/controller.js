import path from "path";
import { parseResume } from "../../utils/parseResume.js";
import { cleanJDText } from "../../utils/cleanText.js";
import Resume from "../../database/models/Resume.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";
import { runPipeline } from "../../../../ai-ml/pipeline/runPipeline.js";
import * as resumeService from "./service.js";


const defaultDependencies = {
  parseResume,
  upsertResume: (userId, payload) => resumeService.upsertResume(userId, payload),
};


let controllerDependencies = { ...defaultDependencies };

export const setResumeControllerDependencies = (overrides = {}) => {
  controllerDependencies = {
    ...defaultDependencies,
    ...overrides,
  };
};

export const resetResumeControllerDependencies = () => {
  controllerDependencies = { ...defaultDependencies };
};

const parseSkillArrayString = (input) => {
  try {
    const parsed = JSON.parse(input);
    if (!Array.isArray(parsed)) return null;

    return {
      skills: parsed.map((skill) => `${skill}`.trim()).filter(Boolean),
      invalidJson: false,
    };
  } catch {
    return null;
  }
};

const normalizeSkillInput = (skillsInput) => {
  if (!skillsInput) return { skills: [], invalidJson: false };

  if (Array.isArray(skillsInput)) {
    return {
      skills: skillsInput
        .flatMap((skill) => (typeof skill === "string" ? skill.split(",") : []))
        .map((skill) => skill.trim())
        .filter(Boolean),
      invalidJson: false,
    };
  }

  if (typeof skillsInput === "string") {
    const trimmedInput = skillsInput.trim();
    if (!trimmedInput) return { skills: [], invalidJson: false };

    const parsedArray = parseSkillArrayString(trimmedInput);
    if (parsedArray) return parsedArray;

    return {
      skills: trimmedInput.split(",").map((skill) => skill.trim()).filter(Boolean),
      invalidJson: trimmedInput.startsWith("["),
    };
  }

  return { skills: [], invalidJson: false };
};

const toLegacySkillMatch = (pipelineResult) => {
  const result = pipelineResult.breakdown.skillMatch;
  if (!result) return {};

  return {
    score: result.score,
    weight: result.weight,
    feedback: result.details.feedback || [],
    matchedSkills: result.details.matchedSkills || [],
    missingSkills: result.details.missingSkills || [],
    extraSkills: result.details.extraSkills || [],
  };
};

const toLegacyKeywordMatch = (pipelineResult) => {
  const result = pipelineResult.breakdown.keywordMatch;
  if (!result) return {};

  return {
    score: result.score,
    weight: result.weight,
    feedback: result.details.feedback || [],
    matchedKeywords: result.details.matchedKeywords || [],
    missingKeywords: result.details.missingKeywords || [],
  };
};

const toLegacyExperienceMatch = (pipelineResult) => {
  const result = pipelineResult.breakdown.experienceMatch;
  if (!result) return {};

  return {
    score: result.score,
    weight: result.weight,
    feedback: result.details.feedback || [],
    candidateExperience: result.details.candidateExperience,
    requiredExperience: result.details.requiredExperience,
    experienceGap: result.details.experienceGap,
  };
};

export const uploadResume = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  res.status(200).json({
    success: true,
    message: "Resume uploaded successfully",
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: `${(req.file.size / 1024).toFixed(2)} KB`,
      mimeType: req.file.mimetype,
    },
  });
});

export const analyzeResume = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No resume file uploaded. Use form-data key `resume`.", 400));
  }

  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".pdf") {
    return next(new AppError("Only PDF files are supported for resume analysis right now", 400));
  }

  const parsedData = await controllerDependencies.parseResume(req.file.path).catch((err) => {
    throw new AppError(err.message || "Unable to extract text from resume", 400);
  });

  const { skills: jobSkills, invalidJson } = normalizeSkillInput(req.body?.jobSkills);
  const jobDescription = typeof req.body?.jobDescription === "string" ? req.body.jobDescription : "";
  const trimmedJobDescription = cleanJDText(jobDescription);

  const pipelineResult = await runPipeline({
    resumeData: parsedData,
    jobSkills,
    jobDescription: trimmedJobDescription,
  });

  const fileData = {
    originalName: req.file.originalname,
    storedName: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    size: `${(req.file.size / 1024).toFixed(2)} KB`,
    mimeType: req.file.mimetype,
  };

  const { resumeText, ...resumeFields } = parsedData;

  const savedResume = await controllerDependencies.upsertResume(req.user._id, {
    ...resumeFields,
    jobSkills,
    jobDescription: trimmedJobDescription || null,
    skillMatch: pipelineResult.skillMatch,
    keywordMatch: pipelineResult.keywordMatch,
    experienceMatch: pipelineResult.experienceMatch,
    evaluatorBreakdown: pipelineResult.breakdown,
    aggregatedScore: pipelineResult.score,
    file: fileData,
  });

  const successParts = [];
  if (Object.keys(pipelineResult.skillMatch || {}).length > 0) successParts.push("skill match");
  if (Object.keys(pipelineResult.keywordMatch || {}).length > 0) successParts.push("keyword relevance");
  if (Object.keys(pipelineResult.experienceMatch || {}).length > 0) successParts.push("experience fit");

  const evalSummary =
    successParts.length > 0
      ? `Resume parsed, ${successParts.join(" and ")} evaluated, and saved successfully`
      : "Resume parsed and saved successfully";

  res.status(200).json({
    success: true,
    message: invalidJson ? "Resume parsed and saved, but jobSkills JSON format is invalid" : evalSummary,
    resumeId: savedResume._id,
    data: resumeFields,
    ...pipelineResult,
    file: fileData,
  });
});

export const getResumeResult = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resume = await Resume.findById(id).select("-resumeText").lean();


  if (!resume) {
    return next(new AppError("Resume not found", 404));
  }

  // Ensure the user owns this resume
  if (resume.user.toString() !== req.user._id.toString()) {
    return next(new AppError("You do not have permission to view this resume", 403));
  }

  res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
});

export const getLatestResume = asyncHandler(async (req, res, next) => {
  const resume = await resumeService.getLatestResume(req.user._id);

  if (!resume) {
    return next(new AppError("No resume found for this user", 404));
  }

  res.status(200).json({
    success: true,
    message: "Latest resume fetched successfully",
    data: resume,
  });
});


