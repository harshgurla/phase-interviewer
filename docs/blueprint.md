# MERN AI Evaluation Platform Blueprint

## 1) System Overview

An AI-driven technical interview platform for a 5-phase web curriculum. Each student completes phases individually. The system asks adaptive questions, evaluates responses using Gemini, scores via rubric weights, and generates structured feedback.

**Core principles**
- No direct code inspection
- Replace with explanation-based validation
- Focus on architecture, failure cases, and security reasoning

## 2) Frontend Architecture (React)

**Pages**
- Login / Student Entry
- Phase Selection
- Interview Session Screen
- Result Dashboard

**Components**
- QuestionCard
- AnswerInput
- LoadingIndicator
- ScoreBreakdown
- FeedbackPanel

**State**
- currentPhase
- currentQuestion
- difficultyLevel
- scoreBreakdown
- answerHistory
- loading

**Data Flow**
1. Student submits info → `POST /api/session/start`
2. Questions fetched → shown one-by-one
3. Answer submitted → `POST /api/session/answer`
4. Scores + follow-ups returned → UI adapts
5. Results view → `GET /api/session/result/:id`

## 3) Backend Architecture (MVC)

```
/server
  /controllers
  /routes
  /models
  /services
  /middleware
  /config
  server.js
```

**Controllers**
- sessionController: startSession, submitAnswer, getResult
- adminController: getResults

**Services**
- geminiService: Gemini API calls
- geminiPrompt: evaluation prompt template
- evaluationService: evaluation orchestration
- adaptiveEngine: follow-up selection and level mapping
- questionBank: phase-wise question sets

## 4) MongoDB Schema Design

**Student**
- name
- email
- phaseProgress
- createdAt

**Session**
- studentId
- phase
- answers[]
- scores
- level
- completed
- timestamps

**Answer**
- question
- studentAnswer
- aiScore
- rubricCategory
- feedback

## 5) API Endpoints

- POST `/api/session/start`
  - input: { name, email, phaseId }
  - output: { sessionId, phase, questions[] }

- POST `/api/session/answer`
  - input: { sessionId, question, rubricCategory, answer }
  - output: { evaluation, scores, level, followUpQuestion }

- GET `/api/session/result/:id`
  - output: session summary with answers and scores

- GET `/api/admin/results`
  - output: list of all sessions for admin review

## 6) Gemini Evaluation Prompt Template

```
You are a senior technical interviewer and evaluator.

Phase: <phase>
Rubric Category: <category>
Question: <question>
Student Answer: <answer>

Rules:
- Do NOT require code inspection or file review.
- Evaluate reasoning, architecture clarity, failure awareness, security thinking, and scalability mindset.
- Provide score 1-4 (Beginner, Intermediate, Advanced, Expert).
- Provide concise feedback and a follow-up question if the answer is shallow.

Return strict JSON:
{
  "score": 1|2|3|4,
  "level": "Beginner|Intermediate|Advanced|Expert",
  "feedback": "...",
  "followUpQuestion": "..."
}
```

## 7) Adaptive Questioning Algorithm

- If answer is shallow → ask probing follow-up
- If answer shows strong depth → escalate to architectural trade-offs
- If answer is weak → simplify and guide

**Example escalation**
- “What internal Promise mechanism does async/await abstract?”
- “What happens if you remove await?”
- “How would you cache repeated prompts?”

## 8) Scoring Logic

For each question:
- Score 1–4
- Map to rubric category

**Phase total**
- Understanding: 20%
- Technical Robustness: 60%
- Solution & UX: 20%

**Final level**
- <50 → Beginner
- <70 → Intermediate
- <85 → Advanced
- ≥85 → Expert

## 9) Feedback Generation Strategy

- Strengths: highlight strong categories
- Weaknesses: identify missing reasoning or failure awareness
- Improvement Plan: next steps for depth and clarity
- Professional Advice: production-level thinking
- Next-Level Skills: scaling, observability, security

## 10) Example Session Output

```
Phase: Phase 4 – Frontend AI
Score Breakdown:
- Understanding: 16/20
- Technical Robustness: 44/60
- UX & Explanation: 17/20
Final Level: Advanced
Strengths: Clear API lifecycle reasoning, good error handling.
Weaknesses: Limited rate-limit mitigation details.
Improvement Plan: Add retry/backoff and cache design discussion.
Professional Advice: Add observability and structured logs.
Next-Level Skills: rate limiting, prompt caching, token budgeting.
```

## 11) Deployment Strategy

**Frontend**
- Vercel / Netlify

**Backend**
- Render / Railway / AWS ECS

**Database**
- MongoDB Atlas

**Secrets**
- .env in backend only
- API keys never exposed to frontend

---

This blueprint is designed to scale phase-by-phase while maintaining professional interview standards.
