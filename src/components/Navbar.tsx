import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, PhoneCall, ChevronRight } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Programs', href: '#programs' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Legacy', href: '#legacy' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-md'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/50 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Dumbbell className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-wider text-xl sm:text-2xl text-slate-900 flex items-center gap-1.5 leading-none">
                {GYM_CONFIG.brand.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-rose-600 font-bold mt-1">
                {GYM_CONFIG.brand.yearsOfLegacy} Years of Strength & Trust
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-rose-600 transition-colors relative py-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-rose-600 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${GYM_CONFIG.contact.phone}`}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-rose-600 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
              title="Call Gym Directly"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>{GYM_CONFIG.contact.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenJoinModal}
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                JOIN NOW
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenJoinModal}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 rounded-lg shadow-sm"
            >
              JOIN
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-600"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-6 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold text-slate-800 hover:text-rose-600 hover:bg-slate-50 transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <a
                href={`tel:${GYM_CONFIG.contact.phone}`}
                className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg bg-slate-100 border border-slate-200 text-sm font-bold text-slate-800 hover:bg-slate-200"
              >
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>Call {GYM_CONFIG.contact.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full py-3.5 rounded-lg bg-rose-600 text-white font-extrabold tracking-wider uppercase text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>START YOUR JOURNEY NOW</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
