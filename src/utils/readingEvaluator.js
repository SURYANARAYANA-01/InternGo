/**
 * readingEvaluator.js
 * 
 * Evaluates a user's spoken response against an expected sentence
 * for the Communication Skills Reading (See & Speak) module.
 * 
 * ── EVALUATION METHOD ──────────────────────────────────────────
 * This evaluator is DETERMINISTIC. It uses:
 * 
 * 1. Text normalization (contractions, punctuation, numbers, STT variants)
 * 2. Needleman-Wunsch sequence alignment (word-level)
 * 3. Word Error Rate (WER) calculation
 * 4. Fuzzy word matching via Levenshtein distance
 * 
 * The evaluation compares the user's STT transcript against the
 * expected sentence after normalization. It produces:
 * - Word accuracy percentage
 * - Aligned word diff (showing matches, substitutions, insertions, deletions)
 * - Per-question score categorization (correct / partial / incorrect)
 * 
 * ── LIMITATIONS ────────────────────────────────────────────────
 * - Accuracy depends entirely on the browser's STT engine quality
 * - STT may produce different transcripts for the same spoken input
 * - This evaluator cannot assess actual pronunciation quality —
 *   it only compares transcribed text to expected text
 * - Homophone errors (e.g., "their" vs "there") may be missed
 *   if the STT engine transcribes the wrong homophone
 * 
 * For true pronunciation assessment, an external speech evaluation
 * API would be required.
 */

import { normalizeText, tokenize, areWordsSimilar } from './textNormalizer.js';
import { categorizeReadingScore } from './commScoring.js';

// ── Needleman-Wunsch Scoring Constants ─────────────────────────
const NW_MATCH = 2;         // Score for matching words
const NW_FUZZY_MATCH = 1;   // Score for fuzzy-matched words (similar but not exact)
const NW_MISMATCH = -1;     // Penalty for substituted words
const NW_GAP = -1;          // Penalty for insertions/deletions

/**
 * Needleman-Wunsch global alignment for two word arrays.
 * 
 * This is a standard bioinformatics algorithm adapted for word sequences.
 * It produces an optimal global alignment that minimizes edit operations.
 * DETERMINISTIC — same input always produces same alignment.
 * 
 * @param {string[]} expected — expected word array
 * @param {string[]} spoken — spoken (user) word array
 * @returns {{ alignment: Array<{ type: string, expected: string|null, spoken: string|null }>, score: number }}
 *   alignment: array of alignment entries, each with:
 *     type: 'match' | 'fuzzy_match' | 'substitution' | 'deletion' | 'insertion'
 *     expected: the expected word (null for insertions)
 *     spoken: the spoken word (null for deletions)
 *   score: raw Needleman-Wunsch score
 */
function needlemanWunsch(expected, spoken) {
  const m = expected.length;
  const n = spoken.length;

  // Build score matrix
  const matrix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Initialize gaps
  for (let i = 0; i <= m; i++) matrix[i][0] = i * NW_GAP;
  for (let j = 0; j <= n; j++) matrix[0][j] = j * NW_GAP;

  // Fill matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let diagScore;
      if (expected[i - 1] === spoken[j - 1]) {
        diagScore = matrix[i - 1][j - 1] + NW_MATCH;
      } else if (areWordsSimilar(expected[i - 1], spoken[j - 1])) {
        diagScore = matrix[i - 1][j - 1] + NW_FUZZY_MATCH;
      } else {
        diagScore = matrix[i - 1][j - 1] + NW_MISMATCH;
      }

      const upScore = matrix[i - 1][j] + NW_GAP;     // deletion (expected word skipped)
      const leftScore = matrix[i][j - 1] + NW_GAP;    // insertion (extra spoken word)

      matrix[i][j] = Math.max(diagScore, upScore, leftScore);
    }
  }

  // Traceback
  const alignment = [];
  let i = m, j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const current = matrix[i][j];
      const isExact = expected[i - 1] === spoken[j - 1];
      const isFuzzy = !isExact && areWordsSimilar(expected[i - 1], spoken[j - 1]);

      let expectedDiag;
      if (isExact) expectedDiag = matrix[i - 1][j - 1] + NW_MATCH;
      else if (isFuzzy) expectedDiag = matrix[i - 1][j - 1] + NW_FUZZY_MATCH;
      else expectedDiag = matrix[i - 1][j - 1] + NW_MISMATCH;

      if (current === expectedDiag) {
        if (isExact) {
          alignment.unshift({ type: 'match', expected: expected[i - 1], spoken: spoken[j - 1] });
        } else if (isFuzzy) {
          alignment.unshift({ type: 'fuzzy_match', expected: expected[i - 1], spoken: spoken[j - 1] });
        } else {
          alignment.unshift({ type: 'substitution', expected: expected[i - 1], spoken: spoken[j - 1] });
        }
        i--; j--;
      } else if (i > 0 && current === matrix[i - 1][j] + NW_GAP) {
        alignment.unshift({ type: 'deletion', expected: expected[i - 1], spoken: null });
        i--;
      } else {
        alignment.unshift({ type: 'insertion', expected: null, spoken: spoken[j - 1] });
        j--;
      }
    } else if (i > 0) {
      alignment.unshift({ type: 'deletion', expected: expected[i - 1], spoken: null });
      i--;
    } else {
      alignment.unshift({ type: 'insertion', expected: null, spoken: spoken[j - 1] });
      j--;
    }
  }

  return { alignment, score: matrix[m][n] };
}

/**
 * Calculate Word Error Rate (WER) from alignment.
 * 
 * WER = (Substitutions + Deletions + Insertions) / Reference Length
 * 
 * Accuracy = 1 - WER (clamped to [0, 1])
 * 
 * DETERMINISTIC.
 * 
 * @param {Array} alignment — from needlemanWunsch()
 * @param {number} referenceLength — length of the expected word array
 * @returns {{ accuracy: number, wer: number, substitutions: number, deletions: number, insertions: number, matches: number, fuzzyMatches: number }}
 */
function calculateWER(alignment, referenceLength) {
  let substitutions = 0;
  let deletions = 0;
  let insertions = 0;
  let matches = 0;
  let fuzzyMatches = 0;

  for (const entry of alignment) {
    switch (entry.type) {
      case 'match': matches++; break;
      case 'fuzzy_match': fuzzyMatches++; break;
      case 'substitution': substitutions++; break;
      case 'deletion': deletions++; break;
      case 'insertion': insertions++; break;
    }
  }

  const errors = substitutions + deletions + insertions;
  const wer = referenceLength > 0 ? errors / referenceLength : (errors > 0 ? 1 : 0);
  const accuracy = Math.max(0, Math.min(1, 1 - wer));

  return { accuracy, wer, substitutions, deletions, insertions, matches, fuzzyMatches };
}

/**
 * Evaluate a single Reading question.
 * 
 * Pipeline:
 * 1. Normalize both expected sentence and spoken transcript
 * 2. Tokenize into word arrays
 * 3. Run Needleman-Wunsch alignment
 * 4. Calculate WER and accuracy
 * 5. Categorize into correct / partial / incorrect
 * 
 * All steps are DETERMINISTIC.
 * 
 * @param {string} expectedSentence — the expected sentence from the question data
 * @param {string} spokenTranscript — the user's STT transcript (may be empty/null)
 * @returns {{
 *   accuracy: number,
 *   score: number,
 *   status: string,
 *   alignment: Array,
 *   stats: { substitutions: number, deletions: number, insertions: number, matches: number, fuzzyMatches: number, wer: number },
 *   expectedNormalized: string,
 *   spokenNormalized: string,
 *   skipped: boolean
 * }}
 */
export function evaluateReadingQuestion(expectedSentence, spokenTranscript) {
  // Handle missing/empty transcript
  if (!spokenTranscript || spokenTranscript.trim().length === 0) {
    const expectedWords = tokenize(expectedSentence);
    return {
      accuracy: 0,
      score: 0,
      status: 'incorrect',
      alignment: expectedWords.map(w => ({ type: 'deletion', expected: w, spoken: null })),
      stats: {
        substitutions: 0, deletions: expectedWords.length,
        insertions: 0, matches: 0, fuzzyMatches: 0,
        wer: 1
      },
      expectedNormalized: normalizeText(expectedSentence),
      spokenNormalized: '',
      skipped: true
    };
  }

  // Normalize
  const expectedNormalized = normalizeText(expectedSentence);
  const spokenNormalized = normalizeText(spokenTranscript);

  // Tokenize
  const expectedWords = expectedNormalized.split(/\s+/).filter(w => w.length > 0);
  const spokenWords = spokenNormalized.split(/\s+/).filter(w => w.length > 0);

  // Handle edge case: empty after normalization
  if (expectedWords.length === 0) {
    return {
      accuracy: spokenWords.length === 0 ? 1 : 0,
      score: spokenWords.length === 0 ? 1 : 0,
      status: spokenWords.length === 0 ? 'correct' : 'incorrect',
      alignment: spokenWords.map(w => ({ type: 'insertion', expected: null, spoken: w })),
      stats: {
        substitutions: 0, deletions: 0,
        insertions: spokenWords.length, matches: 0, fuzzyMatches: 0,
        wer: spokenWords.length > 0 ? 1 : 0
      },
      expectedNormalized,
      spokenNormalized,
      skipped: false
    };
  }

  // Align
  const { alignment } = needlemanWunsch(expectedWords, spokenWords);

  // Calculate WER
  const stats = calculateWER(alignment, expectedWords.length);

  // Categorize score
  const { score, status } = categorizeReadingScore(stats.accuracy);

  return {
    accuracy: Math.round(stats.accuracy * 100) / 100,
    score,
    status,
    alignment,
    stats: {
      substitutions: stats.substitutions,
      deletions: stats.deletions,
      insertions: stats.insertions,
      matches: stats.matches,
      fuzzyMatches: stats.fuzzyMatches,
      wer: Math.round(stats.wer * 100) / 100
    },
    expectedNormalized,
    spokenNormalized,
    skipped: false
  };
}

/**
 * Evaluate all Reading questions in a level.
 * 
 * @param {Array<{ sentence: string }>} questions — array of question objects
 * @param {Object<number, string>} spokenTranscripts — map of questionIndex → spoken transcript
 * @returns {Array} — array of evaluation results, one per question
 */
export function evaluateReadingLevel(questions, spokenTranscripts) {
  return questions.map((q, idx) => {
    const transcript = spokenTranscripts[idx] || '';
    return evaluateReadingQuestion(q.sentence, transcript);
  });
}
