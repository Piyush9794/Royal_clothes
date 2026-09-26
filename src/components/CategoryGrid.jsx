import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import CategoryCard from './CategoryCard';
import { upReveal, staggerContainer } from '../utils/animations';

export default function CategoryGrid({ 
  selectedCategory, 
  onSelectCategory, 
  categoryCounts = {} 
}) {
  const displayCategories = CATEGORIES.filter(c => c.slug !== 'all');

  return (
    <section id="categories-section" className="py-12 sm:py-16 lg:py-20 bg-[#ffffff] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={upReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono-tag font-bold text-[#ea4c89] tracking-widest uppercase mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              DEALS IN & CORE ESSENTIALS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d0c22] font-serif-title tracking-tight">
              Explore Our Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mt-1">
              Curated menswear essentials straight from the Royal Collection Lucknow showroom.
            </p>
          </div>

          {/* All category pill shortcut */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`self-start md:self-auto text-xs font-semibold px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#0d0c22] text-white border-[#0d0c22]'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-900'
            }`}
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5"
        >
          {displayCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory.toLowerCase() === cat.slug.toLowerCase()}
              onSelect={onSelectCategory}
              count={categoryCounts[cat.slug] || 0}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
