import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../api";
import { useSession } from "../context/SessionContext";
import QuestionCard from "../components/QuestionCard";
import AnswerInput from "../components/AnswerInput";
import LoadingIndicator from "../components/LoadingIndicator";

const InterviewSession = ({ onComplete }) => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    sessionId,
    setAnswers,
    answers,
    setScores,
    setLevel,
    setDifficultyLevel,
    setLoading,
    loading
  } = useSession();

  const [answer, setAnswer] = useState("");
  const [answerFinal, setAnswerFinal] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [followUpCategory, setFollowUpCategory] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);

  const character = {
    name: "Nova",
    avatar: "🦊",
    tagline: "Your friendly coding explorer"
  };

  const currentQuestion = useMemo(() => {
    if (followUp) {
      return { id: `followup-${currentQuestionIndex}`, text: followUp, category: followUpCategory || "technical" };
    }
    return questions[currentQuestionIndex] || null;
  }, [followUp, followUpCategory, questions, currentQuestionIndex]);

  const selectNaturalVoice = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    // Prefer Google US English, native voices, or fallback to first available
    const preferred =
      voices.find(v => v.name.includes("Google US English")) ||
      voices.find(v => v.name.includes("Google") && v.lang.includes("en")) ||
      voices.find(v => v.lang === "en-US" && !v.name.includes("Microsoft")) ||
      voices.find(v => v.lang.startsWith("en")) ||
      voices[0];
    return preferred;
  };

  useEffect(() => {
    if (!currentQuestion?.text) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
    const voice = selectNaturalVoice();
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion?.text]);

  if (!currentQuestion) {
    return (
      <div className="card">
        <h2>Interview Complete</h2>
        <button onClick={onComplete}>View Results</button>
      </div>
    );
  }

  const handleSpeakQuestion = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
    const voice = selectNaturalVoice();
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceAnswer = () => {
    setSpeechError("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Speech recognition is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        listeningRef.current = true;
        setIsListening(true);
      };

      recognition.onend = () => {
        if (listeningRef.current) {
          try {
            recognition.start();
          } catch (err) {
            setIsListening(false);
            listeningRef.current = false;
          }
        } else {
          setIsListening(false);
        }
      };

      recognition.onerror = event => {
        setSpeechError(event.error || "Voice input failed.");
        if (event.error === "no-speech" || event.error === "audio-capture") {
          return;
        }
        listeningRef.current = false;
        setIsListening(false);
      };

      recognition.onresult = event => {
        let finalText = "";
        let interimText = "";

        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalText) {
          const nextFinal = `${answerFinal} ${finalText}`.trim();
          setAnswerFinal(nextFinal);
          setAnswer(nextFinal);
          setLiveTranscript("");
        } else {
          setLiveTranscript(interimText);
          const combined = `${answerFinal} ${interimText}`.trim();
          setAnswer(combined);
        }
      };

      recognitionRef.current = recognition;
    }

    listeningRef.current = true;
    try {
      recognitionRef.current.start();
    } catch (err) {
      // ignore repeated start errors
    }
  };

  const handleStopVoice = () => {
    listeningRef.current = false;
    setIsListening(false);
    setLiveTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    try {
      setLoading(true);
      const response = await api.post("/session/answer", {
        sessionId,
        question: currentQuestion.text,
        rubricCategory: currentQuestion.category || "technical",
        answer
      });

      const evaluation = response.data.evaluation;
      setAnswers([
        ...answers,
        {
          question: currentQuestion.text,
          studentAnswer: answer,
          accuracyPercent: evaluation.accuracyPercent,
          feedback: evaluation.feedback
        }
      ]);
      setScores(response.data.scores);
      setLevel(response.data.level);
      setDifficultyLevel(response.data.level);
      setAnswer("");
      setAnswerFinal("");
      setLiveTranscript("");

      if (followUp) {
        // We just answered a follow-up, move to next question
        setFollowUp("");
        setFollowUpCategory("");
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Move to next question
        setFollowUp("");
        setFollowUpCategory("");
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card session-card">
      <div className="session-progress">
        <span className="pill">Question {currentQuestionIndex + 1} / {questions.length}</span>
        <span className="pill">Level: {currentQuestion.category}</span>
      </div>
      <QuestionCard question={currentQuestion.text} category={currentQuestion.category} character={character} />
      <AnswerInput
        value={answer}
        onChange={value => {
          setAnswer(value);
          setAnswerFinal(value);
        }}
      />
      {isListening && liveTranscript && (
        <div className="transcript">Live: {liveTranscript}</div>
      )}
      <div className="row">
        <button className="ghost" onClick={handleSpeakQuestion}>
          Speak Question
        </button>
        <button className="ghost" onClick={handleVoiceAnswer}>
          {isListening ? "Listening..." : "Voice Answer"}
        </button>
        {isListening && (
          <button className="ghost" onClick={handleStopVoice}>
            Stop Listening
          </button>
        )}
      </div>
      {speechError && <p className="error">{speechError}</p>}
      {loading ? <LoadingIndicator /> : <button onClick={handleSubmit}>Submit Answer</button>}
    </div>
  );
};

export default InterviewSession;
