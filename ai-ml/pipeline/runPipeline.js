import { aggregateResults } from "./aggregator.js";
import { skillEvaluator } from "../evaluators/skillEvaluator.js";
import { keywordEvaluator } from "../evaluators/keywordEvaluator.js";
import { experienceEvaluator } from "../evaluators/experienceEvaluator.js";

export async function runPipeline({
  resumeData,
  jobSkills = [],
  jobDescription = "",
}) {
    // ADD — safe wrapper for all evaluator calls
  function safeEval(name, fn, fallback = { score: 0, error: true }) {
    try {
      return fn();
    } catch (err) {
      console.error(`[runPipeline] Evaluator "${name}" failed:`, err);
      return fallback;
    }
  }

  // ADD — handles both string and object experience entries
  function parseExperience(experience = []) {
    return experience.map((entry) => {
      if (typeof entry === "string") return entry;
      if (typeof entry === "object" && entry !== null) {
        return [
          entry.title,
          entry.company,
          entry.duration,
          entry.description,
        ]
          .filter(Boolean)
          .join(" ");
      }
      return "";
    }).join("\n");
  }
  const evaluations = [];
  const [skillMatch, keywordMatch, experienceMatch] = await Promise.all([
  // 🟢 Skill Match
  safeEval("skillMatch", () =>
    skillEvaluator({
      resumeSkills: resumeData.skills || [],
      jobSkills,
    })
  ),

  // 🟡 Keyword Match
  safeEval("keywordMatch", () =>
    keywordEvaluator({
      resumeText: resumeData.resumeText || "",
      jobDescription,
    })
  ),

  // 🔵 Experience Match
  safeEval("experienceMatch", () =>
    experienceEvaluator({
      candidateExperienceText: parseExperience(resumeData.experience),
      jobDescription,
    })
  ),
]);

evaluations.push({ ...skillMatch, name: "skillMatch" });
evaluations.push({ ...keywordMatch, name: "keywordMatch" });
evaluations.push({ ...experienceMatch, name: "experienceMatch" });

  // 🧠 Aggregate
  const result = aggregateResults(evaluations);
  if (!result) throw new Error("[runPipeline] aggregateResults returned empty");
  const { score, breakdown } = result;

  return {
    score,
    breakdown,
    skillMatch,
    keywordMatch,
    experienceMatch,
  };
}
