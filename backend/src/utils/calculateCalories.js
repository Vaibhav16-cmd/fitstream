const intensityMultiplier = {
  low: 5,
  medium: 8,
  high: 12
};

export const estimateCaloriesBurned = ({ durationMinutes, intensity = "medium" }) =>
  durationMinutes * (intensityMultiplier[intensity] || intensityMultiplier.medium);
