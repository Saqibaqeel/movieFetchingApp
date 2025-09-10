
import React from 'react';

export default function Card() {
  return (
    <div
      className="card mt-3 mx-2"
      style={{ width: '20rem', borderRadius: '1rem' }}
    >
      <div
        className="card-img-top placeholder-glow"
        style={{
          height: '140px',
          borderTopLeftRadius: '.75rem',
          borderTopRightRadius: '.75rem',
        }}
      >
        <span className="placeholder col-12 h-100"></span>
      </div>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7 mb-2"></span>
          <span className="placeholder col-4 mb-2"></span>
          <span className="placeholder col-4 mb-2"></span>
          <span className="placeholder col-6 mb-2"></span>
          <span className="placeholder col-8 mb-2"></span>
        </p>
        <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-4"></a>
      </div>
    </div>
  );
}