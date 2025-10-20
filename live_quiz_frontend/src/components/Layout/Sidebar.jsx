import React from 'react';
import { ROUTES } from '../../routes';

// PUBLIC_INTERFACE
export default function Sidebar({ current, onNavigate }) {
  /** Sidebar navigation between Lobby, Play, Leaderboard */
  const items = [
    { key: ROUTES.lobby, label: 'Lobby' },
    { key: ROUTES.play, label: 'Play' },
    { key: ROUTES.leaderboard, label: 'Leaderboard' },
  ];
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <nav className="nav" role="navigation" aria-label="Primary">
        {items.map(it => (
          <button
            key={it.key}
            onClick={() => onNavigate(it.key)}
            aria-label={`Go to ${it.label}`}
            aria-current={current === it.key ? 'page' : undefined}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
