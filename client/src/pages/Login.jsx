import React, { useState } from "react";
import api from "../api";
import { useSession } from "../context/SessionContext";

const Login = ({ onNext }) => {
  const { setAuth } = useSession();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      const payload = mode === "register" ? { name, email, password } : { email, password };
      const response = await api.post(endpoint, payload);
      setAuth(response.data.token, response.data.user);
      onNext();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card">
      <div className="auth-header">
        <h2>{mode === "register" ? "Create your student account" : "Welcome back"}</h2>
        <p className="muted">Track your progress, earn badges, and get smarter feedback.</p>
      </div>
      <div className="auth-tabs">
        <button
          type="button"
          className={mode === "login" ? "tab active" : "tab"}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={mode === "register" ? "tab active" : "tab"}
          onClick={() => setMode("register")}
        >
          Sign Up
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        {mode === "register" && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "register" ? "Create Account" : "Login"}
        </button>
      </form>
      <p className="muted small">Admin? Use your admin account to access results.</p>
    </div>
  );
};

export default Login;
