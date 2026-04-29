export function aggregateResults(evaluations) {
  let totalWeight = 0;
  let weightedScoreSum = 0;
  const breakdown = {};

  evaluations.forEach((evalResult) => {
    if (!evalResult || typeof evalResult.score !== "number") return;

    const weight = typeof evalResult.weight === "number" ? evalResult.weight : 0;

    totalWeight += weight;
    weightedScoreSum += evalResult.score * weight;

    breakdown[evalResult.name] = evalResult.score;
  });

  const finalScore =
    totalWeight > 0 ? Number((weightedScoreSum / totalWeight).toFixed(2)) : 0;

  return {
    score: finalScore,
    breakdown,
  };
}
