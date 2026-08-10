import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Phone, Mail } from 'lucide-react';
import { COMPANY_DETAILS, SERVICES_DATA } from '../data/content';
import { LeadFormData } from '../types';
import { submitLeadToGoogleSheet } from '../utils/submitLeadToGoogleSheet';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, defaultService = '' }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    companySize: '11-50',
    serviceNeeded: defaultService || 'Recruitment & Talent Acquisition',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadToGoogleSheet(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to submit lead to Google Sheet:', error);
      alert('Something went wrong sending your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      companySize: '11-50',
      serviceNeeded: 'Recruitment & Talent Acquisition',
      message: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/10 shadow-2xl overflow-hidden z-10 my-8"
          >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-black/10 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0066FF] bg-[#0066FF]/10 px-3 py-1 rounded-full">
                  Partner With Entice HR
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight mt-2">
                  Request a Custom HR & Hiring Proposal
                </h2>
                <p className="text-[#86868B] text-sm mt-1">
                  Our HR strategists will analyze your team size and send a tailored proposal within 2 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Company Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Nexus Cloud Tech"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Business Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="vikram@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="9488853199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Current Company Headcount
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none"
                    >
                      <option value="1-10">1 - 10 Employees (Early Stage)</option>
                      <option value="11-50">11 - 50 Employees (Scaling)</option>
                      <option value="51-200">51 - 200 Employees (SMB)</option>
                      <option value="200+">200+ Employees (Corporate)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                      Primary Service Needed
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>{srv.title}</option>
                      ))}
                      <option value="Full HR Outsourcing Squad">Full HR Outsourcing Squad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-1.5">
                    Hiring Goals or Specific Requirements
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Tell us about your immediate hiring needs, tech stack, or payroll requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-transparent focus:border-[#0066FF] focus:bg-white text-sm text-[#1D1D1F] transition-all outline-none resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#0066FF]/25 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Transmitting Request...
                      </span>
                    ) : (
                      <>
                        Submit Request & Connect
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-[#86868B] pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Strict NDAs & 100% Data Confidentiality
                  </span>
                  <span>Or Call: {COMPANY_DETAILS.phone}</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1D1D1F]">
                Request Transmitted Successfully!
              </h3>
              <p className="text-[#86868B] text-sm max-w-md mx-auto">
                Thank you <strong className="text-[#1D1D1F]">{formData.fullName}</strong>. Our lead HR strategist at Entice HR Solutions will review <strong className="text-[#1D1D1F]">{formData.companyName}</strong>'s requirements and contact you at <strong className="text-[#1D1D1F]">{formData.phone}</strong> within 2 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-2xl bg-[#25D366] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  Instant Connect on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="py-3 px-6 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-semibold text-xs hover:bg-black/10 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
