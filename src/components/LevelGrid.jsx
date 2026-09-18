import React from 'react';
import { Calculator, Brain, Lightbulb } from 'lucide-react';

export default function LevelGrid({ onSelectCategory }) {
  const categoryButtons = [
    {
      id: 'aptitude',
      title: 'Aptitude',
      icon: Calculator,
      color: '#4F46E5',
      bg: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      glow: '0 10px 32px rgba(79, 70, 229, 0.5)',
      iconBg: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'reasoning',
      title: 'Reasoning',
      icon: Brain,
      color: '#7C3AED',
      bg: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      glow: '0 10px 32px rgba(124, 58, 237, 0.5)',
      iconBg: 'rgba(255, 255, 255, 0.2)'
    },
    {
      id: 'problem_solving',
      title: 'Problem Solving',
      icon: Lightbulb,
      color: '#0891B2',
      bg: 'linear-gradient(135deg, #0891B2 0%, #155E75 100%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      glow: '0 10px 32px rgba(8, 145, 178, 0.5)',
      iconBg: 'rgba(255, 255, 255, 0.2)'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0 20px'
    }} className="animate-fade-in">

      {/* Hero / Value Proposition Section */}
      <div style={{ textAlign: 'center', maxWidth: '620px', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--accent-primary)',
          marginBottom: '14px'
        }}>
          <span>✦ 130 Skill Levels · 1300 Curated Placement Questions</span>
        </div>

        <h2 style={{
          fontSize: '2.1rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--text-main) 65%, var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.25,
          marginBottom: '10px'
        }}>
          Master Campus Placements &amp; Aptitude Tests
        </h2>

        <p style={{
          fontSize: '0.96rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          margin: '0 auto',
          maxWidth: '520px'
        }}>
          Free gamified training for Quantitative Aptitude, Logical Reasoning, and Problem Solving. Level up with granular topics, earn stars, and learn step-by-step shortcuts.
        </p>
      </div>

      {/* 3 CENTERED BUTTONS STACKED ONE UNDER ANOTHER */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '22px',
        width: '100%',
        maxWidth: '440px',
        margin: '0 auto'
      }}>
        {categoryButtons.map((btn) => {
          const Icon = btn.icon;

          return (
            <button
              key={btn.id}
              onClick={() => onSelectCategory && onSelectCategory(btn.id)}
              className="glass-card glass-card-hover"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 28px',
                borderRadius: '22px',
                background: btn.bg,
                border: btn.border,
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: btn.glow,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Symbol Icon Pinned to the Left */}
              <div style={{
                position: 'absolute',
                left: '20px',
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: btn.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 16px ${btn.color}66`
              }}>
                <Icon size={24} color="#ffffff" />
              </div>

              {/* Text Aligned in the Exact Center */}
              <span style={{
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.01em',
                textAlign: 'center'
              }}>
                {btn.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
