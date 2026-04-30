import React from 'react';
import { useNavigate } from 'react-router-dom';

const variantClasses = {
  primary: 'bg-primary text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5',
  secondary: 'bg-white/10 text-[#F3F4F6] backdrop-blur-sm border border-[#1F2937] hover:bg-white/15 hover:-translate-y-0.5',
  outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary/10',
  ghost: 'bg-transparent text-[#F3F4F6] hover:bg-[#1A243A]',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm min-h-[40px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[48px]',
};

const Button = ({ children, variant = 'primary', size = 'md', to, onClick, className = '', ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded-lg border-none cursor-pointer transition-all duration-300 no-underline gap-2 active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
