import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, CheckCircle2, Award, ShoppingBag } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { leftReveal, rightReveal } from '../utils/animations';

export default function LucknowSection({ onShopClick }) {
  return (
    <section id="lucknow-story" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Brand Visual & Shopping Bag Reference */}
          <motion.div
            variants={leftReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Shopping Bag Card Frame */}
              <div className="relative z-10 rounded-2xl overflow-hidden bg-gray-50 border-[3px] border-white shadow-xl aspect-square">
                <img
                  src="/images/royal_bag.jpg"
                  alt="Royal Collection Lucknow Signature Boutique Bag"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060318]/70 via-transparent to-transparent" />
                
                {/* Floating Bag Identity Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0d0c22] font-serif-title">
                        Royal Collection Shopping Bag
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono-tag">
                        Shri Nagar Colony, Mohibullapur, Lucknow
                      </p>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-[#ea4c89] text-white flex items-center justify-center text-xs font-bold font-serif-title">
                      RC
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Badges */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-[#0d0c22] text-white p-3 rounded-xl shadow-lg border border-[#3e34d3]/40 hidden sm:flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#ea4c89]" />
                <div>
                  <p className="text-[11px] font-bold">100% Genuine Quality</p>
                  <p className="text-[9px] text-gray-400 font-mono-tag">Lucknow Men's Hub</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Lucknow Editorial Story (Right Reveal) */}
          <motion.div
            variants={rightReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-[#fdfcfb] border border-[#f3f3f4] px-3.5 py-1.5 rounded-full shadow-sm text-[11px] font-mono-tag text-[#ea4c89] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              STYLE FROM LUCKNOW
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d0c22] font-serif-title leading-tight tracking-tight">
              Contemporary Everyday Fashion <br className="hidden sm:inline" />
              Rooted in Lucknow’s Charm
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong>Royal Collection</strong> brings contemporary everyday fashion to Lucknow. Situated in Mohibullapur, Madiyaon, our store bridges modern streetwear, sharp denim, tailored shirts, and stylish accessories for individuals who appreciate effortless elegance and superior comfort.
            </p>

            {/* Core Values Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0d0c22]">Handpicked Menswear</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Strict quality control on fabrics, fits, and stitching.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0d0c22]">Direct Store Experience</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Try on sizes in Mohibullapur showroom or order online.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0d0c22]">Complete Wardrobe</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Jeans, Shirts, Tees, Jackets, Shoes, Watches, Belts.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#ea4c89] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0d0c22]">Transparent Policy</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Hassle-free 2-Day Exchange policy on all purchases.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onShopClick}
                className="rc-btn-primary text-xs sm:text-sm py-3 px-6 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Lucknow Collection</span>
              </button>

              <a
                href="https://instagram.com/ROYAL_COLLECTION_LUCKNOW"
                target="_blank"
                rel="noreferrer"
                className="rc-btn-secondary text-xs sm:text-sm py-3 px-5 border-gray-200"
              >
                <InstagramIcon className="w-4 h-4 text-[#ea4c89]" />
                <span>@ROYAL_COLLECTION_LUCKNOW</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
