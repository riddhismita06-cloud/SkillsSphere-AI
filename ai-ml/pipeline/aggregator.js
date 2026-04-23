import { validateEvaluatorResult } from "./evaluatorContract.js";

const round = (value) => Math.round(value * 100) / 100;

const clampScore = (value) => Math.min(Math.max(value, 0), 100);

export const aggregateEvaluatorResults = (results = []) => {
  const evaluators = results.map(validateEvaluatorResult);

  const totalWeightedScore = round(
    clampScore(evaluators.reduce((sum, item) => sum + item.weightedScore, 0)),
  );

  const breakdown = evaluators.reduce((acc, item) => {
    acc[item.key] = item;
    return acc;
  }, {});

  return {
    score: totalWeightedScore,
    breakdown,
    evaluators,
  };
};

