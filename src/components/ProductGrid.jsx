import React from 'react';
import { motion } from 'framer-motion';
import { PackageOpen, Sparkles, RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard';
import { staggerContainer } from '../utils/animations';

export default function ProductGrid({
  products,
  onAddToCart,
  onOpenModal,
  wishlist = [],
  onToggleWishlist,
  onResetFilters,
  title = "Featured Collection",
  subtitle = "Handpicked menswear and streetwear ready for Lucknow style."
}) {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 mx-auto rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-4">
          <PackageOpen className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-[#0d0c22] mb-1 font-serif-title">
          No Products Found
        </h3>
        <p className="text-xs text-gray-500 max-w-xs mx-auto mb-5 leading-relaxed">
          We couldn’t find any items matching your active filter criteria. Try adjusting your search query or category filter.
        </p>
        <button
          onClick={onResetFilters}
          className="rc-btn-primary text-xs py-2.5 px-5 mx-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid Header */}
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold text-[#0d0c22] font-serif-title tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Responsive Grid: 
          1-col on ultra-compact 320px screens if needed, 
          2-cols on 360-767px mobile, 
          3-cols on 768-1023px tablet, 
          4-cols on 1024px+ desktop 
      */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 w-full"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onOpenModal={onOpenModal}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </motion.div>
    </div>
  );
}
