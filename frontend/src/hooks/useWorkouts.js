import { useEffect, useState } from "react";
import { fetchWorkouts, startWorkoutSession as startWorkoutSessionRequest } from "../services/workoutApi.js";

export const useWorkouts = (token) => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [startingWorkoutId, setStartingWorkoutId] = useState("");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Could not load workouts.");
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const startWorkout = async (workoutId) => {
    if (!token) {
      setError("Log in first to start and save a workout session.");
      return null;
    }

    try {
      setStartingWorkoutId(workoutId);
      setError("");
      const session = await startWorkoutSessionRequest({ workoutId, token });
      setActiveSession(session);
      return session;
    } catch (startError) {
      setError(startError.response?.data?.message || "Could not start workout session.");
      return null;
    } finally {
      setStartingWorkoutId("");
    }
  };

  return {
    workouts,
    isLoading,
    error,
    activeSession,
    startingWorkoutId,
    startWorkout
  };
};
