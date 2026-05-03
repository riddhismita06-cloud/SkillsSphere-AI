export default function gapAnalyzer({ skillMatch, keywordMatch, experienceMatch }) {
  const suggestions = [];

  // 1. Skill Gaps
  if (skillMatch && skillMatch.missingSkills && skillMatch.missingSkills.length > 0) {
    const prioritySkills = skillMatch.missingSkills.slice(0, 4); // Focus on top 4
    suggestions.push(`Add projects or experience demonstrating these key skills: ${prioritySkills.join(", ")}`);
  }

  // 2. Keyword Gaps
  if (keywordMatch && keywordMatch.missingKeywords && keywordMatch.missingKeywords.length > 0) {
    const topKeywords = keywordMatch.missingKeywords.slice(0, 4);
    suggestions.push(`Integrate these missing industry keywords naturally: ${topKeywords.join(", ")}`);
  }

  // 3. Experience Gaps
  if (experienceMatch) {
    if (experienceMatch.score < 60) {
      suggestions.push("Detail your work history to better align with the core job responsibilities.");
    }

    const hasMetrics = experienceMatch.feedback?.some(
      f => f.toLowerCase().includes("metric") || f.toLowerCase().includes("quantifiable")
    );
    
    if (!hasMetrics && experienceMatch.score < 90) {
      suggestions.push("Highlight measurable achievements (e.g., 'improved performance by 30%') to strengthen your profile.");
    }
  }

  return {
    suggestions
  };
}
