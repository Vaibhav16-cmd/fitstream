import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import { loginUser } from "../services/authApi.js";
import { useAuth } from "../hooks/useAuth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuth((state) => state.setSession);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");
      const data = await loginUser(form);
      setSession({ token: data.token, user: data.user });
      navigate("/");
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Could not log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div style={{ display: "grid", gap: "1.25rem" }}>
        <div>
          <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-primary)", fontWeight: 700 }}>
            Login
          </p>
          <h2 style={{ margin: "0.35rem 0 0" }}>Welcome back</h2>
          <p style={{ color: "#4b5563" }}>Sign in to track workouts, save activity, and control your player.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label style={{ display: "grid", gap: "0.45rem" }}>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: "0.45rem" }}>
            <span>Password</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} required style={inputStyle} />
          </label>
          {error ? <p style={errorStyle}>{error}</p> : null}
          <button type="submit" disabled={isSubmitting} style={primaryButtonStyle}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p style={{ margin: 0, color: "#4b5563" }}>
          No account yet?{" "}
          <Link to="/register" style={{ color: "var(--color-primary)", fontWeight: 700 }}>
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

const inputStyle = {
  border: "1px solid rgba(15, 118, 110, 0.18)",
  borderRadius: "16px",
  padding: "0.95rem 1rem",
  font: "inherit",
  background: "#fffdfa"
};

const primaryButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "0.95rem 1rem",
  background: "var(--color-primary)",
  color: "white",
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer"
};

const errorStyle = {
  margin: 0,
  background: "#fff1f0",
  color: "#9f1239",
  padding: "0.85rem 1rem",
  borderRadius: "16px"
};
