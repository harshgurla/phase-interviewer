const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    phaseProgress: {
      type: Map,
      of: {
        completedSessions: { type: Number, default: 0 },
        lastQuestionSet: { type: Number, default: -1 }
      },
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
