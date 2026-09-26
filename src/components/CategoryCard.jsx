import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, isSelected, onSelect, count }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(category.slug)}
      className={`group cursor-pointer relative rounded-2xl overflow-hidden bg-white border transition-all duration-300 ${
        isSelected 
          ? 'border-[#ea4c89] ring-2 ring-[#ea4c89]/20 shadow-lg shadow-[#ea4c89]/10' 
          : 'border-gray-100/90 hover:border-gray-300 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Aspect Ratio Container */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-gray-100">
        <img
          src={category.image}
          alt={`Royal Collection ${category.name}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060318]/85 via-[#060318]/25 to-transparent" />

        {/* Top Tag */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-[#0d0c22] text-[9px] font-mono-tag font-bold px-2 py-0.5 rounded-md shadow-sm">
            {count !== undefined ? `${count} items` : 'Explore'}
          </span>
        </div>

        {/* Top Right Action Arrow */}
        <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#0d0c22] group-hover:bg-[#ea4c89] group-hover:text-white transition-colors shadow-sm">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10 text-white">
          <p className="text-[10px] text-gray-300 font-mono-tag uppercase tracking-wider leading-none mb-1">
            {category.tagline}
          </p>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#ea4c89] transition-colors">
            {category.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
