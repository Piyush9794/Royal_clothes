import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ text = "Loading Royal Collection..." }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fdfcfb]/90 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Glowing Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-3 border-transparent border-t-[#ea4c89] border-r-[#3e34d3] border-b-[#ea4c89]"
        />

        {/* Center RC Monogram */}
        <div className="absolute w-10 h-10 rounded-xl bg-[#0d0c22] text-white flex items-center justify-center font-serif-title font-bold text-sm shadow-md">
          RC
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="mt-4 text-xs font-mono-tag font-semibold tracking-wider text-[#0d0c22] uppercase"
      >
        {text}
      </motion.p>
    </div>
  );
}
