import React from 'react';
import { Phone, MessageCircle, Flame } from 'lucide-react';
import { GYM_CONFIG } from '../data/gymConfig';

interface MobileStickyBarProps {
  onOpenJoinModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenJoinModal }) => {
  return (
    <aside aria-label="Mobile quick actions" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2.5 px-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={`tel:${GYM_CONFIG.contact.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 active:bg-slate-200 transition-colors"
          aria-label="Call gym directly"
        >
          <Phone className="w-4 h-4 text-rose-600 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">CALL</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://api.whatsapp.com/send?phone=${GYM_CONFIG.contact.whatsappNumber}&text=${encodeURIComponent(
            `Hi ${GYM_CONFIG.brand.name}, I would like to inquire about membership options.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white active:bg-emerald-700 transition-colors shadow-sm"
          aria-label="Message on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">WHATSAPP</span>
        </a>

        {/* Join Now Button */}
        <button
          onClick={onOpenJoinModal}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white active:bg-rose-700 shadow-md transition-colors"
          aria-label="Open membership inquiry"
        >
          <Flame className="w-4 h-4 mb-0.5 text-amber-300" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">JOIN NOW</span>
        </button>
      </div>
    </aside>
  );
};
