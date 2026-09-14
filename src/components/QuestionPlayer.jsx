import React, { useState, useEffect } from 'react';
import { APTITUDE_LEVELS } from '../data/aptitudeLevels';
import { REASONING_LEVELS } from '../data/reasoningLevels';
import { PROBLEM_SOLVING_LEVELS } from '../data/problemSolvingLevels';
import { Star, CheckCircle, XCircle, RotateCcw, ArrowLeft, ArrowRight, Award, BookOpen, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import AdBanner from './AdBanner';

export default function QuestionPlayer({ category, levelNumber, onExit, onComplete, onWatchAdForExplanation }) {
  const categoryMap = {
    aptitude: APTITUDE_LEVELS,
    reasoning: REASONING_LEVELS,
    problem_solving: PROBLEM_SOLVING_LEVELS
  };

  const levelList = categoryMap[category] || APTITUDE_LEVELS;
  const levelData = levelList.find(l => l.levelNumber === levelNumber) || levelList[0];
  const questions = levelData.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationUnlocked, setExplanationUnlocked] = useState(false);
  const [explanationAdError, setExplanationAdError] = useState(null);

  // Trigger massive celebratory color paper (confetti) animation upon reaching result screen
  useEffect(() => {
    if (isSubmitted && finalResult) {
      try {
        const colors = ['#f59e0b', '#ec4899', '#6366f1', '#10b981', '#06b6d4', '#8b5cf6', '#f97316', '#eab308'];

        // 1. Massive Center Explosion (Shooting high and wide across whole screen)
        confetti({
          particleCount: 160,
          spread: 120,
          startVelocity: 65,
          ticks: 350,
          origin: { x: 0.5, y: 0.5 },
          colors: colors,
          scalar: 1.15
        });

        // 2. High-power Left & Right Corner Cannons
        confetti({
          particleCount: 90,
          angle: 55,
          spread: 85,
          startVelocity: 75,
          ticks: 350,
          origin: { x: -0.05, y: 0.75 },
          colors: colors,
          scalar: 1.1
        });
        confetti({
          particleCount: 90,
          angle: 125,
          spread: 85,
          startVelocity: 75,
          ticks: 350,
          origin: { x: 1.05, y: 0.75 },
          colors: colors,
          scalar: 1.1
        });

        // 3. Continuous Full-Screen Festive Shower for 3 seconds
        const end = Date.now() + 3000;

        const frame = () => {
          // Left stream
          confetti({
            particleCount: 7,
            angle: 60,
            spread: 70,
            startVelocity: 60,
            origin: { x: 0, y: 0.7 },
            colors: colors,
            ticks: 300
          });
          // Right stream
          confetti({
            particleCount: 7,
            angle: 120,
            spread: 70,
            startVelocity: 60,
            origin: { x: 1, y: 0.7 },
            colors: colors,
            ticks: 300
          });
          // Center sky fall
          if (Math.random() < 0.3) {
            confetti({
              particleCount: 6,
              angle: 270,
              spread: 120,
              startVelocity: 25,
              origin: { x: Math.random(), y: -0.05 },
              colors: colors,
              ticks: 320
            });
          }

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        requestAnimationFrame(frame);
      } catch (err) {
        console.error('Confetti animation error:', err);
      }
    }
  }, [isSubmitted, finalResult]);

  const currentQ = questions[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];
  const isAnswerSelected = selectedOption !== undefined;

  const handleSelectOption = (index) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: index
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        score += 1;
      }
    });

    let stars = 0;
    if (score === 10) stars = 3;
    else if (score >= 8) stars = 2;
    else if (score >= 7) stars = 1;

    const result = { score, total: questions.length, stars };
    setFinalResult(result);
    setIsSubmitted(true);

    if (onComplete) {
      onComplete(score, stars);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setFinalResult(null);
  };

  // Difficulty badge styling
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy':
        return { bg: 'rgba(16, 185, 129, 0.14)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' };
      case 'Medium':
        return { bg: 'rgba(245, 158, 11, 0.14)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' };
      case 'Hard':
        return { bg: 'rgba(239, 68, 68, 0.14)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' };
      default:
        return { bg: 'rgba(99, 102, 241, 0.14)', text: '#6366f1', border: 'rgba(99, 102, 241, 0.3)' };
    }
  };

  // -------------------------------------------------------------
  // RESULT SCREEN
  // -------------------------------------------------------------
  if (isSubmitted && finalResult) {
    const { score, total, stars } = finalResult;
    const percentage = Math.round((score / total) * 100);

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        overflowY: 'auto'
      }} className="animate-fade-in">
        <div className="result-card-padding" style={{
          width: '100%',
          maxWidth: '500px',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          borderRadius: '28px',
          padding: '38px 32px 32px 32px',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Curved 3 Stars Creating a Small Arch */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '18px',
            height: '84px',
            paddingBottom: '6px'
          }}>
            {/* Star 1 (Left): Tilted left & Lowered */}
            <Star
              size={46}
              fill={1 <= stars ? '#f59e0b' : 'none'}
              color={1 <= stars ? '#f59e0b' : 'var(--text-dim)'}
              strokeWidth={1 <= stars ? 2 : 1.5}
              style={{
                transform: 'translateY(16px) rotate(-18deg)',
                filter: 1 <= stars ? 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.75))' : 'none',
                opacity: 1 <= stars ? 1 : 0.35,
                transition: 'all 0.3s ease'
              }}
            />

            {/* Star 2 (Center): Peak of Arch, Elevated & Larger */}
            <Star
              size={64}
              fill={2 <= stars ? '#f59e0b' : 'none'}
              color={2 <= stars ? '#f59e0b' : 'var(--text-dim)'}
              strokeWidth={2 <= stars ? 2 : 1.5}
              style={{
                transform: 'translateY(-2px)',
                filter: 2 <= stars ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.9))' : 'none',
                opacity: 2 <= stars ? 1 : 0.35,
                transition: 'all 0.3s ease'
              }}
            />

            {/* Star 3 (Right): Tilted right & Lowered */}
            <Star
              size={46}
              fill={3 <= stars ? '#f59e0b' : 'none'}
              color={3 <= stars ? '#f59e0b' : 'var(--text-dim)'}
              strokeWidth={3 <= stars ? 2 : 1.5}
              style={{
                transform: 'translateY(16px) rotate(18deg)',
                filter: 3 <= stars ? 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.75))' : 'none',
                opacity: 3 <= stars ? 1 : 0.35,
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          {/* Under Arch: 10/10 */}
          <div style={{
            fontSize: '3rem',
            fontWeight: 900,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em',
            marginTop: '12px',
            lineHeight: 1
          }}>
            {score}/{total}
          </div>

          {/* Under 10/10: Congratulations!!! */}
          <div style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--accent-primary)',
            letterSpacing: '0.01em',
            marginTop: '6px'
          }}>
            Congratulations!!!
          </div>

          {/* Level Title subtitle */}
          <div style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginTop: '2px',
            marginBottom: '10px'
          }}>
            Level {levelNumber}: {levelData.topic}
          </div>

          {/* Action Buttons Row: Retry Level & Back to Levels */}
          <div className="result-actions-row" style={{ display: 'flex', gap: '14px', width: '100%', marginTop: '6px' }}>
            <button
              onClick={handleRestart}
              className="btn-secondary"
              style={{
                flex: 1,
                padding: '12px 18px',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '16px'
              }}
            >
              <RotateCcw size={16} />
              <span>Retry Level</span>
            </button>

            <button
              onClick={onExit}
              className="btn-primary"
              style={{
                flex: 1,
                padding: '12px 18px',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '16px'
              }}
            >
              <span>Back to Levels</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Explanation Button — Ad-gated */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <button
              onClick={() => {
                if (explanationUnlocked) {
                  // Already unlocked this session — toggle freely
                  setShowExplanation(prev => !prev);
                } else {
                  // Need to watch Ad first
                  setExplanationAdError(null);
                  if (onWatchAdForExplanation) {
                    onWatchAdForExplanation(
                      () => {
                        setExplanationUnlocked(true);
                        setShowExplanation(true);
                      },
                      () => {
                        setExplanationAdError('Ad not available. Please try again later.');
                      }
                    );
                  } else {
                    // Fallback: no Ad handler, open directly
                    setExplanationUnlocked(true);
                    setShowExplanation(true);
                  }
                }
              }}
              className="btn-secondary"
              style={{
                padding: '11px 36px',
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '16px',
                background: showExplanation ? 'rgba(99, 102, 241, 0.18)' : 'var(--bg-card)',
                borderColor: showExplanation ? 'var(--accent-primary)' : 'var(--border-glass)'
              }}
            >
              <BookOpen size={16} color="var(--accent-primary)" />
              <span>{explanationUnlocked ? 'Explanation' : '🎬 Watch Ad for Explanation'}</span>
            </button>

            {/* Ad error for explanation */}
            {explanationAdError && (
              <div style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444',
                fontSize: '0.82rem',
                fontWeight: 600
              }}>
                {explanationAdError}
              </div>
            )}
          </div>

          {/* Explanation Modal / Dropdown View */}
          {showExplanation && (
            <div style={{
              width: '100%',
              marginTop: '16px',
              padding: '16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-glass)',
              borderRadius: '20px',
              textAlign: 'left',
              maxHeight: '280px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Question Explanations
                </span>
                <button
                  onClick={() => setShowExplanation(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>

              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div key={idx} style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                      Q{idx + 1}. {q.question}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ color: isCorrect ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                        {isCorrect ? '✓ Correct' : `✗ Your answer: ${userAns !== undefined ? q.options[userAns] : 'Not answered'}`}
                      </span>
                      {!isCorrect && (
                        <span style={{ color: '#10b981', fontWeight: 600 }}>
                          (Correct: {q.options[q.correctIndex]})
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Policy-Compliant Display Ad on Results Screen */}
        <AdBanner style={{ marginTop: '20px', maxWidth: '500px' }} />
      </div>
    );
  }

  // -------------------------------------------------------------
  // QUESTION PLAYER SCREEN
  // -------------------------------------------------------------
  const diffStyle = getDifficultyColor(currentQ.difficulty);
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }} className="animate-fade-in">

      {/* Top Bar */}
      <div className="question-topbar" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        borderBottom: '1px solid var(--border-glass)',
        background: 'var(--bg-primary)',
        zIndex: 10
      }}>
        <button
          onClick={onExit}
          className="btn-secondary back-btn"
          style={{ padding: '8px 18px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Level Title & Question Index */}
        <div className="question-topbar-title" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Level {levelNumber}: {levelData.topic}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="question-diff-badge" style={{
          padding: '6px 14px',
          borderRadius: '16px',
          background: diffStyle.bg,
          color: diffStyle.text,
          border: `1px solid ${diffStyle.border}`,
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.02em'
        }}>
          {currentQ.difficulty}
        </div>
      </div>

      {/* Progress Track */}
      <div style={{ width: '100%', height: '4px', background: 'var(--border-glass)' }}>
        <div style={{
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Question Content Area */}
      <div className="question-content-padding" style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px'
      }}>
        <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Question Text Box */}
          <div className="question-box-padding" style={{
            padding: '28px 32px',
            borderRadius: '20px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Question {currentIndex + 1}
            </span>
            <h3 className="question-title-text" style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.45,
              marginTop: '8px'
            }}>
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQ.options.map((optionText, optIndex) => {
              const isSelected = selectedOption === optIndex;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelectOption(optIndex)}
                  className="option-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    background: isSelected ? 'rgba(99, 102, 241, 0.16)' : 'var(--bg-surface)',
                    border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-glass)',
                    color: isSelected ? 'var(--text-main)' : 'var(--text-main)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 0 20px rgba(99, 102, 241, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-glow)';
                      e.currentTarget.style.background = 'var(--bg-card-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-glass)';
                      e.currentTarget.style.background = 'var(--bg-surface)';
                    }
                  }}
                >
                  {/* Option Letter Badge */}
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: isSelected ? 'var(--accent-primary)' : 'var(--bg-input)',
                    color: isSelected ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {optionLetters[optIndex]}
                  </div>

                  <span style={{ fontSize: '1.02rem', fontWeight: 600, flex: 1 }}>
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Bar (Next / Submit button) */}
          <div className="question-nav-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingTop: '12px'
          }}>
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!isAnswerSelected}
                className="btn-primary"
                style={{
                  padding: '12px 32px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  opacity: isAnswerSelected ? 1 : 0.5,
                  cursor: isAnswerSelected ? 'pointer' : 'not-allowed',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: isAnswerSelected ? '0 6px 20px rgba(16, 185, 129, 0.45)' : 'none'
                }}
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAnswerSelected}
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  opacity: isAnswerSelected ? 1 : 0.5,
                  cursor: isAnswerSelected ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
