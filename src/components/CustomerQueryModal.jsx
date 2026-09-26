import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MessageCircle, 
  Phone, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { modalBackdrop, modalContent, variants } from '../utils/animations';
import { WhatsAppIcon } from './Icons';

export default function CustomerQueryModal({ isOpen, onClose, onQuerySubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your Name and Phone Number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('royal_collection_queries') || '[]');
        stored.push({
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('royal_collection_queries', JSON.stringify(stored));
      } catch (err) {
        console.warn('Could not save query to LocalStorage:', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      if (onQuerySubmitted) {
        onQuerySubmitted(`Thank you ${formData.name}, our Lucknow store team will contact you shortly!`);
      }
    }, 600);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Royal Collection Lucknow!\nName: ${formData.name || 'Customer'}\nPhone: ${formData.phone || 'N/A'}\nTopic: ${formData.category}\nQuery: ${formData.message || 'I have an inquiry about items in store.'}`
    );
    window.open(`https://wa.me/917007326371?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          variants={modalContent}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="bg-[#0d0c22] text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ea4c89] text-white flex items-center justify-center font-bold font-serif-title text-sm">
                RC
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  Customer Help Desk & Queries
                </h3>
                <p className="text-[10px] text-gray-400 font-mono-tag">
                  Direct Line to Lucknow Store Staff
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto custom-scrollbar">
            {isSuccess ? (
              <motion.div
                variants={variants["zoom-in"]}
                initial="hidden"
                animate="visible"
                className="py-8 text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-[#0d0c22] font-serif-title">
                  Query Received Successfully!
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our staff at Mohibullapur showroom has received your message and will call you back at <strong>{formData.phone}</strong>.
                </p>

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', phone: '', category: 'General Inquiry', message: '' });
                      onClose();
                    }}
                    className="rc-btn-primary text-xs py-2.5 px-6"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Have questions about fabric, sizes, in-store stock, or exchange policy? Send us your query or connect via WhatsApp instantly.
                </p>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                    Your Name <span className="text-[#ea4c89]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                    Phone / WhatsApp Number <span className="text-[#ea4c89]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
                  />
                </div>

                {/* Category of Query */}
                <div>
                  <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                    Topic of Query
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89]"
                  >
                    <option value="Size & Fit Assistance">Size & Fit Assistance</option>
                    <option value="Check Store Availability">Check Store Availability (Mohibullapur)</option>
                    <option value="Deals & Pricing Inquiry">Deals & Pricing Inquiry</option>
                    <option value="Exchange Policy (2-Day Window)">Exchange Policy (2-Day Window)</option>
                    <option value="Bulk / Event Orders">Bulk / Event Orders</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                    Your Question / Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
                  />
                </div>

                {/* Fast Contact Callout */}
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#ea4c89]" />
                    <span className="font-mono-tag font-bold text-[#0d0c22]">+91 7007326371</span>
                  </div>
                  <a href="tel:7007326371" className="text-[11px] font-semibold text-[#ea4c89] hover:underline">
                    Call Direct
                  </a>
                </div>

                {/* Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rc-btn-primary py-2.5 text-xs sm:text-sm font-bold justify-center shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Query to Showroom'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
