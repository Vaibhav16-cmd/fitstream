import { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useActivity } from "../hooks/useActivity.js";
import { createActivityLog } from "../services/activityApi.js";

export default function ActivityPage() {
  const token = useAuth((state) => state.token);
  const { logs, isLoading, error, refresh, setLogs } = useActivity(token);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    steps: 0,
    waterMl: 0,
    sleepHours: 0,
    caloriesConsumed: 0
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const savedLog = await createActivityLog({ token, payload: form });
      setLogs((current) => [savedLog, ...current.filter((log) => log._id !== savedLog._id)]);
      setSubmitMessage("Activity log saved.");
      refresh();
    } catch (submitError) {
      setSubmitMessage(submitError.response?.data?.message || "Could not save activity log.");
    }
  };

  return (
    <MainLayout>
      <section style={pageStyle}>
        <section style={heroStyle}>
          <p style={eyebrowStyle}>Activity</p>
          <h2 style={headingStyle}>Track the day beyond workouts.</h2>
          <p style={subTextStyle}>
            Log water, sleep, steps, and calories so your progress has context.
          </p>
        </section>

        {!token ? (
          <section style={panelStyle}>
            <p style={{ margin: 0 }}>Log in to save and review your activity history.</p>
          </section>
        ) : (
          <div style={gridStyle}>
            <section style={panelStyle}>
              <h3 style={{ marginTop: 0 }}>Add daily log</h3>
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.85rem" }}>
                {[
                  ["date", "Date", "date"],
                  ["steps", "Steps", "number"],
                  ["waterMl", "Water (ml)", "number"],
                  ["sleepHours", "Sleep (hours)", "number"],
                  ["caloriesConsumed", "Calories eaten", "number"]
                ].map(([name, label, type]) => (
                  <label key={name} style={{ display: "grid", gap: "0.35rem" }}>
                    <span>{label}</span>
                    <input
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </label>
                ))}
                <button type="submit" style={accentButtonStyle}>
                  Save activity
                </button>
              </form>
              {submitMessage ? (
                <p style={{ marginBottom: 0, color: "#4b5563" }}>{submitMessage}</p>
              ) : null}
            </section>

            <section style={panelStyle}>
              <h3 style={{ marginTop: 0 }}>Recent logs</h3>
              {error ? <p style={errorStyle}>{error}</p> : null}
              {isLoading ? (
                <p>Loading activity...</p>
              ) : logs.length === 0 ? (
                <p style={{ color: "#4b5563" }}>
                  No activity logs yet. Add your first one from the form.
                </p>
              ) : (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {logs.map((log) => (
                    <article key={log._id} style={cardStyle}>
                      <strong>{log.date}</strong>
                      <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                        {log.steps} steps | {log.waterMl} ml water | {log.sleepHours} h sleep |{" "}
                        {log.caloriesConsumed} cal
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

const pageStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "2rem",
  display: "grid",
  gap: "1.5rem"
};

const heroStyle = {
  borderRadius: "28px",
  padding: "2rem",
  background: "linear-gradient(135deg, rgba(15,118,110,0.12), rgba(239,125,87,0.14))"
};

const eyebrowStyle = {
  margin: 0,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
  fontWeight: 700
};

const headingStyle = {
  margin: "0.4rem 0 0",
  fontSize: "clamp(2rem, 5vw, 3.1rem)"
};

const subTextStyle = {
  margin: "0.65rem 0 0",
  color: "#4b5563",
  maxWidth: "54ch"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(280px, 380px) minmax(0, 1fr)",
  gap: "1rem"
};

const panelStyle = {
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)"
};

const inputStyle = {
  border: "1px solid rgba(15, 118, 110, 0.18)",
  borderRadius: "14px",
  padding: "0.85rem 0.95rem",
  font: "inherit",
  background: "#fffdfa"
};

const accentButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "0.9rem 1rem",
  background: "var(--color-primary)",
  color: "white",
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer"
};

const errorStyle = {
  margin: "0 0 1rem",
  background: "#fff1f0",
  color: "#9f1239",
  padding: "0.85rem 1rem",
  borderRadius: "16px"
};

const cardStyle = {
  border: "1px solid rgba(15,118,110,0.1)",
  borderRadius: "18px",
  padding: "1rem",
  background: "#fffdfa"
};
