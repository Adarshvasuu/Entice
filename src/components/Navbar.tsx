import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'motion/react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { Logo } from './Logo';
import { PageType } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenConsultation
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mouse tracking for the dynamic spotlight and glowing border
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Liquid-glass sliding highlight
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  const handleLinkHover = (page: PageType) => {
    const container = linksContainerRef.current;
    const el = linkRefs.current[page];
    if (!container || !el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({ left: elRect.left - containerRect.left - 12, width: elRect.width + 24 });
  };

  const handleLinksLeave = () => setPillStyle(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isOverHero = (currentPage === 'home' || currentPage === 'about' || currentPage === 'services' || currentPage === 'blogs' || currentPage === 'contact') && !isScrolled;

  // Multicolored Iridescent Glass Effect for the Border
  const borderGlow = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${
    isOverHero 
      ? 'rgba(255, 255, 255, 0.6), rgba(0, 102, 255, 0.25) 35%, rgba(255, 107, 107, 0.1) 60%' 
      : 'rgba(0, 102, 255, 0.4), rgba(0, 102, 255, 0.1) 50%'
  }, transparent 80%)`;

  // Soft Glass Reflection for the inside of the navbar
  const innerSpotlight = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, ${
    isOverHero 
      ? 'rgba(255, 255, 255, 0.12), rgba(255, 216, 77, 0.04) 50%' 
      : 'rgba(255, 255, 255, 0.4)'
  }, transparent 80%)`;

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Blogs', page: 'blogs' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 w-full px-3 sm:px-6 transition-all duration-300">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="max-w-7xl mx-auto relative rounded-full"
        style={{
          background: 'transparent',
        }}
      >
        {/* Proximity Glowing Glass Border */}
        <motion.div
          className="absolute -inset-[1px] rounded-full pointer-events-none opacity-0 sm:opacity-100"
          style={{ background: borderGlow }}
        />

        {/* Main Navbar Container */}
        <nav
          className={`relative w-full px-4 sm:px-7 py-3 rounded-full transition-all duration-500 overflow-hidden ${
            isOverHero
              ? 'bg-white/5 backdrop-blur-2xl border border-white/10'
              : 'bg-white/20 backdrop-blur-2xl border border-white/40'
          }`}
          style={{
            boxShadow: isOverHero
              ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.3)'
              : 'inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 24px rgba(0,0,0,0.05)',
          }}
        >
          {/* Inner Glass Spotlight Tracking Cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 sm:opacity-100"
            style={{ background: innerSpotlight }}
          />

          <div className="relative z-10 flex items-center justify-between">
            {/* Interactive Logo */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="cursor-pointer"
            >
              <Logo onClick={() => handleNavClick('home')} size="md" variant={isOverHero ? 'light' : 'dark'} />
            </motion.div>

            {/* Desktop Navigation Links */}
            <div
              ref={linksContainerRef}
              onMouseLeave={handleLinksLeave}
              className={`hidden lg:flex items-center space-x-8 text-sm font-medium relative ${isOverHero ? 'text-white/70' : 'text-gray-600'}`}
            >
              <AnimatePresence>
                {pillStyle && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, left: pillStyle.left, width: pillStyle.width }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    className={`absolute top-1/2 -translate-y-1/2 h-9 rounded-full pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.12)] ${
                      isOverHero ? 'bg-white/10 border border-white/25' : 'bg-white/40 border border-white/60'
                    }`}
                    style={{ backdropFilter: 'blur(12px)' }}
                  />
                )}
              </AnimatePresence>

              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    ref={(el) => { linkRefs.current[link.page] = el; }}
                    onMouseEnter={() => handleLinkHover(link.page)}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative z-10 transition-colors text-sm font-medium py-1 ${
                      isActive 
                        ? isOverHero ? 'text-white font-bold' : 'text-[#0066FF] font-bold' 
                        : isOverHero ? 'hover:text-white' : 'hover:text-[#1D1D1F]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.a
                href={`tel:${COMPANY_DETAILS.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isOverHero
                    ? 'border-white/20 text-white hover:border-white/50 hover:bg-white/10'
                    : 'border-black/10 hover:border-[#0066FF] text-[#1D1D1F] hover:bg-white/50'
                }`}
              >
                <Phone className={`w-3.5 h-3.5 ${isOverHero ? 'text-[#FFD84D]' : 'text-[#0066FF]'}`} />
                {COMPANY_DETAILS.phone}
              </motion.a>

              <motion.button
                onClick={() => handleNavClick('contact')}
                whileHover={{ scale: 1.05, boxShadow: isOverHero ? '0 0 20px rgba(255,255,255,0.3)' : '0 0 20px rgba(0,102,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-md ${
                  isOverHero ? 'bg-white text-[#0F67FF]' : 'bg-[#1D1D1F] text-white'
                }`}
              >
                Partner With Us
              </motion.button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-2xl transition-colors relative z-10 ${
                isOverHero ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/50 text-[#1D1D1F] hover:bg-white/80'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="lg:hidden mx-3 sm:mx-6 mt-2 max-w-7xl sm:mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden px-6 py-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`text-left py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0066FF]/10 text-[#0066FF]'
                        : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-5 mt-2 border-t border-black/[0.06] flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#0066FF] text-white text-sm font-semibold text-center shadow-lg shadow-[#0066FF]/20 active:scale-95 transition-transform"
                >
                  Partner With Us
                </button>

                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] text-white text-sm font-semibold text-center flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Direct Inquiry
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
