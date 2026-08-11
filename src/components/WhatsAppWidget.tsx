import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, PhoneCall } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/content';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Chat Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="mb-4 w-80 bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0066FF] to-[#0042A5] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                    E
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0066FF] rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">Entice HR Desk</h4>
                  <p className="text-[11px] text-white/80">Typically replies in 5 minutes</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-[#F9F9FB] space-y-3 text-xs">
              <div className="p-3 bg-white rounded-2xl rounded-tl-none border border-black/[0.04] text-[#1D1D1F] shadow-sm">
                👋 Hello! Looking for recruitment, payroll, or HR support for your company?
              </div>
              <div className="p-3 bg-white rounded-2xl rounded-tl-none border border-black/[0.04] text-[#1D1D1F] shadow-sm">
                Connect directly with our senior talent strategist at <strong className="text-[#0066FF]">9488853199</strong>.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-3 bg-white border-t border-black/[0.06] space-y-2">
              <a
                href={COMPANY_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
              >
                <Send className="w-3.5 h-3.5" />
                Start Chat on WhatsApp
              </a>

              <a
                href={`tel:${COMPANY_DETAILS.phone}`}
                className="w-full py-2 px-4 rounded-xl bg-[#F5F5F7] hover:bg-black/10 text-[#1D1D1F] font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0066FF]" />
                Direct Call: {COMPANY_DETAILS.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button & Status Pill */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <motion.button 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex bg-white shadow-xl px-4 py-3 rounded-2xl items-center gap-2.5 border border-gray-100 cursor-pointer"
            onClick={() => setIsOpen(true)}
            aria-label="Open WhatsApp chat: Ready to hire?"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-gray-600">Ready to hire?</span>
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 flex items-center justify-center focus:outline-none shrink-0"
          aria-label={isOpen ? 'Close WhatsApp chat' : 'Contact on WhatsApp'}
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
          <MessageSquare className="w-6 h-6 text-white" />
        </motion.button>
      </div>
    </div>
  );
};
