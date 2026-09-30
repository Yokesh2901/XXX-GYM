import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Clock, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';
import { TiltCard } from './TiltCard';

export const Contact: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formGoal, setFormGoal] = useState('Strength Training');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi ${GYM_CONFIG.brand.name}, my name is ${formName || 'Lifter'}. I'm interested in ${formGoal}. My phone is ${formPhone}. I'd like more information about joining!`
    );
    window.open(`https://api.whatsapp.com/send?phone=${GYM_CONFIG.contact.whatsappNumber}&text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden pattern-dots">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

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
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight uppercase">
            LET'S GET STARTED.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium">
            Have questions about membership, equipment, or training programs? Speak directly with our team.
          </p>
        </motion.div>

        {/* Quick Action Buttons with Staggered 3D Scroll Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
          {[
            {
              href: `tel:${GYM_CONFIG.contact.phone}`,
              bg: "bg-slate-900 hover:bg-slate-800 text-white",
              icon: <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />,
              text: "CALL NOW",
              target: undefined,
              rel: undefined,
            },
            {
              href: `https://api.whatsapp.com/send?phone=${GYM_CONFIG.contact.whatsappNumber}&text=${encodeURIComponent(
                `Hi ${GYM_CONFIG.brand.name}, I would like to inquire about membership and training programs.`
              )}`,
              bg: "bg-emerald-600 hover:bg-emerald-700 text-white",
              icon: <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />,
              text: "WHATSAPP",
              target: "_blank",
              rel: "noopener noreferrer",
            },
            {
              href: GYM_CONFIG.contact.googleMapsUrl,
              bg: "bg-rose-600 hover:bg-rose-700 text-white",
              icon: <Navigation className="w-5 h-5 group-hover:scale-110 transition-transform" />,
              text: "GET DIRECTIONS",
              target: "_blank",
              rel: "noopener noreferrer",
            },
          ].map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              target={btn.target}
              rel={btn.rel}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl ${btn.bg} font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-md group hover:scale-105 active:scale-95`}
            >
              {btn.icon}
              <span>{btn.text}</span>
            </motion.a>
          ))}
        </div>

        {/* Details & Interactive Form Grid with Split 3D Scroll Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Essential Info Cards & Outside View */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Authentic Facility Entrance / Outside View Card with 3D Tilt */}
            <TiltCard maxTilt={8} scale={1.02} className="rounded-2xl">
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-card-light group p-2">
                <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-xl">
                  <img
                    src="/images/gym/exterior-front.jpg"
                    alt="XXX GYM building facade and main entrance"
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-md bg-white/95 border border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-rose-600 shadow-sm backdrop-blur-md">
                      FACILITY ENTRANCE & OUTSIDE VIEW
                    </span>
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs rounded-b-xl">
                  <span className="text-slate-700 font-semibold">Look for the official XXX GYM banner</span>
                  <span className="text-rose-600 font-bold">Easy Bike Parking</span>
                </div>
              </div>
            </TiltCard>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card-light flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                  Location & Facility
                </h4>
                <p className="text-slate-700 text-sm mt-1 font-medium">
                  {GYM_CONFIG.contact.address}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {GYM_CONFIG.contact.city}
                </p>
                <a
                  href={GYM_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline uppercase mt-3"
                >
                  <span>Open in Google Maps</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card-light flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                  Operating Hours
                </h4>
                <div className="mt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-slate-700 border-b border-slate-100 pb-1.5">
                    <span className="font-medium">Monday – Friday:</span>
                    <span className="font-bold text-slate-900">{GYM_CONFIG.contact.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 border-b border-slate-100 pb-1.5">
                    <span className="font-medium">Saturday:</span>
                    <span className="font-bold text-slate-900">{GYM_CONFIG.contact.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">Sunday:</span>
                    <span className="font-bold text-slate-900">{GYM_CONFIG.contact.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card-light flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider">
                  Direct Line & WhatsApp
                </h4>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-slate-700">
                    Phone: <span className="font-bold text-slate-900">{GYM_CONFIG.contact.phoneDisplay}</span>
                  </p>
                  <p className="text-sm text-slate-700">
                    WhatsApp: <span className="font-bold text-slate-900">{GYM_CONFIG.contact.whatsappDisplay}</span>
                  </p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Fast WhatsApp Inquiry Lead Box with 3D Slide-in */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-card-light relative">
              <h3 className="font-display font-black text-2xl text-slate-950 uppercase">
                SEND A DIRECT INQUIRY
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                Fill in your details below to start a direct WhatsApp inquiry with our gym staff immediately.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-slate-900">Opening WhatsApp...</h4>
                  <p className="text-xs text-slate-600">
                    Your inquiry has been formulated. If WhatsApp didn't open automatically, click the WhatsApp button above.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +91 86109 06060"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={formGoal}
                      onChange={(e) => setFormGoal(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-rose-600 text-sm font-medium"
                    >
                      <option value="Strength Training">Strength Training</option>
                      <option value="Muscle Building">Muscle Building</option>
                      <option value="Weight Management">Weight Management</option>
                      <option value="General Fitness">General Fitness</option>
                      <option value="Personal Training">Personal Training</option>
                      <option value="Beginner Training">Beginner Training</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold uppercase tracking-wider text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mt-6"
                  >
                    <span>CONNECT VIA WHATSAPP</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">
                    Zero spam. Your information is only used to answer your gym membership inquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
