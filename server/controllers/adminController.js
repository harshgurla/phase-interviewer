const Session = require("../models/Session");

exports.getResults = async (req, res) => {
  const sessions = await Session.find()
    .populate("studentId", "name email")
    .sort({ createdAt: -1 });

  const grouped = new Map();
  sessions.forEach(session => {
    if (!session.studentId) return;
    const key = String(session.studentId._id);
    if (!grouped.has(key)) {
      grouped.set(key, { student: session.studentId, sessions: [] });
    }
    grouped.get(key).sessions.push(session);
  });

  const results = Array.from(grouped.values());
  res.json({ results });
};
