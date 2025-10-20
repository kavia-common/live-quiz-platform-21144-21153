import React from 'react';

// PUBLIC_INTERFACE
export default function UserCard({ rank, name, score, highlight }) {
  /** Card row for a leaderboard entry */
  return (
    <div
      className="card"
      style={{
        padding:12,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        borderColor: highlight ? 'var(--primary)' : 'var(--border)',
        boxShadow: highlight ? '0 0 0 4px rgba(37,99,235,0.12)' : 'var(--shadow)'
      }}
      aria-label={`${name} with score ${score}`}
    >
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <div className="brand-badge" aria-hidden>{rank}</div>
        <div style={{fontWeight:600}}>{name}</div>
      </div>
      <div style={{fontWeight:700}}>{score}</div>
    </div>
  );
}
