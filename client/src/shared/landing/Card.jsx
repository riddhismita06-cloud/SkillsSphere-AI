import React from 'react';

const Card = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`
        bg-surface border border-[#1F2937] rounded-2xl p-8 transition-all duration-300
        relative overflow-hidden
        before:content-[''] before:absolute before:inset-0
        before:bg-gradient-to-br before:from-white/5 before:to-transparent
        before:opacity-0 before:transition-all before:duration-300 before:pointer-events-none
        hover:before:opacity-100
        ${hoverEffect ? 'hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.2)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
