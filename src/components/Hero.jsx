import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Tag, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { leftReveal, rightReveal } from '../utils/animations';

export default function Hero({ onShopClick, onDealsClick, onStoreClick }) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20 bg-gradient-to-b from-[#ffffff] via-[#fdfcfb] to-[#f8f7f9] border-b border-gray-100">
      
      {/* Background Subtle Heritage Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#ea4c89]/5 to-[#3e34d3]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#3e34d3]/5 to-[#ea4c89]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive Layout: 1 col on mobile, 2 col on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs (Left Reveal) */}
          <motion.div
            variants={leftReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7"
          >
            {/* Small Brand Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-white border border-[#f3f3f4] px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ea4c89]" />
              <span className="text-[11px] font-mono-tag font-semibold text-[#0d0c22] uppercase tracking-wider">
                ROYAL COLLECTION
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[11px] font-mono-tag text-[#ea4c89] font-medium">LUCKNOW STORE</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#0d0c22] leading-[1.15] tracking-tight font-serif-title">
                Fashion for <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d0c22] via-[#3e34d3] to-[#ea4c89]">
                  Every Style
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#524b63] font-normal leading-relaxed max-w-xl">
                Jeans, Shirts, T-Shirts, Jackets, Shoes, Watches, Belts & More. Contemporary menswear and streetwear curated for Lucknow’s modern fashion pioneers.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="rc-btn-primary text-sm py-3.5 px-7 shadow-lg shadow-[#ea4c89]/25 hover:shadow-[#ea4c89]/40 justify-center group"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onDealsClick}
                className="rc-btn-secondary text-sm py-3.5 px-6 border-gray-200 hover:border-gray-900 justify-center group"
              >
                <Tag className="w-4 h-4 text-[#ea4c89] transition-transform group-hover:rotate-12" />
                <span>Explore Deals</span>
                <span className="rc-badge text-[8px] py-0.5 px-1.5 ml-1">HOT</span>
              </button>
            </div>

            {/* Trust Highlights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              
              <div 
                onClick={onStoreClick}
                className="cursor-pointer p-3 rounded-xl bg-white border border-[#f3f3f4] rc-subtle-shadow hover:border-gray-300 transition-all flex items-start gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[#3e34d3]/10 text-[#3e34d3] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#0d0c22] leading-tight">Lucknow Local</h4>
                  <p className="text-[10px] text-gray-500 font-mono-tag">Mohibullapur, Madiyaon</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#f3f3f4] rc-subtle-shadow flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#ea4c89]/10 text-[#ea4c89] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#0d0c22] leading-tight">8+ Categories</h4>
                  <p className="text-[10px] text-gray-500 font-mono-tag">Streetwear & Classics</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#f3f3f4] rc-subtle-shadow flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-[#0d0c22] leading-tight">Exchange Policy</h4>
                  <p className="text-[10px] text-gray-500 font-mono-tag">2-Day Exchange</p>
                </div>
              </div>

            </div>

          </motion.div>

          {/* Right Column: Hero Fashion Image (Right Reveal) */}
          <motion.div
            variants={rightReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Container */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-[#0d0c22]/15 border-[3px] border-white bg-gray-100 aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <img
                  src="/images/hero_fashion.jpg"
                  alt="Royal Collection Lucknow Men's Fashion Editorial"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060318]/70 via-transparent to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-[#0d0c22] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ea4c89] text-white flex items-center justify-center font-bold text-xs font-serif-title shadow-sm">
                      RC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0d0c22] leading-tight">
                        Authentic Lucknow Store
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono-tag">
                        @ROYAL_COLLECTION_LUCKNOW
                      </p>
                    </div>
                  </div>
                  <span className="rc-badge text-[8px] py-1 px-2">
                    LATEST 2026
                  </span>
                </div>
              </div>

              {/* Decorative Brand Accent Tag */}
              <div className="hidden sm:block absolute -top-3 -left-3 z-20 bg-[#0d0c22] text-white px-3.5 py-1.5 rounded-full text-[10px] font-mono-tag font-bold tracking-wider shadow-md border border-[#807ea399]/40">
                LUCKNOW EDITORIAL
              </div>

              <div className="hidden sm:block absolute -bottom-3 -right-3 z-20 bg-[#ea4c89] text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider shadow-md">
                DEALS IN STORE
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
