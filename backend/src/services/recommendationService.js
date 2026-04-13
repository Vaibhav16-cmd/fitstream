const workoutMoodMap = {
  cardio: "energetic",
  hiit: "energetic",
  strength: "focus",
  yoga: "calm",
  mobility: "recovery"
};

export const getRecommendedMoodForWorkout = (category = "cardio") =>
  workoutMoodMap[category] || "focus";
