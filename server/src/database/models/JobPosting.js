import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    skillsRequired: {
      type: [String],
      default: [],
    },
    experienceRequired: {
      type: Number, // Years of experience
      required: [true, "Experience required is required"],
    },
    jobLevel: {
      type: String,
      enum: ["Internship", "Entry Level", "Associate", "Mid-Senior Level", "Director", "Executive"],
      required: [true, "Job level is required"],
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      default: "Full-time",
    },
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: "USD" },
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["published", "draft", "closed"],
      default: "published",
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

export default JobPosting;
