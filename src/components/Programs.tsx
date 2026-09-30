import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PROGRAMS_ITEMS } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

interface ProgramsProps {
  onSelectProgram: (programName: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onSelectProgram }) => {
  return (
    <section id="programs" className="py-24 sm:py-32 bg-white relative overflow-hidden pattern-dots">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-rose-600 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3">
              <span className="w-6 h-[2px] bg-rose-600" />
              <span>STRUCTURED FOR PROGRESSION</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight uppercase">
              TRAIN WITH PURPOSE.
            </h2>
          </div>
          <p className="text-base text-slate-600 max-w-md font-medium">
            Whether your objective is maximum strength, metabolic conditioning, or fundamental movement mastery, our programs are grounded in 20+ years of proven practice.
          </p>
        </motion.div>

        {/* Programs Grid with 3D Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
          {PROGRAMS_ITEMS.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <TiltCard maxTilt={9} scale={1.03} className="rounded-2xl h-full">
                <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-rose-300 shadow-card-light hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between h-full">
                  {/* Card Image Banner with Authentic Gym Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={prog.imageSrc}
                      alt={prog.title}
                      className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-110 group-hover:brightness-[0.95] transition-all duration-700"
                      loading="lazy"
                    />
                    
                    {/* Floating Program Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-white/95 border border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-rose-600 shadow-sm backdrop-blur-md">
                        20+ YRS TESTED
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-black text-2xl text-slate-900 uppercase tracking-tight group-hover:text-rose-600 transition-colors">
                        {prog.title}
                      </h3>
                      <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mt-1 mb-3">
                        {prog.tagline}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                        {prog.description}
                      </p>

                      {/* Highlights checklist */}
                      <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                        {prog.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Inquiry Action Button */}
                    <button
                      onClick={() => onSelectProgram(prog.title)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-rose-600 border border-slate-200 hover:border-rose-600 text-xs font-extrabold uppercase tracking-wider text-slate-800 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm"
                    >
                      <span>INQUIRE ABOUT THIS PROGRAM</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
