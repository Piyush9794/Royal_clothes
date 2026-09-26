import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUp, 
  LayoutDashboard,
  Heart,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { CATEGORIES } from '../data/categories';
import { upReveal } from '../utils/animations';

export default function Footer({ 
  onNavigate, 
  onSelectCategory, 
  onOpenAdmin 
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060318] text-white pt-14 pb-10 border-t border-[#1a1836]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={upReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#201d40]"
        >
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ea4c89] text-white flex items-center justify-center font-bold text-base font-serif-title shadow-md shadow-[#ea4c89]/20">
                RC
              </div>
              <div>
                <span className="text-lg font-bold uppercase tracking-tight text-white font-serif-title block">
                  Royal Collection
                </span>
                <span className="text-[10px] text-gray-400 font-mono-tag tracking-wider uppercase">
                  Lucknow Fashion Store
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Contemporary everyday fashion boutique in Lucknow offering premium Jeans, Shirts, T-Shirts, Jackets, Shoes, Watches, Belts and accessories.
            </p>

            {/* Quick Badge */}
            <div className="p-3 rounded-xl bg-[#0d0c22] border border-[#232145] text-xs text-gray-300 space-y-1">
              <div className="flex items-center gap-1.5 font-mono-tag text-[10px] text-[#ea4c89] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>EXCHANGE POLICY</span>
              </div>
              <p className="text-[11px] text-gray-300">
                NO REFUND • ONLY EXCHANGE WITHIN 2 DAYS
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-gray-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-[#ea4c89] transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shop')} 
                  className="hover:text-[#ea4c89] transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('deals')} 
                  className="hover:text-[#ea4c89] transition-colors text-gray-300 font-medium"
                >
                  Deals & Offers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#ea4c89] transition-colors"
                >
                  Lucknow Story
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('store')} 
                  className="hover:text-[#ea4c89] transition-colors"
                >
                  Visit Store
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAdmin} 
                  className="hover:text-[#ea4c89] transition-colors text-gray-300 flex items-center gap-1 mt-2"
                >
                  <LayoutDashboard className="w-3 h-3 text-[#ea4c89]" />
                  <span>Owner Admin</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-gray-300">
              Deals In Categories
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-gray-400">
              {CATEGORIES.filter(c => c.slug !== 'all').map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onNavigate('shop');
                  }}
                  className="text-left hover:text-[#ea4c89] transition-colors truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-gray-300">
              Store Contact
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <span>
                  Shri Nagar Colony, Mohibullapur, Madiyaon, Lucknow
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ea4c89] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:7007326371" className="hover:text-white transition-colors font-mono-tag">
                    +91 7007326371
                  </a>
                  <a href="tel:8574553890" className="hover:text-white transition-colors font-mono-tag">
                    +91 8574553890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <InstagramIcon className="w-4 h-4 text-[#ea4c89] shrink-0" />
                <a
                  href="https://instagram.com/ROYAL_COLLECTION_LUCKNOW"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#ea4c89] transition-colors font-mono-tag truncate"
                >
                  @ROYAL_COLLECTION_LUCKNOW
                </a>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-gray-300">ROYAL COLLECTION</strong> — Lucknow Fashion Store. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-gray-400 hover:text-white text-[11px] font-mono-tag flex items-center gap-1"
            >
              Owner Portal
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-[#161330] hover:bg-[#ea4c89] text-white flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
