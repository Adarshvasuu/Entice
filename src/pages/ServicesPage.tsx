import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Users, 
  Crown, 
  Receipt, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/content';

interface ServicesPageProps {
  onOpenConsultation?: (serviceTitle?: string) => void;
  onNavigate?: (page: string) => void;
}

// ----------------------------------------------------------------------
// Premium Magnetic CTA Button
// ----------------------------------------------------------------------
interface MagneticCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MagneticCTAButton: React.FC<MagneticCTAButtonProps> = ({ children, onClick }) => {
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
      className="group relative inline-flex items-center gap-5 pl-9 pr-2 py-2 rounded-full text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#0066FF]/25 z-10 shrink-0"
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
        className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md"
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
          <ArrowUpRight className="w-5 h-5 text-white" />
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// Blue Gradient Service Module Card (Clean Version)
// ----------------------------------------------------------------------
const ServiceModuleCard: React.FC<{
  srv: any;
  idx: number;
  icon: React.ReactNode;
  onNavigate?: (page: string) => void;
}> = ({ srv, idx, icon, onNavigate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 22 });
  
  const glareBackground = useTransform([glareX, glareY], ([gx, gy]: number[]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 70%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateXRaw.set((0.5 - py) * 4);
    rotateYRaw.set((px - 0.5) * 4);
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        // NOTE: Intentionally omitted transformStyle: 'preserve-3d' to fix Safari/Chrome z-index overlap bugs
      }}
      className="group relative w-full rounded-[2.25rem] text-white shadow-xl shadow-[#0066FF]/20 hover:shadow-[0_30px_70px_-15px_rgba(15,103,255,0.55)] transition-shadow duration-500 border border-white/10"
    >
      <div 
        className="absolute inset-0 rounded-[2.25rem] overflow-hidden pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #063091 0%, #0F67FF 55%, #2E86FF 100%)' }}
      >
        <motion.div className="absolute inset-0 z-20" style={{ opacity: glareOpacity, background: glareBackground }} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      </div>

      <div className="relative z-20 p-8 sm:p-12 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-8 border-b border-white/20">
          <div className="flex items-start gap-5">
            <div className="p-4 rounded-2xl bg-white shadow-lg shadow-black/20 shrink-0">
              <div className="text-[#0066FF]">{icon}</div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD84D]">
                Service Module 0{idx + 1}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 drop-shadow-sm">
                {srv.title}
              </h2>
              <p className="text-sm text-white/80 font-semibold mt-2">
                Ideal For: {srv.idealFor}
              </p>
            </div>
          </div>
          
          <MagneticCTAButton onClick={() => onNavigate && onNavigate('contact')}>
            Request Proposal
          </MagneticCTAButton>
        </div>

        <div className="py-2 text-base text-white/90 leading-relaxed font-light">
          {srv.fullDesc}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="p-6 rounded-3xl bg-white/10 border border-white/20 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 drop-shadow-sm">
              Key Features & Capabilities
            </h4>
            <ul className="space-y-3">
              {srv.features.map((ft: string, fIdx: number) => (
                <li key={fIdx} className="text-sm text-white/90 flex items-start gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD84D] shrink-0 mt-0.5" />
                  <span>{ft}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white/10 border border-white/20 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 drop-shadow-sm">
              Measurable Outcomes & Deliverables
            </h4>
            <ul className="space-y-3">
              {srv.deliverables.map((del: string, dIdx: number) => (
                <li key={dIdx} className="text-sm text-white/90 flex items-start gap-3 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#FFD84D] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Main Services Page Component
// ----------------------------------------------------------------------
export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
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

  const serviceIconsMap: Record<string, React.ReactNode> = {
    'Users': <Users className="w-8 h-8 text-[#0066FF]" />,
    'Crown': <Crown className="w-8 h-8 text-[#0066FF]" />,
    'Receipt': <Receipt className="w-8 h-8 text-[#0066FF]" />,
    'ShieldCheck': <ShieldCheck className="w-8 h-8 text-[#0066FF]" />,
    'GraduationCap': <GraduationCap className="w-8 h-8 text-[#0066FF]" />
  };

  return (
    <div 
      className="w-full min-h-screen text-[#1D1D1F] relative z-0 bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute top-0 left-0 w-full h-[2200px] pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, #051A59 0%, #0F67FF 16%, #3E7DFF 28%, #7FA6FF 38%, #C3D5FF 48%, #FFFFFF 58%, #FFFFFF 100%)'
        }}
      />

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

      <div className="relative z-10">

        {/* HERO SECTION - Aligned text margin to match About Us page layout */}
        <section className="relative pt-[85px] pb-16 md:pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.1 }}
            className="relative mt-20 md:mt-32 text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm"
          >
            End-to-End HR Operations for <span className="text-[#FFD84D]">Scaling Teams</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2 }}
            className="relative text-lg text-white/75 max-w-3xl mx-auto mt-4 leading-relaxed"
          >
            Whether you need a single executive search or a complete outsourced HR squad managing hiring, payroll, and compliance, Entice HR Solutions delivers precision and speed.
          </motion.p>
        </section>

        {/* VERTICAL STACKING SERVICES BLOCKS (Cards fully overlap each other) */}
        <section className="py-12 pb-[30vh] px-4 sm:px-8 max-w-5xl mx-auto">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              className="sticky mb-[25vh]"
              style={{
                top: '140px', // Identical top offset ensures they fully overlap and stack perfectly
                zIndex: 10 + idx, // Strictly enforces new cards layer ON TOP of older ones
              }}
            >
              <ServiceModuleCard
                srv={srv}
                idx={idx}
                icon={serviceIconsMap[srv.iconName]}
                onNavigate={onNavigate}
              />
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};