import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { FALLBACK_BAG_IMAGE } from '../services/imageService';
import { variants } from '../utils/animations';

export default function ProductCard({
  product,
  onAddToCart,
  onOpenModal,
  isWishlisted,
  onToggleWishlist
}) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const currentPrice = hasDiscount ? product.salePrice : product.price;
  const displayImage = product.image || FALLBACK_BAG_IMAGE;

  return (
    <motion.div
      variants={variants["fade-up"]}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white border border-[#f3f3f4] rounded-xl overflow-hidden flex flex-col justify-between transition-shadow duration-300 shadow-[0px_4px_20px_0px_rgba(27,32,50,0.06)] hover:shadow-[0px_12px_30px_0px_rgba(234,76,137,0.12)] hover:border-[#ea4c89]/30 h-full w-full"
    >
      {/* Top Media Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 cursor-pointer"
        onClick={() => onOpenModal(product)}
      >
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_BAG_IMAGE;
          }}
        />

        {/* Gradient Bottom Shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 max-w-[65%]">
          {product.badge && product.badge !== 'None' && (
            <span className="bg-[#ea4c89] text-white font-bold tracking-wider uppercase text-[7.5px] sm:text-[8.5px] px-1.5 sm:px-2 py-0.5 rounded shadow-sm leading-none">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#0d0c22] text-white text-[7.5px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded font-mono-tag leading-none shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${
            isWishlisted
              ? 'bg-[#ea4c89] text-white'
              : 'bg-white/90 text-gray-700 hover:text-[#ea4c89] hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Desktop Hover Quick View Trigger */}
        <div className="hidden sm:flex absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            className="w-full py-1.5 px-2 rounded-lg bg-white/95 backdrop-blur-sm text-[#0d0c22] text-[11px] font-semibold shadow-md flex items-center justify-center gap-1 hover:bg-[#0d0c22] hover:text-white transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Bottom Product Details */}
      <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between gap-1.5 sm:gap-2">
        <div>
          {/* Category & Stock Indicator */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500 font-mono-tag uppercase tracking-wider mb-0.5">
            <span className="truncate">{product.category}</span>
            {product.stock <= 3 && product.stock > 0 && (
              <span className="text-[#ea4c89] font-bold shrink-0 ml-1">Only {product.stock} left</span>
            )}
            {product.stock === 0 && (
              <span className="text-gray-400 font-bold shrink-0 ml-1">Out of stock</span>
            )}
          </div>

          {/* Product Name (2 lines to prevent cut-off) */}
          <h3 
            onClick={() => onOpenModal(product)}
            className="text-[12px] sm:text-sm font-bold text-[#0d0c22] line-clamp-2 leading-snug group-hover:text-[#ea4c89] transition-colors cursor-pointer min-h-[1.8rem] sm:min-h-[2.2rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Sizes preview */}
          {product.sizes && product.sizes.length > 0 && (
            <p className="text-[9px] sm:text-[10px] text-gray-400 truncate mt-0.5 font-mono-tag">
              Sizes: {product.sizes.join(', ')}
            </p>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1.5">
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-base font-bold text-[#0d0c22] leading-tight truncate">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <span className="text-[9.5px] sm:text-[11px] text-gray-400 line-through leading-none mt-0.5">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Add Button: perfectly sized circular/pill button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={product.stock === 0}
            className={`w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1 rounded-full bg-[#ea4c89] hover:bg-[#d93d79] text-white flex items-center justify-center gap-1 shrink-0 shadow-sm transition-all active:scale-95 ${
              product.stock === 0 ? 'opacity-50 cursor-not-allowed bg-gray-400' : ''
            }`}
            aria-label={`Add ${product.name} to shopping bag`}
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline text-[11px] font-semibold">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
