const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    studentAnswer: { type: String, required: true },
    aiScore: { type: Number, required: true },
    accuracyPercent: { type: Number, default: 0 },
    rubricCategory: { type: String, required: true },
    feedback: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const sessionSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    phase: { type: String, required: true },
    questionSetIndex: { type: Number, default: 0 },
    answers: [answerSchema],
    scores: {
      understanding: { type: Number, default: 0 },
      technical: { type: Number, default: 0 },
      solutionUx: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    level: { type: String, default: "Beginner" },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
