import React, { useState, useEffect } from 'react';
import { X, Flame, Send, CheckCircle2, Phone } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  defaultProgram = 'Strength Training',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(defaultProgram);
  const [preferredTime, setPreferredTime] = useState('Morning (05:00 AM - 12:00 PM)');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProgram) {
      setProgram(defaultProgram);
    }
  }, [defaultProgram]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello ${GYM_CONFIG.brand.name}! My name is ${name || 'Prospective Member'}. I want to join for "${program}". My phone number is ${phone}. Preferred training slot: ${preferredTime}. Please share membership plans and timings.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${GYM_CONFIG.contact.whatsappNumber}&text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>START YOUR 20+ YR LEGACY JOURNEY</span>
        </div>

        <h3 id="join-modal-title" className="font-display font-black text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
          JOIN {GYM_CONFIG.brand.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
          Take the first step toward genuine physical strength. Connect directly with our training team.
        </p>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="font-display font-black text-2xl text-slate-950 uppercase">Inquiry Prepared!</h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
              We have forwarded your details to our WhatsApp line for immediate assistance.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${GYM_CONFIG.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold uppercase text-slate-900 hover:bg-slate-200"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>Call Us Directly</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-3 rounded-xl bg-rose-600 text-xs font-bold uppercase text-white hover:bg-rose-700 shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 86109 06060"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Program of Interest
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-rose-600 text-sm font-medium"
                >
                  <option value="Strength Training">Strength Training</option>
                  <option value="Muscle Building">Muscle Building</option>
                  <option value="Weight Management">Weight Management</option>
                  <option value="General Fitness">General Fitness</option>
                  <option value="Personal Training">Personal Training</option>
                  <option value="Beginner Training">Beginner Training</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-rose-600 text-sm font-medium"
                >
                  <option value="Morning (05:00 AM – 12:00 PM)">Morning (05:00 AM – 12:00 PM)</option>
                  <option value="Evening (04:00 PM – 10:00 PM)">Evening (04:00 PM – 10:00 PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>CONFIRM & CONNECT ON WHATSAPP</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 font-medium">
              <span>* No membership registration fees today</span>
              <span>* Instant reply during gym hours</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
