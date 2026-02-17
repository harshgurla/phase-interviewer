import React from "react";

const QuestionCard = ({ question, category, character }) => {
  return (
    <div className="question-card">
      <div className="character">
        <div className="avatar">{character?.avatar || "🤖"}</div>
        <div>
          <p className="character-name">{character?.name || "Buddy"}</p>
          <p className="muted small">{character?.tagline || "Your interview buddy"}</p>
        </div>
        <span className="badge">{category}</span>
      </div>
      <div className="question-bubble">
        <h3>{question}</h3>
      </div>
    </div>
  );
};

export default QuestionCard;
