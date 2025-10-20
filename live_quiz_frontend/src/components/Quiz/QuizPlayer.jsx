import React from 'react';
import Container from '../Layout/Container';
import QuestionModal from './QuestionModal';
import ProgressBar from './ProgressBar';
import { useQuizEngine } from '../../hooks/useQuizEngine';

// PUBLIC_INTERFACE
export default function QuizPlayer() {
  /** Play view showing current question, options, timer/progress, feedback */
  const {
    quiz, index, question, showModal, setShowModal, timeLeft, running, feedback, answer
  } = useQuizEngine();

  const total = quiz?.questions.length || 0;
  const currentNum = Math.min(index + 1, total);
  const progressVal = question ? timeLeft / question.duration : 0;

  return (
    <Container
      title="Play"
      actions={<span className="badge">{currentNum}/{total} questions</span>}
    >
      {!quiz && <div>Loading quiz…</div>}
      {quiz && (
        <div style={{display:'grid', gap:16}}>
          <div className="card" style={{padding:16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <div style={{fontWeight:600}}>{question?.text || 'Waiting next question…'}</div>
              <div style={{minWidth:160}}>
                <ProgressBar value={progressVal} />
              </div>
            </div>
            <div style={{display:'grid', gap:8}}>
              {question?.options.map((opt, idx) => (
                <button key={idx} className="btn-ghost" onClick={() => answer(idx)} aria-label={`Answer option ${idx+1}`}>
                  {opt}
                </button>
              )) || <em>Quiz complete.</em>}
            </div>
            {feedback && (
              <div style={{marginTop:10, color: feedback.correct ? 'green' : 'var(--error)'}}>
                {feedback.correct ? `Correct! +${feedback.points}` : `Incorrect. ${feedback.reason ? feedback.reason : ''}`}
              </div>
            )}
          </div>
        </div>
      )}

      <QuestionModal
        open={showModal && !!question}
        question={question || { text: '', options: [] }}
        onClose={() => setShowModal(false)}
        onAnswer={answer}
      />
    </Container>
  );
}
