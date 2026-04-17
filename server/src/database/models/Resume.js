import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    skills: {
      type: [String],
      default: [],
    },
    education: {
      type: [String],
      default: [],
    },
    experience: {
      type: [String],
      default: [],
    },
    projects: {
      type: [String],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
    linkedin: {
      type: String,
      default: null,
    },
    github: {
      type: String,
      default: null,
    },
    portfolio: {
      type: String,
      default: null,
    },
    keywords: {
      type: [String],
      default: [],
    },
    extractedTextLength: {
      type: Number,
      default: 0,
    },
    jobSkills: {
      type: [String],
      default: [],
    },
    file: {
      originalName: String,
      storedName: String,
      path: String,
      size: String,
      mimeType: String,
    },
    skillMatch: {
      score: Number,
      weight: Number,
      feedback: [String],
      matchedSkills: [String],
      missingSkills: [String],
      extraSkills: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;

