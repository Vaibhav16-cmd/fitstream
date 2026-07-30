import { useEffect, useMemo, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import WorkoutCard from "../components/fitness/WorkoutCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { usePlaylists } from "../hooks/usePlaylists.js";
import { usePlayer } from "../hooks/usePlayer.js";
import { useWorkouts } from "../hooks/useWorkouts.js";

export default function WorkoutPage() {
  const token = useAuth((state) => state.token);
  const [selectedCategory, setSelectedCategory] = useState("cardio");
  const [sessionNotes, setSessionNotes] = useState("");
  const {
    workouts,
    isLoading,
    error,
    activeSession,
    startingWorkoutId,
    isCompletingSession,
    sessionHistory,
    startWorkout,
    completeWorkout
  } = useWorkouts(token);
  const { playlistGroups, recommendation } = usePlaylists({
    enabled: Boolean(token),
    workoutCategory: selectedCategory
  });
  const playTrack = usePlayer((state) => state.playTrack);

  useEffect(() => {
    if (activeSession?.workout?.category) {
      setSelectedCategory(activeSession.workout.category);
    }
  }, [activeSession]);

  const allPlaylists = useMemo(
    () => [...(playlistGroups.personal || []), ...(playlistGroups.system || [])],
    [playlistGroups]
  );

  const findRecommendationForWorkout = (workout) => {
    return (
      allPlaylists.find((playlist) => playlist.category === workout.category) ||
      allPlaylists.find((playlist) => playlist.mood === recommendation.mood)
    );
  };

  const handleStartWorkout = async (workout) => {
    const playlist = findRecommendationForWorkout(workout);
    setSelectedCategory(workout.category);
    const session = await startWorkout({
      workoutId: workout._id || workout.id,
      playlistId: playlist?._id
    });

    if (session?.playlist?.songs?.length) {
      playTrack({
        track: session.playlist.songs[0],
        queue: session.playlist.songs
      });
    }
  };

  const handleCompleteWorkout = async () => {
    if (!activeSession?._id) {
      return;
    }

    await completeWorkout({
      sessionId: activeSession._id,
      notes: sessionNotes
    });
    setSessionNotes("");
  };

  const activeDurationLabel = activeSession?.startedAt
    ? `${Math.max(
        1,
        Math.round((Date.now() - new Date(activeSession.startedAt).getTime()) / 60000)
      )} min active`
    : "";

  return (
    <MainLayout>
      <section style={pageStyle}>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <p style={eyebrowStyle}>Workouts</p>
          <h2 style={headingStyle}>Pick a session and move right away.</h2>
          <p style={subTextStyle}>
            Browse workouts, launch one with a recommended playlist, and complete the session from
            the same page.
          </p>
        </div>

        {activeSession ? (
          <section style={activeSessionStyle}>
            <div style={{ display: "grid", gap: "0.35rem" }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Workout session is active</p>
              <p style={{ margin: 0, color: "#374151" }}>
                {activeSession.workout?.title || "Session"} | {activeDurationLabel}
              </p>
              <p style={{ margin: 0, color: "#374151" }}>
                Recommended mood: {activeSession.recommendedMood || "focus"}
              </p>
            </div>
            <textarea
              value={sessionNotes}
              onChange={(event) => setSessionNotes(event.target.value)}
              placeholder="Add a short note about how the session felt."
              style={notesStyle}
            />
            <button type="button" onClick={handleCompleteWorkout} disabled={isCompletingSession} style={completeButtonStyle}>
              {isCompletingSession ? "Completing..." : "Complete workout"}
            </button>
          </section>
        ) : null}

        {token && recommendation.playlists.length > 0 ? (
          <section style={panelStyle}>
            <h3 style={{ marginTop: 0 }}>Recommended playlists for {selectedCategory}</h3>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {recommendation.playlists.map((playlist) => (
                <article key={playlist._id} style={recommendationCardStyle}>
                  <strong>{playlist.name}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                    {playlist.description || "Workout-ready mix"} | {playlist.songs?.length || 0} tracks
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {error ? <section style={errorStyle}>{error}</section> : null}

        {isLoading ? (
          <p style={{ margin: 0 }}>Loading workouts...</p>
        ) : (
          <div style={workoutGridStyle}>
            {workouts.map((workout, index) => {
              const recommendedPlaylist = findRecommendationForWorkout(workout);

              return (
                <WorkoutCard
                  key={workout._id || workout.id || `${workout.title}-${index}`}
                  workout={workout}
                  onStart={handleStartWorkout}
                  isStarting={startingWorkoutId === (workout._id || workout.id)}
                  canStart={Boolean(token)}
                  recommendationLabel={recommendedPlaylist?.name || ""}
                />
              );
            })}
          </div>
        )}

        <section style={panelStyle}>
          <h3 style={{ marginTop: 0 }}>Recent session history</h3>
          {sessionHistory.length === 0 ? (
            <p style={{ marginBottom: 0, color: "#4b5563" }}>No workout sessions yet.</p>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {sessionHistory.slice(0, 5).map((session) => (
                <article key={session._id} style={recommendationCardStyle}>
                  <strong>{session.workout?.title || "Workout session"}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "#4b5563" }}>
                    {session.status} | {session.durationMinutes || 0} min | {session.caloriesBurned || 0} cal
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

const pageStyle = {
  padding: "2rem",
  display: "grid",
  gap: "1.5rem",
  maxWidth: "1100px",
  margin: "0 auto"
};

const eyebrowStyle = {
  margin: 0,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
  fontWeight: 700,
  fontSize: "0.85rem"
};

const headingStyle = {
  margin: 0,
  fontSize: "clamp(2rem, 5vw, 3.25rem)"
};

const subTextStyle = {
  margin: 0,
  maxWidth: "700px",
  color: "#4b5563"
};

const activeSessionStyle = {
  background: "linear-gradient(135deg, rgba(15,118,110,0.14), rgba(239,125,87,0.18))",
  borderRadius: "24px",
  padding: "1.25rem",
  display: "grid",
  gap: "0.9rem"
};

const notesStyle = {
  border: "1px solid rgba(15,118,110,0.18)",
  borderRadius: "18px",
  minHeight: "96px",
  padding: "0.95rem",
  font: "inherit",
  resize: "vertical"
};

const completeButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "0.9rem 1rem",
  background: "var(--color-accent)",
  color: "white",
  font: "inherit",
  fontWeight: 700,
  cursor: "pointer"
};

const panelStyle = {
  background: "var(--color-surface)",
  borderRadius: "22px",
  padding: "1.25rem",
  border: "1px solid rgba(15,118,110,0.1)"
};

const recommendationCardStyle = {
  border: "1px solid rgba(15,118,110,0.1)",
  borderRadius: "18px",
  padding: "1rem",
  background: "#fffdfa"
};

const errorStyle = {
  background: "#fff1f0",
  color: "#9f1239",
  borderRadius: "18px",
  padding: "1rem"
};

const workoutGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1rem"
};
