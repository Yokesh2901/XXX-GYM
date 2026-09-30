import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AUTHENTIC_GYM_IMAGES } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [filter, setFilter] = useState<'All' | 'Floor' | 'Equipment' | 'Strength' | 'Exterior'>('All');

  const filteredImages = filter === 'All'
    ? AUTHENTIC_GYM_IMAGES
    : AUTHENTIC_GYM_IMAGES.filter((img) => img.category === filter);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % AUTHENTIC_GYM_IMAGES.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + AUTHENTIC_GYM_IMAGES.length) % AUTHENTIC_GYM_IMAGES.length : 0
        );
      }
    },
    [selectedImageIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, selectedImageIndex]);

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || selectedImageIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      setSelectedImageIndex((selectedImageIndex + 1) % AUTHENTIC_GYM_IMAGES.length);
    } else if (diff < -50) {
      setSelectedImageIndex((selectedImageIndex - 1 + AUTHENTIC_GYM_IMAGES.length) % AUTHENTIC_GYM_IMAGES.length);
    }
    setTouchStartX(null);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-slate-100/70 relative overflow-hidden pattern-grid">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with 3D Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-600 uppercase tracking-widest mb-4 shadow-sm">
            <span>AUTHENTIC FACILITY TOUR</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight uppercase">
            INSIDE & OUTSIDE XXX GYM
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            A look at the place where the work gets done — from the street approach and entrance to the heavy iron arena floor.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {(['All', 'Floor', 'Equipment', 'Strength', 'Exterior'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                  filter === cat
                    ? 'bg-rose-600 text-white shadow-md scale-105'
                    : 'bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400'
                }`}
              >
                {cat === 'All' ? `All Views (${AUTHENTIC_GYM_IMAGES.length})` : cat === 'Exterior' ? 'Outside View' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid with 3D Scroll Stagger Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch [perspective:1000px]">
          {filteredImages.map((img, idx) => {
            const originalIndex = AUTHENTIC_GYM_IMAGES.findIndex((item) => item.id === img.id);
            const isWide = img.id === 'img-floor' || img.id === 'img-exterior-front';
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`${isWide ? 'sm:col-span-2' : ''}`}
              >
                <TiltCard
                  maxTilt={8}
                  scale={1.02}
                  className="rounded-2xl h-full"
                >
                  <div
                    onClick={() => setSelectedImageIndex(originalIndex)}
                    className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-rose-300 cursor-pointer shadow-card-light hover:shadow-card-hover transition-all duration-300 min-h-[300px] flex flex-col justify-end h-full"
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 group-hover:brightness-[0.98] transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    
                    {/* Overlay Details */}
                    <div className="relative z-10 p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 px-2 py-0.5 rounded bg-black/70 border border-white/20 backdrop-blur-md">
                          {img.category === 'Exterior' ? 'Outside View' : img.category}
                        </span>
                        <span className="text-xs text-white/80 group-hover:text-white flex items-center gap-1 transition-colors">
                          <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                        </span>
                      </div>

                      <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase leading-snug">
                        {img.title}
                      </h3>
                      <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                        {img.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Accessible Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-300"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="XXX GYM photograph viewer"
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="w-full max-w-6xl flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase">
                Photograph {selectedImageIndex + 1} of {AUTHENTIC_GYM_IMAGES.length}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-300">
                {AUTHENTIC_GYM_IMAGES[selectedImageIndex].category === 'Exterior'
                  ? 'Outside View & Entrance'
                  : AUTHENTIC_GYM_IMAGES[selectedImageIndex].category}
              </span>
            </div>

            <button
              onClick={() => setSelectedImageIndex(null)}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Visual Display */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4">
            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(
                  (selectedImageIndex - 1 + AUTHENTIC_GYM_IMAGES.length) % AUTHENTIC_GYM_IMAGES.length
                );
              }}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white transition-transform hover:scale-110 shadow-2xl"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <div className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-black flex items-center justify-center">
              <img
                src={AUTHENTIC_GYM_IMAGES[selectedImageIndex].src}
                alt={AUTHENTIC_GYM_IMAGES[selectedImageIndex].title}
                className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain filter contrast-[1.08]"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((selectedImageIndex + 1) % AUTHENTIC_GYM_IMAGES.length);
              }}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white transition-transform hover:scale-110 shadow-2xl"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="w-full max-w-3xl text-center bg-slate-900/95 border border-slate-700 p-4 rounded-xl backdrop-blur-md z-20">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase">
              {AUTHENTIC_GYM_IMAGES[selectedImageIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl mx-auto">
              {AUTHENTIC_GYM_IMAGES[selectedImageIndex].description}
            </p>
            <div className="text-[11px] text-slate-400 mt-2 hidden sm:block">
              Tip: Use Keyboard Arrow Keys (← / →) or swipe on mobile to navigate. Press ESC to close.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
