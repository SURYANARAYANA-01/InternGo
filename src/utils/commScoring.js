/**
 * commScoring.js
 * 
 * Score aggregation and star calculation for Communication Skills.
 * All functions are DETERMINISTIC.
 * 
 * ── Scoring Thresholds (user-specified, documented here) ──────
 * 
 * Reading per-question scoring:
 *   ≥ 80% word accuracy → 1.0 (correct)
 *   55–79% word accuracy → 0.5 (partial)
 *   < 55% word accuracy  → 0.0 (incorrect)
 * 
 * Level star thresholds:
 *   ≥ 85% → 3 stars
 *   ≥ 70% → 2 stars
 *   ≥ 50% → 1 star
 *   < 50% → 0 stars
 * 
 * Creation factor weights:
 *   Relevance & Intent:       25%
 *   Grammar & Sentence Form:  25%
 *   Completeness & Depth:     20%
 *   Vocabulary & Variety:     15%
 *   Clarity & Naturalness:    15%
 *                             ────
 *                             100%
 */

// ── Reading per-question thresholds ────────────────────────────
export const READING_THRESHOLDS = {
  CORRECT_MIN: 0.80,     // ≥ 80% accuracy → 1.0
  PARTIAL_MIN: 0.55,     // ≥ 55% accuracy → 0.5
  // < 55% → 0.0
};

// ── Level star thresholds ──────────────────────────────────────
export const STAR_THRESHOLDS = {
  THREE_STARS: 85,   // ≥ 85%
  TWO_STARS: 70,     // ≥ 70%
  ONE_STAR: 50,      // ≥ 50%
  // < 50% → 0 stars
};

// ── Creation factor weights ────────────────────────────────────
export const CREATION_WEIGHTS = {
  relevance: 0.25,      // Relevance & Intent
  grammar: 0.25,        // Grammar & Sentence Formation
  completeness: 0.20,   // Completeness & Depth
  vocabulary: 0.15,     // Vocabulary & Variety
  clarity: 0.15,        // Clarity & Naturalness
};

/**
 * Categorize a Reading question's accuracy into a score.
 * DETERMINISTIC.
 * 
 * @param {number} accuracy — word accuracy ratio (0.0 to 1.0)
 * @returns {{ score: number, status: string }}
 *   score: 1.0, 0.5, or 0.0
 *   status: 'correct', 'partial', or 'incorrect'
 */
export function categorizeReadingScore(accuracy) {
  if (typeof accuracy !== 'number' || isNaN(accuracy)) {
    return { score: 0, status: 'incorrect' };
  }
  // Clamp to [0, 1]
  const clamped = Math.max(0, Math.min(1, accuracy));

  if (clamped >= READING_THRESHOLDS.CORRECT_MIN) {
    return { score: 1.0, status: 'correct' };
  }
  if (clamped >= READING_THRESHOLDS.PARTIAL_MIN) {
    return { score: 0.5, status: 'partial' };
  }
  return { score: 0, status: 'incorrect' };
}

/**
 * Calculate the level score from an array of per-question scores.
 * For Reading: scores are 0, 0.5, or 1.0 per question.
 * For Creation: scores are 0.0 to 1.0 per question.
 * 
 * Returns:
 *   totalScore: sum of scores
 *   maxScore: maximum possible (number of questions × max per question)
 *   percentage: (totalScore / maxScore) × 100
 *   stars: 0, 1, 2, or 3
 * 
 * DETERMINISTIC.
 * 
 * @param {number[]} questionScores — array of per-question scores
 * @param {number} [maxPerQuestion=1.0] — maximum score per question
 * @returns {{ totalScore: number, maxScore: number, percentage: number, stars: number }}
 */
export function calculateLevelResult(questionScores, maxPerQuestion = 1.0) {
  if (!questionScores || questionScores.length === 0) {
    return { totalScore: 0, maxScore: 0, percentage: 0, stars: 0 };
  }

  const totalScore = questionScores.reduce((sum, s) => sum + (typeof s === 'number' ? s : 0), 0);
  const maxScore = questionScores.length * maxPerQuestion;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const stars = calculateStars(percentage);

  return {
    totalScore: Math.round(totalScore * 100) / 100,
    maxScore,
    percentage: Math.round(percentage * 100) / 100,
    stars
  };
}

/**
 * Calculate stars from a percentage score.
 * DETERMINISTIC.
 * 
 * @param {number} percentage — 0 to 100
 * @returns {number} — 0, 1, 2, or 3
 */
export function calculateStars(percentage) {
  if (percentage >= STAR_THRESHOLDS.THREE_STARS) return 3;
  if (percentage >= STAR_THRESHOLDS.TWO_STARS) return 2;
  if (percentage >= STAR_THRESHOLDS.ONE_STAR) return 1;
  return 0;
}

/**
 * Calculate the weighted Creation score from factor scores.
 * DETERMINISTIC.
 * 
 * @param {{ relevance: number, grammar: number, completeness: number, vocabulary: number, clarity: number }} factors
 *   Each factor is a score from 0.0 to 1.0
 * @returns {number} — weighted total (0.0 to 1.0)
 */
export function calculateCreationWeightedScore(factors) {
  if (!factors) return 0;

  let total = 0;
  for (const [key, weight] of Object.entries(CREATION_WEIGHTS)) {
    const factorScore = typeof factors[key] === 'number' ? Math.max(0, Math.min(1, factors[key])) : 0;
    total += factorScore * weight;
  }

  return Math.round(total * 100) / 100;
}

/**
 * Convert a level result into the format needed by storage.js's updateLevelProgress().
 * 
 * updateLevelProgress(levelId, score, questionsCount) recalculates percentage as
 * (score / questionsCount) * 100, so we must pass values that produce the correct percentage.
 * 
 * We pass:
 *   score = percentage (e.g. 85)
 *   questionsCount = 100
 * 
 * This way storage.js calculates (85 / 100) * 100 = 85%, which matches our computed percentage.
 * 
 * DETERMINISTIC.
 * 
 * @param {{ percentage: number }} levelResult — from calculateLevelResult
 * @returns {{ score: number, questionsCount: number }}
 */
export function toStorageFormat(levelResult) {
  return {
    score: levelResult.totalScore,
    questionsCount: levelResult.maxScore || 5
  };
}
