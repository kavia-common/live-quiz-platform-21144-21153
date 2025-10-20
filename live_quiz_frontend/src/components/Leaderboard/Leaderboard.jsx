import React from 'react';
import Container from '../Layout/Container';
import UserCard from './UserCard';
import { useLeaderboard } from '../../hooks/useLeaderboard';

// PUBLIC_INTERFACE
export default function Leaderboard() {
  /** Leaderboard page with ranked users and highlighting current user */
  const { rows, me } = useLeaderboard();

  return (
    <Container title="Leaderboard">
      <div style={{display:'grid', gap:10}}>
        {rows.length === 0 && <div>No participants yet.</div>}
        {rows.map((r, idx) => (
          <UserCard
            key={r.userId}
            rank={idx + 1}
            name={r.name}
            score={r.score}
            highlight={r.userId === me}
          />
        ))}
      </div>
    </Container>
  );
}
