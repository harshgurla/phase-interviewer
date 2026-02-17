import React from "react";

const AnswerInput = ({ value, onChange }) => {
  return (
    <textarea
      className="answer"
      value={value}
      onChange={event => onChange(event.target.value)}
      placeholder="Explain your reasoning clearly..."
    />
  );
};

export default AnswerInput;
