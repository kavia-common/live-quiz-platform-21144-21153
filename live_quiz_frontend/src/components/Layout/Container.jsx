import React from 'react';

// PUBLIC_INTERFACE
export default function Container({ title, actions, children }) {
  /** Main content container with card style */
  return (
    <div className="container">
      <div className="card" style={{padding:20}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
          <h2 style={{margin:0}}>{title}</h2>
          <div>{actions}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
