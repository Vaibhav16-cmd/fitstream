import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useWorkouts } from "../hooks/useWorkouts.js";
import { useSongs } from "../hooks/useSongs.js";
import { useProgressSummary } from "../hooks/useProgressSummary.js";

export default function DashboardPage() {
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);
  const { workouts, sessionHistory } = useWorkouts(token);
  const { songs } = useSongs();
  const { summary } = useProgressSummary(Boolean(token));

  return (
    <MainLayout>
      <section style={pageStyle}>
        <section style={heroStyle}>
          <p style={eyebrowStyle}>Dashboard</p>
          <h2 style={headingStyle}>
            {user ? `Welcome back, ${user.name}.` : "Your training and music hub."}
          </h2>
          <p style={subTextStyle}>
            Use this space to jump into workouts, check recent stats, and keep your player within
            reach.
          </p>
        </section>

        <div style={metricsGridStyle}>
          <DashboardCard label="Available workouts" value={workouts.length} helper="Ready to start" />
          <DashboardCard label="Songs in library" value={songs.length} helper="For focus and recovery" />
          <DashboardCard
            label="Workout minutes"
            value={summary?.totalWorkoutMinutes ?? 0}
            helper="Recent total"
          />
          <DashboardCard
            label="Best streak"
            value={summary?.bestStreak ?? 0}
            helper="Keep the momentum"
          />
        </div>

        <div style={linksGridStyle}>
          <QuickLink
            title="Start a workout"
            description="Browse the sessions we already seeded and launch one."
            to="/workouts"
          />
          <QuickLink
            title="Open player"
            description="Pick a track and keep the playback bar in sync."
            to="/player"
          />
          <QuickLink
            title="Track activity"
            description="Log water, steps, sleep, and calories from one form."
            to="/activity"
          />
          <QuickLink
            title="Curate playlists"
            description="Create mixes and explore recommendations."
            to="/playlists"
          />
        </div>

        <section style={panelStyle}>
          <h3 style={{ marginTop: 0 }}>Recent workout sessions</h3>
          {sessionHistory.length === 0 ? (
            <p style={{ color: "#4b5563", marginBottom: 0 }}>
              No completed sessions yet. Start one from the workout page.
            </p>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {sessionHistory.slice(0, 3).map((session) => (
                <article key={session._id} style={sessionCardStyle}>
                  <strong>{session.workout?.title || "Workout session"}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                    {session.status} | {session.durationMinutes || 0} min |{" "}
                    {session.caloriesBurned || 0} cal
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </MainLayout>
  );
}

function DashboardCard({ label, value, helper }) {
  return (
    <article style={dashboardCardStyle}>
      <p style={{ margin: 0, color: "#6b7280" }}>{label}</p>
      <h3 style={{ margin: "0.4rem 0", fontSize: "2.2rem" }}>{value}</h3>
      <p style={{ margin: 0, color: "#4b5563" }}>{helper}</p>
    </article>
  );
}

function QuickLink({ title, description, to }) {
  return (
    <Link to={to} style={quickLinkStyle}>
      <strong>{title}</strong>
      <span style={{ color: "#4b5563" }}>{description}</span>
    </Link>
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
  background: "linear-gradient(135deg, rgba(15,118,110,0.12), rgba(239,125,87,0.14))",
  display: "grid",
  gap: "1rem"
};

const eyebrowStyle = {
  margin: 0,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
  fontWeight: 700
};

const headingStyle = {
  margin: 0,
  fontSize: "clamp(2rem, 5vw, 3.25rem)"
};

const subTextStyle = {
  margin: 0,
  color: "#4b5563",
  maxWidth: "54ch"
};

const metricsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem"
};

const linksGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "1rem"
};

const panelStyle = {
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)"
};

const dashboardCardStyle = {
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)"
};

const quickLinkStyle = {
  textDecoration: "none",
  color: "inherit",
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)",
  display: "grid",
  gap: "0.4rem"
};

const sessionCardStyle = {
  border: "1px solid rgba(15,118,110,0.1)",
  borderRadius: "18px",
  padding: "1rem",
  background: "#fffdfa"
};
