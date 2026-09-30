import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, ArrowRight, MessageSquare } from 'lucide-react';

interface MembershipCTAProps {
  onOpenJoinModal: () => void;
}

export const MembershipCTA: React.FC<MembershipCTAProps> = ({ onOpenJoinModal }) => {
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ctaRef}
      className="relative py-24 sm:py-32 overflow-hidden flex items-center justify-center bg-slate-900 [perspective:1000px]"
    >
      {/* 3D Scroll Parallax Background with Real Uploaded Gym Image */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src="/images/gym/equipment-lever-press.jpg"
          alt="Heavy standing lever press apparatus at XXX GYM"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.2]"
          loading="lazy"
        />
        {/* Dynamic Energetic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-950/60 via-transparent to-amber-950/60" />
      </motion.div>

      {/* Foreground Content Card with 3D Scroll Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-extrabold text-amber-300 uppercase tracking-widest mb-6 backdrop-blur-md">
          <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>YOUR TIME IS NOW</span>
        </div>

        {/* Big Headline */}
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] mb-6">
          READY TO GET <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-amber-400">STRONGER?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-2xl text-slate-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          Your fitness journey starts with one decision.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-base font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span>JOIN NOW</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-extrabold tracking-wider uppercase text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-rose-600" />
            <span>CONTACT US</span>
          </button>
        </div>

        {/* Reassurance notes */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold uppercase tracking-wider text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            No Long Lock-in Contracts
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Full Access to Heavy Iron
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Experienced Guidance
          </span>
        </div>

      </motion.div>
    </section>
  );
};
