const DIFFICULTY = ["Beginner", "Intermediate", "Advanced", "Expert"];

function computeLevel(totalScore) {
  if (totalScore < 50) return DIFFICULTY[0];
  if (totalScore < 70) return DIFFICULTY[1];
  if (totalScore < 85) return DIFFICULTY[2];
  return DIFFICULTY[3];
}

module.exports = { computeLevel };
