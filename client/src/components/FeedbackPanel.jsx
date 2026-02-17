import React from "react";

const FeedbackPanel = ({ answers }) => {
  if (!answers.length) return null;

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

  return (
    <div className="card">
      <h3>Feedback</h3>
      <ul className="feedback-list">
        {answers.map((answer, index) => (
          <li key={index} className="feedback-item">
            <strong>{answer.question}</strong>
            {answer.studentAnswer && (
              <p className="muted"><strong>Your Answer:</strong> {answer.studentAnswer}</p>
            )}
            {Number.isFinite(answer.accuracyPercent) && (
              <p className="muted"><strong>Accuracy:</strong> {answer.accuracyPercent}%</p>
            )}
            {(() => {
              const fb = normalizeFeedback(answer.feedback);
              if (!fb) return null;
              return (
                <div className="feedback-structured">
                  {!!fb.strengths.length && (
                    <div>
                      <p className="muted"><strong>Strengths:</strong></p>
                      <ul>
                        {fb.strengths.map((item, idx) => (
                          <li key={idx} className="muted">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!!fb.improvements.length && (
                    <div>
                      <p className="muted"><strong>Improvements:</strong></p>
                      <ul>
                        {fb.improvements.map((item, idx) => (
                          <li key={idx} className="muted">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!!fb.conceptGaps.length && (
                    <div>
                      <p className="muted"><strong>Concept Gaps:</strong></p>
                      <ul>
                        {fb.conceptGaps.map((item, idx) => (
                          <li key={idx} className="muted">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {fb.betterAnswer && (
                    <div className="better-answer-section">
                      <p className="muted"><strong>How You Could Answer:</strong></p>
                      <div className="better-answer-content">
                        {fb.betterAnswer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPanel;
