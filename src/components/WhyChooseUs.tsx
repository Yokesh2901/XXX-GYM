import React from 'react';
import { motion } from 'framer-motion';
import { History, Dumbbell, Flame, HeartHandshake, Target, Users, ArrowUpRight } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

interface WhyChooseUsProps {
  onOpenJoinModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenJoinModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'History':
        return <History className="w-6 h-6 text-amber-600" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-rose-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-orange-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-emerald-600" />;
      case 'Target':
        return <Target className="w-6 h-6 text-blue-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-purple-600" />;
      default:
        return <Dumbbell className="w-6 h-6 text-rose-600" />;
    }
  };

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-slate-100/70 relative overflow-hidden pattern-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600 uppercase tracking-widest mb-4 shadow-sm">
            <span>UNCOMPROMISING STANDARDS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight uppercase">
            WHY TRAIN WITH US?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            We don't sell shortcuts or empty trends. We provide the atmosphere, equipment, and collective culture that drives genuine physical evolution.
          </p>
        </motion.div>

        {/* 6 High-Impact 3D Tilt Cards with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 [perspective:1000px]">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard maxTilt={10} scale={1.03} className="rounded-2xl h-full">
                <div className="group relative p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 shadow-card-light hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
                  {/* Subtle top border accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    {/* Header inside card */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-50 transition-all duration-300 shadow-sm">
                        {getIcon(item.iconName)}
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 px-3 py-1 rounded-md bg-slate-100 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-black text-xl text-slate-900 tracking-wide uppercase group-hover:text-rose-600 transition-colors mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Subtle Action */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-800 transition-colors">
                    <span className="font-semibold">Built for commitment</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-rose-600" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner with 3D Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-card-light flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <h4 className="font-display font-black text-xl sm:text-2xl text-slate-950 uppercase">
              Ready to experience serious training?
            </h4>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Visit our facility, inspect the equipment, and feel the difference of an authentic iron environment.
            </p>
          </div>
          <button
            onClick={onOpenJoinModal}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold uppercase tracking-wider text-xs shadow-md hover:shadow-lg whitespace-nowrap transition-transform hover:scale-105 active:scale-95"
          >
            START TRAINING WITH US
          </button>
        </motion.div>

      </div>
    </section>
  );
};
