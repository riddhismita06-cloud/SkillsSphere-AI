export function normalizeResumeData(data = {}) {
  return {
    name: data.name || "",
    email: data.email || null,
    phone: data.phone || null,

    skills: Array.isArray(data.skills) ? data.skills : [],
    education: Array.isArray(data.education) ? data.education : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    certifications: Array.isArray(data.certifications)
      ? data.certifications
      : [],

    linkedin: data.linkedin || null,
    github: data.github || null,
    portfolio: data.portfolio || null,

    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    extractedTextLength: data.extractedTextLength || 0,
    resumeText: data.resumeText || "",
  };
}

export function normalizePipelineResult(result = {}) {
  return {
    score: typeof result.score === "number" ? result.score : 0,
    breakdown:
      result.breakdown && typeof result.breakdown === "object"
        ? result.breakdown
        : {},

    skillMatch:
      result.skillMatch && typeof result.skillMatch === "object"
        ? result.skillMatch
        : {},
    keywordMatch:
      result.keywordMatch && typeof result.keywordMatch === "object"
        ? result.keywordMatch
        : {},
    experienceMatch:
      result.experienceMatch && typeof result.experienceMatch === "object"
        ? result.experienceMatch
        : {},
    consistencyMatch:
      result.consistencyMatch && typeof result.consistencyMatch === "object"
        ? result.consistencyMatch
        : {},
    classification:
      result.classification && typeof result.classification === "object"
        ? result.classification
        : null,
  };
}
