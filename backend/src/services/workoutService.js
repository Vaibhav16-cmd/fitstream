export const buildWorkoutSummary = (workout) => ({
  id: workout._id,
  title: workout.title,
  category: workout.category,
  intensity: workout.intensity,
  durationMinutes: workout.durationMinutes
});
