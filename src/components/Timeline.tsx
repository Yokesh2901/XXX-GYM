import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Shield, Flame } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

export const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 90%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="py-24 sm:py-32 bg-white relative overflow-hidden pattern-dots border-y border-slate-200"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700 uppercase tracking-widest mb-4 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>TWO DECADES OF DEDICATION</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight uppercase leading-tight">
            MORE THAN A GYM.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-amber-600">
              A LEGACY.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            A journey built through consistency, discipline and community.
          </p>
        </div>

        {/* Timeline Content Layout: Visual Split with Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Equipment Feature with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <TiltCard maxTilt={8} scale={1.02} className="rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-card-light group">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl relative">
                  <img
                    src="/images/gym/equipment-seated-calf.jpg"
                    alt="Time-tested heavy iron plates and seated lever gym station at XXX GYM"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-5 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-md">
                    <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-600" />
                      <span>UNBROKEN STANDARDS</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                      Tested by 20+ years of daily iron work.
                    </p>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Real iron plates, heavy steel frames, and lifters who train with purpose.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Industrial corner badge */}
            <div className="absolute -top-3 -left-3 px-4 py-2 rounded-xl bg-rose-600 text-white font-display font-black text-xs uppercase tracking-wider shadow-md">
              EST. 20+ YEARS
            </div>
          </motion.div>

          {/* Right Column: Milestones Track with 3D Scroll Progress Line */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative pl-6 sm:pl-8 space-y-10">
              
              {/* Static Background Track */}
              <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-1 bg-slate-200 rounded-full" />

              {/* Dynamic 3D Scroll-Animated Laser Progress Line */}
              <motion.div
                style={{ scaleY, transformOrigin: 'top center' }}
                className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-1 bg-gradient-to-b from-rose-600 via-red-500 to-amber-500 rounded-full shadow-glow-red"
              />
              
              {TIMELINE_MILESTONES.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Glowing 3D Node */}
                  <div className="absolute -left-[32px] sm:-left-[39px] top-2 w-6 h-6 rounded-full bg-white border-2 border-rose-600 flex items-center justify-center group-hover:border-amber-500 group-hover:scale-125 transition-all shadow-md">
                    <div className="w-2 h-2 rounded-full bg-rose-600 group-hover:bg-amber-500 transition-colors" />
                  </div>

                  {/* Content Box with 3D Tilt */}
                  <TiltCard maxTilt={6} scale={1.01} className="rounded-xl">
                    <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-rose-300 group-hover:bg-white transition-all shadow-sm">
                      <span className="text-xs font-black uppercase tracking-widest text-rose-600">
                        {milestone.period}
                      </span>
                      <h3 className="font-display font-bold text-xl text-slate-900 uppercase mt-1 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {milestone.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
