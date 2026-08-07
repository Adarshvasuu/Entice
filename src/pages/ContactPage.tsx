import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/content';
import { LeadFormData } from '../types';
import { submitLeadToGoogleSheet } from '../utils/submitLeadToGoogleSheet';

// ----------------------------------------------------------------------
// Premium Magnetic CTA Button
// ----------------------------------------------------------------------
interface MagneticCTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const MagneticCTAButton: React.FC<MagneticCTAButtonProps> = ({ children, onClick, type = 'button', disabled }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - centerX) * 0.2, y: (e.clientY - centerY) * 0.2 });
  };

  const handleLeave = () => {
    if (disabled) return;
    setOffset({ x: 0, y: 0 });
    setHovered(false);
  };

  const arrowRotate = Math.max(-8, Math.min(32, offset.x * 0.55)) + (hovered && !disabled ? 14 : 0);

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x * 0.3, y: offset.y * 0.3, scale: hovered && !disabled ? 1.03 : 1 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className={`group relative inline-flex items-center gap-5 pl-9 pr-2 py-2 rounded-full text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#0066FF]/25 z-10 shrink-0 ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      style={{ background: 'linear-gradient(100deg, #051A59 0%, #0B3FA8 55%, #0F67FF 100%)' }}
    >
      {children}

      <motion.span
        animate={{
          boxShadow: hovered && !disabled
            ? '0 0 0 1px rgba(255,255,255,0.35), 0 8px 30px 6px rgba(255,107,107,0.45)'
            : '0 0 0 1px rgba(255,255,255,0.2), 0 0 0 0 rgba(255,107,107,0)',
        }}
        transition={{ duration: 0.35 }}
        className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white/15 backdrop-blur-md"
      >
        <motion.span
          animate={{ opacity: hovered && !disabled ? 1 : 0 }}
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
          {disabled ? <CheckCircle2 className="w-5 h-5 text-white" /> : <ArrowUpRight className="w-5 h-5 text-white" />}
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// Tilt Blue Glossy Card (For Headquarters)
// ----------------------------------------------------------------------
const TiltBlueCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative w-full rounded-[2.25rem] text-white shadow-xl shadow-[#0066FF]/20 hover:shadow-[0_30px_70px_-15px_rgba(15,103,255,0.4)] transition-shadow duration-500 border border-white/10"
    >
      <div 
        className="absolute inset-0 rounded-[2.25rem] overflow-hidden pointer-events-none"
        style={{ 
          background: 'linear-gradient(135deg, rgba(15,103,255,0.75) 0%, rgba(6,48,145,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25)'
        }}
      >
        <motion.div className="absolute inset-0 z-20" style={{ opacity: glareOpacity, background: glareBackground }} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      </div>
      <div className="relative z-20 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Tilt Glass Card (For Lead Form - Smooth whitish transition at the bottom)
// ----------------------------------------------------------------------
const TiltGlassCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    rotateXRaw.set((0.5 - py) * 3);
    rotateYRaw.set((px - 0.5) * 3);
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
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative rounded-[2.25rem] w-full"
    >
      <div 
        className="absolute inset-0 rounded-[2.25rem] overflow-hidden border border-white/30 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(15,103,255,0.25) 0%, rgba(255,255,255,0.6) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 20px 50px -15px rgba(5,26,89,0.25)',
        }}
      >
        <motion.div className="absolute inset-0 z-10" style={{ opacity: glareOpacity, background: glareBackground }} />
      </div>
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Main Contact Page Component
// ----------------------------------------------------------------------
export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    companySize: '11-50',
    serviceNeeded: 'Recruitment & Talent Acquisition',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Background interaction states
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to submit lead to Google Sheet:', error);
      alert('Something went wrong sending your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="w-full text-[#1D1D1F] relative z-0 bg-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* GLOBAL SCROLLING GRADIENT - Changed to inset-0 h-full to fit content perfectly without gaps */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, #051A59 0%, #0F67FF 20%, #3E7DFF 40%, #7FA6FF 60%, #C3D5FF 80%, #FFFFFF 100%)'
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

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-[85px] pb-16 md:pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.1 }}
            className="relative mt-20 md:mt-32 text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm"
          >
            Let's Build Your Workforce <span className="text-[#FFD84D]">Together.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2 }}
            className="relative text-lg text-white/80 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Ready to eliminate hiring delays and payroll administrative overhead? Connect with Entice HR Solutions today.
          </motion.p>
        </section>

        {/* SPLIT-SCREEN LAYOUT */}
        <section className="py-8 pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDE: Contact Details & Quick Actions */}
            <div className="lg:col-span-5 space-y-8 flex flex-col">
              <TiltBlueCard>
                <div className="p-8 sm:p-10 space-y-8 h-full flex flex-col">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                    Corporate Headquarters
                  </h2>

                  <div className="space-y-6 flex-1">
                    {/* Phone & WhatsApp */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#FFD84D] shrink-0 shadow-sm backdrop-blur-md">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white/60">Phone / WhatsApp</h4>
                        <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-lg font-bold text-white hover:text-[#FFD84D] transition-colors block mt-1">
                          {COMPANY_DETAILS.phoneFormatted}
                        </a>
                        <a 
                          href={COMPANY_DETAILS.whatsappUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#FFD84D] font-semibold mt-1 hover:underline drop-shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat on WhatsApp Now
                        </a>
                      </div>
                    </div>

                    {/* Address - UPDATED TO CLICKABLE GOOGLE MAPS LINK */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#FFD84D] shrink-0 shadow-sm backdrop-blur-md">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white/60">Registered Address</h4>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=47/65+Mettu+Street,+Vadiveeswaram,+Nagercoil-629002"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white/90 leading-relaxed mt-1 hover:text-[#FFD84D] transition-colors block"
                        >
                          {COMPANY_DETAILS.address}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-white/10 border border-white/20 text-[#FFD84D] shrink-0 shadow-sm backdrop-blur-md">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white/60">Email Enquiries</h4>
                        <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-sm font-semibold text-white hover:text-[#FFD84D] transition-colors block mt-1">
                          {COMPANY_DETAILS.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Channels */}
                  <div className="pt-6 border-t border-white/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">
                      Follow Social Media
                    </h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <a 
                        href={COMPANY_DETAILS.socials.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all shadow-sm flex items-center gap-2 text-xs font-semibold backdrop-blur-md"
                      >
                        <Instagram className="w-4 h-4 text-pink-400" />
                        <span>{COMPANY_DETAILS.socials.instagramHandle}</span>
                      </a>

                      <a 
                        href={COMPANY_DETAILS.socials.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all shadow-sm flex items-center gap-2 text-xs font-semibold backdrop-blur-md"
                      >
                        <Linkedin className="w-4 h-4 text-blue-300" />
                        <span>LinkedIn</span>
                      </a>

                      <a 
                        href={COMPANY_DETAILS.socials.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all shadow-sm flex items-center gap-2 text-xs font-semibold backdrop-blur-md"
                      >
                        <Twitter className="w-4 h-4 text-sky-300" />
                        <span>{COMPANY_DETAILS.socials.twitterHandle}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </TiltBlueCard>

              {/* Guaranteed Response Time Wrapper */}
              <div 
                className="p-6 sm:p-8 rounded-[2.25rem] border border-white/20 text-white backdrop-blur-md shadow-xl"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(15,103,255,0.75) 0%, rgba(6,48,145,0.85) 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25), 0 10px 30px -10px rgba(15,103,255,0.3)'
                }}
              >
                <div className="flex items-center gap-3 font-extrabold text-[15px] tracking-wide mb-3 drop-shadow-sm">
                  <Clock className="w-5 h-5 text-[#FFD84D]" />
                  Guaranteed Response Time
                </div>
                <p className="text-white/90 leading-relaxed text-sm font-medium">
                  All business proposals submitted through this lead portal receive a dedicated call and customized proposal from our senior talent lead within <strong className="text-white font-extrabold">2 hours</strong>.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: Highly Transparent Whitish Glassy Form */}
            <div className="lg:col-span-7 h-full">
              <TiltGlassCard>
                <div className="p-8 sm:p-12">
                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#0066FF] drop-shadow-sm">
                          Direct Lead Request
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight mt-2">
                          Partner With Entice HR
                        </h3>
                        <p className="text-sm sm:text-base text-[#3A3A3E] mt-2 font-medium">
                          Fill in your company details below to initiate custom recruitment or payroll services.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                        <div>
                          <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                            Your Name *
                          </label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. Ananya Deshmukh"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] focus:bg-white/90 text-base sm:text-[15px] font-medium text-[#1D1D1F] placeholder-[#1D1D1F]/40 outline-none transition-all shadow-sm backdrop-blur-md"
                          />
                        </div>

                        <div>
                          <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                            Company Name *
                          </label>
                          <input 
                            type="text"
                            required
                            placeholder="e.g. FinPulse Solutions"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] focus:bg-white/90 text-base sm:text-[15px] font-medium text-[#1D1D1F] placeholder-[#1D1D1F]/40 outline-none transition-all shadow-sm backdrop-blur-md"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                            Corporate Email *
                          </label>
                          <input 
                            type="email"
                            required
                            placeholder="ananya@finpulse.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] focus:bg-white/90 text-base sm:text-[15px] font-medium text-[#1D1D1F] placeholder-[#1D1D1F]/40 outline-none transition-all shadow-sm backdrop-blur-md"
                          />
                        </div>

                        <div>
                          <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                            Phone / WhatsApp *
                          </label>
                          <input 
                            type="tel"
                            required
                            placeholder="9488853199"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] focus:bg-white/90 text-base sm:text-[15px] font-medium text-[#1D1D1F] placeholder-[#1D1D1F]/40 outline-none transition-all shadow-sm backdrop-blur-md"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                            Company Size
                          </label>
                          <select
                            value={formData.companySize}
                            onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] text-base sm:text-[15px] font-medium text-[#1D1D1F] outline-none transition-all shadow-sm backdrop-blur-md appearance-none cursor-pointer"
                          >
                            <option value="1-10">1 - 10 Employees</option>
                            <option value="11-50">11 - 50 Employees</option>
                            <option value="51-200">51 - 200 Employees</option>
                            <option value="200+">200+ Employees</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                            Service Requirement
                          </label>
                          <select
                            value={formData.serviceNeeded}
                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] text-base sm:text-[15px] font-medium text-[#1D1D1F] outline-none transition-all shadow-sm backdrop-blur-md appearance-none cursor-pointer"
                          >
                            {SERVICES_DATA.map((s) => (
                              <option key={s.id} value={s.title}>{s.title}</option>
                            ))}
                            <option value="Complete HR Outsourcing">Complete HR Outsourcing Squad</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-extrabold text-[#1D1D1F] uppercase tracking-wider mb-2">
                          Describe Your Hiring Needs or Questions
                        </label>
                        <textarea 
                          rows={4}
                          placeholder="Provide details about target roles, tech stack, payroll headcount, or timeline..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-black/10 focus:border-[#0066FF] focus:bg-white/90 text-base sm:text-[15px] font-medium text-[#1D1D1F] placeholder-[#1D1D1F]/40 outline-none transition-all shadow-sm backdrop-blur-md resize-none"
                        />
                      </div>

                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/5">
                        <div className="flex flex-col gap-1.5 text-[13px] text-[#3A3A3E] font-bold">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-5 h-5 text-[#0066FF]" />
                            100% Confidential & Non-Disclosure
                          </span>
                          <span className="pl-6 text-xs text-[#86868B]">Or Call Direct: 9488853199</span>
                        </div>
                        
                        <MagneticCTAButton type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        </MagneticCTAButton>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-16 space-y-6 h-full flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] flex items-center justify-center mx-auto backdrop-blur-md shadow-xl">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-extrabold text-[#1D1D1F] drop-shadow-sm">
                        Request Submitted Successfully!
                      </h3>
                      <p className="text-base text-[#3A3A3E] max-w-md mx-auto leading-relaxed font-medium">
                        Thank you <strong className="text-[#1D1D1F] font-bold">{formData.fullName}</strong>. Our senior HR strategist will review <strong className="text-[#1D1D1F] font-bold">{formData.companyName}</strong>'s requirements and call you back at <strong className="text-[#1D1D1F] font-bold">{formData.phone}</strong> within 2 hours.
                      </p>

                      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto">
                        <a 
                          href={COMPANY_DETAILS.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Chat On WhatsApp
                        </a>
                        <button
                          onClick={() => setIsSuccess(false)}
                          className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white/60 border border-black/10 hover:bg-white/90 text-[#1D1D1F] font-bold text-xs tracking-wider uppercase transition-all backdrop-blur-md shadow-sm"
                        >
                          Send Another
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </TiltGlassCard>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};