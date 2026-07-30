import { useEffect, useState } from "react";
import {
  completeWorkoutSession as completeWorkoutSessionRequest,
  fetchWorkoutSessions,
  fetchWorkouts,
  startWorkoutSession as startWorkoutSessionRequest
} from "../services/workoutApi.js";

export const useWorkouts = (token) => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [startingWorkoutId, setStartingWorkoutId] = useState("");
  const [isCompletingSession, setIsCompletingSession] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);

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

  useEffect(() => {
    if (!token) {
      setSessionHistory([]);
      setActiveSession(null);
      return;
    }

    const loadSessions = async () => {
      try {
        const sessions = await fetchWorkoutSessions(token);
        setSessionHistory(sessions);
        const currentSession = sessions.find((session) => session.status === "active");
        setActiveSession(currentSession || null);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Could not load workout history.");
      }
    };

    loadSessions();
  }, [token]);

  const startWorkout = async ({ workoutId, playlistId }) => {
    if (!token) {
      setError("Log in first to start and save a workout session.");
      return null;
    }

    try {
      setStartingWorkoutId(workoutId);
      setError("");
      const session = await startWorkoutSessionRequest({ workoutId, token, playlistId });
      setActiveSession(session);
      setSessionHistory((current) => [session, ...current.filter((existing) => existing._id !== session._id)]);
      return session;
    } catch (startError) {
      setError(startError.response?.data?.message || "Could not start workout session.");
      return null;
    } finally {
      setStartingWorkoutId("");
    }
  };

  const completeWorkout = async ({ sessionId, notes }) => {
    if (!token) {
      setError("Log in first to complete a workout session.");
      return null;
    }

    try {
      setIsCompletingSession(true);
      setError("");
      const session = await completeWorkoutSessionRequest({ sessionId, notes, token });
      setActiveSession(null);
      setSessionHistory((current) =>
        current.map((existing) => (existing._id === session._id ? session : existing))
      );
      return session;
    } catch (completeError) {
      setError(completeError.response?.data?.message || "Could not complete workout session.");
      return null;
    } finally {
      setIsCompletingSession(false);
    }
  };

  return {
    workouts,
    isLoading,
    error,
    activeSession,
    startingWorkoutId,
    isCompletingSession,
    sessionHistory,
    startWorkout,
    completeWorkout
  };
};
