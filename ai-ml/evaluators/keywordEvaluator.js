// --- Stop words (non-technical noise) ---
const STOP_WORDS = new Set([
  "the","and","or","with","for","in","on","at","a","an","to","of","is","are",
  "strong","modern","maintain","build","good","collaborate","participate",
  "understanding","knowledge","experience","familiarity","requirements",
  "responsibilities","working","ability","skills","developer","team",
  "existing","replaced","implementation","using","based","system","file","module",
  "looking","who","can","web","applications","such","work",
  "develop","application"
]);

// --- 1️⃣ Core Tech ---
const TECH_KEYWORDS = new Set([
  "react","node","node.js","mongodb","express","javascript","typescript",
  "docker","aws","api","apis","rest","mysql","git","github","html","css",
  "tailwind","bootstrap","redux","next","next.js","postgresql","firebase",
  "graphql","kubernetes","jenkins"
]);

// --- 2️⃣ Engineering Concepts ---
const ENGINEERING_KEYWORDS = [
  "architecture",
  "system design",
  "pipeline",
  "pipelines",
  "rest",
  "rest api",
  "apis",
  "microservices",
  "scalable",
  "backend",
  "frontend",
  "fullstack"
];

// --- 3️⃣ Action / Impact Words ---
const IMPACT_KEYWORDS = [
  "implemented",
  "optimized",
  "designed",
  "developed",
  "built",
  "improved",
  "increased",
  "reduced",
  "achieved",
  "enhanced"
];

// --- Normalize text ---
function normalizeText(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s.+#]/g, " ") // keep . + # (node.js, c++, c#)
    .replace(/\s+/g, " ")
    .trim();
}

// --- Extract keywords ---
function extractKeywords(text) {
  if (!text) return [];

  // Handle multi-word keywords
  let preProcessedText = text
    .replace(/rest api/gi, "rest_api")
    .replace(/system design/gi, "system_design")
    .replace(/micro services/gi, "microservices");

  const words = normalizeText(preProcessedText).split(" ");
  const uniqueWords = [...new Set(words)];

  return uniqueWords
    .map(word => word.replace("rest_api", "rest api").replace("system_design", "system design"))
    .filter(word => {
      // HARD filters (extra protection)
      if (
        word.length < 3 ||
        STOP_WORDS.has(word) ||
        word.includes(".") ||   // files
        word.includes("_")      // code patterns
      ) {
        // Exception for node.js and next.js in TECH_KEYWORDS
        if (!(TECH_KEYWORDS.has(word) && word.includes("."))) {
           return false;
        }
      }

      // STRICT category-based whitelisting only
      return (
        TECH_KEYWORDS.has(word) ||
        ENGINEERING_KEYWORDS.includes(word) ||
        IMPACT_KEYWORDS.includes(word)
      );
    });
}

// --- Preserve original casing from JD ---
function keywordDisplayFromJD(jdText, keywords) {
  const originalWords = jdText.split(/\s+/);

  return keywords.map(k => {
    if (k.includes(" ")) {
      return k.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    const match = originalWords.find(
      w => w.toLowerCase().replace(/[^\w.+#]/g, "") === k
    );
    return match || k;
  });
}

// --- MAIN EVALUATOR ---
export const keywordEvaluator = ({
  resumeText = "",
  jobDescription = "",
  weight = 0.2
}) => {
  // Normalize inputs
  const cleanResume = normalizeText(resumeText);
  const cleanJD = normalizeText(jobDescription);

  if (!cleanJD) {
    return {
      score: 0,
      weight,
      feedback: ["No job description provided for keyword analysis"],
      matchedKeywords: [],
      missingKeywords: []
    };
  }

  // Extract keywords
  let jdKeywords = extractKeywords(cleanJD);

  // Deduplicate again (safety)
  jdKeywords = [...new Set(jdKeywords)];

  if (jdKeywords.length === 0) {
    return {
      score: 0,
      weight,
      feedback: ["No meaningful keywords found in job description"],
      matchedKeywords: [],
      missingKeywords: []
    };
  }

  // Match against resume
  const matched = [];
  const missing = [];

  jdKeywords.forEach(keyword => {
    if (cleanResume.includes(keyword)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  // --- Score ---
  let score = (matched.length / jdKeywords.length) * 100;
  score = Math.min(100, Number(score.toFixed(2)));

  // --- Feedback ---
  const feedback = [];

  if (score >= 80) {
    feedback.push("Resume contains most important technical keywords");
  } else if (score >= 50) {
    feedback.push("Resume contains some important keywords but can be improved");
  } else {
    feedback.push("Resume is missing many important technical keywords");
  }

  // Add limited missing keywords feedback (avoid spam)
  missing.slice(0, 5).forEach(k => {
    feedback.push(`Missing keyword: ${k}`);
  });

  // --- Limit output (UX improvement) ---
  const LIMITED_MATCHED = matched.slice(0, 20);
  const LIMITED_MISSING = missing.slice(0, 20);

  return {
    score,
    weight,
    feedback,
    matchedKeywords: keywordDisplayFromJD(jobDescription, LIMITED_MATCHED),
    missingKeywords: keywordDisplayFromJD(jobDescription, LIMITED_MISSING)
  };
};
