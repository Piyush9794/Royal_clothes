import { AnimatePresence, motion } from 'framer-motion';

import {
  X,
  ShoppingBag,
  LayoutDashboard,
  Phone,
  MapPin,
  Tag,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Compass
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CATEGORIES } from '../data/categories';

export default function MobileMenu({
  isOpen,
  onClose,
  onNavigate,
  onOpenAdmin,
  onOpenCart,
  cartCount,
  onSelectCategory
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[340px] bg-white text-[#0d0c22] shadow-2xl flex flex-col justify-between overflow-y-auto md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Top Bar */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fdfcfb]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ea4c89] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#ea4c89]/20">
                  RC
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider uppercase text-[#0d0c22]">
                    Royal Collection
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono-tag">Lucknow Store</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="p-4 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
              {/* Primary Pages */}
              <div className="space-y-1">
                <p className="text-[10px] font-mono-tag uppercase tracking-wider text-gray-400 px-2 mb-1">
                  Menu
                </p>
                <button
                  onClick={() => { onNavigate('home'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#ea4c89]" />
                    Home Showcase
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => { onNavigate('shop'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#3e34d3]" />
                    All Collection
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => { onNavigate('deals'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 text-left transition-colors text-[#ea4c89]"
                >
                  <span className="flex items-center gap-2.5">
                    <Tag className="w-4 h-4" />
                    Special Deals In
                  </span>
                  <span className="rc-badge text-[8px] py-0.5 px-2">HOT</span>
                </button>

                <button
                  onClick={() => { onNavigate('about'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-gray-600" />
                    Lucknow Heritage
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => { onNavigate('store'); onClose(); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 text-left transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    Visit Store & Policy
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>

              {/* Categories Quick Nav */}
              <div>
                <p className="text-[10px] font-mono-tag uppercase tracking-wider text-gray-400 px-2 mb-2">
                  Deals In Categories
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.filter(c => c.slug !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.slug);
                        onNavigate('shop');
                        onClose();
                      }}
                      className="px-2.5 py-2 rounded-md bg-gray-50 hover:bg-[#ea4c89]/10 hover:text-[#ea4c89] text-[12px] font-medium text-gray-700 text-left transition-colors truncate"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Button */}
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#0d0c22] text-white text-xs font-semibold shadow-md shadow-[#0d0c22]/10"
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#ea4c89]" />
                    Owner Admin Dashboard
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono-tag">Manage</span>
                </button>
              </div>

              {/* Contact Info in Drawer */}
              <div className="p-3 bg-gray-50 rounded-xl space-y-2 text-xs text-gray-600">
                <a
                  href="tel:7007326371"
                  className="flex items-center gap-2 text-gray-800 hover:text-[#ea4c89] font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ea4c89]" />
                  +91 7007326371 / 8574553890
                </a>
                <a
                  href="https://instagram.com/ROYAL_COLLECTION_LUCKNOW"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-gray-800 hover:text-[#ea4c89] font-medium"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#ea4c89]" />
                  @ROYAL_COLLECTION_LUCKNOW
                </a>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 bg-white space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCart();
                }}
                className="w-full rc-btn-primary justify-center text-sm py-3"
              >
                <ShoppingBag className="w-4 h-4" />
                View Shopping Bag ({cartCount})
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 text-center font-mono-tag">
                <ShieldCheck className="w-3 h-3 text-[#ea4c89]" />
                <span>Exchange within 2 days • No Refund</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
