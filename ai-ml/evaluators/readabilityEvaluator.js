// --- Split into sentences ---
function splitSentences(text) {
  // Split by common sentence terminators and newlines
  return text.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean);
}

// --- Action Verbs ---
const ACTION_VERBS = [
  "built", "implemented", "designed", "developed", "created", 
  "led", "managed", "optimized", "engineered", "resolved", 
  "drove", "launched", "spearheaded", "executed", "increased",
  "reduced", "delivered", "architected", "integrated", "spearheaded",
  "automated", "streamlined", "transformed", "orchestrated"
];

function hasActionVerb(sentence) {
  const lowerSentence = sentence.toLowerCase();
  return ACTION_VERBS.some(verb => new RegExp(`\\b${verb}\\b`).test(lowerSentence));
}

export default function readabilityEvaluator({ resumeText = "", weight = 0.1 }) {
  const sentences = splitSentences(resumeText);
  
  if (sentences.length === 0) {
    return { score: 0, weight, longSentences: 0, avgWordsPerSentence: 0, feedback: [] };
  }

  let penalty = 0;
  const feedback = new Set();
  
  let longSentences = 0;
  let actionOrientedSentences = 0;

  sentences.forEach(sentence => {
    const words = sentence.split(/\s+/).filter(Boolean);
    
    // 1. Sentence Length Analysis
    if (words.length > 25) {
      longSentences++;
    }

    // 2. Action Clarity Check
    if (hasActionVerb(sentence)) {
      actionOrientedSentences++;
    }
  });

  const longSentenceRatio = longSentences / sentences.length;
  const actionVerbRatio = actionOrientedSentences / sentences.length;

  // Penalize if more than 20% of sentences are overly long
  if (longSentenceRatio > 0.2) {
    penalty += 20;
    feedback.add("Reduce sentence length for better readability (break down sentences over 25 words).");
  } else if (longSentences > 3) {
    penalty += 10;
    feedback.add("Some sentences are overly long. Consider breaking them down for clarity.");
  }

  // Penalize if less than 20% of sentences use strong action verbs
  if (actionVerbRatio < 0.2) {
    penalty += 15;
    feedback.add("Use more action-oriented statements (e.g., 'built', 'implemented', 'optimized').");
  }

  // 3. Complexity/Density Detection
  const totalWords = sentences.reduce((acc, curr) => acc + curr.split(/\s+/).filter(Boolean).length, 0);
  const avgWordsPerSentence = totalWords / sentences.length;
  
  if (avgWordsPerSentence > 20) {
    penalty += 15;
    feedback.add("Text is very dense. Break large paragraphs into concise bullet points.");
  }

  let score = Math.max(0, 100 - penalty);
  
  if (score >= 90 && feedback.size === 0) {
    feedback.add("Resume is highly readable with clear, action-driven language.");
  }

  return {
    score,
    weight,
    longSentences,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    feedback: Array.from(feedback)
  };
}
