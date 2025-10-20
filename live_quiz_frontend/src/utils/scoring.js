const BASE_POINTS = 100;
const MAX_BONUS = 50;

// PUBLIC_INTERFACE
export function computeScore({ isCorrect, timeLeftSec, durationSec }) {
  /** Compute base points with proportional time bonus */
  if (!isCorrect) return 0;
  const ratio = Math.max(0, Math.min(1, timeLeftSec / Math.max(1, durationSec)));
  const bonus = Math.round(MAX_BONUS * ratio);
  return BASE_POINTS + bonus;
}
