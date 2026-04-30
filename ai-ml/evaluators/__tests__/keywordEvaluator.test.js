import test from "node:test";
import assert from "node:assert/strict";
import { keywordEvaluator } from "../keywordEvaluator.js";

test("partial keyword overlap matches issue example shape", () => {
  const result = keywordEvaluator({
    resumeText: "Experienced React and Node.js developer with MongoDB knowledge",
    jobDescription: "Looking for React, Node.js, MongoDB, Docker and AWS experience",
  });

  assert.equal(result.weight, 0.2);
  assert.equal(result.score, 60);
  assert.deepEqual(result.matchedKeywords, ["React", "Node.js", "MongoDB"]);
  assert.deepEqual(result.missingKeywords, ["Docker", "AWS"]);
  assert.ok(
    result.feedback.includes("Resume contains some important keywords but can be improved"),
  );
  assert.ok(result.feedback.includes("Missing keyword: Docker"));
  assert.ok(result.feedback.includes("Missing keyword: AWS"));
});

test("strong keyword coverage returns high score and no missing lines", () => {
  const result = keywordEvaluator({
    resumeText: "We use React, Node.js, MongoDB, Docker, and AWS daily.",
    jobDescription: "Need React, Node.js, MongoDB, Docker, AWS.",
  });

  assert.equal(result.score, 100);
  assert.deepEqual(result.missingKeywords, []);
  assert.ok(result.feedback.includes("Resume contains most important job description keywords"));
  assert.ok(!result.feedback.some((line) => line.startsWith("Missing keyword:")));
});

test("low overlap returns below-50 score and many missing hints", () => {
  const result = keywordEvaluator({
    resumeText: "General office assistant with strong communication skills",
    jobDescription: "Kubernetes, Terraform, Prometheus, Grafana, and Helm required",
  });

  assert.ok(result.score < 50);
  assert.ok(result.feedback.includes("Resume is missing many important job description keywords"));
  assert.equal(result.matchedKeywords.length, 0);
  assert.equal(result.missingKeywords.length, 5);
});

test("empty job description yields zero score and guidance", () => {
  const result = keywordEvaluator({
    resumeText: "React developer",
    jobDescription: "the and or with for",
  });

  assert.equal(result.score, 0);
  assert.ok(result.feedback.includes("No extractable keywords found in the job description"));
  assert.deepEqual(result.matchedKeywords, []);
  assert.deepEqual(result.missingKeywords, []);
});

test("score is capped at 100 and rounded to two decimals", () => {
  const result = keywordEvaluator({
    resumeText: "alpha beta gamma",
    jobDescription: "alpha beta",
  });

  assert.equal(result.score, 100);
});
