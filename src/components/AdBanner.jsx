import React from 'react';

/**
 * Display-ad component intentionally disabled for now.
 *
 * InternGo's current screens are primarily interactive quiz, level-selection,
 * result, and utility screens. Keeping the display-ad unit out of these
 * screens avoids serving Google display ads in places that may be considered
 * low-value or primarily navigational/interactive.
 *
 * Rewarded H5 Games ads are handled separately by src/utils/adHelper.js.
 */
export default function AdBanner() {
  return null;
}
