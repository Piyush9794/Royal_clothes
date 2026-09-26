import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Clock, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { variants, staggerContainer } from '../utils/animations';

export default function DealsSection({
  dealProducts = [],
  onAddToCart,
  onOpenModal,
  wishlist = [],
  onToggleWishlist,
  onShopClick,
  onOpenQueryModal
}) {
  return (
    <section
      id="deals-section"
      className="relative w-full overflow-hidden border-4    py-2"
    >



      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2 ">




        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">


          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#ea4c89] font-mono-tag">
              <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#ea4c89]" />
              <span>SPECIAL PROMOTIONS & DISCOUNTS</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0c22] font-serif-title">
              Deals In Store
            </h2>

            <p className="text-xs sm:text-sm text-gray-500">
              Limited-time markdown prices on authentic Royal Collection Lucknow styles.
            </p>
          </div>

          <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500 shadow-sm font-mono-tag">
            <Clock className="h-3.5 w-3.5 text-[#ea4c89]" />
            Updated Daily
          </span>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        {dealProducts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.05 }}
            className=" grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 w-full  "
          >
            {dealProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenModal={onOpenModal}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenQueryModal={onOpenQueryModal}
              />
            ))}
          </motion.div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <motion.div
            variants={variants["zoom-in"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto w-full max-w-2xl rounded-2xl border border-[#f3f3f4] bg-white p-6 text-center shadow-lg sm:p-10 md:p-12"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ea4c89]/10 text-[#ea4c89]">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#0d0c22] font-serif-title sm:text-xl">
              New Seasonal Deals Dropping Soon
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-gray-500 leading-relaxed">
              Our showroom team is preparing exclusive festival and clearance offers. Explore our entire catalog in the meantime!
            </p>

            <button
              onClick={onShopClick}
              className="rc-btn-primary mx-auto mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:px-6"
            >
              <span>Explore All Products</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </div>
    </section >
  );
}
