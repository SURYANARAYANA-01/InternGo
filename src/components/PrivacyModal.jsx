import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export default function PrivacyModal({ type, onClose }) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="modal-overlay">
      <div className="glass-card animate-fade-in" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '32px',
        borderRadius: '24px',
        position: 'relative',
        maxHeight: '85vh',
        overflowY: 'auto'
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '18px', right: '18px',
            background: 'none', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          {isPrivacy
            ? <ShieldCheck size={26} color="var(--accent-primary)" />
            : <FileText size={26} color="var(--accent-primary)" />
          }
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h3>
        </div>

        {/* Content */}
        <div style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {isPrivacy ? (
            <>
              <p>
                <strong style={{ color: 'var(--text-main)' }}>Effective Date: 2026.</strong>{' '}
                InternGo values your privacy. This policy explains how data is managed when you use our gamified skill trainer.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>1. Local Progress Storage</h4>
              <p>
                All your level progression, stars earned, and daily streaks are stored{' '}
                <strong>100% locally on your browser using LocalStorage</strong>. We do not collect or transmit your progress data to any external server.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>2. Advertising &amp; Cookies</h4>
              <p>
                We use third-party advertising partners (such as Google AdSense &amp; Video Ad Networks) to serve ads. These companies may use cookies or device identifiers based on your browsing activity.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>3. Backup Code Security</h4>
              <p>
                Your Backup Progress Code is a client-side encoded string of your LocalStorage state. Store it safely to restore your progress on any device at any time, for free.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong style={{ color: 'var(--text-main)' }}>Terms of Service.</strong>{' '}
                By accessing InternGo, you agree to comply with these terms.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>1. Educational Purpose</h4>
              <p>
                InternGo provides gamified quantitative aptitude, logical reasoning, and problem-solving practice for candidates preparing for competitive exams and campus placements.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>2. Ad-Supported Access</h4>
              <p>
                Access to locked batch levels and answer reviews requires watching video advertisements. Bypassing or blocking ad checkpoints via automated tools is strictly prohibited.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>3. No Warranty</h4>
              <p>
                Content is provided for training purposes. InternGo makes no guarantees regarding exam outcomes based on platform usage.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
