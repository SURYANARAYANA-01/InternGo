import React from 'react';
import { BookOpen, PenLine } from 'lucide-react';
import Footer from './Footer';

/**
 * CommSkillsPage
 * The landing page for Communication Skills.
 * Shows two sub-section buttons: Reading and Creation.
 *
 * Props:
 *   onBack()              – return to Home
 *   onSelectSection(id)   – navigate to 'reading' or 'creation'
 */
export default function CommSkillsPage({
  onBack,
  onSelectSection,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAbout,
  onOpenContact
}) {
  const sections = [
    {
      id: 'reading',
      title: 'Reading',
      Icon: BookOpen,
      bg: 'linear-gradient(135deg, #059669 0%, #065f46 100%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      glow: '0 10px 32px rgba(5, 150, 105, 0.5)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      color: '#059669',
      description: 'Improve pronunciation & fluency'
    },
    {
      id: 'creation',
      title: 'Creation',
      Icon: PenLine,
      bg: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      glow: '0 10px 32px rgba(217, 119, 6, 0.5)',
      iconBg: 'rgba(255, 255, 255, 0.2)',
      color: '#d97706',
      description: 'Write emails, messages & more'
    }
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      className="animate-fade-in"
    >
      {/* Top Bar — mirrors the existing category topbar */}
      <div
        className="category-topbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 32px',
          borderBottom: '1px solid var(--border-glass)',
          background: 'var(--bg-primary)',
          zIndex: 10,
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={onBack}
          className="btn-secondary back-btn"
          style={{ padding: '8px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
        >
          ← Back
        </button>
        <h2
          className="category-title"
          style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            margin: 0,
            flexShrink: 1
          }}
        >
          Communication Skills
        </h2>
        <div style={{ flex: 1 }} />
      </div>

      {/* Scrollable body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
        {/* Section description */}
        <div style={{ textAlign: 'center', maxWidth: '520px', marginBottom: '36px' }}>
          <p style={{
            fontSize: '0.97rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            margin: 0
          }}>
            Build real-world communication skills — practice English reading aloud and master professional writing.
          </p>
        </div>

        {/* Two section buttons — same style as LevelGrid category buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '22px',
          width: '100%',
          maxWidth: '440px'
        }}>
          {sections.map((sec) => {
            const Icon = sec.Icon;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection && onSelectSection(sec.id)}
                className="glass-card glass-card-hover"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '28px 28px 22px 28px',
                  borderRadius: '22px',
                  background: sec.bg,
                  border: sec.border,
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: sec.glow,
                  position: 'relative',
                  overflow: 'hidden',
                  gap: '10px'
                }}
              >
                {/* Icon pinned top-left */}
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: sec.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 16px ${sec.color}66`
                }}>
                  <Icon size={24} color="#ffffff" />
                </div>

                {/* Title */}
                <span style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  textAlign: 'center'
                }}>
                  {sec.emoji} {sec.title}
                </span>

                {/* Sub-description */}
                <span style={{
                  fontSize: '0.83rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.80)',
                  textAlign: 'center'
                }}>
                  {sec.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', width: '100%' }}>
        <Footer
          onOpenPrivacy={onOpenPrivacy}
          onOpenTerms={onOpenTerms}
          onOpenAbout={onOpenAbout}
          onOpenContact={onOpenContact}
        />
      </div>
    </div>
  </div>
);
}
