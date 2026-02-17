const Student = require("../models/Student");
const Session = require("../models/Session");
const { phases } = require("../services/questionBank");
const { evaluateAnswer } = require("../services/evaluationService");
const { computeLevel } = require("../services/adaptiveEngine");

const QUESTIONS_PER_CATEGORY = 2;
const QUESTIONS_PER_SESSION = 6;
const TOTAL_SETS = 5;

function getInitialQuestions(phaseId, setIndex = 0) {
  const phase = phases[phaseId];
  const questions = [];
  let questionId = 0;
  
  Object.entries(phase.categories).forEach(([category, items]) => {
    const startIdx = setIndex * QUESTIONS_PER_CATEGORY;
    const endIdx = startIdx + QUESTIONS_PER_CATEGORY;
    const selectedQuestions = items.slice(startIdx, endIdx);
    
    selectedQuestions.forEach(text => {
      questions.push({ id: `q-${questionId}`, category, text });
      questionId += 1;
    });
  });
  
  return questions;
}

function computeScores(answers, rubric) {
  const totals = {
    understanding: 0,
    technical: 0,
    solutionUx: 0
  };

  answers.forEach(answer => {
    totals[answer.rubricCategory] += answer.aiScore;
  });

  const maxPerCategory = QUESTIONS_PER_CATEGORY * 4;
  const understanding = Math.round((totals.understanding / maxPerCategory) * rubric.understanding * 100);
  const technical = Math.round((totals.technical / maxPerCategory) * rubric.technical * 100);
  const solutionUx = Math.round((totals.solutionUx / maxPerCategory) * rubric.solutionUx * 100);

  return {
    understanding,
    technical,
    solutionUx,
    total: understanding + technical + solutionUx
  };
}

exports.startSession = async (req, res) => {
  const { phaseId } = req.body;
  if (!phaseId) {
    return res.status(400).json({ error: "phaseId is required" });
  }

  const phase = phases[phaseId];
  if (!phase) return res.status(400).json({ error: "Invalid phase" });

  const student = await Student.findById(req.user.id);
  if (!student) {
    return res.status(401).json({ error: "User not found" });
  }

  const progress = student.phaseProgress.get(phaseId) || { completedSessions: 0, lastQuestionSet: -1 };
  const nextSetIndex = (progress.lastQuestionSet + 1) % TOTAL_SETS;
  
  const session = await Session.create({
    studentId: student._id,
    phase: phaseId,
    questionSetIndex: nextSetIndex,
    answers: []
  });

  const questions = getInitialQuestions(phaseId, nextSetIndex);
  
  progress.lastQuestionSet = nextSetIndex;
  progress.completedSessions = (progress.completedSessions || 0) + 1;
  student.phaseProgress.set(phaseId, progress);
  await student.save();

  res.json({
    sessionId: session._id,
    phase: phase.title,
    questions,
    sessionNumber: progress.completedSessions,
    setIndex: nextSetIndex
  });
};

exports.submitAnswer = async (req, res) => {
  const { sessionId, question, rubricCategory, answer } = req.body;
  if (!sessionId || !question || !rubricCategory || !answer) {
    return res.status(400).json({ error: "sessionId, question, rubricCategory, answer are required" });
  }

  const session = await Session.findById(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (req.user.role !== "admin" && String(session.studentId) !== req.user.id) {
    return res.status(403).json({ error: "Access denied" });
  }

  const phase = phases[session.phase];
  const evaluation = await evaluateAnswer({
    phaseTitle: phase.title,
    question,
    rubricCategory,
    answer
  });

  session.answers.push({
    question,
    studentAnswer: answer,
    aiScore: evaluation.score,
    accuracyPercent: evaluation.accuracyPercent,
    rubricCategory,
    feedback: evaluation.feedback
  });

  const scores = computeScores(session.answers, phase.rubric);
  session.scores = scores;
  session.level = computeLevel(scores.total);

  if (session.answers.length >= QUESTIONS_PER_SESSION) {
    session.completed = true;
  }

  const followUpQuestion = null;

  await session.save();

  res.json({
    evaluation,
    scores,
    level: session.level,
    followUpQuestion,
    followUpCategory: rubricCategory
  });
};

exports.getResult = async (req, res) => {
  const session = await Session.findById(req.params.id).populate("studentId", "name email");
  if (!session) return res.status(404).json({ error: "Session not found" });
  if (req.user.role !== "admin" && String(session.studentId._id) !== req.user.id) {
    return res.status(403).json({ error: "Access denied" });
  }

  res.json({
    sessionId: session._id,
    student: session.studentId,
    phase: session.phase,
    scores: session.scores,
    level: session.level,
    answers: session.answers,
    completed: session.completed
  });
};
