/**
 * creationEvaluator.js
 * 
 * Multi-factor heuristic evaluator for the Communication Skills
 * Creation (See & Answer) module.
 * 
 * ── EVALUATION METHOD ──────────────────────────────────────────
 * This evaluator uses a RULE-BASED HEURISTIC system. It does NOT
 * use machine learning, NLP models, or external APIs.
 * 
 * It is HONEST about what it can and cannot evaluate:
 * 
 * DETERMINISTIC CHECKS (reliable):
 *   - Response length / word count
 *   - Sentence count and structure (periods, capitals)
 *   - Vocabulary diversity (unique word ratio)
 *   - Basic gibberish detection (consonant clusters, repeated chars)
 *   - Empty / too-short response detection
 * 
 * HEURISTIC CHECKS (approximate, not truly semantic):
 *   - Relevance: keyword overlap between prompt and response.
 *     This is a SURFACE-LEVEL heuristic. It cannot truly understand
 *     whether the response addresses the prompt's intent. A response
 *     can be relevant without sharing any keywords with the prompt.
 *   - Grammar: basic pattern matching for common errors.
 *     This catches some common mistakes but is NOT a grammar checker.
 *   - Naturalness: checks for obviously unnatural patterns.
 *     Cannot assess true fluency or naturalness of expression.
 * 
 * WHAT WOULD REQUIRE AN EXTERNAL SERVICE:
 *   - True semantic relevance understanding
 *   - Comprehensive grammar checking
 *   - Fluency and naturalness assessment
 *   - Contextual appropriateness
 *   - Idiomatic expression detection
 *   - Coherence across multiple sentences
 * 
 * ── FACTOR WEIGHTS (user-specified) ────────────────────────────
 *   Relevance & Intent:       25%
 *   Grammar & Sentence Form:  25%
 *   Completeness & Depth:     20%
 *   Vocabulary & Variety:     15%
 *   Clarity & Naturalness:    15%
 * 
 * ── DESIGN PRINCIPLE ──────────────────────────────────────────
 * The evaluator allows multiple valid answers with different wording.
 * It does NOT require predefined answers or exact keywords.
 * When it cannot confidently assess a factor, it uses a CONSERVATIVE
 * score rather than artificially awarding a high score.
 */

import { normalizeText, tokenize, stripPunctuation } from './textNormalizer.js';
import { calculateCreationWeightedScore } from './commScoring.js';

// ── Configuration ──────────────────────────────────────────────
const MIN_WORDS_FOR_RESPONSE = 3;    // Minimum words to be considered a response
const GOOD_RESPONSE_WORDS = 8;       // Target for a "complete" response
const EXCELLENT_RESPONSE_WORDS = 15; // Target for a "thorough" response

// Common English stop words (excluded from relevance keyword analysis)
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'shall', 'can', 'need', 'dare', 'ought', 'used',
  'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'between',
  'and', 'but', 'or', 'nor', 'not', 'so', 'yet', 'both', 'either', 'neither',
  'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves',
  'this', 'that', 'these', 'those', 'what', 'which', 'who', 'whom', 'whose',
  'when', 'where', 'why', 'how', 'all', 'each', 'every', 'any', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'only', 'own', 'same',
  'than', 'too', 'very', 'just', 'also', 'now', 'here', 'there', 'then',
  'if', 'about', 'up', 'out', 'then', 'once', 'because', 'since', 'while',
  'usually', 'often', 'sometimes', 'always', 'never', 'again',
  'like', 'really', 'well', 'much', 'many', 'even', 'still', 'already',
  'get', 'go', 'make', 'take', 'come', 'give', 'say', 'tell', 'ask',
  'know', 'think', 'see', 'want', 'look', 'use', 'find', 'put', 'try',
]);

// ── Topic Keyword Map ──────────────────────────────────────────
// Maps common prompt topics to related word families.
// This allows the evaluator to recognize topically related responses
// even when the response uses different wording than the prompt.
// This is a SURFACE-LEVEL heuristic, not semantic understanding.
const TOPIC_FAMILIES = {
  morning: ['morning', 'wake', 'woke', 'breakfast', 'brush', 'bath', 'shower', 'coffee', 'tea', 'exercise', 'jog', 'run', 'walk', 'yoga', 'meditate', 'alarm', 'early', 'routine', 'ready', 'prepare', 'dress', 'school', 'college', 'work', 'office', 'newspaper', 'news', 'read', 'eat', 'meal', 'start', 'begin', 'day'],
  family: ['family', 'father', 'mother', 'dad', 'mom', 'parent', 'brother', 'sister', 'sibling', 'grandparent', 'grandmother', 'grandfather', 'uncle', 'aunt', 'cousin', 'son', 'daughter', 'child', 'children', 'kid', 'husband', 'wife', 'spouse', 'home', 'house', 'together', 'love', 'care', 'member', 'relative'],
  food: ['food', 'eat', 'cook', 'meal', 'breakfast', 'lunch', 'dinner', 'snack', 'rice', 'bread', 'vegetable', 'fruit', 'chicken', 'fish', 'meat', 'curry', 'soup', 'salad', 'pizza', 'burger', 'noodle', 'pasta', 'delicious', 'tasty', 'favorite', 'favourite', 'recipe', 'kitchen', 'restaurant', 'cafe', 'dish', 'spicy', 'sweet', 'healthy', 'drink', 'water', 'juice', 'milk', 'tea', 'coffee'],
  weather: ['weather', 'rain', 'rainy', 'sun', 'sunny', 'cloud', 'cloudy', 'snow', 'snowy', 'wind', 'windy', 'storm', 'hot', 'cold', 'warm', 'cool', 'temperature', 'humid', 'dry', 'season', 'summer', 'winter', 'spring', 'autumn', 'fall', 'monsoon', 'umbrella', 'coat', 'jacket', 'forecast', 'climate', 'outside', 'sky', 'fog', 'foggy', 'thunder'],
  hobby: ['hobby', 'hobbies', 'play', 'game', 'sport', 'read', 'reading', 'book', 'music', 'listen', 'sing', 'singing', 'dance', 'dancing', 'draw', 'drawing', 'paint', 'painting', 'cook', 'cooking', 'garden', 'gardening', 'travel', 'swim', 'swimming', 'cycle', 'cycling', 'photography', 'movie', 'film', 'watch', 'write', 'writing', 'exercise', 'gym', 'yoga', 'craft', 'knit', 'sew', 'collect', 'hike', 'hiking', 'fish', 'fishing', 'cricket', 'football', 'basketball', 'tennis', 'chess'],
  daily: ['daily', 'routine', 'day', 'morning', 'afternoon', 'evening', 'night', 'wake', 'sleep', 'eat', 'work', 'study', 'school', 'college', 'office', 'home', 'commute', 'travel', 'bus', 'train', 'car', 'walk', 'exercise', 'relax', 'rest', 'homework', 'class', 'lesson', 'lunch', 'dinner', 'breakfast', 'bath', 'shower', 'brush', 'clean', 'wash', 'schedule', 'time', 'hour'],
  shopping: ['shop', 'shopping', 'buy', 'bought', 'purchase', 'store', 'market', 'mall', 'price', 'cost', 'money', 'spend', 'cheap', 'expensive', 'sale', 'discount', 'pay', 'cash', 'card', 'online', 'order', 'clothes', 'grocery', 'groceries', 'bag', 'item', 'product', 'brand', 'quality', 'list', 'cart', 'delivery', 'receipt'],
  greeting: ['hello', 'hi', 'hey', 'good', 'name', 'call', 'nice', 'meet', 'pleased', 'welcome', 'introduce', 'introduction', 'greet', 'greeting', 'morning', 'afternoon', 'evening', 'night', 'how', 'fine', 'well', 'thank', 'thanks', 'please', 'sorry', 'excuse', 'goodbye', 'bye', 'see'],
};

/**
 * Extract content words (non-stop-words) from text.
 * DETERMINISTIC.
 */
function extractContentWords(text) {
  const words = tokenize(text);
  return words.filter(w => !STOP_WORDS.has(w) && w.length > 1);
}

// Keyboard mash patterns (QWERTY layout sequences)
const KEYBOARD_MASH_PATTERNS = [
  'asdf', 'sdfg', 'dfgh', 'fghj', 'ghjk', 'hjkl', 'jkl',
  'qwer', 'wert', 'erty', 'rtyu', 'tyui', 'yuio', 'uiop',
  'zxcv', 'xcvb', 'cvbn', 'vbnm'
];

/**
 * Detect obvious gibberish patterns.
 * DETERMINISTIC.
 * 
 * Checks for:
 * - Excessive repeated characters (e.g., "aaaaaaa")
 * - Excessive consonant clusters (e.g., "bdfghjkl")
 * - Single character repeated as "words" (e.g., "a a a a a")
 * - All same word repeated (e.g., "hello hello hello hello")
 * - Keyboard mash patterns (e.g., "asdf", "qwer", "zxcv")
 * - High proportion of words without vowels
 * 
 * @param {string} text — normalized text
 * @param {string[]} words — tokenized words
 * @returns {boolean} — true if text appears to be gibberish
 */
function isGibberish(text, words) {
  if (!text || words.length === 0) return true;

  // Check for excessive repeated characters (4+ of the same char in a row)
  if (/(.)\1{3,}/i.test(text)) return true;

  // Check if all words are the same
  if (words.length >= 3 && words.every(w => w === words[0])) return true;

  // Check if most words are single characters
  const singleCharWords = words.filter(w => w.length === 1).length;
  if (words.length >= 3 && singleCharWords / words.length > 0.6) return true;

  // Check for keyboard mash sequence hits
  const lowerText = text.toLowerCase();
  const mashHits = KEYBOARD_MASH_PATTERNS.filter(pattern => lowerText.includes(pattern)).length;
  if (mashHits >= 2) return true;

  // Consonant clusters of 4+ consonants in a row (e.g. zxcv, dfgh, bcdf)
  const wordsWith4Consonants = words.filter(w => /[bcdfghjklmnpqrstvwxz]{4,}/i.test(w) && !/lengths|strengths|rhythm/i.test(w));
  if (wordsWith4Consonants.length >= 1 && words.length <= 6) return true;
  if (wordsWith4Consonants.length >= 2) return true;

  // Check for words of length >= 3 with no vowels at all (e.g. "jkl", "zxcv")
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'y']);
  const noVowelWords = words.filter(w => w.length >= 3 && !w.split('').some(c => vowels.has(c)));
  if (noVowelWords.length >= 2) return true;
  if (noVowelWords.length >= 1 && noVowelWords.length / words.length >= 0.25) return true;

  return false;
}

/**
 * Detect topic relevance between prompt and response.
 * 
 * HEURISTIC — this is NOT semantic understanding. It uses:
 * 1. Direct content word overlap between prompt and response
 * 2. Topic family matching (if prompt contains topic keywords,
 *    check if response contains related words)
 * 
 * This CAN produce false negatives (marking relevant responses
 * as irrelevant) when the response is topically related but uses
 * entirely different vocabulary than the prompt and topic families.
 * 
 * It CAN also produce false positives when unrelated text happens
 * to share keywords.
 * 
 * DETERMINISTIC (same input → same output).
 * 
 * @param {string} promptText — the question prompt
 * @param {string} responseText — the user's response
 * @returns {{ score: number, method: string, detail: string }}
 *   score: 0.0 to 1.0
 *   method: description of how relevance was determined
 */
function evaluateRelevance(promptText, responseText) {
  const promptWords = extractContentWords(promptText);
  const responseWords = extractContentWords(responseText);
  const responseAllWords = tokenize(responseText);

  if (responseAllWords.length < MIN_WORDS_FOR_RESPONSE) {
    return { score: 0.15, method: 'too_short', detail: 'Response too short to assess relevance' };
  }

  if (isGibberish(normalizeText(responseText), responseAllWords)) {
    return { score: 0.0, method: 'gibberish', detail: 'Response appears to be gibberish' };
  }

  // 1. Direct content word overlap
  const responseWordSet = new Set(responseWords);
  const promptContentWords = promptWords.filter(w => w.length > 2);
  let directOverlap = 0;
  for (const pw of promptContentWords) {
    if (responseWordSet.has(pw)) directOverlap++;
  }
  const directRatio = promptContentWords.length > 0
    ? directOverlap / promptContentWords.length
    : 0;

  // 2. Topic family matching
  const promptLower = normalizeText(promptText);
  let topicScore = 0;
  let matchedTopic = null;

  for (const [topic, family] of Object.entries(TOPIC_FAMILIES)) {
    // Check if prompt relates to this topic
    const promptTopicMatch = family.some(kw => promptLower.includes(kw));
    if (promptTopicMatch) {
      // Count how many topic family words appear in the response
      const responseLower = normalizeText(responseText);
      const responseTopicMatches = family.filter(kw => responseLower.includes(kw)).length;
      const thisTopicScore = Math.min(1, responseTopicMatches / 3); // 3+ topic words → 1.0
      if (thisTopicScore > topicScore) {
        topicScore = thisTopicScore;
        matchedTopic = topic;
      }
    }
  }

  // Combine: use the higher of direct overlap and topic matching
  // Both are heuristics; using the higher one reduces false negatives
  const combinedScore = Math.max(directRatio, topicScore);

  // Apply conservative scoring:
  // - If we found clear topic relevance → up to 0.85 (not 1.0, because
  //   we can't truly verify semantic relevance without NLP)
  // - If we found some overlap → proportional score
  // - If no signal at all → 0.3 (conservative benefit of doubt, since
  //   the response might be relevant in ways we can't detect)
  let finalScore;
  let method;
  let detail;

  if (combinedScore >= 0.5) {
    finalScore = 0.7 + (combinedScore * 0.3); // Range: 0.85–1.0
    method = matchedTopic ? `topic_match:${matchedTopic}` : 'direct_overlap';
    detail = `Found topical relevance signal (${Math.round(combinedScore * 100)}% keyword match)`;
  } else if (combinedScore >= 0.2) {
    finalScore = 0.4 + (combinedScore * 0.5); // Range: 0.5–0.65
    method = 'partial_overlap';
    detail = `Some topical overlap detected (${Math.round(combinedScore * 100)}%)`;
  } else {
    // No keyword signal — but the response might still be relevant.
    // We use a conservative middle score rather than 0.
    // A true semantic check would require an external NLP service.
    finalScore = 0.3;
    method = 'no_signal';
    detail = 'No keyword overlap detected. Response may still be relevant (semantic check would require NLP service)';
  }

  return { score: Math.round(finalScore * 100) / 100, method, detail };
}

/**
 * Evaluate basic grammar and sentence formation.
 * 
 * HEURISTIC — this catches common patterns only:
 * - Sentence starts with capital letter
 * - Sentence ends with punctuation
 * - Contains at least one verb-like structure
 * - No obvious double-word errors ("the the")
 * - Subject-verb patterns present
 * 
 * This is NOT a comprehensive grammar checker. Many grammar errors
 * will not be detected. For thorough grammar checking, an external
 * NLP grammar service would be required.
 * 
 * DETERMINISTIC.
 * 
 * @param {string} responseText — raw (unnormalized) response text
 * @returns {{ score: number, issues: string[] }}
 */
function evaluateGrammar(responseText) {
  if (!responseText || responseText.trim().length === 0) {
    return { score: 0, issues: ['No response provided'] };
  }

  const trimmed = responseText.trim();
  const words = trimmed.split(/\s+/);
  const issues = [];
  let deductions = 0;
  const maxDeductions = 5; // Normalize deductions against this

  if (words.length < MIN_WORDS_FOR_RESPONSE) {
    return { score: 0.2, issues: ['Response too short to assess grammar'] };
  }

  // Check 1: Starts with capital letter
  if (trimmed[0] !== trimmed[0].toUpperCase() || !/[A-Z]/i.test(trimmed[0])) {
    issues.push('Sentence does not start with a capital letter');
    deductions += 0.5;
  }

  // Check 2: Ends with punctuation
  const lastChar = trimmed[trimmed.length - 1];
  if (!/[.!?]/.test(lastChar)) {
    issues.push('Sentence does not end with punctuation');
    deductions += 0.5;
  }

  // Check 3: Double word errors ("the the", "I I")
  const lowerWords = words.map(w => w.toLowerCase());
  for (let i = 0; i < lowerWords.length - 1; i++) {
    if (lowerWords[i] === lowerWords[i + 1] && lowerWords[i].length > 1) {
      issues.push(`Repeated word: "${words[i]}"`);
      deductions += 0.5;
      break; // Count only once
    }
  }

  // Check 4: Has some sentence structure (contains at least a pronoun or noun-like word + verb-like word)
  const hasSubject = /\b(i|we|he|she|it|they|you|my|our|the|this|that|a|an)\b/i.test(trimmed);
  const hasVerb = /\b(is|am|are|was|were|have|has|had|do|does|did|will|would|could|should|can|go|went|come|came|like|enjoy|love|hate|eat|drink|play|read|write|study|work|walk|run|make|take|give|get|see|know|think|want|feel|need|try|start|begin|help|use|find|tell|say|ask|keep|call|put|mean|become|leave|show|hear|seem|turn|live|bring|happen|sit|stand|lose|pay|meet|include|continue|learn|change|lead|understand|watch|follow|stop|create|speak|buy|wait|serve|die|send|expect|build|stay|fall|cut|reach|kill|remain|suggest|raise|pass|sell|require|report|decide|pull|develop|provide|agree|hold|produce|open|move|talk|cook|sleep|wake|brush|bath|shower|exercise|practice|drive|ride|swim|dance|sing|draw|paint|listen|travel|shop|clean|wash)\b/i.test(trimmed);

  if (!hasSubject && !hasVerb) {
    issues.push('No clear sentence structure detected');
    deductions += 1;
  } else if (!hasVerb) {
    issues.push('No verb detected in response');
    deductions += 0.5;
  }

  // Check 5: Very basic article/preposition misuse patterns
  // (extremely limited — only catches the most obvious cases)
  if (/\b(a [aeiou])/i.test(trimmed) && !/\b(a unique|a university|a uniform|a united|a useful|a used|a user|a usual|a union|a unit|a European)/i.test(trimmed)) {
    // "a" before vowel sound (rough heuristic, has false positives)
    // Don't deduct — too unreliable
  }

  const score = Math.max(0, Math.min(1, 1 - (deductions / maxDeductions)));

  if (issues.length === 0) {
    issues.push('Basic grammar checks passed');
  }

  return { score: Math.round(score * 100) / 100, issues };
}

/**
 * Evaluate response completeness and depth.
 * 
 * DETERMINISTIC — based on word count and sentence count.
 * 
 * This checks structural completeness (length), not semantic depth.
 * True depth assessment would require semantic understanding.
 * 
 * @param {string} responseText — raw response
 * @returns {{ score: number, detail: string }}
 */
function evaluateCompleteness(responseText) {
  if (!responseText || responseText.trim().length === 0) {
    return { score: 0, detail: 'No response provided' };
  }

  const words = responseText.trim().split(/\s+/);
  const wordCount = words.length;

  // Count sentences (rough: split on sentence-ending punctuation)
  const sentences = responseText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;

  if (wordCount < MIN_WORDS_FOR_RESPONSE) {
    return { score: 0.15, detail: `Very short response (${wordCount} words)` };
  }

  // Score based on word count
  let wordScore;
  if (wordCount >= EXCELLENT_RESPONSE_WORDS) {
    wordScore = 1.0;
  } else if (wordCount >= GOOD_RESPONSE_WORDS) {
    wordScore = 0.7 + 0.3 * ((wordCount - GOOD_RESPONSE_WORDS) / (EXCELLENT_RESPONSE_WORDS - GOOD_RESPONSE_WORDS));
  } else {
    wordScore = 0.3 + 0.4 * ((wordCount - MIN_WORDS_FOR_RESPONSE) / (GOOD_RESPONSE_WORDS - MIN_WORDS_FOR_RESPONSE));
  }

  // Bonus for multiple sentences (indicates more complete response)
  let sentenceBonus = 0;
  if (sentenceCount >= 3) sentenceBonus = 0.1;
  else if (sentenceCount >= 2) sentenceBonus = 0.05;

  const score = Math.min(1, wordScore + sentenceBonus);
  const detail = `${wordCount} words, ${sentenceCount} sentence${sentenceCount !== 1 ? 's' : ''}`;

  return { score: Math.round(score * 100) / 100, detail };
}

/**
 * Evaluate vocabulary variety and richness.
 * 
 * DETERMINISTIC — based on unique word ratio and word length distribution.
 * 
 * Measures:
 * - Type-Token Ratio (unique words / total words)
 * - Proportion of words longer than 4 characters
 * 
 * This is a surface-level metric. True vocabulary assessment would
 * require word frequency databases and context-aware analysis.
 * 
 * @param {string} responseText — raw response
 * @returns {{ score: number, uniqueRatio: number, detail: string }}
 */
function evaluateVocabulary(responseText) {
  const words = tokenize(responseText);

  if (words.length < MIN_WORDS_FOR_RESPONSE) {
    return { score: 0.15, uniqueRatio: 0, detail: 'Too short to assess vocabulary' };
  }

  // Type-Token Ratio
  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / words.length;

  // Proportion of "longer" words (content-bearing)
  const longerWords = words.filter(w => w.length > 4);
  const longerRatio = longerWords.length / words.length;

  // Score TTR (higher = more diverse vocabulary)
  // TTR naturally decreases with text length, so we use generous thresholds
  let ttrScore;
  if (ttr >= 0.8) ttrScore = 1.0;
  else if (ttr >= 0.6) ttrScore = 0.7 + (ttr - 0.6) * 1.5;
  else if (ttr >= 0.4) ttrScore = 0.4 + (ttr - 0.4) * 1.5;
  else ttrScore = ttr;

  // Combine TTR with longer word ratio
  const score = Math.min(1, ttrScore * 0.7 + longerRatio * 0.3 + 0.1);

  return {
    score: Math.round(score * 100) / 100,
    uniqueRatio: Math.round(ttr * 100) / 100,
    detail: `${uniqueWords.size} unique words out of ${words.length} (TTR: ${Math.round(ttr * 100)}%)`
  };
}

/**
 * Evaluate clarity and naturalness.
 * 
 * HEURISTIC — checks for obviously unnatural patterns:
 * - Gibberish detection
 * - Excessive repetition
 * - Very long run-on sentences (no punctuation in long text)
 * - Random character sequences
 * 
 * This CANNOT assess true fluency or naturalness of expression.
 * True naturalness assessment would require an NLP model.
 * 
 * DETERMINISTIC.
 * 
 * @param {string} responseText — raw response
 * @returns {{ score: number, issues: string[] }}
 */
function evaluateClarity(responseText) {
  if (!responseText || responseText.trim().length === 0) {
    return { score: 0, issues: ['No response provided'] };
  }

  const words = tokenize(responseText);
  const issues = [];
  let deductions = 0;

  if (words.length < MIN_WORDS_FOR_RESPONSE) {
    return { score: 0.2, issues: ['Too short to assess clarity'] };
  }

  // Check 1: Gibberish
  if (isGibberish(normalizeText(responseText), words)) {
    return { score: 0.0, issues: ['Response appears to be gibberish or random text'] };
  }

  // Check 2: Excessive word repetition (same word appearing > 30% of the time)
  const wordCounts = {};
  for (const w of words) {
    wordCounts[w] = (wordCounts[w] || 0) + 1;
  }
  const maxRepeat = Math.max(...Object.values(wordCounts));
  if (maxRepeat / words.length > 0.3 && words.length > 3) {
    const repeatedWord = Object.entries(wordCounts).find(([, c]) => c === maxRepeat)[0];
    if (!STOP_WORDS.has(repeatedWord)) {
      issues.push(`Excessive repetition of "${repeatedWord}"`);
      deductions += 1;
    }
  }

  // Check 3: Run-on sentence (long text with no punctuation)
  const trimmed = responseText.trim();
  if (words.length > 15 && !/[.!?,;:]/.test(trimmed.slice(0, -1))) {
    issues.push('Long response with no punctuation (possible run-on sentence)');
    deductions += 0.5;
  }

  // Check 4: Very short words dominating (might indicate random typing)
  const tinyWords = words.filter(w => w.length <= 2);
  if (tinyWords.length / words.length > 0.6 && words.length > 5) {
    issues.push('Response dominated by very short words');
    deductions += 0.5;
  }

  const score = Math.max(0, Math.min(1, 1 - (deductions / 3)));

  if (issues.length === 0) {
    issues.push('No obvious clarity issues detected');
  }

  return { score: Math.round(score * 100) / 100, issues };
}

/**
 * Generate human-readable feedback from factor scores.
 * DETERMINISTIC.
 * 
 * @param {{ relevance: object, grammar: object, completeness: object, vocabulary: object, clarity: object }} factors
 * @param {number} totalScore — weighted total (0–1)
 * @returns {string} — feedback string
 */
function generateFeedback(factors, totalScore) {
  const parts = [];

  if (totalScore >= 0.85) {
    parts.push('Excellent response!');
  } else if (totalScore >= 0.70) {
    parts.push('Good response.');
  } else if (totalScore >= 0.50) {
    parts.push('Decent attempt.');
  } else if (totalScore >= 0.30) {
    parts.push('Needs improvement.');
  } else {
    parts.push('Response needs significant improvement.');
  }

  // Add specific feedback for weak areas
  if (factors.relevance.score < 0.5) {
    parts.push('Try to address the question more directly.');
  }
  if (factors.grammar.score < 0.5) {
    parts.push('Focus on using complete sentences with proper grammar.');
  }
  if (factors.completeness.score < 0.5) {
    parts.push('Try to give a more detailed answer.');
  }
  if (factors.vocabulary.score < 0.5) {
    parts.push('Try using a wider variety of words.');
  }
  if (factors.clarity.score < 0.5) {
    parts.push('Make sure your response is clear and natural.');
  }

  return parts.join(' ');
}

/**
 * Evaluate a single Creation question.
 * 
 * Pipeline:
 * 1. Check for empty/gibberish response
 * 2. Evaluate each factor independently
 * 3. Calculate weighted total score
 * 4. Generate feedback
 * 
 * All steps are DETERMINISTIC (same input → same output).
 * Relevance checking uses HEURISTIC keyword/topic matching, NOT semantic understanding.
 * 
 * @param {string} promptText — the question prompt
 * @param {string} responseText — the user's response (STT transcript or typed text)
 * @returns {{
 *   score: number,
 *   factors: {
 *     relevance: { score: number, weight: number, method: string, detail: string },
 *     grammar: { score: number, weight: number, issues: string[] },
 *     completeness: { score: number, weight: number, detail: string },
 *     vocabulary: { score: number, weight: number, uniqueRatio: number, detail: string },
 *     clarity: { score: number, weight: number, issues: string[] }
 *   },
 *   feedback: string,
 *   skipped: boolean
 * }}
 */
export function evaluateCreationQuestion(promptText, responseText) {
  // Handle empty response
  if (!responseText || responseText.trim().length === 0) {
    return {
      score: 0,
      factors: {
        relevance: { score: 0, weight: 0.25, method: 'empty', detail: 'No response provided' },
        grammar: { score: 0, weight: 0.25, issues: ['No response provided'] },
        completeness: { score: 0, weight: 0.20, detail: 'No response provided' },
        vocabulary: { score: 0, weight: 0.15, uniqueRatio: 0, detail: 'No response provided' },
        clarity: { score: 0, weight: 0.15, issues: ['No response provided'] }
      },
      feedback: 'No response was provided. Please speak or type your answer.',
      skipped: true
    };
  }

  // Handle gibberish / nonsensical text
  const normalizedWords = tokenize(responseText);
  if (isGibberish(normalizeText(responseText), normalizedWords)) {
    return {
      score: 0.05,
      factors: {
        relevance: { score: 0, weight: 0.25, method: 'gibberish', detail: 'Response appears to be gibberish or keyboard mash' },
        grammar: { score: 0.1, weight: 0.25, issues: ['Response appears to be gibberish or nonsensical text'] },
        completeness: { score: 0.1, weight: 0.20, detail: 'Response lacks meaningful content' },
        vocabulary: { score: 0.05, weight: 0.15, uniqueRatio: 0, detail: 'Nonsensical vocabulary' },
        clarity: { score: 0.0, weight: 0.15, issues: ['Response appears to be gibberish or random typing'] }
      },
      feedback: 'Response appears to be gibberish or random typing. Please provide a clear, meaningful answer.',
      skipped: false
    };
  }

  // Evaluate each factor
  const relevance = evaluateRelevance(promptText, responseText);
  const grammar = evaluateGrammar(responseText);
  const completeness = evaluateCompleteness(responseText);
  const vocabulary = evaluateVocabulary(responseText);
  const clarity = evaluateClarity(responseText);

  // Calculate weighted score
  const factorScores = {
    relevance: relevance.score,
    grammar: grammar.score,
    completeness: completeness.score,
    vocabulary: vocabulary.score,
    clarity: clarity.score
  };

  const totalScore = calculateCreationWeightedScore(factorScores);

  // Build structured factors object
  const factors = {
    relevance: { score: relevance.score, weight: 0.25, method: relevance.method, detail: relevance.detail },
    grammar: { score: grammar.score, weight: 0.25, issues: grammar.issues },
    completeness: { score: completeness.score, weight: 0.20, detail: completeness.detail },
    vocabulary: { score: vocabulary.score, weight: 0.15, uniqueRatio: vocabulary.uniqueRatio || 0, detail: vocabulary.detail },
    clarity: { score: clarity.score, weight: 0.15, issues: clarity.issues }
  };

  const feedback = generateFeedback(factors, totalScore);

  return {
    score: totalScore,
    factors,
    feedback,
    skipped: false
  };
}

/**
 * Evaluate all Creation questions in a level.
 * 
 * @param {Array<{ prompt: string }>} questions — array of question objects
 * @param {Object<number, string>} answers — map of questionIndex → answer text
 * @returns {Array} — array of evaluation results, one per question
 */
export function evaluateCreationLevel(questions, answers) {
  return questions.map((q, idx) => {
    const answer = answers[idx] || '';
    return evaluateCreationQuestion(q.prompt, answer);
  });
}
