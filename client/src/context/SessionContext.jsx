import React, { createContext, useContext, useMemo, useState } from "react";

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      return { name: parsed.name, email: parsed.email };
    }
    return { name: "", email: "" };
  });
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [phaseId, setPhaseId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState(null);
  const [level, setLevel] = useState("Beginner");
  const [difficultyLevel, setDifficultyLevel] = useState("Beginner");

  const [loading, setLoading] = useState(false);

  const setAuth = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    setStudent(nextUser ? { name: nextUser.name, email: nextUser.email } : { name: "", email: "" });
    if (nextToken) {
      localStorage.setItem("token", nextToken);
    } else {
      localStorage.removeItem("token");
    }
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = () => setAuth("", null);

  const value = useMemo(
    () => ({
      student,
      setStudent,
      user,
      token,
      setAuth,
      logout,
      phaseId,
      setPhaseId,
      sessionId,
      setSessionId,
      questions,
      setQuestions,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      answers,
      setAnswers,
      scores,
      setScores,
      level,
      setLevel,
      difficultyLevel,
      setDifficultyLevel,
      loading,
      setLoading
    }),
    [
      student,
      user,
      token,
      phaseId,
      sessionId,
      questions,
      currentQuestionIndex,
      answers,
      scores,
      level,
      difficultyLevel,
      loading
    ]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};
