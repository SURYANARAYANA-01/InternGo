import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LevelGrid from './components/LevelGrid';
import QuestionPlayer from './components/QuestionPlayer';
import BackupModal from './components/BackupModal';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';

import { getGameState, updateLevelProgress, unlockNextTwoLevels } from './utils/storage';
import { showRewardedAd } from './utils/adHelper';
import { CATEGORY_LEVELS } from './data/levels';
import { Star, Lock } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState(getGameState());
  const [activeCategoryPage, setActiveCategoryPage] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [policyModalType, setPolicyModalType] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adError, setAdError] = useState(null);

  const handleSelectCategory = (cat) => {
    setActiveCategoryPage(cat);
    setIsScrolled(false);
    setAdError(null);
  };

  const handleWatchAd = () => {
    setAdError(null);
    showRewardedAd(
      () => {
        // Ad completed — unlock next 2 levels for this category
        const updated = unlockNextTwoLevels(activeCategoryPage);
        setGameState(updated);
      },
      (reason) => {
        setAdError('Ad not available. Please try again later.');
      }
    );
  };

  const handleScroll = (e) => {
    // Show second Watch Ad button only after first one has completely scrolled out of view
    setIsScrolled(e.target.scrollTop >= 70);
  };

  const categoryTitles = {
    aptitude: 'Quantitative Aptitude',
    reasoning: 'Logical Reasoning',
    problem_solving: 'Problem Solving'
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Navigation Bar */}
      <Navbar
        gameState={gameState}
        onOpenBackupModal={() => setShowBackupModal(true)}
      />

      {/* Main View Controller */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeLevel ? (
          /* LEVEL QUESTION PLAYER */
          <QuestionPlayer
            category={activeCategoryPage}
            levelNumber={activeLevel}
            onExit={() => setActiveLevel(null)}
            onComplete={(score, stars) => {
              const levelId = `level-${activeCategoryPage}-${activeLevel}`;
              const updated = updateLevelProgress(levelId, score, 10);
              setGameState(updated);
            }}
            onWatchAdForExplanation={(onSuccess, onFail) =>
              showRewardedAd(onSuccess, onFail)
            }
          />
        ) : activeCategoryPage ? (
          /* CATEGORY PAGE */
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
            {/* Top Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '16px 32px',
              borderBottom: '1px solid var(--border-glass)',
              background: 'var(--bg-primary)',
              zIndex: 10
            }}>
              <button
                onClick={() => setActiveCategoryPage(null)}
                className="btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap', minWidth: '170px' }}
              >
                ← Back to Categories
              </button>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                whiteSpace: 'nowrap',
                margin: 0
              }}>
                {categoryTitles[activeCategoryPage] || activeCategoryPage}
              </h2>
              <div style={{ flex: 1 }} />
              {/* Watch Ad button — only visible when scrolled */}
              {isScrolled && (
                <button
                  onClick={handleWatchAd}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.88rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', whiteSpace: 'nowrap' }}
                >
                  🎬 Watch Ad
                </button>
              )}
            </div>

            {/* Scrollable Content */}
            <div
              onScroll={handleScroll}
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '24px 32px 40px 32px' }}>
                <div style={{ paddingLeft: '190px', paddingRight: '190px' }}>

                  {/* Watch Ad row */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: adError ? '8px' : '20px'
                  }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      Watch ad to unlock the next two levels
                    </span>
                    <button
                      onClick={handleWatchAd}
                      className="btn-primary"
                      style={{ padding: '8px 20px', fontSize: '0.88rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', whiteSpace: 'nowrap' }}
                    >
                      🎬 Watch Ad
                    </button>
                  </div>

                  {/* Ad error message */}
                  {adError && (
                    <div style={{
                      marginBottom: '16px',
                      padding: '10px 16px',
                      borderRadius: '12px',
                      background: 'rgba(239,68,68,0.12)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}>
                      {adError}
                    </div>
                  )}

                  {/* Level boxes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(CATEGORY_LEVELS[activeCategoryPage] || []).map((topic, index) => {
                      const levelNum = index + 1;
                      const levelId = `level-${activeCategoryPage}-${levelNum}`;
                      const earnedStars = gameState?.userProgress?.[levelId]?.stars || 0;
                      const unlockedLevels = gameState?.unlockedLevels?.[activeCategoryPage] || [1];
                      const isUnlocked = unlockedLevels.includes(levelNum);

                      return (
                        <div
                          key={index}
                          onClick={() => isUnlocked && setActiveLevel(levelNum)}
                          className={isUnlocked ? 'glass-card glass-card-hover' : 'glass-card'}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '18px 24px',
                            borderRadius: '16px',
                            background: isUnlocked ? 'var(--bg-glass)' : 'var(--bg-surface)',
                            border: !isUnlocked
                              ? '1px solid var(--border-glass)'
                              : earnedStars >= 1
                                ? '1.5px solid #10b981'
                                : '1px solid var(--border-glass)',
                            cursor: isUnlocked ? 'pointer' : 'not-allowed',
                            opacity: isUnlocked ? 1 : 0.5,
                            transition: 'all 0.25s ease',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          {/* DONE ribbon */}
                          {isUnlocked && earnedStars >= 1 && (
                            <div style={{
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
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.16)',
                              zIndex: 2,
                              pointerEvents: 'none'
                            }}>
                              DONE
                            </div>
                          )}

                          <div>
                            <div style={{ fontSize: '1.02rem', fontWeight: 700, color: isUnlocked ? 'var(--text-main)' : 'var(--text-muted)', marginBottom: '4px' }}>
                              Level {levelNum}: {topic}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                              10 Questions.
                            </div>
                          </div>

                          {/* Right side: stars OR lock icon */}
                          {isUnlocked ? (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              flexShrink: 0,
                              marginLeft: '16px',
                              marginRight: earnedStars >= 1 ? '36px' : '0px',
                              transition: 'margin 0.2s ease'
                            }}>
                              {[1, 2, 3].map((starNum) => {
                                const isEarned = starNum <= earnedStars;
                                return (
                                  <Star
                                    key={starNum}
                                    size={22}
                                    fill={isEarned ? '#f59e0b' : 'none'}
                                    color={isEarned ? '#f59e0b' : 'var(--text-dim)'}
                                    strokeWidth={isEarned ? 2 : 1.8}
                                    style={{
                                      filter: isEarned ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))' : 'none',
                                      opacity: isEarned ? 1 : 0.4,
                                      transition: 'all 0.2s ease'
                                    }}
                                  />
                                );
                              })}
                            </div>
                          ) : (
                            <div style={{ flexShrink: 0, marginLeft: '16px' }}>
                              <Lock size={22} color="var(--text-dim)" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: 'auto' }}>
                <Footer
                  onOpenPrivacy={() => setPolicyModalType('privacy')}
                  onOpenTerms={() => setPolicyModalType('terms')}
                />
              </div>
            </div>

          </div>
        ) : (
          /* HOME PAGE */
          <>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LevelGrid onSelectCategory={handleSelectCategory} />
            </div>
            <Footer
              onOpenPrivacy={() => setPolicyModalType('privacy')}
              onOpenTerms={() => setPolicyModalType('terms')}
            />
          </>
        )}
      </main>

      {/* Backup Code Modal */}
      {showBackupModal && (
        <BackupModal
          onClose={() => setShowBackupModal(false)}
          onStateRestored={(newState) => setGameState(newState)}
        />
      )}

      {/* Privacy Policy / Terms Modal */}
      {policyModalType && (
        <PrivacyModal
          type={policyModalType}
          onClose={() => setPolicyModalType(null)}
        />
      )}
    </div>
  );
}
