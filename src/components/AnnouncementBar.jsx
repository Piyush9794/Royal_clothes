import React from 'react';
import { motion } from 'framer-motion';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#0d0c22] text-white py-2 px-3 sm:px-6 text-[11px] sm:text-xs tracking-wider border-b border-[#232145] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 font-mono-tag font-medium text-gray-200"
        >
          <span className="w-2 h-2 rounded-full bg-[#ea4c89] inline-block animate-pulse"></span>
          <span className="font-semibold text-white">ROYAL COLLECTION</span>
          <span className="text-gray-400">•</span>
          <span className="text-[#f3f3f4]">LUCKNOW</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[10px] sm:text-[11px] text-gray-300 font-medium tracking-normal sm:tracking-wider flex items-center gap-1.5 justify-center"
        >
          <span className="bg-[#ea4c89]/20 text-[#ea4c89] border border-[#ea4c89]/40 px-1.5 py-0.5 rounded text-[9px] font-bold">
            STORE POLICY
          </span>
          <span className="text-gray-200 font-semibold">NO REFUND</span>
          <span className="text-gray-400">•</span>
          <span className="text-[#ea4c89] font-semibold">ONLY EXCHANGE WITHIN 2 DAYS</span>
        </motion.div>
      </div>
    </div>
  );
}
