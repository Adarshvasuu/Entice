import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
}

export const CounterAnimation: React.FC<CounterProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  label,
  sublabel
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic function for smooth decelerating counter
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <div 
      ref={ref} 
      className="group p-8 rounded-3xl bg-[#FBFBFD] border border-black/[0.04] hover:border-black/10 hover:shadow-xl hover:shadow-black/[0.03] transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col"
      >
        <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1D1D1F] tracking-tight font-sans">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
        <span className="mt-3 text-lg font-semibold text-[#1D1D1F] tracking-tight">
          {label}
        </span>
        {sublabel && (
          <span className="mt-1 text-sm text-[#86868B] font-normal leading-relaxed">
            {sublabel}
          </span>
        )}
      </motion.div>
    </div>
  );
};
