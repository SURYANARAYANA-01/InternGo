import React from 'react';
import { Star, Lock } from 'lucide-react';
import Footer from './Footer';
import { CATEGORY_LEVELS } from '../data/levels';
import { COMM_CREATION_LEVELS } from '../data/commCreationData';

// Topic names from levels.js (matching other categories), falling back to data file
const CREATION_LEVELS = CATEGORY_LEVELS?.comm_creation || COMM_CREATION_LEVELS.map((l) => l.topic);


/**
 * CreationPage
 * Shows the first 5 Creation levels.
 * Level 1 is always unlocked; others unlock sequentially (1 star required).
 *
 * Props:
 *   onBack()                          – return to Communication Skills page
 *   unlockedLevels  (number[])        – array of unlocked level numbers for creation
 *   userProgress    (object)          – progress keyed by level id
 *   onSelectLevel   (levelNum: number)– called when user taps an unlocked level
 */
export default function CreationPage({
  onBack,
  unlockedLevels = [1],
  userProgress = {},
  onSelectLevel,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAbout,
  onOpenContact
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      className="animate-fade-in"
    >
      {/* Top Bar */}
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
          flexWrap: 'wrap',
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
            flexShrink: 1,
          }}
        >
          Creation
        </h2>
        <div style={{ flex: 1 }} />
      </div>

      {/* Scrollable level list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '20px 0 40px 0' }}>
          <div className="category-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CREATION_LEVELS.map((topic, index) => {
                const levelNum = index + 1;
                const levelId = `level-comm_creation-${levelNum}`;
                const earnedStars = userProgress?.[levelId]?.stars || 0;
                const isUnlocked = unlockedLevels.includes(levelNum);

                return (
                  <div
                    key={levelNum}
                    onClick={() => isUnlocked && onSelectLevel && onSelectLevel(levelNum)}
                    className="glass-card level-card-inner"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 24px',
                      borderRadius: '16px',
                      background: 'var(--bg-glass)',
                      border: earnedStars >= 1
                        ? '1.5px solid #10b981'
                        : '1px solid var(--border-glass)',
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      opacity: isUnlocked ? 1 : 0.5,
                      transition: 'all 0.25s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      gap: '12px',
                    }}
                  >
                    {/* DONE ribbon */}
                    {earnedStars >= 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '-28px',
                          transform: 'rotate(45deg)',
                          width: '110px',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#ffffff',
                          textAlign: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          padding: '3px 0',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.16)',
                          zIndex: 2,
                          pointerEvents: 'none',
                        }}
                      >
                        DONE
                      </div>
                    )}

                    <div>
                      <div
                        style={{
                          fontSize: '1.02rem',
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          marginBottom: '4px',
                        }}
                      >
                        Level {levelNum}: {topic}
                      </div>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                          fontWeight: 500,
                        }}
                      >
                        {isUnlocked
                          ? '5 Questions.'
                          : 'Complete the previous level to unlock.'}
                      </div>
                    </div>

                    {/* Stars or Lock */}
                    <div
                      className="level-card-stars"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        flexShrink: 0,
                        marginLeft: '16px',
                        marginRight: earnedStars >= 1 ? '36px' : '0px',
                        transition: 'margin 0.2s ease',
                      }}
                    >
                      {isUnlocked ? (
                        [1, 2, 3].map((starNum) => {
                          const isEarned = starNum <= earnedStars;
                          return (
                            <Star
                              key={starNum}
                              size={22}
                              fill={isEarned ? '#f59e0b' : 'none'}
                              color={isEarned ? '#f59e0b' : 'var(--text-dim)'}
                              strokeWidth={isEarned ? 2 : 1.8}
                              style={{
                                filter: isEarned
                                  ? 'drop-shadow(0 0 6px rgba(245,158,11,0.6))'
                                  : 'none',
                                opacity: isEarned ? 1 : 0.4,
                                transition: 'all 0.2s ease',
                              }}
                            />
                          );
                        })
                      ) : (
                        <Lock
                          size={22}
                          color="var(--text-dim)"
                          strokeWidth={1.8}
                          style={{ opacity: 0.7 }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto' }}>
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
