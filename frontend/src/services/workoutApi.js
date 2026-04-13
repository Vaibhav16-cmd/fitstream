import api from "../lib/axios.js";

export const fetchWorkouts = async () => {
  const response = await api.get("/workouts");
  return response.data;
};

export const fetchWorkoutById = async (workoutId) => {
  const response = await api.get(`/workouts/${workoutId}`);
  return response.data;
};

export const startWorkoutSession = async ({ workoutId, token }) => {
  const response = await api.post(
    `/workouts/${workoutId}/start`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};
