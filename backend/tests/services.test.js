import test from "node:test";
import assert from "node:assert/strict";
import { estimateCaloriesBurned } from "../src/utils/calculateCalories.js";
import {
  getRecommendedMoodForWorkout,
  getRecommendationSummary
} from "../src/services/recommendationService.js";
import { validateAuthInput } from "../src/validations/authValidation.js";

test("estimateCaloriesBurned returns a stronger value for high intensity", () => {
  const low = estimateCaloriesBurned({ durationMinutes: 10, intensity: "low" });
  const high = estimateCaloriesBurned({ durationMinutes: 10, intensity: "high" });

  assert.equal(low, 50);
  assert.equal(high, 120);
  assert.ok(high > low);
});

test("getRecommendedMoodForWorkout maps workout categories to moods", () => {
  assert.equal(getRecommendedMoodForWorkout("cardio"), "energetic");
  assert.equal(getRecommendedMoodForWorkout("yoga"), "calm");
  assert.equal(getRecommendedMoodForWorkout("mobility"), "recovery");
});

test("getRecommendationSummary filters matching playlists", () => {
  const summary = getRecommendationSummary({
    category: "strength",
    playlists: [
      { name: "Strength Focus", category: "strength", mood: "focus" },
      { name: "Yoga Drift", category: "yoga", mood: "calm" }
    ]
  });

  assert.equal(summary.mood, "focus");
  assert.equal(summary.playlists.length, 1);
  assert.equal(summary.playlists[0].name, "Strength Focus");
});

test("validateAuthInput catches invalid auth data", () => {
  const errors = validateAuthInput({
    name: " ",
    email: "invalid-email",
    password: "123"
  });

  assert.equal(errors.length, 3);
});
