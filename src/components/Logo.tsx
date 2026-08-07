import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', onClick, variant = 'dark' }) => {
  const heightClass = size === 'sm' ? 'h-12' : size === 'lg' ? 'h-20' : 'h-14';
  // 'light' = white logo, used over the dark hero background
  // 'dark'  = blue logo, used over light/white backgrounds (scrolled nav, other pages)
  const src = variant === 'light' ? '/logo/entice-logo-white.png' : '/logo/entice-logo-blue.png';

  return (
    <div
      className={`inline-flex items-center cursor-pointer group select-none ${className}`}
      onClick={onClick}
    >
      <img
        src={src}
        alt="Entice HR Solutions"
        className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
      />
    </div>
  );
};
