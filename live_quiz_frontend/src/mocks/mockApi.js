const quizzes = [
  {
    id: 'quiz-1',
    title: 'General Knowledge',
    description: '10 quick questions to test your knowledge.',
    questions: [
      { id: 'q1', text: 'Capital of France?', options: ['Paris','Madrid','Rome','Berlin'], answerIndex: 0, duration: 12 },
      { id: 'q2', text: '2 + 2 = ?', options: ['3','4','5','22'], answerIndex: 1, duration: 10 },
      { id: 'q3', text: 'Water chemical formula?', options: ['CO2','O2','H2O','NaCl'], answerIndex: 2, duration: 12 },
    ],
  },
  {
    id: 'quiz-2',
    title: 'Tech Trivia',
    description: 'Fun questions about technology.',
    questions: [
      { id: 't1', text: 'JS stands for?', options: ['JavaSource','JavaScript','JustScript','JollyScript'], answerIndex: 1, duration: 12 },
      { id: 't2', text: 'HTTP port?', options: ['21','25','80','110'], answerIndex: 2, duration: 10 },
    ],
  },
];

let participants = {}; // { quizId: { userId: { name, score } } }

function ensureQuizState(quizId) {
  if (!participants[quizId]) participants[quizId] = {};
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// PUBLIC_INTERFACE
export async function listQuizzes() {
  return quizzes.map(({ id, title, description, questions }) => ({
    id, title, description, questionCount: questions.length,
  }));
}

// PUBLIC_INTERFACE
export async function getQuiz(quizId) {
  return quizzes.find(q => q.id === quizId);
}

// PUBLIC_INTERFACE
export async function joinQuiz({ quizId, name, userId }) {
  ensureQuizState(quizId);
  participants[quizId][userId] = { name, score: 0 };
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function submitAnswer({ quizId, userId, questionId, isCorrect, points }) {
  ensureQuizState(quizId);
  if (!participants[quizId][userId]) participants[quizId][userId] = { name: 'Unknown', score: 0 };
  participants[quizId][userId].score += points;
  return { ok: true };
}

// PUBLIC_INTERFACE
export async function getLeaderboard(quizId) {
  ensureQuizState(quizId);
  const rows = Object.entries(participants[quizId]).map(([uid, p]) => ({ userId: uid, name: p.name, score: p.score }));
  rows.sort((a,b) => b.score - a.score);
  return rows;
}

// PUBLIC_INTERFACE
export async function resetQuiz(quizId) {
  participants[quizId] = {};
  return { ok: true };
}
