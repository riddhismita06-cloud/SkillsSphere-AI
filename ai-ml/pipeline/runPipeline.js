import { aggregateResults } from "./aggregator.js";
import { skillEvaluator } from "../evaluators/skillEvaluator.js";
import { keywordEvaluator } from "../evaluators/keywordEvaluator.js";
import { experienceEvaluator } from "../evaluators/experienceEvaluator.js";

export async function runPipeline({
  resumeData,
  jobSkills,
  jobDescription,
}) {
  const evaluations = [];

  // Skill Evaluator
  const skillMatch = skillEvaluator({
    resumeSkills: resumeData.skills || [],
    jobSkills: jobSkills || [],
  });

  evaluations.push({ ...skillMatch, name: "skills" });

  // Keyword Evaluator
  const keywordMatch = keywordEvaluator({
    resumeText: resumeData.resumeText || "",
    jobDescription: jobDescription || "",
  });

  evaluations.push({ ...keywordMatch, name: "keywords" });

  // Experience Evaluator
  const experienceMatch = experienceEvaluator({
    candidateExperienceText: (resumeData.experience || []).join(" "),
    jobDescription: jobDescription || "",
  });

  evaluations.push({ ...experienceMatch, name: "experience" });

  // Aggregate
  const aggregated = aggregateResults(evaluations);

  return {
    score: aggregated.score,
    breakdown: aggregated.breakdown,
    skillMatch,
    keywordMatch,
    experienceMatch,
  };
}
