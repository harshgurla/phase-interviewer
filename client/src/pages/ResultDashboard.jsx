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
