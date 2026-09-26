import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  Phone,
  Store,
  Sparkles
} from 'lucide-react';
import { FALLBACK_BAG_IMAGE } from '../services/imageService';

export default function CartDrawer({
  isOpen,
  onClose,
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShopClick
}) {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*ROYAL COLLECTION LUCKNOW - NEW ORDER REQUEST*\n`;
    message += `------------------------------------\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Size: ${item.size} | Color: ${item.color}\n`;
      message += `   Qty: ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}\n\n`;
    });
    message += `------------------------------------\n`;
    message += `*Total Order Value:* ₹${subtotal.toLocaleString('en-IN')}\n\n`;
    message += `Customer Location: Lucknow (Pickup / Delivery Inquiry)\n`;
    message += `Store Policy Acknowledged: No Refund • Only Exchange within 2 Days.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917007326371?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white text-[#0d0c22] shadow-2xl flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag Drawer"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#fdfcfb]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ea4c89] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0d0c22]">
                    Shopping Bag
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono-tag">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in bag
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-gray-400 hover:text-red-500 font-medium px-2 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content: Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#0d0c22] font-serif-title">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                      Explore Royal Collection Lucknow’s latest jeans, shirts, jackets and accessories.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onShopClick();
                    }}
                    className="rc-btn-primary text-xs py-2.5 px-6 mt-2"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item.cartItemId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3 rounded-xl border border-gray-100 bg-white flex gap-3 relative group hover:border-gray-200 transition-all shadow-sm"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img
                          src={item.image || FALLBACK_BAG_IMAGE}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_BAG_IMAGE;
                          }}
                        />
                      </div>

                      {/* Item Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="text-xs font-bold text-[#0d0c22] line-clamp-1">
                              {item.name}
                            </h5>
                            <button
                              onClick={() => onRemoveItem(item.cartItemId)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <p className="text-[10px] text-gray-500 font-mono-tag mt-0.5">
                            Size: <span className="font-semibold text-gray-800">{item.size}</span> | Style: <span className="font-semibold text-gray-800">{item.color}</span>
                          </p>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[11px] font-bold text-[#0d0c22]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-[#0d0c22]">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Order CTA */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-[#fdfcfb] space-y-3">
                
                {/* Policy Notice */}
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/60 text-[10px] text-amber-900 flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ea4c89] shrink-0 mt-0.5" />
                  <span>
                    <strong>ROYAL COLLECTION:</strong> NO REFUND • ONLY EXCHANGE WITHIN 2 DAYS.
                  </span>
                </div>

                {/* Subtotal */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Store Pickup (Mohibullapur, Lucknow):</span>
                    <span className="text-emerald-600 font-semibold font-mono-tag">FREE</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-[#0d0c22] pt-1">
                    <span>Subtotal:</span>
                    <span className="text-base text-[#0d0c22]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Instant Store Order */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp Direct</span>
                </button>

                <p className="text-[10px] text-gray-400 text-center font-mono-tag">
                  Direct confirmation with Royal Collection Lucknow showroom staff
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
