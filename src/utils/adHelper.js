/**
 * Ad Helper — Google AdSense Rewarded Ad & Interstitial Integration
 *
 * Implements the official Google Ad Placement API (H5 Games & Web Apps)
 * via window.adBreak({ type: 'reward', ... })
 */

export function showRewardedAd(onSuccess, onFail) {
  // If window.adBreak is available (Google Ad Placement API loaded)
  if (typeof window !== 'undefined' && typeof window.adBreak === 'function') {
    let adShown = false;
    let rewardGranted = false;

    try {
      window.adBreak({
        type: 'reward',
        name: 'unlock_content',
        beforeReward: (showAdFn) => {
          adShown = true;
          showAdFn();
        },
        beforeAd: () => {
          // Game or test paused
        },
        afterAd: () => {
          // Resume normal state
        },
        adDismissed: () => {
          if (!rewardGranted && onFail) {
            onFail('Ad was closed before completion.');
          }
        },
        adViewed: () => {
          rewardGranted = true;
          if (onSuccess) onSuccess();
        },
        adBreakDone: (placementInfo) => {
          // If no ad was served (e.g. adblock, fill rate limit, frequency cap)
          if (!adShown) {
            if (placementInfo && placementInfo.breakStatus === 'frequencyCapped') {
              if (onSuccess) onSuccess();
            } else if (onFail) {
              onFail('Ad not currently available. Please try again in a few moments.');
            } else if (onSuccess) {
              onSuccess();
            }
          }
        }
      });
      return;
    } catch (err) {
      console.warn('AdSense adBreak execution error:', err);
    }
  }

  // Graceful fallback for local development or when AdSense is unavailable
  if (onSuccess) {
    onSuccess();
  }
}
