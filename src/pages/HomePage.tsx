import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  ArrowRight, ArrowUpRight, Users, Crown, Receipt, ShieldCheck, GraduationCap, 
  Sparkles, ChevronRight, TrendingUp, Shield
} from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { ROICalculator } from '../components/ROICalculator';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenConsultation: () => void;
}

// ----------------------------------------------------------------------
// Reusable Buttons
// ----------------------------------------------------------------------
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, className = '', glowColor = 'rgba(255,216,77,0.55)' }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - centerX) * 0.25, y: (e.clientY - centerY) * 0.25 });
  };

  const handleLeave = () => {
    setOffset({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y, scale: hovered ? 1.05 : 1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 250, damping: 16 }}
      style={{ boxShadow: hovered ? `0 0 32px ${glowColor}` : '0 0 0 rgba(0,0,0,0)' }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// Original Desktop Services CTA Button
interface ServicesCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ServicesCTAButton: React.FC<ServicesCTAButtonProps> = ({ children, onClick, className = '' }) => {
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
      className={`group relative inline-flex items-center gap-4 pl-7 pr-1.5 py-1.5 rounded-full text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-[#0066FF]/25 ${className}`}
      style={{ background: 'linear-gradient(100deg, #051A59 0%, #0B3FA8 55%, #0F67FF 100%)' }}
    >
      {children}

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

// New Scaled-Down Mobile CTA Button
const MobileServicesCTAButton: React.FC<ServicesCTAButtonProps> = ({ children, onClick, className = '' }) => {
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
      className={`group relative inline-flex items-center gap-2 pl-4 pr-1 py-1 rounded-full text-white font-semibold text-[10px] tracking-wider uppercase shadow-lg shadow-[#0066FF]/25 w-auto mx-auto ${className}`}
      style={{ background: 'linear-gradient(100deg, #051A59 0%, #0B3FA8 55%, #0F67FF 100%)' }}
    >
      {children}

      <motion.span
        animate={{
          boxShadow: hovered
            ? '0 0 0 1px rgba(255,255,255,0.35), 0 8px 30px 6px rgba(255,107,107,0.45)'
            : '0 0 0 1px rgba(255,255,255,0.2), 0 0 0 0 rgba(255,107,107,0)',
        }}
        transition={{ duration: 0.35 }}
        className="relative w-7 h-7 rounded-full flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md shrink-0"
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
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// Service Cards (Tilt + Glare)
// ----------------------------------------------------------------------
interface TiltServiceCardProps {
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
  idx: number;
  onClick: () => void;
}

const TiltServiceCard: React.FC<TiltServiceCardProps> = ({ title, desc, bullets, icon, idx, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const springCfg = { stiffness: 200, damping: 22, mass: 0.6 };
  const rotateX = useSpring(rotateXRaw, springCfg);
  const rotateY = useSpring(rotateYRaw, springCfg);
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]: number[]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), transparent 45%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateXRaw.set((0.5 - py) * 8);
    rotateYRaw.set((px - 0.5) * 8);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      viewport={{ once: true }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(135deg, #063091 0%, #0F67FF 55%, #2E86FF 100%)',
      }}
      className="group relative rounded-[2.25rem] overflow-hidden p-10 sm:p-14 text-white cursor-pointer shadow-xl shadow-[#0066FF]/20 hover:shadow-[0_30px_70px_-15px_rgba(15,103,255,0.55)] transition-shadow duration-500 border border-white/10"
    >
      <motion.div className="absolute inset-0 rounded-[2rem] pointer-events-none z-20" style={{ opacity: glareOpacity, background: glareBackground }} />
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6" style={{ transformStyle: 'preserve-3d' }}>
        <div className="space-y-4 max-w-md">
          <motion.div
            whileHover={{ scale: 1.22, y: -4, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{ z: 30 }}
            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/20"
          >
            <div className="text-[#0066FF]">{icon}</div>
          </motion.div>

          <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">{desc}</p>
        </div>

        <div className="sm:border-l sm:border-white/25 sm:pl-6 space-y-2.5 shrink-0 pt-4 sm:pt-0 border-t border-white/25">
          {bullets.map((bullet, bIdx) => (
            <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-white transition-colors">
              <span className="text-[#FFD84D] font-bold">»</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Original Desktop Cinematic "Why Entice" Feature Card
// ----------------------------------------------------------------------
const CinematicFeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 20 });
  
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]: number[]) =>
    `radial-gradient(circle 300px at ${gx}% ${gy}%, rgba(255,255,255,0.9), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    rotateXRaw.set((0.5 - py) * 35);
    rotateYRaw.set((px - 0.5) * 35);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.06, zIndex: 50 }} 
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className="relative h-auto lg:h-[280px] w-full p-8 rounded-[2rem] bg-gradient-to-br from-white/50 to-white/10 backdrop-blur-xl border border-white/70 shadow-[0_20px_50px_-15px_rgba(0,10,40,0.06)] overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay rounded-[2rem]" 
        style={{ opacity: glareOpacity, background: glareBackground }} 
      />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm border border-white/60 mb-6">
          <div className="text-[#0F67FF]">{icon}</div>
        </div>
        <h4 className="text-xl font-black text-[#1D1D1F] tracking-tight leading-snug mb-3">
          {title}
        </h4>
        <p className="text-sm text-[#86868B] leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

// New Isolated Mobile "Why Entice" Feature Card
const MobileCinematicFeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 150, damping: 20 });
  
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]: number[]) =>
    `radial-gradient(circle 300px at ${gx}% ${gy}%, rgba(255,255,255,0.9), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    
    rotateXRaw.set((0.5 - py) * 20);
    rotateYRaw.set((px - 0.5) * 20);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04, zIndex: 50 }} 
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className="relative min-h-[120px] w-full p-3.5 rounded-[1.25rem] bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border border-white/70 shadow-[0_10px_25px_-5px_rgba(0,10,40,0.05)] overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay rounded-[1.25rem]" 
        style={{ opacity: glareOpacity, background: glareBackground }} 
      />
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#0066FF]/5 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="w-7 h-7 bg-white/80 backdrop-blur-md rounded-lg flex items-center justify-center shadow-sm border border-white/60 mb-2">
          <div className="text-[#0F67FF]">{icon}</div>
        </div>
        <h4 className="text-[12px] font-extrabold text-[#1D1D1F] tracking-tight leading-snug mb-1">
          {title}
        </h4>
        <p className="text-[10px] text-[#86868B] leading-tight font-medium">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------
export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConsultation }) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cinematicWhyRef = useRef<HTMLElement>(null);
  
  const [mousePos, setMousePos] = useState({ normX: 0, normY: 0, rawX: -1000, rawY: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ normX, normY, rawX: e.clientX, rawY: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => setIsHovering(false);

  const headlineText = 'Build to Hire smarter.';
  const accentStartIndex = headlineText.indexOf('smarter.');

  const { scrollYProgress } = useScroll();
  
  const svgOpacity = useTransform(scrollYProgress, [0, 0.12, 0.95, 1], [0.6, 0.5, 0.5, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [isHovering ? 1 : 0, isHovering ? 0.4 : 0, isHovering ? 0.4 : 0, 0]);

  // Hero Stats Scroll Physics
  const { scrollYProgress: statsProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  
  const smoothStatsProgress = useSpring(statsProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const pairSeparation = useTransform(smoothStatsProgress, [0.05, 0.4], [0, 1400]);
  const leftShift = useTransform(pairSeparation, (v) => -v);
  const rightShift = useTransform(pairSeparation, (v) => v);

  // ----------------------------------------------------------------------
  // Cinematic "Why Entice" Scroll Physics
  // ----------------------------------------------------------------------
  const { scrollYProgress: whyProgress } = useScroll({
    target: cinematicWhyRef,
    offset: ["start start", "end end"]
  });

  const whyTitleScale = useTransform(whyProgress, [0, 0.4], [1, 15]);
  const whyTitleOpacity = useTransform(whyProgress, [0, 0.3], [1, 0]);
  const whyTitleBlur = useTransform(whyProgress, [0, 0.3], ["blur(0px)", "blur(12px)"]);
  const whyTitleDisplay = useTransform(whyProgress, v => v > 0.4 ? "none" : "flex");
  
  const [contentRevealed, setContentRevealed] = useState(false);

  useEffect(() => {
    const unsubscribe = whyProgress.on("change", (latest) => {
      if (latest > 0.3) {
        setContentRevealed(true);
      } else if (latest < 0.15) {
        setContentRevealed(false);
      }
    });
    return () => unsubscribe();
  }, [whyProgress]);

  return (
    <div 
      /* [overflow-x:clip] prevents horizontal wobble without breaking position:sticky for scroll animations! */
      className="w-full min-h-screen text-[#1D1D1F] relative z-0 bg-white [overflow-x:clip]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* GLOBAL SCROLLING GRADIENT */}
      <div 
        className="absolute top-0 left-0 w-full h-[2200px] pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, #051A59 0%, #0F67FF 14%, #3E7DFF 26%, #7FA6FF 33%, #C3D5FF 38%, #FFFFFF 43%, #FFFFFF 100%)'
        }}
      />

      {/* FIXED DYNAMIC LINES & CURSOR GLOW */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{ opacity: svgOpacity }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {[200, 500, 900, 1200].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="800" stroke="#FFD84D" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="2 6" />
          ))}
          
          <motion.path 
            animate={{ d: `M -100 100 Q ${600 + mousePos.normX * 500} ${300 + mousePos.normY * 400} 1500 700` }}
            transition={{ type: 'spring', stiffness: 40, damping: 20 }}
            stroke="#0F67FF" strokeOpacity="0.4" strokeWidth="3" fill="none" 
          />
          <motion.path 
            animate={{ d: `M 200 -100 Q ${800 + mousePos.normX * 800} ${500 + mousePos.normY * 300} 1500 400` }}
            transition={{ type: 'spring', stiffness: 60, damping: 25 }}
            stroke="#0F67FF" strokeOpacity="0.28" strokeWidth="2" fill="none" strokeDasharray="4 4"
          />
          
          <motion.path 
            animate={{ d: `M -100 750 Q ${700 - mousePos.normX * 600} ${400 - mousePos.normY * 350} 1500 -100` }}
            transition={{ type: 'spring', stiffness: 50, damping: 25 }}
            stroke="#FFD84D" strokeOpacity="0.55" strokeWidth="3" fill="none" 
          />
          <motion.path 
            animate={{ d: `M -100 500 Q ${500 - mousePos.normX * 400} ${200 - mousePos.normY * 500} 1000 -100` }}
            transition={{ type: 'spring', stiffness: 30, damping: 15 }}
            stroke="#FFD84D" strokeOpacity="0.25" strokeWidth="6" fill="none" 
          />

          <motion.path 
            animate={{ d: `M -100 350 Q ${700 + mousePos.normX * 450} ${650 + mousePos.normY * 450} 1500 900` }}
            transition={{ type: 'spring', stiffness: 35, damping: 15 }}
            stroke="#FF6B6B" strokeOpacity="0.45" strokeWidth="3" fill="none" 
          />
        </svg>

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            mixBlendMode: 'screen',
            opacity: glowOpacity
          }}
          animate={{
            left: mousePos.rawX - 200,
            top: mousePos.rawY - 200,
          }}
          transition={{ type: 'spring', stiffness: 140, damping: 22, mass: 0.6 }}
        />
      </motion.div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section ref={heroSectionRef} className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 pt-[85px] pb-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative pt-16 pb-4" 
          >
            <h1 className="text-[35px] sm:text-7xl md:text-[5.5rem] leading-[1.1] font-extrabold tracking-tight text-center max-w-5xl mx-auto select-none text-white whitespace-nowrap">
              {headlineText.split('').map((char, i) => {
                const letterPos = (i / (headlineText.length - 1)) * 2 - 1;
                const dist = isHovering ? letterPos - mousePos.normX : 0;
                const influence = isHovering ? Math.exp(-(dist * dist) * 3.2) : 0;
                const isAccent = i >= accentStartIndex;
                const wiggleRotate = influence * (i % 2 === 0 ? 5 : -5);

                return (
                  <motion.span
                    key={i}
                    animate={{ y: -influence * 20, scale: 1 + influence * 0.22, rotate: wiggleRotate }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, mass: 0.5 }}
                    className={`inline-block ${isAccent ? 'text-[#FFD84D]' : ''}`}
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </h1>
          </motion.div>

          <div className="relative max-w-4xl mx-auto space-y-4 sm:space-y-6 mt-4 sm:mt-6 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed pt-1 sm:pt-2"
            >
              Hiring, payroll, compliance — fully managed, zero hassle.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-4 sm:pt-10 flex flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap"
            >
              <MagneticButton
                onClick={() => onNavigate('contact')}
                glowColor="rgba(255,255,255,0.5)"
                className="bg-white text-[#0F67FF] px-3.5 sm:px-8 py-2 sm:py-4 rounded-full text-[9px] sm:text-xs font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-1 sm:gap-2 group shadow-lg shrink-0"
              >
                Partner With Us
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                onClick={() => onNavigate('services')}
                glowColor="rgba(255,216,77,0.45)"
                className="px-3.5 sm:px-8 py-2 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[9px] sm:text-xs tracking-wide uppercase transition-colors flex items-center justify-center gap-1 sm:gap-2 border border-white/30 group backdrop-blur-md shrink-0"
              >
                Explore Services
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 group-hover:translate-x-1 group-hover:text-[#FFD84D] transition-all" />
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div 
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative flex flex-col w-full max-w-4xl mx-auto py-5 sm:py-12 mt-6 sm:mt-12 border-y border-white/20 gap-3 sm:gap-10"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-24 px-4 sm:px-8">
              <motion.div style={{ x: leftShift }} className="text-left flex-1 border-l-2 border-white pl-3 sm:pl-6 w-full">
                <div className="text-lg sm:text-4xl font-bold text-white drop-shadow-md">20M+</div>
                <div className="text-[9px] sm:text-[14px] uppercase tracking-[0.2em] text-[#FFD84D]/90 font-medium mt-0.5 sm:mt-2">Candidate Database</div>
              </motion.div>
              <motion.div style={{ x: rightShift }} className="text-left flex-1 border-l-2 border-white pl-3 sm:pl-6 w-full">
                <div className="text-lg sm:text-4xl font-bold text-white drop-shadow-md">15,000+</div>
                <div className="text-[9px] sm:text-[14px] uppercase tracking-[0.2em] text-[#FFD84D]/90 font-medium mt-0.5 sm:mt-2">Successful Placements </div>
              </motion.div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-24 px-4 sm:px-8">
              <motion.div style={{ x: leftShift }} className="text-left flex-1 border-l-2 border-white pl-3 sm:pl-6 w-full">
                <div className="text-lg sm:text-4xl font-bold text-white drop-shadow-md">97%</div>
                <div className="text-[9px] sm:text-[14px] uppercase tracking-[0.2em] text-[#FFD84D]/90 font-medium mt-0.5 sm:mt-2">Completion Rate </div>
              </motion.div>
              <motion.div style={{ x: rightShift }} className="text-left flex-1 border-l-2 border-white pl-3 sm:pl-6 w-full">
                <div className="text-lg sm:text-4xl font-bold text-white drop-shadow-md">100+</div>
                <div className="text-[9px] sm:text-[14px] uppercase tracking-[0.2em] text-[#FFD84D]/90 font-medium mt-0.5 sm:mt-2">Active Clients</div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0066FF] bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 inline-block">
                OUR SOLUTIONS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight leading-[1.1]">
                Seamless HR Infrastructure to <span className="text-[#0066FF]">Supercharge Your Growth.</span>
              </h2>
              <p className="text-sm text-[#86868B] leading-relaxed">
                We combine regional talent expertise with automated enterprise workflows to deliver high-speed recruitment, payroll management, and statutory compliance.
              </p>
              <div className="pt-4">
                <ServicesCTAButton onClick={() => onNavigate('services')}>
                  More Services
                </ServicesCTAButton>
              </div>
            </div>

            <div className="lg:col-span-6 pb-24">
              {[
                {
                  title: "HR Consulting & Virtual HR",
                  desc: "Connect your people's practices with business goals using outsourced HR models. Complete solutions such as Virtual HR, HR Manager, and CHRO support.",
                  bullets: ["Virtual HR Services", "Virtual HR Manager", "Virtual CHRO Support"],
                  icon: <Crown className="w-6 h-6 text-[#0066FF]" />
                },
                {
                  title: "Payroll Management",
                  desc: "Timely release of salaries, statutory deductions, tax calculations, and payroll compliance to eliminate errors and relieve administrative burden.",
                  bullets: ["Salary Processing", "Tax Calculations", "Compliance Management"],
                  icon: <Receipt className="w-6 h-6 text-[#0066FF]" />
                },
                {
                  title: "Talent Acquisition & Recruitment",
                  desc: "AI-powered candidate mapping paired with rigorous human vetting. Delivering pre-vetted top-tier tech, executive, and corporate talent within 48 hours.",
                  bullets: ["IT Recruitment", "Non-IT Recruitment", "Strategic Executive Search"],
                  icon: <Users className="w-6 h-6 text-[#0066FF]" />
                },
                {
                  title: "Training and Development",
                  desc: "Specialized corporate training programs meant to not only train employees on skills but groom their leadership capabilities and workplace productivity.",
                  bullets: ["Leadership Development", "Skill Enhancement", "Employee Engagement Workshops"],
                  icon: <GraduationCap className="w-6 h-6 text-[#0066FF]" />
                },
                {
                  title: "Statutory Compliance",
                  desc: "Ensure adherence to statutory regulations and government requirements. We guarantee accuracy in compliance reporting, minimizing legal risks.",
                  bullets: ["Labor Laws & PF/ESI", "Documentation", "POSH & Tax Filings"],
                  icon: <ShieldCheck className="w-6 h-6 text-[#0066FF]" />
                }
              ].map((service, idx) => {
                const topOffsets = [104, 146, 176, 226, 250];
                const rotations = [-1.5, 2.2, -2.4, 1.6, -1.2];
                const xOffsets = [-8, 16, -20, 12, -6];

                return (
                  <div
                    key={idx}
                    className="sticky mb-6"
                    style={{
                      top: `${topOffsets[idx % topOffsets.length]}px`,
                      zIndex: idx + 1,
                    }}
                  >
                    <div style={{ transform: `rotate(${rotations[idx % rotations.length]}deg) translateX(${xOffsets[idx % xOffsets.length]}px)` }}>
                      <TiltServiceCard
                        title={service.title}
                        desc={service.desc}
                        bullets={service.bullets}
                        icon={service.icon}
                        idx={idx}
                        onClick={() => onNavigate('services')}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section className="relative py-12 px-4 sm:px-8 max-w-7xl mx-auto z-10">
          <ROICalculator onOpenConsultation={() => onNavigate('contact')} />
        </section>

        {/* ======================================================================
            CINEMATIC "WHY ENTICE HR" SECTION 
           ====================================================================== */}
        
        {/* Unified wrapper containing both layouts */}
        <section ref={cinematicWhyRef} className="relative h-[150vh] z-20">
          
          {/* MOBILE VIEW (Visible only on < lg screens) */}
          <div className="flex lg:hidden sticky top-0 h-screen w-full flex-col items-center justify-center px-3 overflow-hidden">
            
            {/* FRAME 1: The Fading/Zooming Text */}
            <motion.div 
              style={{ 
                scale: whyTitleScale, 
                opacity: whyTitleOpacity,
                filter: whyTitleBlur,
                display: whyTitleDisplay,
                willChange: "transform, opacity, filter" 
              }}
              className="absolute inset-0 flex items-center justify-center z-50 origin-center pointer-events-none w-full px-4"
            >
              <h2 className="text-[28px] font-black text-[#1D1D1F] text-center tracking-tighter drop-shadow-sm leading-[1.05]">
                Why <br />
                <span 
                  className="inline-block px-3 py-1 bg-gradient-to-br from-[#051A59] via-[#0F67FF] to-[#A3C6FF] bg-clip-text text-transparent transform-gpu"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Entice HR Solutions?
                </span>
              </h2>
            </motion.div>

            {/* FRAME 2: The Grid & Content Reveal */}
            <motion.div 
              initial={false}
              animate={{ 
                opacity: contentRevealed ? 1 : 0, 
                y: contentRevealed ? 0 : 20,
                pointerEvents: contentRevealed ? "auto" : "none" 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-40 flex flex-col items-center justify-center gap-6 w-full max-w-[340px] mx-auto h-[85vh] py-4"
            >
              <div className="text-center px-2 shrink-0">
                <h3 className="text-[22px] font-black text-[#1D1D1F] leading-[1.2] tracking-tight drop-shadow-sm">
                  Because we don’t just fill positions<br/>
                  <span className="text-[#0066FF]">We find the right people to drive your GROWTH.</span>
                </h3>
              </div>

              <div className="flex flex-col w-full gap-3 shrink-0">
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="w-full">
                    <MobileCinematicFeatureCard 
                      title="Zero Fixed Overhead" 
                      desc="Pay only for actual hires or monthly tiers."
                      icon={<TrendingUp className="w-4 h-4" />}
                    />
                  </div>
                  <div className="w-full">
                    <MobileCinematicFeatureCard 
                      title="100% Audit Proof" 
                      desc="PF, ESI & tax filings with zero risk."
                      icon={<Shield className="w-4 h-4" />}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <MobileCinematicFeatureCard 
                    title="90-Day Free Replacement" 
                    desc="Complete peace of mind with our screening guarantee."
                    icon={<Sparkles className="w-4 h-4" />}
                  />
                </div>
              </div>
              
              <div className="w-full flex items-center justify-center pt-2 shrink-0">
                <MobileServicesCTAButton onClick={() => onNavigate('contact')}>
                  Schedule Free HR Strategy Call
                </MobileServicesCTAButton>
              </div>
            </motion.div>
          </div>

          {/* DESKTOP VIEW (Visible only on >= lg screens) - PERFECT MATCH TO ORIGINAL */}
          <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col items-center justify-center px-4 overflow-hidden">
            
            {/* FRAME 1: The Fading/Zooming Text */}
            <motion.div 
              style={{ 
                scale: whyTitleScale, 
                opacity: whyTitleOpacity,
                filter: whyTitleBlur,
                display: whyTitleDisplay,
                willChange: "transform, opacity, filter" 
              }}
              className="absolute inset-0 flex items-center justify-center z-50 origin-center pointer-events-none w-full"
            >
              <h2 className="text-[3rem] md:text-[5.5vw] xl:text-[5.5rem] font-black text-[#1D1D1F] text-center px-4 tracking-tighter drop-shadow-sm leading-[1.05]">
                Why <br />
                <span 
                  className="inline-block px-4 py-2 bg-gradient-to-br from-[#051A59] via-[#0F67FF] to-[#A3C6FF] bg-clip-text text-transparent transform-gpu"
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  Entice HR Solutions?
                </span>
              </h2>
            </motion.div>

            {/* FRAME 2: The Grid & Content Reveal */}
            <motion.div 
              initial={false}
              animate={{ 
                opacity: contentRevealed ? 1 : 0, 
                y: contentRevealed ? 0 : 30,
                pointerEvents: contentRevealed ? "auto" : "none" 
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-40 flex flex-col items-center justify-center w-full max-w-7xl mx-auto"
            >
              <h3 className="text-3xl md:text-5xl font-black text-center text-[#1D1D1F] mb-12 max-w-5xl leading-[1.15] tracking-tight drop-shadow-sm">
                Because we don’t just fill positions<br/>
                <span className="text-[#0066FF]">We find the right people to drive your GROWTH.</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full relative">
                <div className="w-full">
                  <CinematicFeatureCard 
                    title="Zero Fixed Payroll Overhead" 
                    desc="Pay only for actual hires made or straightforward payroll monthly tiers. Keep your capital agile."
                    icon={<TrendingUp className="w-6 h-6" />}
                  />
                </div>
                <div className="w-full lg:h-[280px]">
                  <CinematicFeatureCard 
                    title="100% Audit-Proof Compliance" 
                    desc="Full PF, ESI, PT, POSH, and statutory tax filings handled flawlessly with zero tolerance for risk."
                    icon={<Shield className="w-6 h-6" />}
                  />
                </div>
                <div className="w-full">
                  <CinematicFeatureCard 
                    title="90-Day Free Candidate Replacement" 
                    desc="Complete peace of mind. We stand behind our screening with rigorous replacement guarantees."
                    icon={<Sparkles className="w-6 h-6" />}
                  />
                </div>
              </div>
              
              <div className="w-full flex items-center justify-center mt-12">
                <ServicesCTAButton onClick={() => onNavigate('contact')}>
                  Schedule Free HR Strategy Call
                </ServicesCTAButton>
              </div>
            </motion.div>
          </div>

        </section>

        {/* 
          ========================================================================
          CLIENT TESTIMONIALS 
          ========================================================================
        */}
        <section className="relative py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-white/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 mb-12 z-10 shadow-[0_20px_60px_-15px_rgba(0,10,40,0.05)]">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#0066FF]">
              Client Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1D1D1F] tracking-tight drop-shadow-sm">
              Trusted by Fast-Growing Founders
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-8 rounded-[2rem] card-item bg-white/60 backdrop-blur-md border border-white/80 shadow-xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold tracking-wide mb-6">
                    {t.metrics}
                  </div>
                  <p className="text-sm md:text-[15px] text-[#505055] font-medium leading-relaxed mb-8">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-black/10">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-black text-lg text-[#1D1D1F]">{t.author}</h4>
                    <p className="text-[13px] font-bold text-[#86868B] tracking-wide">{t.title}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CONVERSION BANNER */}
        <section className="relative py-16 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto text-center z-10">
          <div className="p-10 md:p-16 rounded-3xl bg-[#050B1F] text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0066FF]/30 rounded-full blur-3xl pointer-events-none" />

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/10">
              Ready to Scale Without HR Hassles?
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white">
              Let Entice HR Solutions manage your talent & payroll starting today.
            </h2>

            <p className="text-sm text-white/70 max-w-xl mx-auto">
              Book a free 15-minute consultation with our senior talent strategist. No commitment required.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm transition-all shadow-xl shadow-[#0066FF]/30 flex items-center justify-center gap-2"
              >
                Partner With Us Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};