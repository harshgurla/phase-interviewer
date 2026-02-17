import React, { useState } from "react";
import { SessionProvider, useSession } from "./context/SessionContext";
import Login from "./pages/Login";
import PhaseSelection from "./pages/PhaseSelection";
import InterviewSession from "./pages/InterviewSession";
import ResultDashboard from "./pages/ResultDashboard";
import AdminResults from "./pages/AdminResults";

const AppShell = () => {
  const [step, setStep] = useState("login");
  const { user, logout } = useSession();

  const isAuthed = Boolean(user);
  const isAdmin = user?.role === "admin";

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-content">
          <div>
            <span className="eyebrow">Phase Assistant</span>
            <h1>Level up your web skills with AI-powered practice</h1>
            <p>Friendly, rubric-based interviews across Phases 1–5 with instant feedback.</p>
          </div>
          <div className="hero-actions">
            {isAdmin && (
              <button className="ghost" onClick={() => setStep("admin")}>Admin Results</button>
            )}
            {isAuthed && (
              <button className="ghost" onClick={() => { logout(); setStep("login"); }}>
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="hero-card">
          <div>
            <h3>Today’s Mission</h3>
            <p>Answer 6 quick questions and earn your next badge.</p>
          </div>
          <div className="hero-badges">
            <span className="pill">⚡ Fast rounds</span>
            <span className="pill">🎯 Clear feedback</span>
            <span className="pill">🏆 Track progress</span>
          </div>
        </div>
      </header>

      {!isAuthed && step === "login" && <Login onNext={() => setStep("phase")} />}
      {isAuthed && step === "phase" && <PhaseSelection onNext={() => setStep("interview")} />}
      {isAuthed && step === "interview" && <InterviewSession onComplete={() => setStep("result")} />}
      {isAuthed && step === "result" && <ResultDashboard />}
      {isAdmin && step === "admin" && <AdminResults onBack={() => setStep("phase")} />}
    </div>
  );
};

const App = () => (
  <SessionProvider>
    <AppShell />
  </SessionProvider>
);

export default App;
