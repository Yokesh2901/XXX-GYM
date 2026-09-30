import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Sparkles, Rotate3D, ArrowRight, ShieldCheck } from 'lucide-react';
import { Real3DPhysique } from './Real3DPhysique';

interface PhysiqueTransformationSectionProps {
  onOpenJoinModal: () => void;
}

export const PhysiqueTransformationSection: React.FC<PhysiqueTransformationSectionProps> = ({
  onOpenJoinModal,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(0.5); // Default to intermediate athletic stage
  const [isManualControl, setIsManualControl] = useState<boolean>(false);

  // Quick preset milestones
  const milestones = [
    { label: 'Day 1', sub: 'Skinny (56kg)', val: 0 },
    { label: 'Month 3', sub: 'Foundation (62kg)', val: 0.33 },
    { label: 'Month 6', sub: 'Hypertrophy (68kg)', val: 0.66 },
    { label: 'Beast Mode', sub: 'Ripped (78kg)', val: 1.0 },
  ];

  // Dynamic metrics calculated from slider value
  const weight = Math.round(56 + sliderValue * 22);
  const muscleMass = Math.round(14 + sliderValue * 38);
  const bodyFat = (18 - sliderValue * 9.5).toFixed(1);

  return (
    <section
      id="transformation"
      className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden"
    >
      {/* Background Dynamic Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-widest uppercase mb-4"
          >
            <Flame className="w-4 h-4 text-rose-500" />
            <span>REAL-TIME 3D TRANSFORMATION LAB</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase"
          >
            SKINNY TO <span className="text-gradient-fire">RIPPED BEAST</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Experience your physical evolution in real 3D. Watch real-time muscle hypertrophy—from narrow posture to chiseled armor pecs, V-taper wings, and 3D cannonball deltoids.
          </motion.p>
        </div>

        {/* Main 3D Transformation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle grid pattern inside stage */}
          <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none" />

          {/* Left Column: Interactive 3D Canvas (No Box, Completely Alive) */}
          <div className="lg:col-span-7 relative h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
            {/* 3D Model Canvas */}
            <Real3DPhysique
              customProgress={isManualControl ? sliderValue : undefined}
              interactive={true}
              className="w-full h-full"
            />

            {/* Hint tag for 360 rotation */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-slate-300 pointer-events-none">
              <Rotate3D className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Click & Drag to Rotate 360°</span>
            </div>

            {/* Live Respiration & Cursor Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-slate-300 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Living 3D Model</span>
            </div>
          </div>

          {/* Right Column: Controls & Muscle Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 relative z-10">
            {/* Current Phase Card */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span>Physique Stage</span>
                <span className="text-rose-400 font-mono font-bold">
                  {Math.round(sliderValue * 100)}% Developed
                </span>
              </div>
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-wide">
                {sliderValue < 0.25
                  ? 'Stage 1: Skinny Baseline'
                  : sliderValue < 0.55
                  ? 'Stage 2: Athletic Frame'
                  : sliderValue < 0.82
                  ? 'Stage 3: Pure Hypertrophy'
                  : 'Stage 4: XXX Beast Mode 🔥'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {sliderValue < 0.25
                  ? 'Narrow clavicles, slender arms, low muscular density. Ready to ignite the iron.'
                  : sliderValue < 0.55
                  ? 'Upper chest shelf activating, traps rising, waist tapering with clean athletic posture.'
                  : sliderValue < 0.82
                  ? 'Chiseled 6-pack cuts, bulging bicep peaks, and wide V-taper lats emerging.'
                  : 'Massive cannonball deltoids, striated chest, deeply etched core and raw iron power!'}
              </p>
            </div>

            {/* Real-Time Anatomical Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <span className="block text-[11px] font-bold text-slate-400 uppercase">Weight</span>
                <span className="text-xl font-mono font-extrabold text-white">{weight} <span className="text-xs text-slate-400">kg</span></span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <span className="block text-[11px] font-bold text-slate-400 uppercase">Muscle</span>
                <span className="text-xl font-mono font-extrabold text-rose-400">+{muscleMass}%</span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
                <span className="block text-[11px] font-bold text-slate-400 uppercase">Body Fat</span>
                <span className="text-xl font-mono font-extrabold text-amber-400">{bodyFat}%</span>
              </div>
            </div>

            {/* Interactive Transformation Slider */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-rose-400" />
                  DRAG SLIDER TO BUILD MUSCLE
                </span>
                <button
                  onClick={() => setIsManualControl(!isManualControl)}
                  className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  {isManualControl ? 'Sync with Scroll' : 'Manual Control'}
                </button>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={sliderValue}
                onChange={(e) => {
                  setSliderValue(parseFloat(e.target.value));
                  setIsManualControl(true);
                }}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 hover:accent-rose-400"
              />

              {/* Milestone Preset Buttons */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {milestones.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => {
                      setSliderValue(m.val);
                      setIsManualControl(true);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      Math.abs(sliderValue - m.val) < 0.15
                        ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                        : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div>{m.label}</div>
                    <div className="text-[9px] opacity-75 font-normal">{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Transformation Guarantee & Join CTA */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>20+ Years of proven coaching & heavy iron legacy at XXX GYM</span>
              </div>

              <button
                onClick={onOpenJoinModal}
                className="w-full py-4 px-6 rounded-xl font-display font-black text-sm uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>START YOUR TRANSFORMATION TODAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
