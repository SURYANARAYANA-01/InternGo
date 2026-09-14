import React from 'react';
import { Shield, FileText, Info, Mail } from 'lucide-react';

export default function Footer({ onOpenPrivacy, onOpenTerms, onOpenAbout, onOpenContact }) {
  return (
    <footer style={{
      background: 'var(--navbar-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--border-glass)',
      padding: '36px 24px 20px 24px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/logo.png"
              alt="InternGo Logo"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                objectFit: 'contain'
              }}
            />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                InternGo
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                Gamified Skill &amp; Aptitude Trainer
              </span>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenAbout}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'inherit', fontSize: 'inherit',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Info size={14} />
              <span>About Us</span>
            </button>
            <button
              onClick={onOpenContact}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'inherit', fontSize: 'inherit',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Mail size={14} />
              <span>Contact</span>
            </button>
            <button
              onClick={onOpenPrivacy}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'inherit', fontSize: 'inherit',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Shield size={14} />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={onOpenTerms}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: 'inherit', fontSize: 'inherit',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <FileText size={14} />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '16px',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.78rem',
          color: 'var(--text-dim)'
        }}>
          <span>© 2026 InternGo. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
