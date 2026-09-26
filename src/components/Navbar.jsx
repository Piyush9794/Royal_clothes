import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Menu,
  Search,
  Heart,
  LayoutDashboard,
  Sparkles,
  HelpCircle,
  MapPin,
  Tag
} from 'lucide-react';

export default function Navbar({
  onOpenCart,
  cartCount = 0,
  wishlistCount = 0,
  onOpenAdmin,
  activeSection,
  onNavigate,
  onOpenMobileMenu,
  onSearchFocus,
  onOpenQueryModal
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-100/80 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Left: Brand Identity & Monogram */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea4c89] rounded-lg p-1"
          aria-label="Royal Collection Lucknow Home"
        >
          {/* RC Brand Mark */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d0c22] via-[#1a1842] to-[#3e34d3] text-white flex items-center justify-center font-bold text-base tracking-wider shadow-md shadow-[#0d0c22]/15 border border-[#807ea399]/30 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
            <span className="relative z-10 text-white font-serif-title">RC</span>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#ea4c89] rounded-full blur-[2px] opacity-70"></div>
          </div>

          {/* Business Name */}
          <div className="flex flex-col">
            <span className="text-[17px] sm:text-lg font-bold tracking-tight text-[#0d0c22] uppercase group-hover:text-[#ea4c89] transition-colors leading-tight font-serif-title">
              Royal Collection
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono-tag tracking-wider uppercase">
              <span className="text-[#ea4c89] font-bold">Lucknow</span>
              <span>•</span>
              <span className="hidden xs:inline">Fashion Store</span>
            </div>
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-gray-700">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#ea4c89] transition-colors ${activeSection === 'home' ? 'text-[#ea4c89] font-semibold' : ''
              }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className={`hover:text-[#ea4c89] transition-colors ${activeSection === 'shop' ? 'text-[#ea4c89] font-semibold' : ''
              }`}
          >
            Shop All
          </button>

          <button
            onClick={() => onNavigate('categories')}
            className={`hover:text-[#ea4c89] transition-colors ${activeSection === 'categories' ? 'text-[#ea4c89] font-semibold' : ''
              }`}
          >
            Categories
          </button>

          <button
            onClick={() => onNavigate('deals')}
            className={`flex items-center gap-1 hover:text-[#ea4c89] transition-colors ${activeSection === 'deals' ? 'text-[#ea4c89] font-semibold' : ''
              }`}
          >
            <span>Deals</span>
            <span className="rc-badge text-[8px] py-0.5 px-1.5 leading-none">HOT</span>
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`hover:text-[#ea4c89] transition-colors ${activeSection === 'about' ? 'text-[#ea4c89] font-semibold' : ''
              }`}
          >
            Lucknow Story
          </button>

          <button
            onClick={() => onNavigate('store')}
            className={`hover:text-[#ea4c89] transition-colors ${activeSection === 'store' ? 'text-[#ea4c89] font-semibold' : ''
              }`}
          >
            Visit Store
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search Trigger */}
          <button
            onClick={onSearchFocus}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200/80 bg-gray-50 flex items-center justify-center text-gray-700 hover:text-[#ea4c89] hover:border-[#ea4c89]/40 hover:bg-[#ea4c89]/5 transition-all"
            aria-label="Search catalog"
            title="Search products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Customer Query Trigger */}
          <button
            onClick={onOpenQueryModal}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200/80 bg-gray-50 flex items-center justify-center text-gray-700 hover:text-[#ea4c89] hover:border-[#ea4c89]/40 hover:bg-[#ea4c89]/5 transition-all"
            aria-label="Customer Help & Inquiry"
            title="Customer Help Desk & Query"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              cartCount > 0
                ? 'border-[#ea4c89]/50 bg-[#ea4c89]/10 text-[#ea4c89]'
                : 'border-gray-200/80 bg-gray-50 text-gray-700 hover:text-[#ea4c89] hover:border-[#ea4c89]/40 hover:bg-[#ea4c89]/5'
            }`}
            aria-label={`Shopping bag with ${cartCount} items`}
            title="View Shopping Bag"
          >
            <motion.div
              key={cartCount}
              initial={cartCount > 0 ? { scale: 1.4, rotate: -15 } : { scale: 1 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 12 }}
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.div>
            {cartCount > 0 && (
              <motion.span
                key={`badge-${cartCount}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#ea4c89] text-white text-[10px] font-bold flex items-center justify-center px-1 shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Owner / Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d0c22] text-white hover:bg-[#3e34d3] text-xs font-semibold shadow-sm transition-all duration-200 border border-[#807ea399]/20"
            title="Open Owner Dashboard to manage inventory"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#ea4c89]" />
            <span>Owner Admin</span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200/80 bg-gray-50 flex items-center justify-center text-gray-800 hover:text-[#ea4c89] hover:border-[#ea4c89]/40 transition-all"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

      </div>
    </motion.header>
  );
}
