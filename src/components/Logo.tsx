import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', onClick, variant = 'dark' }) => {
  const heightClass = size === 'sm' ? 'h-12' : size === 'lg' ? 'h-20' : 'h-9 sm:h-14';
  // 'light' = white logo, used over the dark hero background
  // 'dark'  = blue logo, used over light/white backgrounds (scrolled nav, other pages)
  const src = variant === 'light' ? '/logo/entice-logo-white.png' : '/logo/entice-logo-blue.png';

  const image = (
    <img
      src={src}
      alt="Entice HR Solutions"
      className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Entice HR Solutions — go to homepage"
        className={`inline-flex items-center cursor-pointer group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 rounded-md ${className}`}
      >
        {image}
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {image}
    </div>
  );
};
