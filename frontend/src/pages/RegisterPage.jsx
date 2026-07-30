import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import { registerUser } from "../services/authApi.js";
import { useAuth } from "../hooks/useAuth.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useAuth((state) => state.setSession);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
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
      const data = await registerUser(form);
      setSession({ token: data.token, user: data.user });
      navigate("/");
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Could not create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div style={{ display: "grid", gap: "1.25rem" }}>
        <div>
          <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-primary)", fontWeight: 700 }}>
            Register
          </p>
          <h2 style={{ margin: "0.35rem 0 0" }}>Create your FitStream account</h2>
          <p style={{ color: "#4b5563" }}>Set up your fitness + music space in one flow.</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label style={{ display: "grid", gap: "0.45rem" }}>
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: "0.45rem" }}>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
          </label>
          <label style={{ display: "grid", gap: "0.45rem" }}>
            <span>Password</span>
            <input name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required style={inputStyle} />
          </label>
          {error ? <p style={errorStyle}>{error}</p> : null}
          <button type="submit" disabled={isSubmitting} style={primaryButtonStyle}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p style={{ margin: 0, color: "#4b5563" }}>
          Already signed up?{" "}
          <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: 700 }}>
            Log in
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
