import React from "react";

const ScoreBreakdown = ({ scores, level }) => {
  if (!scores) return null;

  return (
    <div className="card">
      <div className="row">
        <h3>Score Breakdown</h3>
        <span className="pill">Level: {level}</span>
      </div>
      <div className="summary-grid">
        <div>
          <p className="muted small">Understanding</p>
          <p>{scores.understanding}/20</p>
        </div>
        <div>
          <p className="muted small">Technical</p>
          <p>{scores.technical}/60</p>
        </div>
        <div>
          <p className="muted small">Solution & UX</p>
          <p>{scores.solutionUx}/20</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;
