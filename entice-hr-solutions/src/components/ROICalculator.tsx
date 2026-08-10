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
      className="group relative inline-flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-5 sm:pl-7 sm:pr-1.5 py-2.5 sm:py-1.5 rounded-full text-white font-semibold text-xs tracking-wider uppercase shadow-2xl shadow-black/40 w-auto"
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
        className="relative w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md shrink-0"
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
          <ArrowUpRight className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-white" />
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
// 3. Main Calculator Component (Responsive: Old Desktop view + New Mobile view)
// ----------------------------------------------------------------------
interface ROICalculatorProps {
  onOpenConsultation?: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenConsultation }) => {
  const [employees, setEmployees] = useState<number | ''>(300);
  const [avgSalary, setAvgSalary] = useState<number | ''>(500000);

  const numericEmployees = typeof employees === 'number' ? employees : 0;
  const numericSalary = typeof avgSalary === 'number' ? avgSalary : 0;

  const inHouseCost = numericEmployees * (numericSalary * 0.15);
  const enticeCost = numericEmployees * (numericSalary * 0.06); 
  const totalSavings = inHouseCost - enticeCost;
  const savingsPercent = inHouseCost > 0 ? Math.round((totalSavings / inHouseCost) * 100) : 0;

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 95%", "center center"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

  const getSliderFill = (val: number, min: number, max: number) => {
    const percent = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, rgba(15,103,255,0.5) ${percent}%, rgba(255,255,255,0.2) ${percent}%)`;
  };

  const getMobileSliderFill = (val: number, min: number, max: number) => {
    const percent = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, rgba(15,103,255,0.6) ${percent}%, rgba(0,0,0,0.1) ${percent}%)`;
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
        .glass-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 103, 255, 0.2);
          box-shadow: 0 4px 12px rgba(15, 103, 255, 0.2), 0 0 0 4px rgba(255,255,255,0.3);
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
        }
        .glass-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 16px rgba(15, 103, 255, 0.3), 0 0 0 6px rgba(15,103,255,0.15);
        }
        .glass-slider::-webkit-slider-thumb:active {
          transform: scale(0.95);
          box-shadow: 0 2px 8px rgba(15, 103, 255, 0.4), 0 0 0 2px rgba(15,103,255,0.2);
        }

        .glass-slider-mobile {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 999px;
          outline: none;
        }
        .glass-slider-mobile::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #0F67FF;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(15, 103, 255, 0.3);
          cursor: pointer;
        }

        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>

      <div ref={sectionRef} className="relative w-full perspective-[1200px]">
        {/* Header outside the card */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#0066FF] bg-blue-500/10 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-blue-500/20 inline-block">
            Impact Analysis
          </span>
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-[#1D1D1F] tracking-tight">
            Calculate Your Savings
          </h2>
          <p className="hidden sm:block text-sm text-[#86868B] max-w-2xl mx-auto">
            See how much overhead bandwidth and operational capital you can recover by switching to our Enterprise-Grade HR infrastructure.
          </p>
        </div>

        {/* ==========================================
            MOBILE VIEW (Visible only on < lg screens)
           ========================================== */}
        <div className="block lg:hidden w-full max-w-lg mx-auto px-2">
          <motion.div
            style={{ scale, opacity, rotateX, rotateY, transformStyle: 'preserve-3d' }}
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-full bg-gradient-to-br from-white/75 to-white/40 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-xl overflow-hidden p-4"
          >
            <motion.div 
              className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay rounded-[2rem]" 
              style={{ opacity: glareOpacity, background: glareBackground }} 
            />

            <div className="flex flex-col gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm border border-white/60">
                    <Calculator className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <h3 className="text-base font-black text-[#1D1D1F] tracking-tight">
                    Interactive Estimator
                  </h3>
                </div>

                <div className="space-y-3 bg-white/40 p-3.5 rounded-2xl border border-white/60">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold tracking-wider uppercase text-[#1D1D1F]/60">
                        Team Size
                      </label>
                      <div className="flex items-center gap-1 bg-white/80 border border-blue-500/30 px-2 py-0.5 rounded-xl shadow-sm">
                        <input
                          type="number"
                          min="1"
                          max="5000"
                          value={employees}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEmployees(val === '' ? '' : parseInt(val, 10));
                          }}
                          className="w-14 text-right text-lg font-bold text-[#0F67FF] bg-transparent outline-none tabular-nums"
                        />
                        <span className="text-xs text-[#1D1D1F]/50 font-semibold">Emp</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      step="5"
                      value={numericEmployees}
                      onChange={(e) => setEmployees(parseInt(e.target.value, 10))}
                      className="glass-slider-mobile"
                      style={{ background: getMobileSliderFill(numericEmployees, 1, 500) }}
                    />
                    <div className="flex justify-between text-[10px] font-semibold text-[#1D1D1F]/40 uppercase tracking-widest">
                      <span>1</span>
                      <span>500+</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold tracking-wider uppercase text-[#1D1D1F]/60">
                        Average Salary (INR)
                      </label>
                      <div className="flex items-center gap-0.5 bg-white/80 border border-blue-500/30 px-2 py-0.5 rounded-xl shadow-sm">
                        <span className="text-lg font-bold text-[#0F67FF]">₹</span>
                        <input
                          type="number"
                          min="100000"
                          max="10000000"
                          step="10000"
                          value={avgSalary}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAvgSalary(val === '' ? '' : parseInt(val, 10));
                          }}
                          className="w-24 text-right text-lg font-bold text-[#0F67FF] bg-transparent outline-none tabular-nums"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="200000"
                      max="2500000"
                      step="50000"
                      value={numericSalary}
                      onChange={(e) => setAvgSalary(parseInt(e.target.value, 10))}
                      className="glass-slider-mobile"
                      style={{ background: getMobileSliderFill(numericSalary, 200000, 2500000) }}
                    />
                    <div className="flex justify-between text-[10px] font-semibold text-[#1D1D1F]/40 uppercase tracking-widest">
                      <span>₹2L</span>
                      <span>₹25L</span>
                    </div>
                  </div>
                </div>
              </div>

              <div 
                className="p-4 relative z-20 text-white flex flex-col justify-between rounded-2xl shadow-xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #051A59 0%, #0F67FF 100%)' }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col relative z-10 space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-white/80 font-semibold tracking-wide">Estimated Annual Savings</p>
                    
                    <div className="bg-[#FFD84D]/20 backdrop-blur-md border border-[#FFD84D]/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <TrendingUp className="w-3 h-3 text-[#FFD84D]" />
                      <span className="text-[10px] font-bold text-[#FFD84D] tracking-wider">
                        <AnimatedNumber value={savingsPercent} suffix="% SAVED" />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0">
                    <span className="text-xs text-white/50 line-through font-medium decoration-[#FF6B6B] decoration-2">
                      <AnimatedNumber value={inHouseCost} prefix="₹" />
                    </span>
                    <h4 className="text-3xl font-black tracking-tight drop-shadow-[0_4px_20px_rgba(255,216,77,0.4)] tabular-nums text-[#FFD84D] py-0.5">
                      <AnimatedNumber value={totalSavings} prefix="₹" />
                    </h4>
                  </div>
                </div>

                <div className="relative z-15 flex justify-center pt-1">
                  <CalculatorCTAButton onClick={onOpenConsultation}>
                    Claim Custom Proposal
                  </CalculatorCTAButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==========================================
            DESKTOP VIEW (Visible only on lg+ screens) - MANUAL INPUT RESTORED
           ========================================== */}
        <div className="hidden lg:block w-full max-w-6xl mx-auto px-4">
          <motion.div
            style={{ scale, opacity, rotateX, rotateY, transformStyle: 'preserve-3d' }}
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(0,10,40,0.15)] overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay rounded-[2.5rem]" 
              style={{ opacity: glareOpacity, background: glareBackground }} 
            />

            <div className="grid grid-cols-2 p-3 gap-2">
              {/* LEFT SIDE: Inputs */}
              <div className="p-16 flex flex-col justify-center relative z-20" style={{ transform: 'translateZ(20px)' }}>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm border border-white/50">
                    <Calculator className="w-6 h-6 text-[#0066FF]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1D1D1F] tracking-tight">Interactive Estimator</h3>
                </div>

                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold tracking-wider uppercase text-[#1D1D1F]/60">
                        Team Size
                      </label>
                      <div className="flex items-center gap-1.5 bg-white/80 border border-blue-500/30 px-3 py-1 rounded-2xl shadow-sm">
                        <input
                          type="number"
                          min="1"
                          max="5000"
                          value={employees}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEmployees(val === '' ? '' : parseInt(val, 10));
                          }}
                          className="w-16 text-right text-2xl font-bold text-[#0F67FF] bg-transparent outline-none tabular-nums tracking-tight"
                        />
                        <span className="text-sm text-[#1D1D1F]/50 font-semibold">Emp</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      step="5"
                      value={numericEmployees}
                      onChange={(e) => setEmployees(parseInt(e.target.value, 10))}
                      className="glass-slider"
                      style={{ background: getSliderFill(numericEmployees, 1, 500) }}
                    />
                    <div className="flex justify-between text-xs font-semibold text-[#1D1D1F]/30 uppercase tracking-widest">
                      <span>1</span>
                      <span>500+</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-bold tracking-wider uppercase text-[#1D1D1F]/60">
                        Average Salary (INR)
                      </label>
                      <div className="flex items-center gap-1 bg-white/80 border border-blue-500/30 px-3 py-1 rounded-2xl shadow-sm">
                        <span className="text-2xl font-bold text-[#0F67FF]">₹</span>
                        <input
                          type="number"
                          min="100000"
                          max="10000000"
                          step="10000"
                          value={avgSalary}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAvgSalary(val === '' ? '' : parseInt(val, 10));
                          }}
                          className="w-32 text-right text-2xl font-bold text-[#0F67FF] bg-transparent outline-none tabular-nums tracking-tight"
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="200000"
                      max="2500000"
                      step="50000"
                      value={numericSalary}
                      onChange={(e) => setAvgSalary(parseInt(e.target.value, 10))}
                      className="glass-slider"
                      style={{ background: getSliderFill(numericSalary, 200000, 2500000) }}
                    />
                    <div className="flex justify-between text-xs font-semibold text-[#1D1D1F]/30 uppercase tracking-widest">
                      <span>₹2L</span>
                      <span>₹25L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Smooth Inset Glass Panel */}
              <div 
                className="p-16 relative z-20 text-white flex flex-col justify-between rounded-[2rem] shadow-inner overflow-hidden border border-white/10"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(6,48,145,0.95) 0%, rgba(15,103,255,0.95) 100%)',
                  transform: 'translateZ(30px)' 
                }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col mb-10 relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70 font-medium">Estimated Annual Savings</p>
                    
                    <div className="bg-[#FFD84D]/10 backdrop-blur-md border border-[#FFD84D]/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <TrendingUp className="w-4 h-4 text-[#FFD84D]" />
                      <span className="text-xs font-bold text-[#FFD84D] tracking-wider">
                        <AnimatedNumber value={savingsPercent} suffix="% SAVED" />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-2xl text-white/50 line-through font-semibold decoration-[#FF6B6B] decoration-2">
                      <AnimatedNumber value={inHouseCost} prefix="₹" />
                    </span>
                    <h4 className="text-[3.4rem] font-black tracking-tighter drop-shadow-md tabular-nums text-white">
                      <AnimatedNumber value={totalSavings} prefix="₹" />
                    </h4>
                  </div>
                </div>

                <div className="space-y-4 mb-10 relative z-10">
                  <div className="flex items-center gap-4 bg-white/10 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-sm">
                    <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      <Shield className="w-5 h-5 text-[#0F67FF]" />
                    </div>
                    <p className="text-sm font-semibold text-white/90">Zero Compliance Penalties</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-sm">
                    <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      <Zap className="w-5 h-5 text-[#0F67FF]" />
                    </div>
                    <p className="text-sm font-semibold text-white/90">Instant Scalability on Demand</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/10 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-sm">
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
      </div>
    </>
  );
};