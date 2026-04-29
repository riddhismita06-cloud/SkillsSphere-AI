import { validateEvaluatorResult } from "./evaluatorContract.js";

const round = (value) => Math.round(value * 100) / 100;

const clampScore = (value) => Math.min(Math.max(value, 0), 100);

export const aggregateEvaluatorResults = (results = []) => {
  const evaluators = results.map(validateEvaluatorResult);

  const totalRawWeightedScore = evaluators.reduce((sum, item) => sum + item.weightedScore, 0);
  const totalWeight = evaluators.reduce((sum, item) => sum + item.weight, 0);
  
  const normalizedScore = totalWeight > 0 
    ? round(clampScore(totalRawWeightedScore / totalWeight)) 
    : 0;

  const breakdown = evaluators.reduce((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});

  return {
    score: normalizedScore,
    breakdown,
    evaluators,
  };
};

