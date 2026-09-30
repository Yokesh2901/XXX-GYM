import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';

export const GoogleReviewsCTA: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden pattern-grid border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 [perspective:1000px]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card-light relative overflow-hidden"
        >
          {/* Subtle ambient corner glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            <div className="max-w-xl">
              {/* Star Rating Header */}
              <div className="flex items-center justify-center md:justify-start gap-1.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm font-black text-slate-900">5.0 RATED</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight">
                TRUSTED BY GENERATIONS OF LIFTERS
              </h3>
              
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-medium">
                Over 20 years of real member experiences, discipline, and training milestones. Read genuine feedback directly on our verified Google Business profile.
              </p>

              <div className="mt-4 flex items-center justify-center md:justify-start gap-3 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Google Community
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  Local Strength Landmark
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
              <a
                href={GYM_CONFIG.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105"
              >
                <span>READ GOOGLE REVIEWS</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>

              <a
                href={GYM_CONFIG.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>LEAVE A REVIEW</span>
              </a>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};
