import React from 'react';

// PUBLIC_INTERFACE
export default function Header() {
  /** Branded header with Ocean Professional styling */
  return (
    <header className="app-header">
      <div className="brand" aria-label="App branding">
        <div className="brand-badge" aria-hidden>🌊</div>
        <div>
          <div style={{fontSize:14, color:'var(--muted)'}}>Live Quiz Platform</div>
          <div style={{fontSize:16}}>Ocean Professional</div>
        </div>
      </div>
    </header>
  );
}
