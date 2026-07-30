const workoutMoodMap = {
  cardio: "energetic",
  hiit: "energetic",
  strength: "focus",
  yoga: "calm",
  mobility: "recovery"
};

export const getRecommendedMoodForWorkout = (category = "cardio") =>
  workoutMoodMap[category] || "focus";

export const getRecommendationSummary = ({ category = "cardio", playlists = [] }) => {
  const mood = getRecommendedMoodForWorkout(category);
  const recommendedPlaylists = playlists.filter(
    (playlist) => playlist.category === category || playlist.mood === mood
  );

  return {
    mood,
    playlists: recommendedPlaylists
  };
};
