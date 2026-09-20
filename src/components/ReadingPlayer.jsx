import React, { useState, useEffect } from 'react';
import { COMM_READING_LEVELS } from '../data/commReadingData';
import { startListening, stopListening, speakSentence, stopSpeaking } from '../utils/speechService';
import { evaluateReadingLevel } from '../utils/readingEvaluator';
import { calculateLevelResult, toStorageFormat } from '../utils/commScoring';
import { Star, Mic, MicOff, RotateCcw, ArrowLeft, ArrowRight, CheckCircle2, BookOpen, X, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReadingPlayer({ levelNumber, onExit, onComplete }) {
  const levelData = COMM_READING_LEVELS.find(l => l.levelNumber === levelNumber) || COMM_READING_LEVELS[0];
  const questions = levelData.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscripts, setSpokenTranscripts] = useState({}); // { [index]: string }
  const [hasSpokenMap, setHasSpokenMap] = useState({}); // { [index]: boolean }
  const [micError, setMicError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null); // per-question results
  const [showExplanation, setShowExplanation] = useState(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState(null);

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const hasSpoken = !!hasSpokenMap[currentIndex];

  // Stop recording and speech on unmount or question change
  useEffect(() => {
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, []);

  useEffect(() => {
    stopSpeaking();
    stopListening();
    setIsRecording(false);
    setMicError(null);
    setPlayingAudioIndex(null);
  }, [currentIndex]);

  // Confetti on result screen
  useEffect(() => {
    if (isSubmitted && finalResult) {
      try {
        const colors = ['#10b981', '#06b6d4', '#6366f1', '#f59e0b', '#ec4899'];
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

  // Start / stop microphone recording
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
        // Replace previous spoken text instead of appending
        setSpokenTranscripts(prev => ({ ...prev, [currentIndex]: transcript.trim() }));
        setHasSpokenMap(prev => ({ ...prev, [currentIndex]: true }));
      },
      onError: (msg) => {
        setIsRecording(false);
        setMicError(msg);
      },
      onEnd: () => setIsRecording(false)
    });
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

    // Evaluate all questions using the reading evaluator
    const results = evaluateReadingLevel(questions, spokenTranscripts);
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
    // Use toStorageFormat to bridge with storage.js's updateLevelProgress
    if (onComplete) {
      const { score, questionsCount } = toStorageFormat(levelResult);
      onComplete(score, questionsCount);
    }
  };

  const handlePlayExplanationAudio = (sentence, idx) => {
    if (playingAudioIndex === idx) {
      stopSpeaking();
      setPlayingAudioIndex(null);
      return;
    }
    stopSpeaking();
    setPlayingAudioIndex(idx);
    speakSentence(sentence, {
      onEnd: () => setPlayingAudioIndex(null),
      onError: () => setPlayingAudioIndex(null)
    });
  };

  const handleRestart = () => {
    stopSpeaking();
    stopListening();
    setCurrentIndex(0);
    setSpokenTranscripts({});
    setHasSpokenMap({});
    setIsSubmitted(false);
    setFinalResult(null);
    setEvaluationResults(null);
    setShowExplanation(false);
    setPlayingAudioIndex(null);
  };

  // Helper: render status badge for a question result
  const renderStatusBadge = (status) => {
    const styles = {
      correct: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: 'rgba(16, 185, 129, 0.3)', label: 'Correct' },
      partial: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)', label: 'Partial' },
      incorrect: { bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)', label: 'Incorrect' }
    };
    const s = styles[status] || styles.incorrect;
    return (
      <span style={{
        padding: '2px 10px',
        borderRadius: '8px',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.03em'
      }}>
        {s.label}
      </span>
    );
  };

  // Helper: render word diff alignment
  const renderWordDiff = (alignment) => {
    if (!alignment || alignment.length === 0) return null;
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3px',
        fontSize: '0.78rem',
        lineHeight: 1.6,
        marginTop: '4px'
      }}>
        {alignment.map((entry, i) => {
          let bg, color, text, title;
          switch (entry.type) {
            case 'match':
              bg = 'rgba(16, 185, 129, 0.12)';
              color = '#10b981';
              text = entry.spoken;
              title = 'Correct';
              break;
            case 'fuzzy_match':
              bg = 'rgba(59, 130, 246, 0.12)';
              color = '#3b82f6';
              text = entry.spoken;
              title = `Similar to "${entry.expected}"`;
              break;
            case 'substitution':
              bg = 'rgba(239, 68, 68, 0.12)';
              color = '#ef4444';
              text = entry.spoken;
              title = `Expected: "${entry.expected}"`;
              break;
            case 'deletion':
              bg = 'rgba(239, 68, 68, 0.08)';
              color = '#ef4444';
              text = entry.expected;
              title = 'Missing word';
              break;
            case 'insertion':
              bg = 'rgba(245, 158, 11, 0.12)';
              color = '#f59e0b';
              text = entry.spoken;
              title = 'Extra word';
              break;
            default:
              bg = 'transparent';
              color = 'var(--text-muted)';
              text = entry.spoken || entry.expected || '?';
              title = '';
          }
          return (
            <span
              key={i}
              title={title}
              style={{
                padding: '1px 5px',
                borderRadius: '4px',
                background: bg,
                color: color,
                fontWeight: 600,
                textDecoration: entry.type === 'deletion' ? 'line-through' : 'none',
                fontStyle: entry.type === 'insertion' ? 'italic' : 'normal',
                cursor: 'default'
              }}
            >
              {text}
            </span>
          );
        })}
      </div>
    );
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
            {Math.round(percentage)}% accuracy
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
                background: showExplanation ? 'rgba(16, 185, 129, 0.18)' : 'var(--bg-card)',
                borderColor: showExplanation ? '#10b981' : 'var(--border-glass)'
              }}
            >
              <BookOpen size={16} color="#10b981" />
              <span>{showExplanation ? 'Hide Explanations' : 'View Explanations'}</span>
            </button>
          </div>

          {/* Explanation Accordion View with Word Diff */}
          {showExplanation && (
            <div style={{
              width: '100%',
              marginTop: '16px',
              padding: '16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-glass)',
              borderRadius: '20px',
              textAlign: 'left',
              maxHeight: '340px',
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
                return (
                  <div key={idx} style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    fontSize: '0.85rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginBottom: '4px'
                    }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)', flex: 1 }}>
                        Q{idx + 1}. "{q.sentence}"
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        {result && renderStatusBadge(result.status)}
                        <button
                          onClick={() => handlePlayExplanationAudio(q.sentence, idx)}
                          title="Listen to pronunciation"
                          style={{
                            background: playingAudioIndex === idx ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                            border: playingAudioIndex === idx ? '1px solid #10b981' : '1px solid var(--border-glass)',
                            color: playingAudioIndex === idx ? '#10b981' : 'var(--text-muted)',
                            borderRadius: '8px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            flexShrink: 0
                          }}
                        >
                          {playingAudioIndex === idx ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Word Diff */}
                    {result && result.alignment && !result.skipped && (
                      <div style={{ marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          Word comparison ({Math.round(result.accuracy * 100)}% accuracy):
                        </span>
                        {renderWordDiff(result.alignment)}
                      </div>
                    )}

                    {/* Spoken text or not recorded */}
                    {spokenTranscripts[idx] ? (
                      <div style={{ color: '#10b981', fontSize: '0.82rem', marginBottom: '4px' }}>
                        ✓ You said: "{spokenTranscripts[idx]}"
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px', fontStyle: 'italic' }}>
                        (Not recorded)
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

      {/* Top Bar — matches Aptitude Category top bar */}
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

        {/* Mode Badge placed where Easy/Medium/Hard was in Aptitude */}
        <div className="question-diff-badge" style={{
          padding: '6px 14px',
          borderRadius: '16px',
          background: 'rgba(16, 185, 129, 0.12)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.02em'
        }}>
          See &amp; Speak
        </div>
      </div>

      {/* Progress Track */}
      <div style={{ width: '100%', height: '4px', background: 'var(--border-glass)' }}>
        <div style={{
          width: `${((currentIndex + 1) / questions.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #10b981, #059669)',
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
            <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Question {currentIndex + 1}
            </span>
            <h3 className="question-title-text" style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.45,
              marginTop: '8px'
            }}>
              {currentQ.sentence}
            </h3>
          </div>

          {/* Read Sentence Mic Button — Reduced compact size */}
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
                    ? 'rgba(16, 185, 129, 0.16)'
                    : 'var(--bg-surface)',
                border: isRecording
                  ? '2px solid #ef4444'
                  : hasSpoken
                    ? '2px solid #10b981'
                    : '1px solid var(--border-glass)',
                color: isRecording ? '#ffffff' : hasSpoken ? '#10b981' : 'var(--text-main)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isRecording ? '0 0 20px rgba(239, 68, 68, 0.35)' : hasSpoken ? '0 0 16px rgba(16, 185, 129, 0.25)' : 'none'
              }}
            >
              {isRecording ? (
                <MicOff size={18} color="#ffffff" />
              ) : hasSpoken ? (
                <CheckCircle2 size={18} color="#10b981" />
              ) : (
                <Mic size={18} color="var(--accent-primary)" />
              )}
              <span style={{ fontSize: '0.94rem', fontWeight: 700 }}>
                {isRecording
                  ? 'Listening… Tap to Stop'
                  : hasSpoken
                    ? 'Read Sentence (Done — Tap to Retry)'
                    : 'Read Sentence'}
              </span>
            </button>
          </div>

          {/* Spoken Text Feedback (if captured) */}
          {spokenTranscripts[currentIndex] && (
            <div style={{
              padding: '12px 18px',
              borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.88rem',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
              <span>You said: <strong>"{spokenTranscripts[currentIndex]}"</strong></span>
            </div>
          )}

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
