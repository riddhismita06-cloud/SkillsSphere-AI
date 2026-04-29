import { aggregateResults } from "./aggregator.js";
import { skillEvaluator } from "../evaluators/skillEvaluator.js";
import { keywordEvaluator } from "../evaluators/keywordEvaluator.js";
import { experienceEvaluator } from "../evaluators/experienceEvaluator.js";

export async function runPipeline({
  resumeData,
  jobSkills = [],
  jobDescription = "",
}) {
  const evaluations = [];

  // 🟢 Skill Match
  const skillMatch = skillEvaluator({
    resumeSkills: resumeData.skills || [],
    jobSkills,
  });
  evaluations.push({ ...skillMatch, name: "skillMatch" });

  // 🟡 Keyword Match
  const keywordMatch = keywordEvaluator({
    resumeText: resumeData.resumeText || "",
    jobDescription,
  });
  evaluations.push({ ...keywordMatch, name: "keywordMatch" });

  // 🔵 Experience Match
  const experienceMatch = experienceEvaluator({
    candidateExperienceText: (resumeData.experience || []).join(" "),
    jobDescription,
  });
  evaluations.push({ ...experienceMatch, name: "experienceMatch" });

  // 🧠 Aggregate
  const { score, breakdown } = aggregateResults(evaluations);

  return {
    score,
    breakdown,
    skillMatch,
    keywordMatch,
    experienceMatch,
  };
}
