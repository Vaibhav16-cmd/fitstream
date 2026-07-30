import api from "../lib/axios.js";

export const fetchWorkouts = async () => {
  const response = await api.get("/workouts");
  return response.data;
};

export const fetchWorkoutById = async (workoutId) => {
  const response = await api.get(`/workouts/${workoutId}`);
  return response.data;
};

export const startWorkoutSession = async ({ workoutId, token, playlistId }) => {
  const response = await api.post(
    `/workouts/${workoutId}/start`,
    {
      playlistId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const completeWorkoutSession = async ({ sessionId, notes = "", token }) => {
  const response = await api.patch(
    `/workouts/sessions/${sessionId}/complete`,
    { notes },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const fetchWorkoutSessions = async (token) => {
  const response = await api.get("/workouts/sessions/history/list", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
