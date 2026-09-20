/**
 * speechService.js
 * Reusable Text-to-Speech (TTS) and Speech-to-Text (STT) utilities
 * using the browser's built-in Web Speech API.
 *
 * Both APIs are free, require no keys, and work in modern browsers.
 */

// ─────────────────────────────────────────────
// TEXT-TO-SPEECH (TTS)
// ─────────────────────────────────────────────

/**
 * Speaks a sentence aloud using the browser's SpeechSynthesis API.
 *
 * @param {string} text        - The sentence to read aloud.
 * @param {object} [options]   - Optional overrides.
 * @param {string} [options.lang='en-US']  - BCP-47 language tag.
 * @param {number} [options.rate=0.9]      - Speech rate (0.1–10). Slightly slow for clarity.
 * @param {number} [options.pitch=1]       - Pitch (0–2).
 * @param {number} [options.volume=1]      - Volume (0–1).
 * @param {function} [options.onEnd]       - Called when speech finishes.
 * @param {function} [options.onError]     - Called with an error message on failure.
 * @returns {SpeechSynthesisUtterance|null} The utterance (allows cancel), or null if unsupported.
 */
export function speakSentence(text, options = {}) {
  if (!window.speechSynthesis) {
    if (options.onError) options.onError('Text-to-Speech is not supported in this browser.');
    return null;
  }

  // Cancel any currently playing speech first
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang   = options.lang   ?? 'en-US';
  utterance.rate   = options.rate   ?? 0.9;
  utterance.pitch  = options.pitch  ?? 1;
  utterance.volume = options.volume ?? 1;

  if (options.onEnd)   utterance.onend   = options.onEnd;
  if (options.onError) utterance.onerror = (e) => options.onError(e.error || 'TTS error');

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Stops any currently playing TTS immediately.
 */
export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Returns true if TTS is supported in this browser.
 */
export function isTTSSupported() {
  return 'speechSynthesis' in window;
}


// ─────────────────────────────────────────────
// SPEECH-TO-TEXT (STT)
// ─────────────────────────────────────────────

let _recognition = null; // singleton instance

/**
 * Returns the browser's SpeechRecognition constructor, or null if unsupported.
 */
function getSpeechRecognitionClass() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/**
 * Returns true if microphone/STT is supported in this browser.
 */
export function isSTTSupported() {
  return !!getSpeechRecognitionClass();
}

/**
 * Starts listening to the microphone and returns recognised text via callback.
 *
 * @param {object} callbacks
 * @param {function} callbacks.onResult   - Called with the recognised string when speech ends.
 * @param {function} callbacks.onError    - Called with an error message on failure.
 * @param {function} [callbacks.onStart]  - Called when recording actually begins.
 * @param {function} [callbacks.onEnd]    - Called when recognition session ends (success or not).
 * @param {string}   [lang='en-US']       - BCP-47 language tag.
 */
export function startListening({ onResult, onError, onStart, onEnd }, lang = 'en-US') {
  const SpeechRecognition = getSpeechRecognitionClass();
  if (!SpeechRecognition) {
    if (onError) onError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    return;
  }

  // Stop any previous session cleanly
  if (_recognition) {
    try { _recognition.abort(); } catch (_) {}
    _recognition = null;
  }

  _recognition = new SpeechRecognition();
  _recognition.lang            = lang;
  _recognition.interimResults  = false; // final result only
  _recognition.maxAlternatives = 1;
  _recognition.continuous      = false;

  _recognition.onstart = () => {
    if (onStart) onStart();
  };

  _recognition.onresult = (event) => {
    const transcript = event.results[0]?.[0]?.transcript?.trim() || '';
    if (onResult) onResult(transcript);
  };

  _recognition.onerror = (event) => {
    let msg = 'Microphone error.';
    if (event.error === 'not-allowed' || event.error === 'permission-denied') {
      msg = 'Microphone permission was denied. Please allow microphone access and try again.';
    } else if (event.error === 'no-speech') {
      msg = 'No speech was detected. Please try speaking again.';
    } else if (event.error === 'network') {
      msg = 'A network error occurred with speech recognition.';
    } else {
      msg = `Speech recognition error: ${event.error}`;
    }
    if (onError) onError(msg);
  };

  _recognition.onend = () => {
    _recognition = null;
    if (onEnd) onEnd();
  };

  try {
    _recognition.start();
  } catch (err) {
    if (onError) onError('Failed to start microphone: ' + err.message);
    _recognition = null;
  }
}

/**
 * Stops the current microphone recognition session gracefully.
 */
export function stopListening() {
  if (_recognition) {
    try { _recognition.stop(); } catch (_) {}
    _recognition = null;
  }
}

/**
 * Returns true if a recognition session is currently active.
 */
export function isListening() {
  return _recognition !== null;
}

/**
 * Requests microphone permission proactively (prompts the browser).
 * Resolves to { granted: true } or { granted: false, error: string }.
 *
 * @returns {Promise<{ granted: boolean, error?: string }>}
 */
export async function requestMicrophonePermission() {
  if (!navigator.mediaDevices?.getUserMedia) {
    return { granted: false, error: 'Microphone not supported in this browser.' };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Release the stream immediately; we only needed the permission prompt.
    stream.getTracks().forEach((t) => t.stop());
    return { granted: true };
  } catch (err) {
    const msg =
      err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
        ? 'Microphone permission was denied.'
        : `Microphone error: ${err.message}`;
    return { granted: false, error: msg };
  }
}
