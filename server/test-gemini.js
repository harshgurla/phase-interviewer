require('dotenv').config();
const axios = require('axios');

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function testGemini() {
  console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
  console.log('API Key length:', process.env.GEMINI_API_KEY?.length || 0);
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('No API key found!');
    return;
  }

  const prompt = `You are a mentor. Evaluate this answer and return ONLY valid JSON:

Question: What is HTML?
Student Answer: HTML is a markup language

Return JSON like this:
{
  "score": 2,
  "level": "Intermediate",
  "accuracyPercent": 50,
  "feedback": {
    "strengths": ["You know HTML is a markup language"],
    "improvements": ["Add more detail"],
    "conceptGaps": ["Purpose of HTML"],
    "betterAnswer": "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It defines the structure and content of websites using elements like headings, paragraphs, and links."
  },
  "followUpQuestion": "What are HTML tags?"
}`;

  try {
    console.log('\n🔄 Calling Gemini API...');
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    console.log('\n📦 Raw response:');
    console.log(raw);
    
    const parsed = JSON.parse(raw);
    console.log('\n✅ Parsed successfully:');
    console.log(JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
  }
}

testGemini();
