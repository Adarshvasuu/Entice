import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowUpRight, Calculator, Users, Shield, Zap, TrendingUp } from 'lucide-react';

// ----------------------------------------------------------------------
// 1. Unified CTA Button
// ----------------------------------------------------------------------
interface CalculatorCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CalculatorCTAButton: React.FC<CalculatorCTAButtonProps> = ({ children, onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - centerX) * 0.2, y: (e.clientY - centerY) * 0.2 });
  };

  const handleLeave = () => {
    setOffset({ x: 0, y: 0 });
    setHovered(false);
  };

  const arrowRotate = Math.max(-8, Math.min(32, offset.x * 0.55)) + (hovered ? 14 : 0);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x * 0.3, y: offset.y * 0.3, scale: hovered ? 1.03 : 1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className="group relative inline-flex items-center gap-4 pl-7 pr-1.5 py-1.5 rounded-full text-white font-semibold text-xs tracking-wider uppercase shadow-2xl shadow-black/40"
      style={{ background: 'linear-gradient(100deg, #051A59 0%, #0B3FA8 55%, #0F67FF 100%)' }}
    >
      <span className="relative z-10">{children}</span>

      <motion.span
        animate={{
          boxShadow: hovered
            ? '0 0 0 1px rgba(255,255,255,0.35), 0 8px 30px 6px rgba(255,107,107,0.45)'
            : '0 0 0 1px rgba(255,255,255,0.2), 0 0 0 0 rgba(255,107,107,0)',
        }}
        transition={{ duration: 0.35 }}
        className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md"
      >
        <motion.span
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 35% 30%, rgba(255,150,150,0.9), rgba(255,90,90,0.65) 70%)' }}
        />
        <span className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.35) 0%, transparent 45%)' }} />
        <motion.span
          animate={{ rotate: arrowRotate }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative z-10"
        >
          <ArrowUpRight className="w-4.5 h-4.5 text-white" />
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// 2. Smooth Animated Number Component
// ----------------------------------------------------------------------
const AnimatedNumber = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const spring = useSpring(value, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (current) => 
    `${prefix}${Math.round(current).toLocaleString('en-IN')}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

// ----------------------------------------------------------------------
// 3. Main Calculator Component
// ----------------------------------------------------------------------
interface ROICalculatorProps {
  onOpenConsultation?: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenConsultation }) => {
  const [employees, setEmployees] = useState(300);
  const [avgSalary, setAvgSalary] = useState(500000);

  // Simplified ROI math
  const inHouseCost = employees * (avgSalary * 0.15);
  const enticeCost = employees * (avgSalary * 0.06); 
  const totalSavings = inHouseCost - enticeCost;
  const savingsPercent = inHouseCost > 0 ? Math.round((totalSavings / inHouseCost) * 100) : 0;

  // --- Wider Scroll Zoom-Out Animation ---
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "center center"]
  });
  
  // Zooms OUT: Starts at a massive 1.25x scale and shrinks into place
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // --- Magnetic Tilt & Glare Interaction ---
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const springCfg = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(rotateXRaw, springCfg);
  const rotateY = useSpring(rotateYRaw, springCfg);
  
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]: number[]) =>
    `radial-gradient(circle 450px at ${gx}% ${gy}%, rgba(255,255,255,0.4), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    // Smooth 3D tilt
    rotateXRaw.set((0.5 - py) * 12);
    rotateYRaw.set((px - 0.5) * 12);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareOpacity.set(0);
  };

  // Clamped percent generator ensures the slider gradient doesn't break when typing out-of-bounds numbers
  const getSliderFill = (val: number, min: number, max: number) => {
    const percent = Math.min(Math.max(((val - min) / (max - min)) * 100, 0), 100);
    return `linear-gradient(to right, rgba(15,103,255,0.5) ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
  };

  return (
    <>
      <style>{`
        .glass-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 14px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
          outline: none;
        }
        /* ENLARGED TOUCH TARGET FOR MOBILE */
        .glass-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 103, 255, 0.2);
          box-shadow: 0 4px 12px rgba(15, 103, 255, 0.2), 0 0 0 4px rgba(255,255,255,0.3);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
        }
        .glass-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 16px rgba(15, 103, 255, 0.3), 0 0 0 6px rgba(15,103,255,0.15);
        }
        .glass-slider::-webkit-slider-thumb:active {
          transform: scale(0.95);
          box-shadow: 0 2px 8px rgba(15, 103, 255, 0.4), 0 0 0 2px rgba(15,103,255,0.2);
        }
        /* NORMAL TOUCH TARGET FOR DESKTOP */
        @media (min-width: 640px) {
          .glass-slider::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <div ref={sectionRef} className="relative w-full perspective-[1200px]">
        {/* Header outside the card */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4 px-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0066FF] bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 inline-block">
            Impact Analysis
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1D1D1F] tracking-tight">
            Calculate Your Savings
          </h2>
          <p className="text-sm text-[#86868B] max-w-2xl mx-auto">
            See how much overhead bandwidth and operational capital you can recover by switching to our Enterprise-Grade HR infrastructure.
          </p>
        </div>

        {/* Wider max-w-6xl container + True Glassmorphism */}
        <motion.div
          style={{ scale, opacity, rotateX, rotateY, transformStyle: 'preserve-3d' }}
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative w-full max-w-6xl mx-auto bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,10,40,0.15)] overflow-hidden"
        >
          {/* 3D Tracking Glare Overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay rounded-[2.5rem]" 
            style={{ opacity: glareOpacity, background: glareBackground }} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 p-3 gap-2">
            
            {/* LEFT SIDE: Inputs (Transparent over glass) */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-20" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-white/50">
                  <Calculator className="w-6 h-6 text-[#0066FF]" />
                </div>
                <h3 className="text-2xl font-black text-[#1D1D1F] tracking-tight">Interactive Estimator</h3>
              </div>

              <div className="space-y-12">
                {/* Employees Typable Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1D1D1F]/60 pb-1">
                      Team Size
                    </label>
                    <div className="flex items-baseline">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={employees || ''}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/[^0-9]/g, '');
                          setEmployees(rawValue ? parseInt(rawValue, 10) : 0);
                        }}
                        onBlur={() => {
                          if (!employees || employees < 1) setEmployees(1);
                        }}
                        className="bg-transparent text-3xl font-bold text-[#0F67FF] tabular-nums tracking-tight w-24 text-right outline-none border-b-2 border-transparent hover:border-[#0F67FF]/30 focus:border-[#0F67FF] transition-colors p-0 m-0"
                      />
                      <span className="text-sm text-[#1D1D1F]/40 font-medium ml-1.5 mb-1">Emp</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    step="5"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="glass-slider"
                    style={{ background: getSliderFill(employees, 1, 500) }}
                  />
                  <div className="flex justify-between text-[15px] font-semibold text-[#1D1D1F]/30 uppercase tracking-widest">
                    <span>1</span>
                    <span>500+</span>
                  </div>
                </div>

                {/* Avg Salary Typable Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold tracking-wider uppercase text-[#1D1D1F]/60 pb-1">
                      Average Salary (INR)
                    </label>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#0F67FF] tabular-nums tracking-tight mr-1">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={avgSalary ? avgSalary.toLocaleString('en-IN') : ''}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/[^0-9]/g, '');
                          setAvgSalary(rawValue ? parseInt(rawValue, 10) : 0);
                        }}
                        onBlur={() => {
                          if (!avgSalary || avgSalary < 100000) setAvgSalary(200000); 
                        }}
                        className="bg-transparent text-3xl font-bold text-[#0F67FF] tabular-nums tracking-tight w-[8.5rem] text-left outline-none border-b-2 border-transparent hover:border-[#0F67FF]/30 focus:border-[#0F67FF] transition-colors p-0 m-0"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="2500000"
                    step="50000"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(parseInt(e.target.value))}
                    className="glass-slider"
                    style={{ background: getSliderFill(avgSalary, 200000, 2500000) }}
                  />
                  <div className="flex justify-between text-[15px] font-semibold text-[#1D1D1F]/30 uppercase tracking-widest">
                    <span>₹2L</span>
                    <span>₹25L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Smooth Inset Glass Panel */}
            <div 
              className="p-8 sm:p-12 lg:p-16 relative z-20 text-white flex flex-col justify-between rounded-[2rem] shadow-inner overflow-hidden border border-white/10"
              style={{ 
                background: 'linear-gradient(135deg, rgba(6,48,145,0.95) 0%, rgba(15,103,255,0.95) 100%)',
                transform: 'translateZ(30px)' 
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Accent Badges & Pricing Display */}
              <div className="flex flex-col mb-10 relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/70 font-medium">Estimated Annual Savings</p>
                  
                  {/* Red/Yellow Accent Badge */}
                  <div className="bg-[#FFD84D]/10 backdrop-blur-md border border-[#FFD84D]/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <TrendingUp className="w-4 h-4 text-[#FFD84D]" />
                    <span className="text-xs font-bold text-[#FFD84D] tracking-wider">
                      <AnimatedNumber value={savingsPercent} suffix="% SAVED" />
                    </span>
                  </div>
                </div>

                {/* Vertical Stacking to prevent number cut-offs */}
                <div className="flex flex-col gap-1 mt-2">
                  {/* Actual In-House Value Struck Through */}
                  <span className="text-2xl text-white/50 line-through font-semibold decoration-[#FF6B6B] decoration-2">
                    <AnimatedNumber value={inHouseCost} prefix="₹" />
                  </span>
                  
                  {/* Massive Savings Number */}
                  <h4 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tighter drop-shadow-md tabular-nums text-white">
                    <AnimatedNumber value={totalSavings} prefix="₹" />
                  </h4>
                </div>
              </div>

              {/* White Icon Badges */}
              <div className="space-y-4 mb-10 relative z-10">
                <div className="flex items-center gap-4 bg-white/10 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-sm hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <Shield className="w-5 h-5 text-[#0F67FF]" />
                  </div>
                  <p className="text-sm font-semibold text-white/90">Zero Compliance Penalties</p>
                </div>
                <div className="flex items-center gap-4 bg-white/10 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-sm hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <Zap className="w-5 h-5 text-[#0F67FF]" />
                  </div>
                  <p className="text-sm font-semibold text-white/90">Instant Scalability on Demand</p>
                </div>
                <div className="flex items-center gap-4 bg-white/10 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-sm hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <Users className="w-5 h-5 text-[#0F67FF]" />
                  </div>
                  <p className="text-sm font-semibold text-white/90">Internal HR Freed for Strategy</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 relative z-10">
                <CalculatorCTAButton onClick={onOpenConsultation}>
                  Claim Custom Proposal
                </CalculatorCTAButton>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};