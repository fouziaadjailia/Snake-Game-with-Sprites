import React from 'react';

export const Head: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M20 50 Q20 20 50 20 Q80 20 80 50 Q80 80 50 80 Q20 80 20 50"
      fill="#4ade80"
      stroke="#166534"
      strokeWidth="4"
    />
    <circle cx="35" cy="40" r="5" fill="#166534" />
    <circle cx="65" cy="40" r="5" fill="#166534" />
  </svg>
);

export const Tail: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M40 80 Q50 80 60 80 L60 50 Q60 35 50 35 Q40 35 40 50 Z"
      fill="#4ade80"
      stroke="#166534"
      strokeWidth="4"
    />
  </svg>
);

export const Straight: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M40 20 L60 20 L60 80 L40 80 Z"
      fill="#4ade80"
      stroke="#166534"
      strokeWidth="4"
    />
  </svg>
);

export const Corner: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path
      d="M60 20 L60 60 L20 60 L20 40 Q20 20 40 20 Z"
      fill="#4ade80"
      stroke="#166534"
      strokeWidth="4"
    />
  </svg>
);

export const Apple: React.FC<{ position: { x: number; y: number } }> = ({ position }) => (
  <div
    className="absolute transition-all duration-150"
    style={{
      width: `${100 / 20}%`,
      height: `${100 / 20}%`,
      left: `${(position.x * 100) / 20}%`,
      top: `${(position.y * 100) / 20}%`,
    }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        d="M50 20 Q60 20 60 30 L65 25 L70 30 L65 35 Q80 40 80 60 Q80 80 50 90 Q20 80 20 60 Q20 40 35 35 L30 30 L35 25 L40 30 Q40 20 50 20"
        fill="#ef4444"
        stroke="#991b1b"
        strokeWidth="4"
      />
      <path
        d="M50 20 Q45 10 50 5 L55 7 L53 15"
        fill="none"
        stroke="#166534"
        strokeWidth="4"
      />
    </svg>
  </div>
);