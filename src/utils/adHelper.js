/**
 * H5 Games Ad Placement API helper.
 *
 * IMPORTANT:
 * - Rewards are granted only from adViewed().
 * - If no ad is shown, the reward is NOT granted.
 * - There is intentionally no production fallback that unlocks content
 *   when the Ad Placement API is unavailable.
 */

export function showRewardedAd(onSuccess, onFail) {
  if (typeof window === 'undefined' || typeof window.adBreak !== 'function') {
    if (onFail) onFail('Rewarded ads are not available right now.');
    return;
  }

  let settled = false;

  const fail = (reason) => {
    if (settled) return;
    settled = true;
    if (onFail) onFail(reason);
  };

  const succeed = () => {
    if (settled) return;
    settled = true;
    if (onSuccess) onSuccess();
  };

  try {
    window.adBreak({
      type: 'reward',
      name: 'unlock_content',

      // The user has already explicitly clicked the Watch Ad button.
      // This is the direct user action required to start the rewarded ad.
      beforeReward: (showAdFn) => {
        try {
          showAdFn();
        } catch (err) {
          fail('Unable to start the rewarded ad.');
        }
      },

      beforeAd: () => {
        // The app can pause interaction here if needed.
      },

      afterAd: () => {
        // Resume normal interaction after the ad finishes/dismisses.
      },

      // Reward only after Google confirms that the ad was viewed to completion.
      adViewed: () => {
        succeed();
      },

      // No reward when the user dismisses the ad before completion.
      adDismissed: () => {
        fail('Ad was closed before completion.');
      },

      // This callback runs even when no ad is shown. Never grant a reward here.
      adBreakDone: (placementInfo) => {
        const status = placementInfo?.breakStatus;

        if (status === 'viewed') {
          // Normally handled by adViewed(). Keep this as a no-op so the reward
          // is never granted twice.
          return;
        }

        if (!settled) {
          fail('Rewarded ad is not available right now. Please try again later.');
        }
      }
    });
  } catch (err) {
    console.warn('H5 Games Ad Placement API error:', err);
    fail('Rewarded ad is not available right now.');
  }
}
