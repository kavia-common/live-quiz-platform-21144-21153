import React from 'react';

// PUBLIC_INTERFACE
export default function ProgressBar({ value }) {
  /** Progress bar value between 0 and 1 */
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="progress" aria-label="Time remaining">
      <div className="progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
