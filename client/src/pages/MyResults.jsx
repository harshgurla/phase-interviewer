import React, { useEffect, useState } from "react";
import api from "../api";

const MyResults = ({ onBack }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    api
      .get("/session/my-results")
      .then(response => {
        setSessions(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card">
        <p className="loading">Loading your results...</p>
      </div>
    );
  }

  if (selectedSession) {
    return (
      <div className="card result-card">
        <div className="row">
          <h2>Session Details</h2>
          <button className="ghost" onClick={() => setSelectedSession(null)}>← Back to List</button>
        </div>
        <div className="session-details">
          <div className="detail-scores">
            <h4>Scores</h4>
            <div className="score-grid">
              <div>
                <p className="muted small">Understanding</p>
                <p className="highlight">{selectedSession.scores?.understanding || 0}/20</p>
              </div>
              <div>
                <p className="muted small">Technical</p>
                <p className="highlight">{selectedSession.scores?.technical || 0}/60</p>
              </div>
              <div>
                <p className="muted small">Solution & UX</p>
                <p className="highlight">{selectedSession.scores?.solutionUx || 0}/20</p>
              </div>
              <div>
                <p className="muted small">Total</p>
                <p className="highlight">{selectedSession.scores?.total || 0}/100</p>
              </div>
              <div>
                <p className="muted small">Level</p>
                <p className="highlight">{selectedSession.level}</p>
              </div>
            </div>
          </div>
          <div className="detail-feedback">
            <h4>Your Answers & Feedback</h4>
            {selectedSession.answers?.map((answer, idx) => (
              <div key={idx} className="feedback-item" style={{ marginBottom: "1rem" }}>
                <p className="question-text"><strong>Q:</strong> {answer.question}</p>
                <div className="student-answer">
                  <strong>Your Answer:</strong> {answer.studentAnswer}
                </div>
                <p className="score-tag">Score: {answer.aiScore}/4 • Accuracy: {answer.accuracyPercent}%</p>
                {answer.feedback?.strengths?.length > 0 && (
                  <div className="feedback-box">
                    <p><strong>Strengths:</strong></p>
                    <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                      {answer.feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {answer.feedback?.improvements?.length > 0 && (
                  <div className="feedback-box">
                    <p><strong>Improvements:</strong></p>
                    <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
                      {answer.feedback.improvements.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                )}
                {answer.feedback?.betterAnswer && (
                  <div className="better-answer-section">
                    <p><strong>Model Answer:</strong></p>
                    <div className="better-answer-content">{answer.feedback.betterAnswer}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="row">
        <h2>My Previous Results</h2>
        <button className="ghost" onClick={onBack}>← Back</button>
      </div>
      {sessions.length === 0 ? (
        <p className="muted">No previous sessions found. Start your first challenge!</p>
      ) : (
        <div className="session-list">
          {sessions.map(session => (
            <div key={session._id} className="session-row">
              <div>
                <p className="session-title">{session.phase}</p>
                <div className="session-meta">
                  <span className="badge">{session.level}</span>
                  <span className="pill">Score: {session.scores?.total || 0}/100</span>
                  <span className="muted small">{new Date(session.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button onClick={() => setSelectedSession(session)}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResults;
