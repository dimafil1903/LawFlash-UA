// src/algo.js

export function initProgress() {
  return {
    rightCount: 0,
    wrongCount: 0,
    streak: 0,
    ease: 2.5,
    lapses: 0,
    lastSeenAt: null,
    nextReviewAt: null,
    interval: 0 // days
  };
}

// Simplified SM-2
// quality: 0-5. 
// For our swiping: Right (Knew) = 4, Left (Review) = 1
export function processAnswer(progress, quality) {
  let { rightCount, wrongCount, streak, ease, lapses, interval } = progress;
  
    if (quality >= 3) {
    rightCount++;
    if (streak === 0) {
      interval = 1;
    } else if (streak === 1) {
      interval = 4; // Faster repetition
    } else {
      // Slightly more aggressive multiplier for 30-day prep
      interval = Math.round(interval * (ease * 0.85)); 
    }
    streak++;
  } else {
    wrongCount++;
    streak = 0;
    lapses++;
    interval = 1;
  }

  // Adjust ease to be more sensitive to mistakes
  ease = ease + (0.1 - (5 - quality) * (0.12 + (5 - quality) * 0.03));
  if (ease < 1.3) ease = 1.3;
  if (ease > 2.5) ease = 2.5; // Cap ease to prevent intervals from growing too large for 30 days

  const now = new Date();
  const nextReviewAt = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    rightCount,
    wrongCount,
    streak,
    ease,
    lapses,
    interval,
    lastSeenAt: now.toISOString(),
    nextReviewAt: nextReviewAt.toISOString()
  };
}

export function isDue(nextReviewAt) {
  if (!nextReviewAt) return true;
  return new Date() >= new Date(nextReviewAt);
}
