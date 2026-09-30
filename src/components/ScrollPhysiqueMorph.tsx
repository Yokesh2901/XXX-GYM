import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Flame, ChevronUp, ChevronDown, Dumbbell, ArrowRight } from 'lucide-react';

interface ScrollPhysiqueMorphProps {
  onOpenJoinModal: () => void;
}

export const ScrollPhysiqueMorph: React.FC<ScrollPhysiqueMorphProps> = ({ onOpenJoinModal }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Global window scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Track scroll percentage integer for HUD display
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  // Derived Dynamic Values for Physique Morphing
  // Shoulder width: 0.78 (skinny) -> 1.36 (muscular V-taper)
  const shoulderScaleX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0.78, 0.95, 1.15, 1.36]);
  // Chest / Lats expansion
  const chestScaleX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0.8, 0.96, 1.18, 1.38]);
  // Arm thickness / Bicep peak
  const armScaleX = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0.72, 0.9, 1.12, 1.35]);
  // Core definition opacity
  const absOpacity = useTransform(smoothProgress, [0, 0.25, 0.6, 1], [0.08, 0.35, 0.8, 1]);
  // Vascular / Muscle fiber glow opacity
  const fiberGlowOpacity = useTransform(smoothProgress, [0, 0.4, 0.75, 1], [0, 0.2, 0.65, 1]);

  // Current Stage determination
  const getStageInfo = (p: number) => {
    if (p < 25) {
      return {
        stage: 'Stage 1',
        title: 'Day 1: Skinny Frame',
        desc: 'Narrow posture, low muscle mass, starting the journey at XXX GYM.',
        tagColor: 'text-slate-600 bg-slate-100 border-slate-300',
        badge: 'Beginner',
      };
    } else if (p < 55) {
      return {
        stage: 'Stage 2',
        title: 'Month 3: Foundation',
        desc: 'Shoulders widening, core tightening, consistent lifting habit built.',
        tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
        badge: 'Consistency',
      };
    } else if (p < 85) {
      return {
        stage: 'Stage 3',
        title: 'Month 6: Hypertrophy',
        desc: 'Deep chest definition, 6-pack abs visible, capped deltoids and biceps.',
        tagColor: 'text-orange-700 bg-orange-50 border-orange-200',
        badge: 'Athletic Cut',
      };
    } else {
      return {
        stage: 'Stage 4',
        title: '1 Year+: XXX Beast',
        desc: 'Ripped muscular physique, dense heavy iron strength, peak transformation!',
        tagColor: 'text-rose-700 bg-rose-50 border-rose-300 animate-pulse',
        badge: 'Peak Form 🔥',
      };
    }
  };

  const currentStage = getStageInfo(scrollPercent);

  return (
    <>
      {/* ============================================================== */}
      {/* 1. Desktop & Tablet Floating Interactive 3D Transformation HUD */}
      {/* ============================================================== */}
      <aside aria-label="Transformation Progress HUD" className="fixed bottom-6 right-6 z-40 hidden sm:block pointer-events-auto">
        <motion.div
          layout
          className="bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.18)] rounded-3xl overflow-hidden w-80 md:w-88 transition-all duration-300"
        >
          {/* Header Bar */}
          <div className="px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <Dumbbell className="w-4 h-4 text-amber-400" />
              <span className="font-display font-extrabold text-xs uppercase tracking-wider">
                SCROLL PHYSIQUE MORPH
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded-full">
                {scrollPercent}%
              </span>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                aria-label={isMinimized ? 'Expand transformation HUD' : 'Minimize transformation HUD'}
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Morphing Body Visual & Live Stats (Collapsible) */}
          {!isMinimized && (
            <div className="p-4.5 space-y-4">
              
              {/* Graphic Athlete Silhouette with Dynamic Muscle Morphing */}
              <div className="relative h-44 w-full bg-gradient-to-b from-slate-100 to-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center overflow-hidden p-2">
                
                {/* Background Grid & Energy Glow */}
                <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />
                <motion.div
                  style={{ opacity: fiberGlowOpacity }}
                  className="absolute inset-0 bg-radial-gradient from-rose-500/20 via-amber-500/10 to-transparent pointer-events-none"
                />

                {/* Morphing Vector Physique */}
                <div className="relative flex flex-col items-center justify-center scale-90 sm:scale-100">
                  
                  {/* Head */}
                  <div className="w-7 h-9 rounded-full bg-slate-800 border border-slate-700 shadow-sm relative z-20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-rose-500/30" />
                  </div>

                  {/* Traps & Neck */}
                  <motion.div
                    style={{ scaleX: shoulderScaleX }}
                    className="w-8 h-3 bg-slate-800 -mt-1 rounded-t-sm"
                  />

                  {/* Upper Torso (Chest & Broad Shoulders) */}
                  <motion.div
                    style={{ scaleX: shoulderScaleX }}
                    className="relative flex items-center justify-center z-10"
                  >
                    {/* Left Deltoid */}
                    <motion.div
                      style={{ scaleX: armScaleX }}
                      className="w-5 h-7 rounded-full bg-gradient-to-b from-rose-600 to-slate-800 shadow-sm -mr-1"
                    />

                    {/* Main Pectorals / Chest */}
                    <motion.div
                      style={{ scaleX: chestScaleX }}
                      className="w-14 h-9 bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg flex items-center justify-center gap-1 shadow-md border-t border-rose-500/40"
                    >
                      <div className="w-5 h-5 rounded-md border border-rose-500/30 bg-slate-950/40" />
                      <div className="w-5 h-5 rounded-md border border-rose-500/30 bg-slate-950/40" />
                    </motion.div>

                    {/* Right Deltoid */}
                    <motion.div
                      style={{ scaleX: armScaleX }}
                      className="w-5 h-7 rounded-full bg-gradient-to-b from-rose-600 to-slate-800 shadow-sm -ml-1"
                    />
                  </motion.div>

                  {/* Biceps & Forearms (Arms extending down) */}
                  <div className="w-full flex justify-between px-1 -mt-2 z-0">
                    <motion.div
                      style={{ scaleX: armScaleX }}
                      className="w-3.5 h-12 bg-gradient-to-b from-slate-800 via-rose-950 to-slate-900 rounded-full"
                    />
                    
                    {/* Mid Torso (Abs & V-Taper) */}
                    <div className="w-10 flex flex-col items-center">
                      <motion.div
                        style={{ opacity: absOpacity }}
                        className="grid grid-cols-2 gap-1 w-7 my-1"
                      >
                        <div className="h-2 rounded bg-rose-500/40" />
                        <div className="h-2 rounded bg-rose-500/40" />
                        <div className="h-2 rounded bg-rose-500/40" />
                        <div className="h-2 rounded bg-rose-500/40" />
                        <div className="h-2 rounded bg-rose-500/40" />
                        <div className="h-2 rounded bg-rose-500/40" />
                      </motion.div>
                    </div>

                    <motion.div
                      style={{ scaleX: armScaleX }}
                      className="w-3.5 h-12 bg-gradient-to-b from-slate-800 via-rose-950 to-slate-900 rounded-full"
                    />
                  </div>

                  {/* Legs & Foundation */}
                  <div className="flex gap-2 -mt-1 z-10">
                    <motion.div
                      style={{ scaleX: chestScaleX }}
                      className="w-4 h-12 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-md"
                    />
                    <motion.div
                      style={{ scaleX: chestScaleX }}
                      className="w-4 h-12 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-md"
                    />
                  </div>
                </div>

                {/* Floating Power Sparks when at 80%+ */}
                {scrollPercent >= 80 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-black text-amber-500 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full shadow-sm"
                  >
                    <Flame className="w-3 h-3 fill-rose-500 text-rose-500 animate-bounce" />
                    <span>BEAST MODE</span>
                  </motion.div>
                )}

                {/* Bottom Status Callout */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-500">Scroll Journey:</span>
                  <span className="text-rose-600 font-extrabold uppercase">
                    {scrollPercent < 20 ? 'Lean Start' : scrollPercent < 60 ? 'Gaining Muscle' : 'Peak Ripped'}
                  </span>
                </div>
              </div>

              {/* Stage Info Details */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${currentStage.tagColor}`}>
                    {currentStage.stage}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {currentStage.badge}
                  </span>
                </div>

                <h4 className="font-display font-black text-sm text-slate-950 uppercase mt-1">
                  {currentStage.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  {currentStage.desc}
                </p>
              </div>

              {/* Progress Level Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-slate-600">Transformation Progress:</span>
                  <span className="text-rose-600 font-black">{scrollPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <motion.div
                    style={{ width: `${scrollPercent}%` }}
                    className="h-full bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 rounded-full transition-all duration-150"
                  />
                </div>
              </div>

              {/* Live Metric Dials */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Weight</div>
                  <div className="text-sm font-display font-black text-slate-900 mt-0.5">
                    {Math.round(56 + (scrollPercent / 100) * 20)} kg
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Strength Gain</div>
                  <div className="text-sm font-display font-black text-rose-600 mt-0.5">
                    +{Math.round((scrollPercent / 100) * 180)}%
                  </div>
                </div>
              </div>

              {/* Join CTA Trigger */}
              <button
                onClick={onOpenJoinModal}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold uppercase tracking-wider text-xs shadow-md transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
              >
                <span>BUILD YOUR PHYSIQUE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Minimized Quick Bar */}
          {isMinimized && (
            <div
              onClick={() => setIsMinimized(false)}
              className="p-3 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">
                  {scrollPercent}%
                </div>
                <span className="text-xs font-bold text-slate-800">{currentStage.title}</span>
              </div>
              <span className="text-[11px] text-rose-600 font-bold hover:underline">Expand</span>
            </div>
          )}
        </motion.div>
      </aside>

      {/* ============================================================== */}
      {/* 2. Mobile Floating Live Transformation Progress Badge */}
      {/* ============================================================== */}
      <div className="sm:hidden fixed bottom-16 right-3 z-40 pointer-events-auto">
        <motion.button
          onClick={onOpenJoinModal}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/95 border border-slate-700 text-white shadow-2xl backdrop-blur-md"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 flex items-center justify-center text-[10px] font-black">
            🔥
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Physique Morph</span>
            <span className="text-[11px] font-extrabold text-amber-300 leading-none">
              {scrollPercent}% • {scrollPercent < 30 ? 'Lean Start' : scrollPercent < 75 ? 'Building' : 'Peak Beast'}
            </span>
          </div>
        </motion.button>
      </div>
    </>
  );
};
