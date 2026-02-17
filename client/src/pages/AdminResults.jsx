import React, { useEffect, useState } from "react";
import api from "../api";

const AdminResults = ({ onBack }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [expandedSession, setExpandedSession] = useState(null);

  const normalizeFeedback = feedback => {
    if (!feedback) return null;
    if (typeof feedback === "string") {
      return {
        strengths: [],
        improvements: [feedback],
        communicationTips: [],
        conceptGaps: [],
        betterAnswer: ""
      };
    }
    return {
      strengths: feedback.strengths || [],
      improvements: feedback.improvements || [],
      conceptGaps: feedback.conceptGaps || [],
      betterAnswer: feedback.betterAnswer || ""
    };
  };

  useEffect(() => {
    api
      .get("/admin/results")
      .then(response => setResults(response.data.results || []))
      .catch(err => setError(err.response?.data?.error || "Unable to load results"));
  }, []);

  return (
    <div className="card admin-card">
      <div className="row">
        <div>
          <h2>Admin Results</h2>
          <p className="muted">See every student's interview history and feedback.</p>
        </div>
        <button className="ghost" onClick={onBack}>Back</button>
      </div>

      {error && <p className="error">{error}</p>}

      {!results.length && !error && (
        <div className="summary-card">
          <p className="muted">No interview sessions yet.</p>
        </div>
      )}

      <div className="admin-grid">
        {results.map(result => (
          <div key={result.student?._id} className="admin-student">
            <div className="student-header">
              <div>
                <h3>{result.student?.name}</h3>
                <p className="muted small">{result.student?.email}</p>
              </div>
              <span className="pill">{result.sessions.length} interviews</span>
            </div>

            <div className="session-list">
              {result.sessions.map(session => (
                <div key={session._id}>
                  <div
                    className="session-row clickable"
                    onClick={() => setExpandedSession(expandedSession === session._id ? null : session._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div>
                      <p className="session-title">{session.phase}</p>
                      <p className="muted small">{new Date(session.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="session-meta">
                      <span className="pill">{session.level}</span>
                      <span className="pill">Score: {session.scores?.total ?? 0}</span>
                      <span className="pill">{expandedSession === session._id ? "Hide" : "View"} Details</span>
                    </div>
                  </div>

                  {expandedSession === session._id && (
                    <div className="session-details">
                      <div className="detail-scores">
                        <h4>Scores</h4>
                        <div className="score-grid">
                          <div>
                            <p className="muted small">Understanding</p>
                            <p>{session.scores?.understanding}/20</p>
                          </div>
                          <div>
                            <p className="muted small">Technical</p>
                            <p>{session.scores?.technical}/60</p>
                          </div>
                          <div>
                            <p className="muted small">Solution & UX</p>
                            <p>{session.scores?.solutionUx}/20</p>
                          </div>
                          <div>
                            <p className="muted small">Total</p>
                            <p className="highlight">{session.scores?.total ?? 0}</p>
                          </div>
                        </div>
                      </div>

                      <div className="detail-feedback">
                        <h4>Answers & Feedback</h4>
                        <div className="feedback-list">
                          {session.answers?.map((answer, idx) => (
                            <div key={idx} className="feedback-item">
                              <p className="question-text"><strong>Q{idx + 1}:</strong> {answer.question}</p>
                              <p className="student-answer"><strong>Student:</strong> {answer.studentAnswer}</p>
                              <div className="feedback-box">
                                <p className="score-tag">Score: {answer.aiScore}/4</p>
                                {Number.isFinite(answer.accuracyPercent) && (
                                  <p className="score-tag">Accuracy: {answer.accuracyPercent}%</p>
                                )}
                                {(() => {
                                  const fb = normalizeFeedback(answer.feedback);
                                  if (!fb) return null;
                                  return (
                                    <div>
                                      {!!fb.strengths.length && (
                                        <div>
                                          <p><strong>Strengths:</strong></p>
                                          <ul>
                                            {fb.strengths.map((item, itemIdx) => (
                                              <li key={itemIdx}>{item}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {!!fb.improvements.length && (
                                        <div>
                                          <p><strong>Improvements:</strong></p>
                                          <ul>
                                            {fb.improvements.map((item, itemIdx) => (
                                              <li key={itemIdx}>{item}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {!!fb.conceptGaps.length && (
                                        <div>
                                          <p><strong>Concept Gaps:</strong></p>
                                          <ul>
                                            {fb.conceptGaps.map((item, itemIdx) => (
                                              <li key={itemIdx}>{item}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {fb.betterAnswer && (
                                        <p><strong>How They Could Answer:</strong> {fb.betterAnswer}</p>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminResults;
