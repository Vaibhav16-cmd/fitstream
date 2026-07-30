import MainLayout from "../layouts/MainLayout.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function ProfilePage() {
  const user = useAuth((state) => state.user);

  return (
    <MainLayout>
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          display: "grid",
          gap: "1.5rem"
        }}
      >
        <section
          style={{
            borderRadius: "28px",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(239,125,87,0.12), rgba(15,118,110,0.14))"
          }}
        >
          <p style={{ margin: 0, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-primary)", fontWeight: 700 }}>
            Profile
          </p>
          <h2 style={{ margin: "0.4rem 0 0", fontSize: "clamp(2rem, 5vw, 3.1rem)" }}>
            {user ? `${user.name}'s FitStream profile` : "Your FitStream profile"}
          </h2>
        </section>

        <section
          style={{
            background: "var(--color-surface)",
            borderRadius: "22px",
            padding: "1.5rem",
            border: "1px solid rgba(15,118,110,0.1)"
          }}
        >
          {user ? (
            <div style={{ display: "grid", gap: "0.85rem" }}>
              <ProfileRow label="Name" value={user.name} />
              <ProfileRow label="Email" value={user.email} />
              <ProfileRow label="Goal" value={user.fitnessProfile?.goal || "general-fitness"} />
              <ProfileRow
                label="Activity level"
                value={user.fitnessProfile?.activityLevel || "beginner"}
              />
            </div>
          ) : (
            <p style={{ margin: 0, color: "#4b5563" }}>Log in to see your profile details here.</p>
          )}
        </section>
      </section>
    </MainLayout>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
      <span style={{ color: "#6b7280" }}>{label}</span>
      <strong style={{ textTransform: "capitalize" }}>{value}</strong>
    </div>
  );
}
