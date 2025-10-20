import React from 'react';
import { getLeaderboard } from '../mocks/mockApi';
import { socket, startSimulation } from '../mocks/mockSocket';
import { loadSession } from '../utils/storage';

// PUBLIC_INTERFACE
export function useLeaderboard() {
  /** Hook to manage leaderboard data with live updates */
  const session = loadSession();
  const quizId = session?.quizId;
  const me = session?.userId;

  const [rows, setRows] = React.useState([]);

  async function refresh() {
    if (!quizId) return;
    const data = await getLeaderboard(quizId);
    setRows(data);
  }

  React.useEffect(() => {
    let alive = true;
    startSimulation();
    refresh();
    const handler = () => alive && refresh();
    socket.on('leaderboard:update', handler);
    return () => {
      alive = false;
      socket.off('leaderboard:update', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  return { rows, me };
}
