import React from 'react';
import { X, ShieldCheck, FileText, Info, Mail } from 'lucide-react';

export default function PrivacyModal({ type, onClose }) {
  const getHeader = () => {
    switch (type) {
      case 'privacy':
        return { title: 'Privacy Policy', icon: <ShieldCheck size={26} color="var(--accent-primary)" /> };
      case 'terms':
        return { title: 'Terms of Service', icon: <FileText size={26} color="var(--accent-primary)" /> };
      case 'about':
        return { title: 'About InternGo', icon: <Info size={26} color="var(--accent-primary)" /> };
      case 'contact':
        return { title: 'Contact & Support', icon: <Mail size={26} color="var(--accent-primary)" /> };
      default:
        return { title: 'Information', icon: <Info size={26} color="var(--accent-primary)" /> };
    }
  };

  const header = getHeader();

  return (
    <div className="modal-overlay">
      <div className="glass-card animate-fade-in modal-card" style={{
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
          {header.icon}
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
            {header.title}
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
          {type === 'privacy' ? (
            <>
              <p>
                <strong style={{ color: 'var(--text-main)' }}>Effective Date: 2026.</strong>{' '}
                InternGo values your privacy. This policy outlines how information is handled when you use our gamified skill trainer.
              </p>
              
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>1. Local Progress Storage</h4>
              <p>
                All your level progression, stars earned, and daily streaks are stored{' '}
                <strong>100% locally on your device using browser LocalStorage</strong>. We do not require registration, do not collect personal identities, and do not transmit your quiz performance data to external servers.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>2. Google AdSense &amp; Third-Party Advertising</h4>
              <p>
                We partner with <strong>Google AdSense</strong> and authorized ad networks to serve advertisements (including display banners and rewarded video ads):
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  Third-party vendors, including <strong>Google</strong>, use cookies to serve ads based on a user's prior visits to this website or other websites on the internet.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its partners to serve personalized ads to users based on their visits to our site and/or other sites across the web.
                </li>
              </ul>

              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>3. Opt-Out &amp; Privacy Controls</h4>
              <p>
                Users have full control over advertising preferences and may opt out of personalized advertising:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  You can opt out of personalized Google advertising by visiting{' '}
                  <a
                    href="https://myadcenter.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
                  >
                    Google My Ad Center
                  </a>.
                </li>
                <li>
                  Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
                  >
                    www.aboutads.info
                  </a>.
                </li>
                <li>
                  To understand how Google uses information from sites or apps that use their services, please review{' '}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
                  >
                    Google's Partner Technologies Policy
                  </a>.
                </li>
              </ul>

              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>4. Backup Code Security</h4>
              <p>
                Your Backup Progress Code is an encoded export of your device's local state. It contains no personal information and can be freely copied to restore your game state on any browser.
              </p>
            </>
          ) : type === 'terms' ? (
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
          ) : type === 'about' ? (
            <>
              <p>
                <strong style={{ color: 'var(--text-main)' }}>Welcome to InternGo!</strong>{' '}
                InternGo is a modern, gamified learning platform created to help college students, job seekers, and graduates master placement aptitude and reasoning tests.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>1. Comprehensive Curriculum</h4>
              <p>
                Our platform features 90 distinct levels across Quantitative Aptitude, Logical Reasoning, and Problem Solving. Each level contains 10 structured questions spanning Easy, Medium, and Hard tiers, complete with detailed step-by-step explanations and mathematical shortcut techniques.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>2. Free &amp; Accessible For Everyone</h4>
              <p>
                We believe high-quality placement preparation should be accessible to all students regardless of financial background. InternGo requires no paid subscriptions, no mandatory sign-ups, and is fully ad-supported through Google AdSense.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>3. Local Progress Privacy</h4>
              <p>
                Your stars, daily streaks, and level completions are saved securely in your browser's local storage, ensuring zero personal data tracking.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong style={{ color: 'var(--text-main)' }}>Get in Touch.</strong>{' '}
                Have questions, suggestions, feedback, or noticed an error in a question? We are here to help!
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>1. Student &amp; User Support</h4>
              <p>
                For general support, feedback on questions, or bug reports, please email us directly:
              </p>
              <p style={{
                background: 'var(--bg-card)',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--border-glass)',
                color: 'var(--accent-primary)',
                fontWeight: 700
              }}>
                ✉ contact.interngo@gmail.com
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>2. Question Feedback &amp; Corrections</h4>
              <p>
                If you believe an answer explanation contains an error or calculation discrepancy, please include the Category Name, Level Number, and Question Index in your email so our academic review team can verify and update it immediately.
              </p>
              <h4 style={{ color: 'var(--text-main)', fontWeight: 700 }}>3. Response Time</h4>
              <p>
                We typically respond to student inquiries within 24 to 48 hours.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
