import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Users2, CheckCircle2 } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

export const AboutLegacy: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden pattern-dots">
      {/* Dynamic ambient energy accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3D Scroll Reveal for Authentic Equipment Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative [perspective:1000px]"
          >
            <TiltCard maxTilt={8} scale={1.02} className="rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-card-light group p-2">
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-xl relative">
                  <img
                    src="/images/gym/equipment-leg-press.jpg"
                    alt="Heavy-duty 45 degree leg press station with stacked cast iron plates at XXX GYM"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Heavy-Duty Iron Legacy</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Heavy gauge steel and serious lifting culture</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Accent decorative frame element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-rose-300 rounded-2xl -z-10 hidden sm:block bg-rose-50/50" />
          </motion.div>

          {/* Right Column: Narrative Copy with Staggered 3D Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 text-rose-600 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3">
              <span className="w-6 h-[2px] bg-rose-600" />
              <span>THE LEGACY</span>
            </div>

            {/* Heading */}
            <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight uppercase mb-6">
              20+ YEARS.<br />
              <span className="text-slate-500">ONE PASSION.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600">
                STRONGER PEOPLE.
              </span>
            </h2>

            {/* Exact Body Copy as requested */}
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed mb-8">
              <p>
                For over 20 years, we at <strong className="text-slate-900 font-bold">{GYM_CONFIG.brand.name}</strong> have been helping people build strength,
                improve fitness and develop a consistent training lifestyle.
              </p>
              <p className="text-slate-600 text-base">
                Our experience comes from years of working with people at different
                fitness levels and helping them stay committed to their goals.
              </p>
            </div>

            {/* Three Key Pillars (Zero Fake Metrics) with 3D TiltCards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <TiltCard maxTilt={8} scale={1.03} className="rounded-xl">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-colors shadow-sm h-full">
                  <div className="text-amber-500 mb-2">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-display font-black text-slate-900">20+</div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600 mt-1">
                    YEARS EXPERIENCE
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={8} scale={1.03} className="rounded-xl">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-colors shadow-sm h-full">
                  <div className="text-rose-600 mb-2">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-display font-black text-slate-900 leading-snug">BUILT ON</div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600 mt-1">
                    DISCIPLINE
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={8} scale={1.03} className="rounded-xl">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors shadow-sm h-full">
                  <div className="text-slate-700 mb-2">
                    <Users2 className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-display font-black text-slate-900 leading-snug">TRUSTED</div>
                  <div className="text-xs uppercase font-extrabold tracking-wider text-slate-600 mt-1">
                    BY MEMBERS
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Core Values Bullet List */}
            <div className="mt-8 space-y-3">
              {[
                "No gimmicks or passing fads — pure dedication to foundational strength.",
                "Heavy-gauge steel equipment maintained for safety, longevity, and serious lifting.",
                "Ego-free atmosphere where both beginners and seasoned athletes push each other forward.",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{point}</span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
