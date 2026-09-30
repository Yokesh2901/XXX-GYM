import React from 'react';
import { Dumbbell, ShieldCheck, ArrowUp } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Legacy', href: '#legacy' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 pb-28 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white shadow-md">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-wider">
                {GYM_CONFIG.brand.name}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>20+ YEARS OF FITNESS & TRUST</span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Dedicated to foundational strength, real iron machinery, and honest fitness culture for more than two decades.
            </p>
          </div>

          {/* Quick Links (Span 3) */}
          <div className="md:col-span-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-rose-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours & Location Summary (Span 4) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
              Facility Hours
            </h3>
            <p className="text-sm text-neutral-300">
              Mon – Fri: <span className="text-white font-semibold">{GYM_CONFIG.contact.hours.weekdays}</span>
            </p>
            <p className="text-sm text-neutral-300">
              Saturday: <span className="text-white font-semibold">{GYM_CONFIG.contact.hours.saturday}</span>
            </p>
            <p className="text-sm text-neutral-300">
              Sunday: <span className="text-white font-semibold">{GYM_CONFIG.contact.hours.sunday}</span>
            </p>

            {/* Social Links if provided */}
            <div className="pt-4 flex items-center gap-3">
              {GYM_CONFIG.socials.instagram && (
                <a
                  href={GYM_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gym-900 border border-gym-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-gym-crimson transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {GYM_CONFIG.socials.facebook && (
                <a
                  href={GYM_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gym-900 border border-gym-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-gym-crimson transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              )}
              {GYM_CONFIG.socials.youtube && (
                <a
                  href={GYM_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gym-900 border border-gym-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-gym-crimson transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 {GYM_CONFIG.brand.name}. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-gym-crimson transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
