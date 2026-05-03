export default function gapAnalyzer({ 
  skillMatch, 
  keywordMatch, 
  experienceMatch,
  consistencyMatch,
  readabilityMatch
}) {
  const suggestions = [];

  // 1. 🟢 Skill Gaps (High Priority)
  if (skillMatch?.missingSkills?.length > 0 && skillMatch.score !== null) {
    const prioritySkills = skillMatch.missingSkills.slice(0, 4);
    suggestions.push(`Add projects or experience demonstrating these key skills: ${prioritySkills.join(", ")}`);
  }

  // 2. 🔵 Experience Gaps (Medium-High Priority)
  if (experienceMatch && experienceMatch.score !== null) {
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

  // 3. 🟡 Keyword Gaps
  if (keywordMatch?.missingKeywords?.length > 0 && keywordMatch.score !== null) {
    const topKeywords = keywordMatch.missingKeywords.slice(0, 3);
    suggestions.push(`Integrate these missing industry keywords naturally: ${topKeywords.join(", ")}`);
  }

  // 4. 🟣 Consistency & Readability (Lower Priority but important for polish)
  if (readabilityMatch?.feedback?.length > 0) {
    // Pick the most impactful readability tip
    const readabilityTip = readabilityMatch.feedback.find(f => f.includes("Action") || f.includes("length"));
    if (readabilityTip) suggestions.push(readabilityTip);
  }

  if (consistencyMatch?.feedback?.length > 0) {
    const consistencyTip = consistencyMatch.feedback.find(f => f.includes("repetitive") || f.includes("Generic"));
    if (consistencyTip) suggestions.push(consistencyTip);
  }

  // Deduplicate case-insensitively and trim
  const uniqueSuggestions = Array.from(new Set(suggestions.map(s => s.trim())))
    .filter((value, index, self) => 
      index === self.findIndex(t => t.toLowerCase() === value.toLowerCase())
    );

  return {
    suggestions: uniqueSuggestions.slice(0, 8)
  };
}
