# Live Quiz Platform - Frontend (Mock)

Ocean Professional themed React app that simulates a live quiz experience: lobby, play with timer and feedback, and real-time leaderboard via a mock API and WebSocket.

## Tech and Philosophy
- React 18 + vanilla CSS. No external router; lightweight hash routing.
- Ocean Professional theme using CSS variables and subtle gradients/shadows.
- Self-contained mocks to simulate REST and WebSocket behavior.

## Run
- npm start
- npm test
- npm run build

## App Structure
- src/theme.js, src/styles/theme.css: Theme variables (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827, gradient).
- src/routes.js: Hash router hook and route constants.
- src/components/Layout: Header, Sidebar, Container.
- src/components/Quiz: Lobby (join/select), Player (questions, feedback), Modal, ProgressBar.
- src/components/Leaderboard: Leaderboard, UserCard.
- src/hooks: useQuizEngine (question/timing/answers), useLeaderboard (live leaderboard).
- src/mocks: mockApi (quizzes, join, submit, leaderboard), mockSocket (on/off/emit; simulated server pushes).
- src/utils: scoring (base + time bonus), storage (session persistence).

## Mock API
- listQuizzes(): returns available quizzes.
- getQuiz(quizId): returns quiz with questions and durations.
- joinQuiz({ quizId, name, userId }): registers participant.
- submitAnswer({ quizId, userId, questionId, isCorrect, points }): accrues score.
- getLeaderboard(quizId): returns sorted leaderboard.
- resetQuiz(quizId): clears participant state.

State is held in-memory inside the frontend process.

## Mock WebSocket
- socket.on(event, cb), socket.off(event, cb), socket.emit(event, payload)
- startSimulation(tickMs): emits "leaderboard:update" every tick; quiz engine emits "question:next" and "quiz:ended" when appropriate.
- In real operation, the server would push:
  - "question:next": advance all clients to the next question.
  - "leaderboard:update": refresh leaderboard after answers.
  - "quiz:ended": notify completion.

## Scoring
Base 100 points for correct answers plus up to 50 bonus points proportional to remaining time.

## Accessibility
- Modal uses role="dialog" and aria-modal.
- Buttons have aria-labels; keyboard navigable by default.
- Progress is visible and labeled.

## Session Persistence
Participant name, selected quiz id, and generated userId are saved in localStorage and restored on load.

## Extend to Real Backend
Replace mockApi.js and mockSocket.js:
- REST: list quizzes, join, submit, leaderboard endpoints.
- WebSocket: subscribe to quiz room; server emits question:next, leaderboard:update, quiz:ended.
- Swap startSimulation() with real connection bootstrap; wire socket.on/off to actual server.

## Tests
App.test.js ensures nav items are present and Lobby is the initial view.

## Notes
No environment variables required for the mock. To integrate a real backend, introduce env vars (e.g., REACT_APP_API_URL, REACT_APP_WS_URL) and use them in your API/socket modules.
