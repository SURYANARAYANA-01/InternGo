import React, { useEffect, useRef } from 'react';

/**
 * Google AdSense Compliant Banner Ad Component
 *
 * AdSense Policy Compliance:
 * - Labeled strictly as "Advertisement"
 * - Contained in dedicated display boundaries
 * - Safe single-push execution for React SPAs
 */
export default function AdBanner({
  slotId = '',
  format = 'auto',
  responsive = 'true',
  style = {}
}) {
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Only push if not already pushed and AdSense script is available
    if (!pushedRef.current && adRef.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (err) {
        console.warn('AdSense display banner push error:', err);
      }
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px auto',
      width: '100%',
      maxWidth: '728px',
      overflow: 'hidden',
      ...style
    }}>
      {/* Official Policy-Compliant Label */}
      <span style={{
        fontSize: '0.68rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-dim)',
        marginBottom: '6px'
      }}>
        Advertisement
      </span>

      {/* Google AdSense Unit Container */}
      <div style={{
        width: '100%',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)'
      }}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client="ca-pub-5075059773558528"
          data-ad-slot={slotId || undefined}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
}
