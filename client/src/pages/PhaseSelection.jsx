import React, { useState } from "react";
import api from "../api";
import { useSession } from "../context/SessionContext";

const PHASES = [
  { id: "phase-1", label: "Phase 1 - HTML" },
  { id: "phase-2", label: "Phase 2 - CSS" },
  { id: "phase-3", label: "Phase 3 - JavaScript" },
  { id: "phase-4", label: "Phase 4 - Frontend AI" },
  { id: "phase-5", label: "Phase 5 - Full Stack" }
];

const PhaseSelection = ({ onNext }) => {
  const {
    setPhaseId,
    setQuestions,
    setSessionId,
    setCurrentQuestionIndex
  } = useSession();
  const [selected, setSelected] = useState(PHASES[0].id);
  const [error, setError] = useState("");
  const [phaseProgress, setPhaseProgress] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch phase progress when component mounts
  React.useEffect(() => {
    api.get("/session/my-results")
      .then(response => {
        const progress = {};
        response.data.forEach(session => {
          if (!progress[session.phase]) {
            progress[session.phase] = 0;
          }
          progress[session.phase]++;
        });
        setPhaseProgress(progress);
      })
      .catch(() => {});
  }, []);

  const handleStart = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/session/start", {
        phaseId: selected
      });
      setPhaseId(selected);
      setSessionId(response.data.sessionId);
      setQuestions(response.data.questions || []);
      setCurrentQuestionIndex(0);
      setLoading(false);
      onNext();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to start session");
      setLoading(false);
    }
  };

  const currentPhaseCount = phaseProgress[selected] || 0;

  return (
    <div className="card">
      <h2>Choose your next mission</h2>
      <p className="muted">Pick a phase and jump into a 6-question challenge.</p>
      <select value={selected} onChange={event => setSelected(event.target.value)}>
        {PHASES.map(phase => (
          <option key={phase.id} value={phase.id}>
            {phase.label}
          </option>
        ))}
      </select>
      {currentPhaseCount > 0 && (
        <p className="muted" style={{ marginTop: "0.5rem" }}>
          📊 You've completed this phase <strong>{currentPhaseCount}</strong> time{currentPhaseCount > 1 ? 's' : ''}
        </p>
      )}
      {error && <p className="error">{error}</p>}
      <button onClick={handleStart} disabled={loading}>
        {loading ? "Starting..." : "Start Challenge"}
      </button>
    </div>
  );
};

export default PhaseSelection;
