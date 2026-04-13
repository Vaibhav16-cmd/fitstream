export default function WorkoutCard({
  workout,
  onStart,
  isStarting = false,
  canStart = false
}) {
  return (
    <article
      style={{
        background: "var(--color-surface)",
        border: "1px solid rgba(15, 118, 110, 0.15)",
        borderRadius: "20px",
        padding: "1rem",
        display: "grid",
        gap: "0.5rem"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <h3 style={{ margin: 0 }}>{workout.title}</h3>
        <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>
          {workout.durationMinutes} min
        </span>
      </div>
      <p style={{ margin: 0, textTransform: "capitalize" }}>{workout.category}</p>
      <p style={{ margin: 0, color: "#5d5d5d" }}>
        Intensity: <strong style={{ textTransform: "capitalize" }}>{workout.intensity}</strong>
      </p>
      <p style={{ margin: 0, color: "#5d5d5d" }}>
        {workout.description || "A guided workout session ready to launch."}
      </p>
      <button
        type="button"
        onClick={() => onStart?.(workout._id || workout.id)}
        disabled={!canStart || isStarting}
        style={{
          marginTop: "0.5rem",
          border: "none",
          borderRadius: "999px",
          padding: "0.8rem 1rem",
          background: canStart ? "var(--color-primary)" : "#cbd5d1",
          color: "white",
          cursor: canStart && !isStarting ? "pointer" : "not-allowed"
        }}
      >
        {isStarting ? "Starting..." : canStart ? "Start Workout" : "Login to Start"}
      </button>
    </article>
  );
}
