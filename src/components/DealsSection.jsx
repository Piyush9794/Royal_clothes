import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Clock, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { variants, staggerContainer } from '../utils/animations';
//import DealsHeader from './DealsHeader';

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
    <section className="relative w-full overflow-hidden py-5">
      <div className="mx-auto w-full max-w-7xl   px-4 sm:px-6 lg:px-8">



        {/* ================= PRODUCTS GRID ================= */}
        {dealProducts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.05 }}
            className="ml-0 grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
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
          <motion.div
            variants={variants["zoom-in"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="ml-0 w-full max-w-2xl rounded-2xl border border-[#f3f3f4] bg-white p-6 text-center shadow-lg sm:p-10 md:p-12"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ea4c89]/10 text-[#ea4c89]">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#0d0c22] font-serif-title sm:text-xl">
              New Seasonal Deals Dropping Soon
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-gray-500 sm:text-sm">
              Our showroom team is preparing exclusive festival and clearance offers.
              Explore our entire catalog in the meantime!
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
    </section>

  );
}
