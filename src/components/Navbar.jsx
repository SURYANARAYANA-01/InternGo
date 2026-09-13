import React from 'react';
import { Sparkles, Flame, Star, Key } from 'lucide-react';

export default function Navbar({
  gameState,
  onOpenBackupModal
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--navbar-bg)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-glass)',
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              InternGo
            </h1>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              Gamified Skill Trainer
            </span>
          </div>
        </div>

        {/* Stats & Actions (Right aligned) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

          {/* Stars badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)',
            padding: '6px 14px', borderRadius: '20px', color: '#f59e0b', fontSize: '0.88rem', fontWeight: 700
          }}>
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
            <span>{gameState.stars} Stars</span>
          </div>

          {/* Streak badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)',
            padding: '6px 14px', borderRadius: '20px', color: '#f87171', fontSize: '0.88rem', fontWeight: 700
          }}>
            <Flame size={16} fill="#f87171" color="#f87171" />
            <span>{gameState.streak} Days</span>
          </div>

          {/* Backup Key Button */}
          <button
            onClick={onOpenBackupModal}
            className="btn-secondary"
            title="Backup or Restore Progress Code"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <Key size={15} color="var(--accent-secondary)" />
            <span>Backup Code</span>
          </button>
        </div>
      </div>
    </header>
  );
}
