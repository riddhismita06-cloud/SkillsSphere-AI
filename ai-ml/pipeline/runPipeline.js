import { aggregateEvaluatorResults } from "./aggregator.js";
import { validateEvaluatorResult } from "./evaluatorContract.js";

const formatValidationIssues = (error) => {
  if (!Array.isArray(error?.issues) || error.issues.length === 0) {
    return error.message;
  }

  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "result";
      return `${field}: ${issue.message}`;
    })
    .join("; ");
};

export const runPipeline = async ({ evaluators = [], context = {} } = {}) => {
  const results = [];

  for (const evaluator of evaluators) {
    if (!evaluator || typeof evaluator.evaluate !== "function") {
      throw new Error("Invalid evaluator supplied to pipeline");
    }

    const result = await evaluator.evaluate(context);
    let validated;
    try {
      validated = validateEvaluatorResult(result);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`Invalid evaluator output from "${evaluator.key || "unknown"}":`, result);
      }

      throw new Error(
        `Evaluator "${evaluator.key || "unknown"}" returned invalid output: ${formatValidationIssues(error)}`,
      );
    }

    results.push(validated);
  }

  return aggregateEvaluatorResults(results);
};

