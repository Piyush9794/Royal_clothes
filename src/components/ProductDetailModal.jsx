import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Check, 
  MessageCircle, 
  Phone,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { modalBackdrop, modalContent } from '../utils/animations';
import { FALLBACK_BAG_IMAGE } from '../services/imageService';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image || FALLBACK_BAG_IMAGE);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);

  const allImages = [
    product.image,
    ...(Array.isArray(product.additionalImages) ? product.additionalImages : [])
  ].filter(Boolean);

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const currentPrice = hasDiscount ? product.salePrice : product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Royal Collection Lucknow! I am interested in ordering: "${product.name}" (Size: ${selectedSize}, Color: ${selectedColor}, Price: ₹${currentPrice}). Is this currently available in the Mohibullapur store?`
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

        {/* Modal Container */}
        <motion.div
          variants={modalContent}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row border border-gray-100"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 hover:bg-[#ea4c89] hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Media Viewport */}
          <div className="md:w-1/2 bg-gray-50 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200/70">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_BAG_IMAGE;
                }}
              />
              {product.badge && product.badge !== 'None' && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="rc-badge shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail list */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-12 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img
                        ? 'border-[#ea4c89] ring-2 ring-[#ea4c89]/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Meta & Purchase Controls */}
          <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto custom-scrollbar max-h-[60vh] md:max-h-[85vh]">
            <div className="space-y-4">
              
              {/* Category & Monogram */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tag font-bold text-[#ea4c89] tracking-wider uppercase">
                  {product.category}
                </span>
                <span className="text-[10px] text-gray-400 font-mono-tag">
                  ID: {product.id.slice(0, 10)}
                </span>
              </div>

              {/* Title & Pricing */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0d0c22] font-serif-title leading-tight">
                  {product.name}
                </h2>
                
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-bold text-[#0d0c22]">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        Save {discountPercent}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description || 'Exclusive contemporary clothing from Royal Collection Lucknow.'}
              </p>

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                    <span>Select Size:</span>
                    <span className="font-mono-tag text-[#ea4c89]">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedSize === s
                            ? 'bg-[#0d0c22] text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                    <span>Select Color / Style:</span>
                    <span className="font-mono-tag text-[#ea4c89]">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedColor === c
                            ? 'bg-[#ea4c89] text-white shadow-sm font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-xs font-bold text-[#0d0c22]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Store Exchange Policy Reminder */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">ROYAL COLLECTION POLICY: </span>
                  <span>NO REFUND • ONLY EXCHANGE WITHIN 2 DAYS.</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-5 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, selectedSize, selectedColor, quantity);
                    onClose();
                  }}
                  className="flex-1 rc-btn-primary py-3 justify-center text-xs sm:text-sm font-bold shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                    isWishlisted
                      ? 'bg-[#ea4c89] text-white border-[#ea4c89]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Direct Store Order */}
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Store Inquiry</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
