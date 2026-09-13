/**
 * Ad Helper — Rewarded Ad Integration
 *
 * Replace the body of showRewardedAd() with your real Ad SDK code.
 * The function must call onSuccess() when the user finishes watching,
 * or onFail(reason) if the Ad fails / is dismissed early.
 */
export function showRewardedAd(onSuccess, onFail) {
  // ── PLACEHOLDER ──────────────────────────────────────────────────
  // Remove the line below and add your real Ad SDK call here.
  // Example structure (replace with your SDK):
  //
  //   YourAdSDK.showRewardedAd({
  //     onRewarded: () => onSuccess(),
  //     onDismissed: () => onFail('dismissed'),
  //     onError: (err) => onFail(err),
  //   });
  //
  onSuccess(); // <- DELETE THIS LINE when integrating real Ad SDK
  // ─────────────────────────────────────────────────────────────────
}
