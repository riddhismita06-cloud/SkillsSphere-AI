import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, variant = 'primary', size = 'md', to, onClick, className = '', ...props }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
