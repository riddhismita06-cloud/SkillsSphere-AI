export const analyzeResume = async (file) => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        score: 85,
        suggestions: [
          "Format looks good, but missing a dedicated 'Skills' section.",
          "Add more quantifiable metrics to your recent experience.",
          "Consider tailoring the summary to outline a specific objective.",
        ],
        missing_keywords: ["React Native", "TypeScript", "GraphQL", "Agile"],
      });
    }, 2000);
  });
};
