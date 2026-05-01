// --- Normalize text ---
function normalize(text = "") {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

// --- Month mapping ---
const MONTH_MAP = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

// --- Calculate months difference ---
function calculateMonths(startMonth, startYear, endMonth, endYear) {
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

// --- Extract experience in YEARS ---
export function extractExperienceInYears(text = "") {
  if (!text) return 0;

  let clean = normalize(text);
  let totalMonths = 0;

  // ================================
  // 1. DATE RANGE HANDLING (NEW 🔥)
  // ================================
  const dateRangeRegex =
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{4})\s*[-–]\s*(present|current|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*(\d{4}))/gi;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  clean = clean.replace(dateRangeRegex, (match, m1, y1, endGrp, m2, y2) => {
    const startMonth = MONTH_MAP[m1.toLowerCase()];
    const startYear = parseInt(y1);

    let endMonth, endYear;
    const endStr = endGrp.toLowerCase();

    if (endStr.includes("present") || endStr.includes("current")) {
      endMonth = currentMonth;
      endYear = currentYear;
    } else {
      endMonth = MONTH_MAP[m2.toLowerCase()];
      endYear = parseInt(y2);
    }

    const months = calculateMonths(startMonth, startYear, endMonth, endYear);
    totalMonths += Math.max(0, months); // Add months, safeguard against negative
    return " "; // Remove from string so it isn't double-counted
  });

  // ================================
  // 1.5 BRACKET HANDLING (NEW 🔥)
  // ================================
  const bracketRegex = /\((\d+)\s*(year|years|yr|yrs)\)/g;
  clean = clean.replace(bracketRegex, (match, y) => {
    totalMonths += parseInt(y) * 12;
    return " ";
  });

  // ================================
  // 2. COMBINED (1 year 6 months)
  // ================================
  const combinedRegex = /(\d+)\s*(year|years|yr|yrs)\s*(\d+)\s*(month|months|mo|mos)/g;
  clean = clean.replace(combinedRegex, (match, y, unitY, m) => {
    totalMonths += parseInt(y) * 12 + parseInt(m);
    return " ";
  });

  // ================================
  // 3. RANGE (1-3 years)
  // ================================
  const rangeRegex = /(\d+)\s*-\s*(\d+)\s*(year|years|yr|yrs)/g;
  clean = clean.replace(rangeRegex, (match, start, end) => {
    totalMonths += parseInt(end) * 12;
    return " ";
  });

  // ================================
  // 4. PLUS (2+ years)
  // ================================
  const plusRegex = /(\d+)\+?\s*(year|years|yr|yrs)/g;
  clean = clean.replace(plusRegex, (match, y) => {
    totalMonths += parseInt(y) * 12;
    return " ";
  });

  // ================================
  // 5. MONTHS ONLY (18 months)
  // ================================
  const monthRegex = /(\d+)\s*(month|months|mo|mos)/g;
  clean = clean.replace(monthRegex, (match, m) => {
    totalMonths += parseInt(m);
    return " ";
  });

  return totalMonths / 12;
}

// --- MAIN EVALUATOR ---
export function experienceEvaluator({
  candidateExperienceText = "",
  jobDescription = "",
  weight = 0.2,
}) {
  const candidateYears = extractExperienceInYears(candidateExperienceText);
  const requiredYears = extractExperienceInYears(jobDescription);

  if (!requiredYears) {
    return {
      score: 0,
      weight,
      feedback: [
        "Could not detect required experience from the job description",
      ],
      candidateExperience: Number(candidateYears.toFixed(2)),
      requiredExperience: 0,
      experienceGap: 0,
    };
  }

  let score =
    candidateYears >= requiredYears
      ? 100
      : (candidateYears / requiredYears) * 100;

  score = Math.min(100, Number(score.toFixed(2)));

  const gap = Math.max(0, requiredYears - candidateYears);

  const feedback = [];

  if (score === 100) {
    feedback.push("Candidate meets or exceeds required experience");
  } else if (score >= 50) {
    feedback.push("Candidate experience partially matches job requirements");
  } else {
    feedback.push("Candidate has significantly less experience than required");
  }

  feedback.push(`Required experience: ${requiredYears} years`);
  feedback.push(`Candidate experience: ${candidateYears.toFixed(2)} years`);
  feedback.push(`Experience gap: ${gap.toFixed(2)} years`);

  return {
    score,
    weight,
    feedback,
    candidateExperience: Number(candidateYears.toFixed(2)),
    requiredExperience: Number(requiredYears.toFixed(2)),
    experienceGap: Number(gap.toFixed(2)),
  };
}
