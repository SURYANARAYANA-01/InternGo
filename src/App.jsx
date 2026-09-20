import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LevelGrid from './components/LevelGrid';
import QuestionPlayer from './components/QuestionPlayer';
import BackupModal from './components/BackupModal';
import Footer from './components/Footer';
import PrivacyModal from './components/PrivacyModal';
import CommSkillsPage from './components/CommSkillsPage';
import ReadingPage from './components/ReadingPage';
import CreationPage from './components/CreationPage';
import ReadingPlayer from './components/ReadingPlayer';
import CreationPlayer from './components/CreationPlayer';

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
  // Communication Skills navigation: null = comm skills home, 'reading' | 'creation' = sub-page
  const [commSkillsSection, setCommSkillsSection] = useState(null);
  const [activeCommLevel, setActiveCommLevel] = useState(null);

  const handleSelectCategory = (cat) => {
    if (cat === 'comm_skills') {
      setActiveCategoryPage('comm_skills');
      setCommSkillsSection(null);
      setActiveCommLevel(null);
      return;
    }
    setActiveCategoryPage(cat);
    setActiveCommLevel(null);
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
        ) : activeCategoryPage === 'comm_skills' ? (
          /* ── COMMUNICATION SKILLS PAGES ── */
          commSkillsSection === 'reading' ? (
            activeCommLevel ? (
              <ReadingPlayer
                levelNumber={activeCommLevel}
                onExit={() => setActiveCommLevel(null)}
                onComplete={(score, questionsCount = 5) => {
                  const levelId = `level-comm_reading-${activeCommLevel}`;
                  const updated = updateLevelProgress(levelId, score, questionsCount || 5);
                  setGameState(updated);
                }}
              />
            ) : (
              <ReadingPage
                onBack={() => setCommSkillsSection(null)}
                unlockedLevels={gameState?.unlockedLevels?.comm_reading || [1]}
                userProgress={gameState?.userProgress || {}}
                onSelectLevel={(lvl) => setActiveCommLevel(lvl)}
                onOpenPrivacy={() => setPolicyModalType('privacy')}
                onOpenTerms={() => setPolicyModalType('terms')}
                onOpenAbout={() => setPolicyModalType('about')}
                onOpenContact={() => setPolicyModalType('contact')}
              />
            )
          ) : commSkillsSection === 'creation' ? (
            activeCommLevel ? (
              <CreationPlayer
                levelNumber={activeCommLevel}
                onExit={() => setActiveCommLevel(null)}
                onComplete={(score, questionsCount = 5) => {
                  const levelId = `level-comm_creation-${activeCommLevel}`;
                  const updated = updateLevelProgress(levelId, score, questionsCount || 5);
                  setGameState(updated);
                }}
              />
            ) : (
              <CreationPage
                onBack={() => setCommSkillsSection(null)}
                unlockedLevels={gameState?.unlockedLevels?.comm_creation || [1]}
                userProgress={gameState?.userProgress || {}}
                onSelectLevel={(lvl) => setActiveCommLevel(lvl)}
                onOpenPrivacy={() => setPolicyModalType('privacy')}
                onOpenTerms={() => setPolicyModalType('terms')}
                onOpenAbout={() => setPolicyModalType('about')}
                onOpenContact={() => setPolicyModalType('contact')}
              />
            )
          ) : (
            <CommSkillsPage
              onBack={() => {
                setActiveCategoryPage(null);
                setActiveCommLevel(null);
              }}
              onSelectSection={(id) => {
                setCommSkillsSection(id);
                setActiveCommLevel(null);
              }}
              onOpenPrivacy={() => setPolicyModalType('privacy')}
              onOpenTerms={() => setPolicyModalType('terms')}
              onOpenAbout={() => setPolicyModalType('about')}
              onOpenContact={() => setPolicyModalType('contact')}
            />
          )
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
            <div className="category-topbar" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 32px',
              borderBottom: '1px solid var(--border-glass)',
              background: 'var(--bg-primary)',
              zIndex: 10,
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setActiveCategoryPage(null)}
                className="btn-secondary back-btn"
                style={{ padding: '8px 18px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
              >
                ← Back
              </button>
              <h2 className="category-title" style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                margin: 0,
                flexShrink: 1
              }}>
                {categoryTitles[activeCategoryPage] || activeCategoryPage}
              </h2>
              <div style={{ flex: 1 }} />
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
              <div style={{ padding: '20px 0 40px 0' }}>
                <div className="category-container">

                  {/* Level boxes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(CATEGORY_LEVELS[activeCategoryPage] || []).map((topic, index) => {
                      const levelNum = index + 1;
                      const levelId = `level-${activeCategoryPage}-${levelNum}`;
                      const earnedStars = gameState?.userProgress?.[levelId]?.stars || 0;
                      const unlockedArr = gameState?.unlockedLevels?.[activeCategoryPage] || [1];
                      const isUnlocked = unlockedArr.includes(levelNum);

                      return (
                        <div
                          key={index}
                          onClick={() => isUnlocked && setActiveLevel(levelNum)}
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
                            gap: '12px'
                          }}
                        >
                          {/* DONE ribbon */}
                          {earnedStars >= 1 && (
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
                            <div style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                              Level {levelNum}: {topic}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                              {isUnlocked ? '10 Questions.' : 'Complete the previous level to unlock.'}
                            </div>
                          </div>

                          {/* Right side: stars or lock icon */}
                          <div className="level-card-stars" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            flexShrink: 0,
                            marginLeft: '16px',
                            marginRight: earnedStars >= 1 ? '36px' : '0px',
                            transition: 'margin 0.2s ease'
                          }}>
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
                                      filter: isEarned ? 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))' : 'none',
                                      opacity: isEarned ? 1 : 0.4,
                                      transition: 'all 0.2s ease'
                                    }}
                                  />
                                );
                              })
                            ) : (
                              <Lock size={22} color="var(--text-dim)" strokeWidth={1.8} style={{ opacity: 0.7 }} />
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
                  onOpenPrivacy={() => setPolicyModalType('privacy')}
                  onOpenTerms={() => setPolicyModalType('terms')}
                  onOpenAbout={() => setPolicyModalType('about')}
                  onOpenContact={() => setPolicyModalType('contact')}
                />
              </div>
            </div>

          </div>
        ) : (
          /* HOME PAGE */
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 16px 50px 16px'
            }}>
              <LevelGrid onSelectCategory={handleSelectCategory} />
            </div>

            {/* Footer at bottom of scrollable content */}
            <div style={{ marginTop: 'auto' }}>
              <Footer
                onOpenPrivacy={() => setPolicyModalType('privacy')}
                onOpenTerms={() => setPolicyModalType('terms')}
                onOpenAbout={() => setPolicyModalType('about')}
                onOpenContact={() => setPolicyModalType('contact')}
              />
            </div>
          </div>
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
