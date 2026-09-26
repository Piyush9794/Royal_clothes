import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw, Clock, CheckCircle2 } from 'lucide-react';
import { upReveal } from '../utils/animations';

export default function PolicySection() {
  return (
    <section id="policy-section" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={upReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#fdfcfb] to-[#f8f7f9] border border-gray-200/80 shadow-sm relative overflow-hidden"
        >
          {/* Subtle background icon */}
          <ShieldCheck className="absolute -right-6 -bottom-6 w-36 h-36 text-gray-200/50 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Header Badge & Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200/60 pb-5">
              <div>
                <span className="text-[10.5px] font-mono-tag font-bold uppercase tracking-widest text-[#ea4c89] block mb-1">
                  OFFICIAL STORE POLICY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d0c22] font-serif-title">
                  Exchange Policy
                </h3>
              </div>

              {/* Exact Policy Statement Badge */}
              <div className="inline-flex items-center gap-2 bg-[#0d0c22] text-white px-4 py-2 rounded-xl text-xs font-mono-tag font-bold shadow-sm">
                <span className="text-gray-300">NO REFUND</span>
                <span className="text-[#ea4c89]">•</span>
                <span className="text-[#ea4c89]">ONLY EXCHANGE WITHIN 2 DAYS</span>
              </div>
            </div>

            {/* Policy Clarifications in Clean Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600">
              
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                <Clock className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0d0c22] mb-0.5">2-Day Window</h4>
                  <p className="text-[11px] text-gray-500">
                    Exchanges must be initiated within 48 hours of purchase with original receipt or order confirmation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                <RefreshCw className="w-4 h-4 text-[#3e34d3] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0d0c22] mb-0.5">Size & Item Swap</h4>
                  <p className="text-[11px] text-gray-500">
                    Exchange for a different size, alternative color, or any garment of equal value in store.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0d0c22] mb-0.5">Original Condition</h4>
                  <p className="text-[11px] text-gray-500">
                    Items must be unworn, unwashed with all tags intact and without damage.
                  </p>
                </div>
              </div>

            </div>

            <p className="text-[11px] text-gray-400 font-mono-tag text-center sm:text-left">
              * For queries regarding exchange eligibility, please contact our Lucknow store desk at +91 7007326371.
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
