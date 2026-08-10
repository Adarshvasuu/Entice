import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight,
  Target, 
  Eye, 
  Database, 
  Zap, 
  Search, 
  FileCheck, 
  Users, 
  ShieldCheck,
  TrendingUp,
  Rocket,
  Handshake,
  Cpu,
  Trophy
} from 'lucide-react';

interface AboutPageProps {
  onOpenConsultation: () => void;
  onNavigate?: (page: string) => void;
}

interface TiltProcessCardProps {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  idx: number;
  align: 'left' | 'right';
}

// ----------------------------------------------------------------------
// Reusable CTA Button (Responsive: Matches mobile Services button, keeps desktop size)
// ----------------------------------------------------------------------
interface GrowWithUsButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const GrowWithUsButton: React.FC<GrowWithUsButtonProps> = ({ children, onClick }) => {
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
      className="group relative inline-flex items-center gap-3 md:gap-5 pl-5 md:pl-9 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full text-white font-semibold md:font-bold text-[11px] md:text-sm tracking-wider uppercase shadow-lg shadow-[#0066FF]/25"
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
        className="relative w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md shrink-0"
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
          <ArrowUpRight className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// Tilt Process Card (Timeline)
// ----------------------------------------------------------------------
const TiltProcessCard: React.FC<TiltProcessCardProps> = ({ step, title, desc, icon, idx, align }) => {
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
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)`
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

  const variance = idx % 3;
  const rotateFrom = (idx % 2 === 0 ? -1 : 1) * (10 + variance * 5);
  const centerPull = 70 + variance * 25; 
  const xFrom = align === 'left' ? centerPull : -centerPull;
  const yFrom = 24 + variance * 14;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.62, x: xFrom, y: yFrom, rotate: rotateFrom }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 95 + variance * 12, damping: 15 + variance * 2, mass: 0.7, delay: idx * 0.04 }}
      viewport={{ once: true, amount: 0.4 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`group relative w-full md:w-[46%] rounded-[2.25rem] text-white shadow-xl shadow-[#0066FF]/20 hover:shadow-[0_30px_70px_-15px_rgba(15,103,255,0.55)] transition-shadow duration-500 ${
        align === 'left' ? 'md:mr-auto' : 'md:ml-auto'
      }`}
    >
      <div 
        className="absolute inset-0 rounded-[2.25rem] overflow-hidden border border-white/10 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #063091 0%, #0F67FF 55%, #2E86FF 100%)' }}
      >
        <motion.div className="absolute inset-0 z-20" style={{ opacity: glareOpacity, background: glareBackground }} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-125 transition-all duration-500" />
      </div>

      <div className="relative z-10 p-8 sm:p-10 space-y-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.22, y: -4, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 shrink-0"
          >
            <div className="text-[#0066FF]">{icon}</div>
          </motion.div>
          <span className="text-xs font-bold tracking-widest text-[#FFD84D]">{step}</span>
        </div>

        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">{desc}</p>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Grid Process Card (2x3 Work Process)
// ----------------------------------------------------------------------
const GridProcessCard: React.FC<{
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  idx: number;
}> = ({ step, title, desc, icon, idx }) => {
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
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)`
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

  const isTopRow = idx < 3;
  const xStart = isTopRow ? -100 - (idx * 50) : 100 + ((idx - 3) * 50);
  const delay = (idx % 3) * 0.15;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xStart, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 90, damping: 18, delay }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="group relative w-full h-full rounded-[2.25rem] text-white shadow-xl shadow-[#0066FF]/20 hover:shadow-[0_30px_70px_-15px_rgba(15,103,255,0.55)] transition-shadow duration-500"
    >
      <div 
        className="absolute inset-0 rounded-[2.25rem] overflow-hidden border border-white/10 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #063091 0%, #0F67FF 55%, #2E86FF 100%)' }}
      >
        <motion.div className="absolute inset-0 z-20" style={{ opacity: glareOpacity, background: glareBackground }} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-125 transition-all duration-500" />
      </div>

      <div className="relative z-10 p-8 sm:p-10 space-y-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.22, y: -4, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 shrink-0"
          >
            <div className="text-[#0066FF]">{icon}</div>
          </motion.div>
          <span className="text-xs font-bold tracking-widest text-[#FFD84D]">{step}</span>
        </div>

        <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">{desc}</p>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Hub Icon 
// ----------------------------------------------------------------------
const HubIcon: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateXRaw.set((0.5 - py) * 22);
    rotateYRaw.set((px - 0.5) * 22);
  };
  const handleLeave = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="relative">
        <div
          className="absolute inset-0 -m-4 rounded-full blur-xl"
          style={{ background: 'radial-gradient(circle, rgba(15,103,255,0.35), rgba(15,103,255,0) 70%)' }}
        />
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          whileHover={{ scale: 1.06 }}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 600,
            background: 'rgba(15,103,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(15,103,255,0.15), 0 8px 28px rgba(15,103,255,0.3)',
          }}
          className="relative w-20 h-20 rounded-full flex items-center justify-center border border-white/40 p-4"
        >
          <img
            src="/logo/entice-icon-mark.png"
            alt="Entice HR mark"
            className="w-full h-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
          />
        </motion.div>
      </div>
      <div className="w-px h-16 bg-gradient-to-b from-[#0066FF]/40 to-[#0066FF]/0 mt-2" />
    </div>
  );
};

// ----------------------------------------------------------------------
// Water Glass Card
// ----------------------------------------------------------------------
interface WaterGlassCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const WaterGlassCard: React.FC<WaterGlassCardProps> = ({ icon, title, desc }) => {
  const ref = useRef<HTMLDivElement>(null);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 22 });

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]: number[]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateXRaw.set((0.5 - py) * 6);
    rotateYRaw.set((px - 0.5) * 6);
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
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="relative rounded-3xl"
    >
      <div 
        className="absolute inset-0 rounded-3xl overflow-hidden border border-white/40 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 20px 50px -15px rgba(5,26,89,0.35)',
        }}
      >
        <motion.div className="absolute inset-0 z-10" style={{ opacity: glareOpacity, background: glareBackground }} />
      </div>

      <div className="relative z-20 p-6 sm:p-10 space-y-3 sm:space-y-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-[#3A3A3E] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation, onNavigate }) => {
  const [mousePos, setMousePos] = useState({ normX: 0, normY: 0, rawX: -1000, rawY: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ normX, normY, rawX: e.clientX, rawY: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => setIsHovering(false);

  const { scrollYProgress } = useScroll();
  const svgOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0.6, 0.5, 0.35, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [isHovering ? 1 : 0, isHovering ? 0.4 : 0, isHovering ? 0.4 : 0, 0]);

  const journeySteps = [
    {
      step: '2023',
      title: 'Founded',
      desc: 'Entice Innovations was born with a clear mission — be the premium digital partner that ambitious businesses trust. Started with a small team and a big vision.',
      icon: <Rocket className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '2024',
      title: 'First 50 Clients ',
      desc: 'Secured our first enterprise partnerships across fintech, retail, and professional services. Delivered measurable growth for every single one.',
      icon: <Handshake className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '2025',
      title: '15,000+ Placement Records',
      desc: 'Backed by a track record of 15,000+ successful career placements across top-tier industries and emerging enterprises',
      icon: <Cpu className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '2026',
      title: 'PAN India Expansion',
      desc: 'Expanded operations across India, empowering fast-growing enterprises with decentralized talent acquisition and comprehensive workforce management.',
      icon: <Trophy className="w-5 h-5 text-[#0066FF]" />
    }
  ];

  const workProcessSteps = [
    {
      step: '01',
      title: 'Talent Mapping & AI Sourcing',
      desc: 'Our AI engine scans 20M+ candidate profiles, matching technical stacks, salary expectations, and geographic parameters in seconds.',
      icon: <Database className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '02',
      title: 'Behavioral & Technical Vetting',
      desc: 'Every candidate undergoes domain-specific technical evaluations and culture-alignment interviews conducted by experienced recruiters.',
      icon: <Search className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '03',
      title: 'Calibrated Shortlist in 48 Hours',
      desc: 'You receive 3 to 5 top-tier, pre-vetted candidate dossiers with detailed interviewer notes and assessment scores.',
      icon: <Zap className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '04',
      title: 'Offer Management & Background Verification',
      desc: 'We manage salary negotiation, notice period buyouts, and thorough employment & criminal background verification.',
      icon: <FileCheck className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '05',
      title: 'Ongoing Statutory Payroll & HR Support',
      desc: 'Full post-joining onboarding, POSH compliance, EPF/ESI statutory management, and 90-day replacement guarantees.',
      icon: <ShieldCheck className="w-5 h-5 text-[#0066FF]" />
    },
    {
      step: '06',
      title: 'Continuous Performance & Retention Tracking',
      desc: 'We monitor placement performance post-joining, track retention, and proactively manage our 90-day replacement guarantee.',
      icon: <TrendingUp className="w-5 h-5 text-[#0066FF]" />
    }
  ];

  return (
    <div 
      className="w-full max-w-[100vw] min-h-screen text-[#1D1D1F] relative z-0 bg-white [overflow-x:clip]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute top-0 left-0 w-full h-[1500px] pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, #051A59 0%, #0F67FF 20%, #3E7DFF 36%, #7FA6FF 48%, #C3D5FF 58%, #FFFFFF 68%, #FFFFFF 100%)'
        }}
      />

      <motion.div 
        className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
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

      <div className="relative z-10">

      {/* HERO SECTION */}
      <section className="relative pt-[85px] pb-6 md:pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.h1 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.1 }}
          className="relative mt-12 md:mt-32 text-[35px] sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] sm:leading-tight"
        >
          Your Growth, <span className="text-[#FFD84D]">Our People.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ delay: 0.2 }}
          className="relative text-sm sm:text-lg text-white/90 sm:text-white/75 max-w-3xl mx-auto mt-4 leading-relaxed"
        >
          <span className="sm:hidden">
            We were founded on a simple premise: startups and fast-growing companies deserve enterprise-grade HR, recruitment, and payroll capabilities.
          </span>
          <span className="hidden sm:inline">
            We were founded on a simple premise: startups and fast-growing companies deserve enterprise-grade HR, recruitment, and payroll capabilities without building expensive internal HR departments.
          </span>
        </motion.p>
      </section>

      {/* MISSION & VISION */}
      <section className="pt-6 pb-16 md:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <WaterGlassCard
            icon={<Target className="w-6 h-6" />}
            title="Our Mission"
            desc="To empower ambitious business leaders by taking full ownership of their talent acquisition, executive headhunting, and statutory payroll compliance—ensuring every company has access to world-class workforce management."
          />
          <WaterGlassCard
            icon={<Eye className="w-6 h-6" />}
            title="Our Vision"
            desc="To become India's most trusted AI-powered HR outsourcing ecosystem, bridging top candidate talent with visionary startups and enterprises seamlessly and ethically."
          />
        </div>
      </section>

      {/* OUR JOURNEY - 4 YEAR PROGRESS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
            Our Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight">
            From Idea to Impact in Four Years.
          </h2>
        </div>

        <HubIcon />

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#0066FF]/30 via-[#0066FF]/15 to-transparent" />

          <div className="space-y-8 md:space-y-4">
            {journeySteps.map((step, idx) => {
              const align: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
              return (
                <div key={idx} className="relative flex md:items-center">
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-2 border-[#0066FF] text-[#0066FF] font-bold text-sm items-center justify-center shadow-md z-10">
                    {step.step}
                  </div>

                  <TiltProcessCard
                    step={step.step}
                    title={step.title}
                    desc={step.desc}
                    icon={step.icon}
                    idx={idx}
                    align={align}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORK PROCESS - 2x3 Grid */}
      <section className="relative py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06]">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
            Work Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight drop-shadow-sm">
            Our Proven Hiring Process
          </h2>
          <p className="text-[#86868B] text-sm font-medium">
            A 6-step AI-powered framework built for speed and precision.
          </p>
        </div>

        {/* Adjusted padding strictly for mobile via md:pb-16 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-16">
          {workProcessSteps.map((step, idx) => (
            <div key={idx} className="w-full">
              <GridProcessCard
                step={`STEP ${step.step}`}
                title={step.title}
                desc={step.desc}
                icon={step.icon}
                idx={idx}
              />
            </div>
          ))}
        </div>

        {/* Adjusted margin strictly for mobile via md:mt-28 */}
        <div className="mt-6 md:mt-28 text-center flex justify-center pb-10">
          <GrowWithUsButton onClick={() => onNavigate ? onNavigate('contact') : onOpenConsultation()}>
            Grow with us
          </GrowWithUsButton>
        </div>
      </section>

      </div>
    </div>
  );
};