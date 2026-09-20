import React, { useState, useEffect } from 'react';
import { COMM_CREATION_LEVELS } from '../data/commCreationData';
import { startListening, stopListening } from '../utils/speechService';
import { evaluateCreationLevel } from '../utils/creationEvaluator';
import { calculateLevelResult, toStorageFormat } from '../utils/commScoring';
import { Star, Mic, MicOff, RotateCcw, ArrowLeft, ArrowRight, CheckCircle2, BookOpen, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CreationPlayer({ levelNumber, onExit, onComplete }) {
  const levelData = COMM_CREATION_LEVELS.find(l => l.levelNumber === levelNumber) || COMM_CREATION_LEVELS[0];
  const questions = levelData.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answers, setAnswers] = useState({}); // { [index]: string }
  const [hasSpokenMap, setHasSpokenMap] = useState({}); // { [index]: boolean }
  const [micError, setMicError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const currentAnswer = answers[currentIndex] || '';
  const hasSpoken = !!hasSpokenMap[currentIndex] || currentAnswer.trim().length > 0;

  // Clean up recording on unmount or question change
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  useEffect(() => {
    stopListening();
    setIsRecording(false);
    setMicError(null);
  }, [currentIndex]);

  // Confetti on result
  useEffect(() => {
    if (isSubmitted && finalResult) {
      try {
        const colors = ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#06b6d4'];
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: colors
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [isSubmitted, finalResult]);

  // STT dictate answer — replaces previous text instead of appending
  const handleRecord = () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
      return;
    }

    setMicError(null);
    setIsRecording(true);

    startListening({
      onStart: () => setIsRecording(true),
      onResult: (transcript) => {
        setIsRecording(false);
        // Replace previous answer with new spoken transcript
        setAnswers(prev => ({ ...prev, [currentIndex]: transcript.trim() }));
        setHasSpokenMap(prev => ({ ...prev, [currentIndex]: true }));
      },
      onError: (msg) => {
        setIsRecording(false);
        setMicError(msg);
      },
      onEnd: () => setIsRecording(false)
    });
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    setAnswers(prev => ({ ...prev, [currentIndex]: val }));
    if (val.trim().length > 0) {
      setHasSpokenMap(prev => ({ ...prev, [currentIndex]: true }));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    stopListening();

    // Evaluate all questions using the creation evaluator
    const results = evaluateCreationLevel(questions, answers);
    setEvaluationResults(results);

    // Calculate level score using commScoring
    const questionScores = results.map(r => r.score);
    const levelResult = calculateLevelResult(questionScores);

    setFinalResult({
      totalScore: levelResult.totalScore,
      maxScore: levelResult.maxScore,
      percentage: levelResult.percentage,
      stars: levelResult.stars,
      total: questions.length
    });
    setIsSubmitted(true);

    // Pass score to App.jsx via onComplete
    if (onComplete) {
      const { score, questionsCount } = toStorageFormat(levelResult);
      onComplete(score, questionsCount);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setHasSpokenMap({});
    setIsSubmitted(false);
    setFinalResult(null);
    setEvaluationResults(null);
    setShowExplanation(false);
  };



  // Helper: get question score category label
  const getScoreLabel = (score) => {
    if (score >= 0.85) return { label: 'Excellent', color: '#10b981' };
    if (score >= 0.70) return { label: 'Good', color: '#3b82f6' };
    if (score >= 0.50) return { label: 'Fair', color: '#f59e0b' };
    if (score >= 0.30) return { label: 'Needs Work', color: '#f97316' };
    return { label: 'Poor', color: '#ef4444' };
  };

  // -------------------------------------------------------------
  // RESULT SCREEN
  // -------------------------------------------------------------
  if (isSubmitted && finalResult) {
    const { totalScore, maxScore, percentage, stars, total } = finalResult;

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto'
      }} className="animate-fade-in">
        <div className="glass-card" style={{
          maxWidth: '540px',
          width: '100%',
          padding: '36px 28px',
          borderRadius: '24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid var(--border-glass)'
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

          <div style={{
            fontSize: '3rem',
            fontWeight: 900,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em',
            marginTop: '12px',
            lineHeight: 1
          }}>
            {totalScore}/{maxScore}
          </div>

          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {Math.round(percentage)}% overall score
          </div>

          <div style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: 'var(--accent-primary)',
            letterSpacing: '0.01em',
            marginTop: '6px'
          }}>
            {percentage >= 85 ? 'Congratulations!!!' : percentage >= 70 ? 'Great Job!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
          </div>

          <div style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            fontWeight: 500,
            marginTop: '2px',
            marginBottom: '16px'
          }}>
            Level {levelNumber}: {levelData.topic}
          </div>

          {/* Action buttons */}
          <div className="result-actions-row" style={{ display: 'flex', gap: '14px', width: '100%', marginBottom: '16px' }}>
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

          {/* View Explanations Toggle Button */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setShowExplanation(prev => !prev)}
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
                background: showExplanation ? 'rgba(217, 119, 6, 0.18)' : 'var(--bg-card)',
                borderColor: showExplanation ? '#d97706' : 'var(--border-glass)'
              }}
            >
              <BookOpen size={16} color="#d97706" />
              <span>{showExplanation ? 'Hide Explanations' : 'View Explanations'}</span>
            </button>
          </div>

          {/* Explanation Accordion View with Factor Breakdown */}
          {showExplanation && (
            <div style={{
              width: '100%',
              marginTop: '16px',
              padding: '16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-glass)',
              borderRadius: '20px',
              textAlign: 'left',
              maxHeight: '400px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
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
                const result = evaluationResults ? evaluationResults[idx] : null;
                const label = result ? getScoreLabel(result.score) : null;
                return (
                  <div key={idx} style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                        Q{idx + 1}. {q.prompt}
                      </span>
                      {label && (
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: `${label.color}18`,
                          color: label.color,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {label.label}
                        </span>
                      )}
                    </div>

                    {/* User's answer */}
                    {answers[idx] ? (
                      <div style={{ color: '#d97706', fontSize: '0.82rem', marginBottom: '6px' }}>
                        Your answer: "{answers[idx]}"
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '6px', fontStyle: 'italic' }}>
                        (Not answered)
                      </div>
                    )}

                    {/* Feedback */}
                    {result && result.feedback && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '4px', fontStyle: 'italic' }}>
                        {result.feedback}
                      </div>
                    )}

                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--text-main)' }}>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // QUESTION PLAYER SCREEN (Exact Aptitude Layout)
  // -------------------------------------------------------------
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

        {/* See & Answer Badge placed where Easy/Medium/Hard was in Aptitude */}
        <div className="question-diff-badge" style={{
          padding: '6px 14px',
          borderRadius: '16px',
          background: 'rgba(217, 119, 6, 0.12)',
          color: '#d97706',
          border: '1px solid rgba(217, 119, 6, 0.3)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.02em'
        }}>
          See &amp; Answer
        </div>
      </div>

      {/* Progress Track */}
      <div style={{ width: '100%', height: '4px', background: 'var(--border-glass)' }}>
        <div style={{
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #d97706, #b45309)',
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
        <div style={{ width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Question Text Box — Single block with "Question X" */}
          <div className="question-box-padding" style={{
            padding: '28px 32px',
            borderRadius: '20px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <span style={{ fontSize: '0.82rem', color: '#d97706', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Question {currentIndex + 1}
            </span>
            <h3 className="question-title-text" style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.45,
              marginTop: '8px'
            }}>
              {currentQ.prompt}
            </h3>
          </div>

          {/* Speak Answer Mic Button — Reduced compact size */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleRecord}
              className="option-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '12px 28px',
                borderRadius: '16px',
                background: isRecording
                  ? 'linear-gradient(135deg, #ef4444, #b91c1c)'
                  : hasSpoken
                    ? 'rgba(217, 119, 6, 0.16)'
                    : 'var(--bg-surface)',
                border: isRecording
                  ? '2px solid #ef4444'
                  : hasSpoken
                    ? '2px solid #d97706'
                    : '1px solid var(--border-glass)',
                color: isRecording ? '#ffffff' : hasSpoken ? '#d97706' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isRecording ? '0 0 20px rgba(239, 68, 68, 0.35)' : hasSpoken ? '0 0 16px rgba(217, 119, 6, 0.25)' : 'none'
              }}
            >
              {isRecording ? (
                <MicOff size={18} color="#ffffff" />
              ) : hasSpoken ? (
                <CheckCircle2 size={18} color="#d97706" />
              ) : (
                <Mic size={18} color="#d97706" />
              )}
              <span style={{ fontSize: '0.94rem', fontWeight: 700 }}>
                {isRecording
                  ? 'Listening… Tap to Stop'
                  : hasSpoken
                    ? 'Answer Recorded (Done — Tap to Retry)'
                    : 'Speak Answer'}
              </span>
            </button>
          </div>

          {/* Answer text area (display transcribed answer or allow user typing) */}
          <div style={{ width: '100%' }}>
            <textarea
              value={currentAnswer}
              onChange={handleTextChange}
              placeholder="Your answer will appear here when you speak, or you can type here..."
              rows={3}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '14px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Mic Error (if any) */}
          {micError && (
            <div style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              fontSize: '0.85rem'
            }}>
              {micError}
            </div>
          )}

          {/* Navigation Bar (Previous & Next / Submit button) */}
          <div className="question-nav-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px'
          }}>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-secondary"
              style={{
                padding: '12px 24px',
                fontSize: '0.95rem',
                fontWeight: 700,
                opacity: currentIndex === 0 ? 0.35 : 1,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!hasSpoken}
                className="btn-primary"
                style={{
                  padding: '12px 32px',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  opacity: hasSpoken ? 1 : 0.5,
                  cursor: hasSpoken ? 'pointer' : 'not-allowed',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: hasSpoken ? '0 6px 20px rgba(16, 185, 129, 0.45)' : 'none'
                }}
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!hasSpoken}
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  opacity: hasSpoken ? 1 : 0.5,
                  cursor: hasSpoken ? 'pointer' : 'not-allowed',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  boxShadow: hasSpoken ? '0 6px 20px rgba(16, 185, 129, 0.45)' : 'none',
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
