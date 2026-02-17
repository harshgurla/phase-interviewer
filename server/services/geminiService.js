const axios = require("axios");

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function extractPromptDetails(prompt = "") {
  const questionMatch = prompt.match(/Question:\s*([\s\S]*?)\nStudent Answer:/i);
  const answerMatch = prompt.match(/Student Answer:\s*([\s\S]*?)\n\nEvaluation Guidelines:/i);

  const question = questionMatch?.[1]?.trim() || "";
  const answer = answerMatch?.[1]?.trim() || "";

  return {
    question,
    answer: answer || ""
  };
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "for", "on", "with", "is", "are",
  "was", "were", "be", "being", "been", "by", "as", "at", "from", "that", "this",
  "it", "its", "how", "what", "why", "when", "where", "which", "who", "whom", "do",
  "does", "did", "can", "could", "should", "would", "explain", "give", "example",
  "difference", "between", "purpose", "use", "used", "using"
]);

function extractKeywords(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 3 && !STOP_WORDS.has(word));
}

function analyzeAnswer(question, answer) {
  const normalizedAnswer = (answer || "").trim();
  const wordCount = normalizedAnswer ? normalizedAnswer.split(/\s+/).length : 0;
  const keywords = extractKeywords(question);
  const uniqueKeywords = Array.from(new Set(keywords)).slice(0, 6);
  const answerLower = normalizedAnswer.toLowerCase();
  const keywordHits = uniqueKeywords.filter(word => answerLower.includes(word));

  let accuracyPercent = 0;
  if (wordCount === 0) {
    accuracyPercent = 0;
  } else {
    accuracyPercent = 20 + Math.min(60, keywordHits.length * 10) + Math.min(20, Math.floor(wordCount / 25) * 5);
    accuracyPercent = Math.min(90, accuracyPercent);
  }

  const score = accuracyPercent >= 80 ? 4 : accuracyPercent >= 60 ? 3 : accuracyPercent >= 35 ? 2 : 1;

  const strengths = [];
  if (wordCount > 0) {
    strengths.push("You tried to answer the question, which is a good first step.");
  }
  if (keywordHits.length > 0) {
    strengths.push(`You included important words like ${keywordHits.slice(0, 3).join(", ")}, which shows partial understanding.`);
  }
  if (wordCount >= 25) {
    strengths.push("Your answer has some detail, which helps the reader follow your thinking.");
  }

  const improvements = [];
  if (wordCount < 15) {
    improvements.push("Your answer is too short. Add a clear definition and one small example.");
  }
  if (keywordHits.length === 0 && uniqueKeywords.length) {
    improvements.push("You did not mention the main terms from the question. Use those terms to show you understand the topic.");
  }
  if (wordCount >= 15 && keywordHits.length > 0) {
    improvements.push("Explain the idea step by step so it is easy for a beginner to follow.");
  }
  if (!improvements.length) {
    improvements.push("Make your answer clearer by using this order: definition → explanation → example.");
  }

  const conceptGaps = [];
  const missingKeywords = uniqueKeywords.filter(word => !keywordHits.includes(word));
  if (missingKeywords.length) {
    conceptGaps.push(`Include key ideas such as ${missingKeywords.slice(0, 3).join(", ")}.`);
  } else if (uniqueKeywords.length) {
    conceptGaps.push("Explain why these concepts matter in real usage.");
  }

  // For fallback without AI, provide a generic guidance
  const betterAnswer = "Please provide a clear definition, explain the concept step-by-step, and include a concrete example. Make sure to cover all key terms from the question.";

  return {
    accuracyPercent: Math.round(accuracyPercent),
    score,
    strengths,
    improvements,
    conceptGaps,
    betterAnswer
  };
}

function buildFallbackFeedback(prompt, reasonLabel) {
  const { question, answer } = extractPromptDetails(prompt);
  const analysis = analyzeAnswer(question, answer);
  return {
    score: analysis.score,
    level: analysis.score >= 3 ? "Advanced" : analysis.score === 2 ? "Intermediate" : "Beginner",
    accuracyPercent: analysis.accuracyPercent,
    feedback: {
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      conceptGaps: analysis.conceptGaps,
      betterAnswer: analysis.betterAnswer
    },
    followUpQuestion: "What would fail first in production, how would you detect it, and what fallback would you use?",
    reason: reasonLabel
  };
}

async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Gemini API key is missing");
    return buildFallbackFeedback(prompt, "missing_api_key");
  }

  try {
    console.log("🔄 Calling Gemini API...");
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log("📦 Raw Gemini response:", raw.substring(0, 200) + "...");
    
    // Remove markdown code blocks if present
    let cleanJson = raw.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/```\n?/g, '');
    }
    
    try {
      const parsed = JSON.parse(cleanJson.trim());
      console.log("✅ Gemini response parsed successfully");
      return parsed;
    } catch (error) {
      console.error("❌ Failed to parse Gemini JSON:", error.message);
      console.error("Raw response:", raw);
      return buildFallbackFeedback(prompt, "invalid_json");
    }
  } catch (error) {
    console.error("❌ Gemini API request failed:", error.response?.data || error.message);
    return buildFallbackFeedback(prompt, "request_failed");
  }
}

module.exports = { callGemini };
