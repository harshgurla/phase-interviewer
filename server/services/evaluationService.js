const { buildEvaluationPrompt } = require("./geminiPrompt");
const { callGemini } = require("./geminiService");

async function evaluateAnswer({ phaseTitle, question, rubricCategory, answer }) {
  const prompt = buildEvaluationPrompt({ phaseTitle, question, rubricCategory, answer });
  const result = await callGemini(prompt);

  // Allow score to be 0, don't default to 2
  const score = Number.isFinite(result.score) ? result.score : 0;
  const accuracyPercent = Number.isFinite(result.accuracyPercent)
    ? Math.max(0, Math.min(100, result.accuracyPercent))
    : Math.round((score / 4) * 100);

  const feedback = typeof result.feedback === "string"
    ? {
        strengths: [],
        improvements: [result.feedback],
        conceptGaps: [],
        betterAnswer: "Restate your answer with a clear definition, steps, and a short example."
      }
    : result.feedback;

  return {
    score,
    level: result.level || "Intermediate",
    accuracyPercent,
    feedback,
    followUpQuestion: result.followUpQuestion || "What trade-offs did you accept?"
  };
}

module.exports = { evaluateAnswer };
