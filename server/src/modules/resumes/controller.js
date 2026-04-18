import path from "path";
import { parseResume } from "../../utils/parseResume.js";
import { skillEvaluator } from "../../../../ai-ml/evaluators/skillEvaluator.js";
import { keywordEvaluator } from "../../../../ai-ml/evaluators/keywordEvaluator.js";
import { experienceEvaluator } from "../../../../ai-ml/evaluators/experienceEvaluator.js";
import Resume from "../../database/models/Resume.js";

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

    // Form-data text can be either a JSON array string or comma-separated text.
    const parsedArray = parseSkillArrayString(trimmedInput);
    if (parsedArray) return parsedArray;

    return {
      skills: trimmedInput.split(",").map((skill) => skill.trim()).filter(Boolean),
      invalidJson: trimmedInput.startsWith("["),
    };
  }

  return { skills: [], invalidJson: false };
};

export const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded"
    });
  }

  
  res.status(200).json({
    success: true,
    message: "Resume uploaded successfully",
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: `${(req.file.size / 1024).toFixed(2)} KB`,
      mimeType: req.file.mimetype
    }
  });
};

export const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No resume file uploaded. Use form-data key `resume`.",
    });
  }

  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".pdf") {
    return res.status(400).json({
      success: false,
      message: "Only PDF files are supported for resume analysis right now",
    });
  }

  try {
    const parsedData = await parseResume(req.file.path);
    const { skills: jobSkills, invalidJson } = normalizeSkillInput(req.body?.jobSkills);
    const skillMatch = parsedData.skills?.length && jobSkills.length
      ? skillEvaluator({
          resumeSkills: parsedData.skills,
          jobSkills,
        })
      : null;

    const jobDescription =
      typeof req.body?.jobDescription === "string" ? req.body.jobDescription : "";
    const trimmedJobDescription = jobDescription.trim();
    const keywordMatch = trimmedJobDescription && parsedData.resumeText
      ? keywordEvaluator({
          resumeText: parsedData.resumeText,
          jobDescription: trimmedJobDescription,
        })
      : null;
    const candidateExperienceText =
      Array.isArray(parsedData.experience) && parsedData.experience.length > 0
        ? parsedData.experience.join(" ")
        : parsedData.resumeText || "";
    const experienceMatch = experienceEvaluator({
      candidateExperienceText,
      jobDescription: trimmedJobDescription,
    });

    const finalSkillMatch = skillMatch || {};
    const finalKeywordMatch = keywordMatch || {};
    const finalExperienceMatch = experienceMatch || {};
    const fileData = {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      size: `${(req.file.size / 1024).toFixed(2)} KB`,
      mimeType: req.file.mimetype,
    };

    try {
      const { resumeText, ...resumeFields } = parsedData;

      const savedResume = await Resume.create({
        ...resumeFields,
        jobSkills,
        jobDescription: trimmedJobDescription || null,
        skillMatch: finalSkillMatch,
        keywordMatch: finalKeywordMatch,
        experienceMatch: finalExperienceMatch,
        file: fileData,
      });

      const hasSkillEval = Object.keys(finalSkillMatch).length > 0;
      const hasKeywordEval = Object.keys(finalKeywordMatch).length > 0;
      const hasExperienceEval = Object.keys(finalExperienceMatch).length > 0;
      const successParts = [];
      if (hasSkillEval) successParts.push("skill match");
      if (hasKeywordEval) successParts.push("keyword relevance");
      if (hasExperienceEval) successParts.push("experience fit");
      const evalSummary =
        successParts.length > 0
          ? `Resume parsed, ${successParts.join(" and ")} evaluated, and saved successfully`
          : "Resume parsed and saved successfully";

      return res.status(200).json({
        success: true,
        message: invalidJson
          ? "Resume parsed and saved, but jobSkills JSON format is invalid"
          : evalSummary,
        resumeId: savedResume._id,
        data: resumeFields,
        skillMatch: finalSkillMatch,
        keywordMatch: finalKeywordMatch,
        experienceMatch: finalExperienceMatch,
        file: fileData,
      });
    } catch (saveError) {
      console.error("Failed to save resume:", saveError);
      return res.status(500).json({
        success: false,
        message: "Resume parsed but failed to save to database",
        error: saveError.message,
      });
    }
  } catch (error) {
    const knownMessages = new Set([
      "Only PDF parsing is supported on /analyze right now",
      "Unable to extract text from resume",
    ]);

    return res.status(400).json({
      success: false,
      message: knownMessages.has(error.message)
        ? error.message
        : "Unable to extract text from resume",
    });
  }
};

export const getResumeResult = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id).lean();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume fetched successfully",
      data: resume,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

