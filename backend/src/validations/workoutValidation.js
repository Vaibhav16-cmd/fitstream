export const validateWorkoutInput = ({ title, durationMinutes }) => {
  const errors = [];

  if (!title || !title.trim()) {
    errors.push("Workout title is required.");
  }

  if (durationMinutes !== undefined && Number(durationMinutes) <= 0) {
    errors.push("Workout duration must be greater than zero.");
  }

  return errors;
};
