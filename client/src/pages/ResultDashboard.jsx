import React, { useEffect, useState } from "react";
import api from "../api";
import { useSession } from "../context/SessionContext";
import ScoreBreakdown from "../components/ScoreBreakdown";
import FeedbackPanel from "../components/FeedbackPanel";

const ResultDashboard = ({ onBack }) => {
  const { sessionId } = useSession();
  const [fullResult, setFullResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    api
      .get(`/session/result/${sessionId}`)
      .then(response => {
        setFullResult(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) {
    return (
      <div className="card">
        <p className="loading">Loading results...</p>
      </div>
    );
  }

  if (!fullResult) {
    return (
      <div className="card">
        <p className="error">Unable to load results.</p>
      </div>
    );
  }

  return (
    <div className="card result-card">
      <div className="row">
        <div>
          <h2>Results & Feedback</h2>
          <p className="muted">Great effort! Here's your progress snapshot.</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          {fullResult?.phase && <span className="pill">{fullResult.phase}</span>}
          {onBack && <button className="ghost" onClick={onBack}>← Back</button>}
        </div>
      </div>
      
      {/* Overall Performance */}
      <div className="overall-performance">
        <div className="performance-circle">
          <svg viewBox="0 0 100 100" className="circular-progress">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" className="progress-bg" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="progress-bar"
              style={{
                strokeDasharray: `${(fullResult.scores?.total || 0) * 2.83} 283`,
                strokeDashoffset: 0
              }}
            />
          </svg>
          <div className="performance-text">
            <span className="performance-score">{fullResult.scores?.total || 0}</span>
            <span className="performance-label">/ 100</span>
          </div>
        </div>
        <div className="performance-info">
          <h3>Overall Performance</h3>
          <p className="muted">Level: <strong className="level-badge">{fullResult.level}</strong></p>
        </div>
      </div>
      <ScoreBreakdown scores={fullResult.scores} level={fullResult.level} />
      <FeedbackPanel answers={fullResult.answers || []} />
      <div className="summary-card">
        <h3>Session Summary</h3>
        <div className="summary-grid">
          <div>
            <p className="muted small">Student</p>
            <p>{fullResult.student?.name}</p>
          </div>
          <div>
            <p className="muted small">Email</p>
            <p>{fullResult.student?.email}</p>
          </div>
          <div>
            <p className="muted small">Level</p>
            <p>{fullResult.level}</p>
          </div>
          <div>
            <p className="muted small">Total Score</p>
            <p>{fullResult.scores?.total ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;
