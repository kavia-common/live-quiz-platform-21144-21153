import React from 'react';

// PUBLIC_INTERFACE
export default function QuestionModal({ open, question, onClose, onAnswer }) {
  /** Accessible modal for showing a question and options */
  if (!open) return null;
  const { text, options } = question;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Question dialog">
      <div className="modal">
        <h3 style={{marginTop:0}}>{text}</h3>
        <div style={{display:'grid', gap:8, margin:'12px 0'}}>
          {options.map((opt, idx) => (
            <button key={idx} className="btn-ghost" onClick={() => onAnswer(idx)} aria-label={`Choose option ${idx+1}: ${opt}`}>
              {opt}
            </button>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
          <button className="btn-ghost" onClick={onClose} aria-label="Close question">Close</button>
        </div>
      </div>
    </div>
  );
}
