import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, ChevronDown, ArrowRight, Flame } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

interface HeroProps {
  onOpenJoinModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 3D Scroll Parallax Transforms
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const scrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[96vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-slate-50 [perspective:1200px]"
    >
      {/* 3D Parallax Background Image Container */}
      <motion.div
        style={{
          scale: imageScale,
          y: imageY,
          rotateX,
          transformOrigin: 'center center',
        }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="/images/gym/hero-gym-floor.jpg"
          alt="Authentic training arena floor at XXX GYM"
          className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.92]"
          loading="eager"
        />

        {/* Sophisticated Multi-layer Light Vignette and Depth Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-slate-50/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-white/70" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-50/30 to-slate-50/80" />
      </motion.div>

      {/* Floating 3D Watermark Text */}
      <motion.div
        style={{ y: textY }}
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-black text-[140px] sm:text-[220px] lg:text-[280px] text-slate-900/[0.035] select-none pointer-events-none tracking-tighter leading-none"
      >
        XXX
      </motion.div>

      {/* Hero Content with 3D Depth Layering */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left pt-6 md:pt-10 pointer-events-auto"
      >
        <div className="max-w-3xl">
          
          {/* Authentic Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 border border-rose-200 text-slate-800 text-xs sm:text-sm font-bold mb-6 shadow-sm tracking-wide backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="uppercase tracking-wider text-slate-900">{GYM_CONFIG.brand.yearsOfLegacy} YEARS OF FITNESS & TRUST</span>
          </motion.div>

          {/* Primary High-Impact Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.93] text-slate-950 uppercase mb-6"
          >
            <span className="block text-slate-600 font-extrabold text-3xl sm:text-5xl md:text-6xl">
              20+ YEARS
            </span>
            <span className="block text-slate-900">
              OF STRENGTH.
            </span>
            <span className="block mt-2 text-slate-800">
              BUILD YOUR
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-amber-600">
              STRONGER SELF.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-2xl mb-10 text-balance"
          >
            A trusted fitness destination built on more than two decades of
            experience, discipline and commitment. Real heavy-gauge iron, structured guidance, and an ego-free training community.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <button
              onClick={onOpenJoinModal}
              className="relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <Flame className="w-5 h-5 text-amber-300 transition-transform group-hover:scale-110" />
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={scrollToExplore}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold tracking-wider uppercase text-slate-800 hover:text-rose-600 bg-white/95 hover:bg-white border border-slate-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              <span>EXPLORE THE GYM</span>
            </button>
          </motion.div>

          {/* Quick Metrics Bar with 3D Tilt Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-slate-300/80 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg"
          >
            <TiltCard maxTilt={8} scale={1.04} className="rounded-xl">
              <div className="p-3 sm:p-4 rounded-xl bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-display font-black text-rose-600">20+</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-600 font-bold">Years Legacy</div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} scale={1.04} className="rounded-xl">
              <div className="p-3 sm:p-4 rounded-xl bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-display font-black text-slate-900">100%</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-600 font-bold">Authentic Iron</div>
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} scale={1.04} className="rounded-xl">
              <div className="p-3 sm:p-4 rounded-xl bg-white/95 border border-slate-200 shadow-sm backdrop-blur-md">
                <div className="text-2xl sm:text-3xl font-display font-black text-amber-500">DAILY</div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-600 font-bold">Discipline</div>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[11px] uppercase tracking-widest text-slate-600 font-bold">Scroll to explore</span>
        <a
          href="#about"
          onClick={scrollToExplore}
          className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-600 hover:text-rose-600 hover:border-rose-400 transition-colors animate-bounce"
          aria-label="Scroll to legacy section"
        >
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
