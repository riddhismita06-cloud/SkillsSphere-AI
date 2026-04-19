import path from "path";
import { parseResume } from "../../utils/parseResume.js";
import { skillEvaluator } from "../../../../ai-ml/evaluators/skillEvaluator.js";
import { keywordEvaluator } from "../../../../ai-ml/evaluators/keywordEvaluator.js";
import { experienceEvaluator } from "../../../../ai-ml/evaluators/experienceEvaluator.js";
import Resume from "../../database/models/Resume.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";

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

  const parsedData = await parseResume(req.file.path).catch((err) => {
    throw new AppError(err.message || "Unable to extract text from resume", 400);
  });

  const { skills: jobSkills, invalidJson } = normalizeSkillInput(req.body?.jobSkills);
  const skillMatch =
    parsedData.skills?.length && jobSkills.length
      ? skillEvaluator({
          resumeSkills: parsedData.skills,
          jobSkills,
        })
      : {};

  const jobDescription = typeof req.body?.jobDescription === "string" ? req.body.jobDescription : "";
  const trimmedJobDescription = jobDescription.trim();
  const keywordMatch =
    trimmedJobDescription && parsedData.resumeText
      ? keywordEvaluator({
          resumeText: parsedData.resumeText,
          jobDescription: trimmedJobDescription,
        })
      : {};

  const candidateExperienceText =
    Array.isArray(parsedData.experience) && parsedData.experience.length > 0
      ? parsedData.experience.join(" ")
      : parsedData.resumeText || "";

  const experienceMatch = experienceEvaluator({
    candidateExperienceText,
    jobDescription: trimmedJobDescription,
  }) || {};

  const fileData = {
    originalName: req.file.originalname,
    storedName: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    size: `${(req.file.size / 1024).toFixed(2)} KB`,
    mimeType: req.file.mimetype,
  };

  const { resumeText, ...resumeFields } = parsedData;

  const savedResume = await Resume.create({
    ...resumeFields,
    jobSkills,
    jobDescription: trimmedJobDescription || null,
    skillMatch,
    keywordMatch,
    experienceMatch,
    file: fileData,
  });

  const successParts = [];
  if (Object.keys(skillMatch).length > 0) successParts.push("skill match");
  if (Object.keys(keywordMatch).length > 0) successParts.push("keyword relevance");
  if (Object.keys(experienceMatch).length > 0) successParts.push("experience fit");

  const evalSummary =
    successParts.length > 0
      ? `Resume parsed, ${successParts.join(" and ")} evaluated, and saved successfully`
      : "Resume parsed and saved successfully";

  res.status(200).json({
    success: true,
    message: invalidJson ? "Resume parsed and saved, but jobSkills JSON format is invalid" : evalSummary,
    resumeId: savedResume._id,
    data: resumeFields,
    skillMatch,
    keywordMatch,
    experienceMatch,
    file: fileData,
  });
});

export const getResumeResult = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const resume = await Resume.findById(id).lean();

  if (!resume) {
    return next(new AppError("Resume not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
});

