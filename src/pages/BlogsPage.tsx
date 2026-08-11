import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  ArrowRight, 
  X
} from 'lucide-react';
import { BLOG_POSTS } from '../data/content';
import { BlogPost } from '../types';

// ----------------------------------------------------------------------
// Tilt Blog Card (Glossy Blue 3D Effect)
// ----------------------------------------------------------------------
const TiltBlogCard: React.FC<{ post: BlogPost; idx: number; onClick: () => void }> = ({ post, idx, onClick }) => {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${post.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="group relative flex flex-col justify-between w-full h-full p-6 rounded-[2.25rem] text-white shadow-xl shadow-[#0066FF]/20 hover:shadow-[0_30px_70px_-15px_rgba(15,103,255,0.4)] transition-shadow duration-500 cursor-pointer border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F67FF]"
    >
      {/* Background Wrapper (Glossy Blue Overlay) */}
      <div 
        className="absolute inset-0 rounded-[2.25rem] overflow-hidden pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #063091 0%, #0F67FF 55%, #2E86FF 100%)' }}
      >
        <motion.div className="absolute inset-0 z-20" style={{ opacity: glareOpacity, background: glareBackground }} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      </div>

      <div className="relative z-20 space-y-5">
        {/* Article Thumbnail */}
        <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-white/10 shadow-sm">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white shadow-sm border border-white/20">
            {post.category}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 text-[11px] text-[#FFD84D] font-medium tracking-wide">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">{post.date}</span>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
            {post.title}
          </h3>

          <p className="text-sm text-white/80 leading-relaxed line-clamp-3 font-light">
            {post.snippet}
          </p>
        </div>
      </div>

      {/* Author & Read More */}
      <div className="relative z-20 pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
          />
          <div>
            <h4 className="font-bold text-xs text-white tracking-wide">{post.author.name}</h4>
            <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">{post.author.role}</p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#FFD84D] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
          Read Article
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// Main Blogs Page Component
// ----------------------------------------------------------------------
export const BlogsPage: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

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

  return (
    <div 
      className="w-full max-w-[100vw] min-h-screen text-[#1D1D1F] relative z-0 bg-white [overflow-x:clip]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* GLOBAL SCROLLING GRADIENT - Removed min-h-[2200px] and used inset-0 to perfectly map to content height */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, #051A59 0%, #0F67FF 16%, #3E7DFF 28%, #7FA6FF 38%, #C3D5FF 48%, #FFFFFF 58%, #FFFFFF 100%)'
        }}
      />

      {/* FIXED DYNAMIC LINES & CURSOR GLOW */}
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

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-[85px] pb-6 md:pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.1 }}
            className="relative mt-12 md:mt-32 text-[35px] sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] sm:leading-tight drop-shadow-sm"
          >
            Modern HR Playbooks & <span className="text-[#FFD84D]">Sourcing Trends</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ delay: 0.2 }}
            className="relative text-sm sm:text-lg text-white/90 sm:text-white/75 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            <span className="sm:hidden">
              Actionable B2B insights on hiring tech talent, statutory compliance, and payroll automation.
            </span>
            <span className="hidden sm:inline">
              Actionable B2B insights on hiring tech talent, statutory compliance, payroll automation, and scaling companies without internal HR overhead.
            </span>
          </motion.p>
        </section>

        {/* GRID OF ARTICLES */}
        <section className="py-8 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post, idx) => (
              <TiltBlogCard 
                key={post.id} 
                post={post} 
                idx={idx} 
                onClick={() => setActiveArticle(post)} 
              />
            ))}
          </div>
        </section>

      </div>

      {/* RECTANGLE POP ARTICLE READER MODAL (Strictly matching the standard cards) */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-[2.25rem] max-w-6xl w-full border border-white/10 shadow-2xl relative flex flex-col md:flex-row overflow-hidden max-h-[90vh] text-white"
            >
              {/* Identical Background to TiltBlogCard */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, #063091 0%, #0F67FF 55%, #2E86FF 100%)' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              <button 
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 shadow-sm border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image & Meta (Sticky) */}
              <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-white/20 flex flex-col p-6 sm:p-10 shrink-0 relative z-10">
                <div className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                  <img 
                    src={activeArticle.imageUrl} 
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                      {activeArticle.category}
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4 bg-white/10 p-4 rounded-2xl shadow-sm border border-white/20 backdrop-blur-md">
                  <img 
                    src={activeArticle.author.avatar} 
                    alt={activeArticle.author.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/20"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-wide">{activeArticle.author.name}</h4>
                    <p className="text-xs text-white/70 font-medium tracking-wide">{activeArticle.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content (Scrollable) */}
              <div className="w-full md:w-7/12 flex flex-col p-6 sm:p-10 overflow-y-auto relative z-10">
                <div className="flex items-center gap-4 text-xs font-semibold text-[#FFD84D] mb-4 tracking-wide">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {activeArticle.readTime}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80">{activeArticle.date}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
                  {activeArticle.title}
                </h2>

                <div className="prose prose-sm sm:prose-base max-w-none text-white/90 space-y-5 leading-relaxed font-light whitespace-pre-line flex-1">
                  {activeArticle.content}
                </div>

                <div className="pt-8 mt-10 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Published by Entice HR Knowledge Desk
                  </span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-8 py-3 rounded-full bg-white hover:bg-gray-100 transition-all text-[#0066FF] font-bold text-xs tracking-wider shadow-lg w-full sm:w-auto"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
