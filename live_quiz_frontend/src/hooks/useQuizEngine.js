import React from 'react';
import { getQuiz, submitAnswer } from '../mocks/mockApi';
import { socket, startSimulation } from '../mocks/mockSocket';
import { computeScore } from '../utils/scoring';
import { loadSession } from '../utils/storage';

// PUBLIC_INTERFACE
export function useQuizEngine() {
  /**
   * Quiz engine: loads quiz, manages current question index,
   * timers, submissions, immediate feedback, and auto-advance
   */
  const session = loadSession();
  const quizId = session?.quizId;

  const [quiz, setQuiz] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [feedback, setFeedback] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let alive = true;
    if (!quizId) return;
    getQuiz(quizId).then(q => {
      if (!alive) return;
      setQuiz(q);
      setIndex(0);
      setShowModal(true);
      setRunning(true);
      setTimeLeft(q.questions[0].duration);
    });
    startSimulation();
    const nextHandler = () => advance();
    socket.on('question:next', nextHandler);
    return () => {
      alive = false;
      socket.off('question:next', nextHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  React.useEffect(() => {
    if (!quiz) return;
    const q = quiz.questions[index];
    if (!q) {
      setRunning(false);
      socket.emit('quiz:ended', { quizId });
      return;
    }
    if (timeLeft === 0 && running) {
      // auto advance on time out
      setFeedback({ correct: false, points: 0, reason: 'Time up!' });
      setTimeout(() => advance(), 800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function advance() {
    if (!quiz) return;
    const nextIdx = index + 1;
    if (nextIdx < quiz.questions.length) {
      setIndex(nextIdx);
      setShowModal(true);
      setFeedback(null);
      setTimeLeft(quiz.questions[nextIdx].duration);
    } else {
      setRunning(false);
      setShowModal(false);
      socket.emit('quiz:ended', { quizId });
    }
  }

  async function answer(optionIndex) {
    if (!quiz) return;
    const q = quiz.questions[index];
    const isCorrect = optionIndex === q.answerIndex;
    const points = computeScore({ isCorrect, timeLeftSec: timeLeft, durationSec: q.duration });
    setFeedback({ correct: isCorrect, points });
    await submitAnswer({ quizId, userId: session.userId, questionId: q.id, isCorrect, points });
    socket.emit('leaderboard:update', { quizId });
    // slight delay to show feedback then advance
    setTimeout(() => advance(), 800);
  }

  return {
    quiz,
    index,
    question: quiz?.questions[index] || null,
    showModal,
    setShowModal,
    timeLeft,
    running,
    feedback,
    answer,
  };
}
