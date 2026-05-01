export function classifyResume({ score, skillMatch, experienceMatch }) {
  let level = "";
  let label = "";
  let color = "";

  if (score < 40) {
    level = "Beginner";
    label = "Low Profile Strength";
    color = "red";
  } else if (score < 70) {
    level = "Intermediate";
    label = "Moderate Profile Strength";
    color = "yellow";
  } else if (score < 85) {
    level = "Advanced";
    label = "Strong Profile";
    color = "blue";
  } else {
    level = "Strong Match";
    label = "Highly Suitable Candidate";
    color = "green";
  }

  return {
    level,
    label,
    color,
  };
}
