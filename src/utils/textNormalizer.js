/**
 * textNormalizer.js
 * 
 * Text normalization utilities for Communication Skills evaluation.
 * All functions in this module are DETERMINISTIC — they produce
 * identical output for identical input, with no randomness or
 * external API calls.
 */

// ── Contraction Expansion Map ──────────────────────────────────
const CONTRACTIONS = {
  "i'm": "i am",
  "i'll": "i will",
  "i've": "i have",
  "i'd": "i would",
  "you're": "you are",
  "you'll": "you will",
  "you've": "you have",
  "you'd": "you would",
  "he's": "he is",
  "he'll": "he will",
  "he'd": "he would",
  "she's": "she is",
  "she'll": "she will",
  "she'd": "she would",
  "it's": "it is",
  "it'll": "it will",
  "it'd": "it would",
  "we're": "we are",
  "we'll": "we will",
  "we've": "we have",
  "we'd": "we would",
  "they're": "they are",
  "they'll": "they will",
  "they've": "they have",
  "they'd": "they would",
  "that's": "that is",
  "that'll": "that will",
  "that'd": "that would",
  "who's": "who is",
  "who'll": "who will",
  "who'd": "who would",
  "what's": "what is",
  "what'll": "what will",
  "what'd": "what did",
  "where's": "where is",
  "where'd": "where did",
  "when's": "when is",
  "when'd": "when did",
  "why's": "why is",
  "why'd": "why did",
  "how's": "how is",
  "how'd": "how did",
  "how'll": "how will",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "hasn't": "has not",
  "haven't": "have not",
  "hadn't": "had not",
  "doesn't": "does not",
  "don't": "do not",
  "didn't": "did not",
  "won't": "will not",
  "wouldn't": "would not",
  "shan't": "shall not",
  "shouldn't": "should not",
  "can't": "cannot",
  "cannot": "can not",
  "couldn't": "could not",
  "mustn't": "must not",
  "needn't": "need not",
  "let's": "let us",
  "there's": "there is",
  "here's": "here is",
  "could've": "could have",
  "should've": "should have",
  "would've": "would have",
  "might've": "might have",
  "must've": "must have",
  "ain't": "is not",
  "gonna": "going to",
  "gotta": "got to",
  "wanna": "want to",
  "ma'am": "madam",
  "o'clock": "of the clock"
};

// ── Number Word Map (0–20 + tens) ──────────────────────────────
const NUMBER_WORDS = {
  '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
  '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
  '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
  '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen',
  '18': 'eighteen', '19': 'nineteen', '20': 'twenty',
  '30': 'thirty', '40': 'forty', '50': 'fifty',
  '60': 'sixty', '70': 'seventy', '80': 'eighty', '90': 'ninety'
};

// Reverse mapping: word → digit string
const WORD_TO_NUMBER = {};
for (const [digit, word] of Object.entries(NUMBER_WORDS)) {
  WORD_TO_NUMBER[word] = digit;
}

// ── Common STT Spelling Variants ───────────────────────────────
// Maps common STT mis-transcriptions to their standard forms.
// These are deterministic lookups, not semantic analysis.
const STT_VARIANTS = {
  'gonna': 'going to',
  'gotta': 'got to',
  'wanna': 'want to',
  'kinda': 'kind of',
  'sorta': 'sort of',
  'coulda': 'could have',
  'shoulda': 'should have',
  'woulda': 'would have',
  'musta': 'must have',
  'hafta': 'have to',
  'oughta': 'ought to',
  'lemme': 'let me',
  'gimme': 'give me',
  'dunno': 'do not know',
  'till': 'until',
  'til': 'until',
  'ok': 'okay',
  'alright': 'all right',
  'yeah': 'yes',
  'yep': 'yes',
  'yup': 'yes',
  'nah': 'no',
  'nope': 'no',
  'cause': 'because',
  'cuz': 'because',
  'cos': 'because',
  'thru': 'through',
  'tho': 'though',
  'u': 'you',
  'ur': 'your',
  'r': 'are',
  'n': 'and',
  'em': 'them',
  'bout': 'about',
};

/**
 * Strip all punctuation and special characters, keeping only
 * letters, digits, and spaces. Deterministic.
 */
export function stripPunctuation(text) {
  if (!text) return '';
  return text.replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
}

/**
 * Expand contractions in text. Deterministic.
 * Handles both curly/smart apostrophes and straight apostrophes.
 */
export function expandContractions(text) {
  if (!text) return '';
  // Normalize apostrophes (curly → straight)
  let normalized = text.replace(/[\u2018\u2019\u0060\u00B4]/g, "'");
  // Replace contractions (case-insensitive, word-boundary aware)
  for (const [contraction, expansion] of Object.entries(CONTRACTIONS)) {
    const regex = new RegExp(`\\b${contraction.replace("'", "'")}\\b`, 'gi');
    normalized = normalized.replace(regex, expansion);
  }
  return normalized;
}

/**
 * Replace digit strings (0–20, tens) with their word equivalents.
 * Only handles standalone numbers, not embedded in words.
 * Deterministic.
 */
export function normalizeNumbers(text) {
  if (!text) return '';
  return text.replace(/\b(\d+)\b/g, (match) => {
    return NUMBER_WORDS[match] || match;
  });
}

/**
 * Replace number words with their digit equivalents.
 * Deterministic.
 */
export function wordsToNumbers(text) {
  if (!text) return '';
  const words = text.split(/\s+/);
  return words.map(w => {
    const lower = w.toLowerCase();
    return WORD_TO_NUMBER[lower] !== undefined ? WORD_TO_NUMBER[lower] : w;
  }).join(' ');
}

/**
 * Apply common STT variant normalization.
 * Deterministic lookup — no semantic analysis.
 */
export function normalizeSTTVariants(text) {
  if (!text) return '';
  const words = text.split(/\s+/);
  const result = [];
  for (const word of words) {
    const lower = word.toLowerCase();
    if (STT_VARIANTS[lower]) {
      result.push(...STT_VARIANTS[lower].split(' '));
    } else {
      result.push(lower);
    }
  }
  return result.join(' ');
}

/**
 * Full normalization pipeline for comparison.
 * Applies all normalization steps in order:
 * 1. Lowercase
 * 2. Expand contractions
 * 3. Normalize STT variants
 * 4. Normalize numbers (digits → words)
 * 5. Strip punctuation
 * 6. Collapse whitespace
 * 
 * All steps are DETERMINISTIC.
 * 
 * @param {string} text — raw input text
 * @returns {string} — normalized text ready for comparison
 */
export function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  let result = text.toLowerCase();
  result = expandContractions(result);
  result = normalizeSTTVariants(result);
  result = normalizeNumbers(result);
  result = stripPunctuation(result);
  result = result.replace(/\s+/g, ' ').trim();
  return result;
}

/**
 * Tokenize normalized text into an array of words.
 * Deterministic.
 * 
 * @param {string} text — normalized text
 * @returns {string[]} — array of lowercase words
 */
export function tokenize(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  return normalized.split(/\s+/).filter(w => w.length > 0);
}

// ── Levenshtein Distance (Edit Distance) ───────────────────────
/**
 * Compute the Levenshtein edit distance between two strings.
 * This is a DETERMINISTIC algorithm — classic dynamic programming.
 * Time: O(m*n), Space: O(min(m,n))
 * 
 * @param {string} a — first string
 * @param {string} b — second string
 * @returns {number} — minimum number of single-character edits
 */
export function levenshteinDistance(a, b) {
  if (!a || a.length === 0) return b ? b.length : 0;
  if (!b || b.length === 0) return a.length;

  // Use the shorter string for the "column" to save memory
  if (a.length > b.length) [a, b] = [b, a];

  const m = a.length;
  const n = b.length;
  let prev = new Array(m + 1);
  let curr = new Array(m + 1);

  // Initialize first row
  for (let i = 0; i <= m; i++) prev[i] = i;

  for (let j = 1; j <= n; j++) {
    curr[0] = j;
    for (let i = 1; i <= m; i++) {
      if (a[i - 1] === b[j - 1]) {
        curr[i] = prev[i - 1];
      } else {
        curr[i] = 1 + Math.min(prev[i - 1], prev[i], curr[i - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[m];
}

/**
 * Check if two words are "similar enough" to be considered the same
 * word despite STT transcription differences.
 * 
 * Uses Levenshtein distance with a threshold relative to word length.
 * Deterministic.
 * 
 * Rules:
 * - Words of length ≤ 2: must match exactly
 * - Words of length 3-4: allow edit distance of 1
 * - Words of length 5+: allow edit distance of ≤ floor(length / 4)
 * 
 * @param {string} word1 — first word (lowercase)
 * @param {string} word2 — second word (lowercase)
 * @returns {boolean} — true if words are similar enough
 */
export function areWordsSimilar(word1, word2) {
  if (word1 === word2) return true;
  if (!word1 || !word2) return false;

  const maxLen = Math.max(word1.length, word2.length);
  const dist = levenshteinDistance(word1, word2);

  if (maxLen <= 2) return dist === 0;
  if (maxLen <= 4) return dist <= 1;
  return dist <= Math.floor(maxLen / 4);
}

/**
 * Compute word-level Levenshtein distance between two word arrays.
 * Uses areWordsSimilar for fuzzy word matching.
 * Deterministic.
 * 
 * @param {string[]} words1 — first word array
 * @param {string[]} words2 — second word array
 * @returns {number} — word-level edit distance
 */
export function wordLevelDistance(words1, words2) {
  const m = words1.length;
  const n = words2.length;

  if (m === 0) return n;
  if (n === 0) return m;

  let prev = new Array(n + 1);
  let curr = new Array(n + 1);

  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (areWordsSimilar(words1[i - 1], words2[j - 1])) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = 1 + Math.min(prev[j - 1], prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}
