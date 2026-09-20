const STORAGE_KEY = 'interngo_game_state_v2';

// unlockedLevels: per-category array of unlocked level numbers.
// Level 1 is always free. Watching an Ad unlocks the next 2 locked levels.
const DEFAULT_STATE = {
  userProgress: {}, // { 'level-aptitude-1': { stars: 3, score: 10, completed: true } }
  unlockedLevels: { aptitude: [1], reasoning: [1], problem_solving: [1], comm_reading: [1], comm_creation: [1] },
  streak: 1,
  lastPlayDate: new Date().toISOString().split('T')[0],
  totalStars: 0,
  xp: 0
};

export const getGameState = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_STATE;
    const parsed = JSON.parse(data);

    // Check daily streak logic
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastPlayDate;
    if (lastDate) {
      const diffDays = Math.floor((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        parsed.streak = 1; // Streak reset if missed more than 1 day
      }
    }

    // Deep-merge unlockedLevels so every category always has at least [1]
    const mergedUnlockedLevels = {
      ...DEFAULT_STATE.unlockedLevels,
      ...(parsed.unlockedLevels || {})
    };
    return { ...DEFAULT_STATE, ...parsed, unlockedLevels: mergedUnlockedLevels };
  } catch (err) {
    console.error('Failed to read local storage:', err);
    return DEFAULT_STATE;
  }
};

export const saveGameState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save to local storage:', err);
  }
};

/**
 * Unlocks the next 2 locked levels for the given category.
 * e.g. if aptitude has [1] unlocked → unlocks [1,2,3]
 *      if aptitude has [1,2,3] unlocked → unlocks [1,2,3,4,5]
 */
export const unlockNextTwoLevels = (category, totalLevels = 30) => {
  const current = getGameState();
  const unlocked = current.unlockedLevels[category] || [1];
  const maxUnlocked = Math.max(...unlocked);

  const newLevels = [];
  for (let i = 1; i <= 2; i++) {
    const next = maxUnlocked + i;
    if (next <= totalLevels && !unlocked.includes(next)) {
      newLevels.push(next);
    }
  }

  if (newLevels.length === 0) return current; // already all unlocked

  const updated = {
    ...current,
    unlockedLevels: {
      ...current.unlockedLevels,
      [category]: [...unlocked, ...newLevels]
    }
  };
  saveGameState(updated);
  return updated;
};

export const updateLevelProgress = (levelId, score, questionsCount) => {
  const current = getGameState();
  const percentage = (score / questionsCount) * 100;
  let stars = 0;
  if (percentage >= 85) stars = 3;
  else if (percentage >= 70) stars = 2;
  else if (percentage >= 50) stars = 1;

  const existingStars = current.userProgress[levelId]?.stars || 0;
  const newStarsGain = Math.max(0, stars - existingStars);

  const updatedProgress = {
    ...current.userProgress,
    [levelId]: {
      score: Math.max(current.userProgress[levelId]?.score || 0, score),
      stars: Math.max(existingStars, stars),
      completed: percentage >= 50
    }
  };

  // Sequential unlock: earning >= 1 star unlocks the next level in that category
  // levelId format: "level-<category>-<levelNum>"
  let updatedUnlockedLevels = { ...current.unlockedLevels };
  if (stars >= 1) {
    const parts = levelId.split('-');
    // Support categories like "problem_solving" (multi-segment): last part is number
    const levelNum = parseInt(parts[parts.length - 1], 10);
    const category = parts.slice(1, parts.length - 1).join('_');
    if (!isNaN(levelNum) && category) {
      const nextLevel = levelNum + 1;
      const currentUnlocked = updatedUnlockedLevels[category] || [1];
      if (nextLevel <= 30 && !currentUnlocked.includes(nextLevel)) {
        updatedUnlockedLevels = {
          ...updatedUnlockedLevels,
          [category]: [...currentUnlocked, nextLevel]
        };
      }
    }
  }

  const updatedState = {
    ...current,
    userProgress: updatedProgress,
    unlockedLevels: updatedUnlockedLevels,
    totalStars: current.totalStars + newStarsGain,
    stars: (current.stars || current.totalStars || 0) + newStarsGain,
    xp: current.xp + (score * 10) + (stars * 50),
    lastPlayDate: new Date().toISOString().split('T')[0],
    streak: current.streak
  };

  saveGameState(updatedState);
  return updatedState;
};

// Solution 1: Export & Import Backup Code System (100% Free)
export const generateBackupCode = () => {
  const current = getGameState();
  const jsonStr = JSON.stringify(current);
  const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
  return `IG-${base64}`;
};

export const restoreFromBackupCode = (code) => {
  try {
    const trimmed = code.trim();
    if (!trimmed.startsWith('IG-')) throw new Error('Invalid backup code format');
    const base64 = trimmed.substring(3);
    const jsonStr = decodeURIComponent(escape(atob(base64)));
    const parsed = JSON.parse(jsonStr);

    if (parsed && typeof parsed === 'object' && parsed.userProgress) {
      saveGameState(parsed);
      return { success: true, state: parsed };
    }
    throw new Error('Corrupted backup code payload');
  } catch (err) {
    console.error('Restore error:', err);
    return { success: false, error: err.message };
  }
};
