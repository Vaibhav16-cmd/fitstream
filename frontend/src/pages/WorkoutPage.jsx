import MainLayout from "../layouts/MainLayout.jsx";
import WorkoutCard from "../components/fitness/WorkoutCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useWorkouts } from "../hooks/useWorkouts.js";

export default function WorkoutPage() {
  const token = useAuth((state) => state.token);
  const { workouts, isLoading, error, activeSession, startingWorkoutId, startWorkout } =
    useWorkouts(token);

  return (
    <MainLayout>
      <section
        style={{
          padding: "2rem",
          display: "grid",
          gap: "1.5rem",
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <p
            style={{
              margin: 0,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              fontWeight: 700,
              fontSize: "0.85rem"
            }}
          >
            Workouts
          </p>
          <h2 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Pick a session and move right away.
          </h2>
          <p style={{ margin: 0, maxWidth: "700px", color: "#4b5563" }}>
            This is the first real fitness flow in FitStream. Browse workouts now, and once you
            log in you can start and save sessions here.
          </p>
        </div>

        {activeSession ? (
          <section
            style={{
              background:
                "linear-gradient(135deg, rgba(15,118,110,0.14), rgba(239,125,87,0.18))",
              borderRadius: "24px",
              padding: "1.25rem"
            }}
          >
            <p style={{ margin: 0, fontWeight: 700 }}>Workout session is active</p>
            <p style={{ margin: "0.35rem 0 0", color: "#374151" }}>
              Session ID: {activeSession._id}
            </p>
          </section>
        ) : null}

        {error ? (
          <section
            style={{
              background: "#fff1f0",
              color: "#9f1239",
              borderRadius: "18px",
              padding: "1rem"
            }}
          >
            {error}
          </section>
        ) : null}

        {isLoading ? (
          <p style={{ margin: 0 }}>Loading workouts...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem"
            }}
          >
            {workouts.map((workout, index) => (
              <WorkoutCard
                key={workout._id || workout.id || `${workout.title}-${index}`}
                workout={workout}
                onStart={startWorkout}
                isStarting={startingWorkoutId === (workout._id || workout.id)}
                canStart={Boolean(token)}
              />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
