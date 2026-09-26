import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Navigation,
  Clock,
  Store,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon } from './Icons';
import { rightReveal } from '../utils/animations';
//https://maps.app.goo.gl/nKoUm2Ua9GXNnaw59
export default function StoreInfo() {
  const mapUrl = "https://maps.app.goo.gl/nKoUm2Ua9GXNnaw59";
  const instagramUrl = "https://instagram.com/ROYAL_COLLECTION_LUCKNOW";

  return (
    <section id="store-section" className="py-12 sm:py-16 lg:py-20 bg-[#fdfcfb] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={rightReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="text-center max-w-2xl mx-auto mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-[#f3f3f4] px-3.5 py-1.5 rounded-full shadow-sm text-[11px] font-mono-tag text-[#ea4c89] font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            SHOWROOM & VISITOR DESK
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0d0c22] font-serif-title tracking-tight">
            Visit Royal Collection Lucknow
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Come visit our store in Mohibullapur, Madiyaon, Lucknow to experience fits and fabrics firsthand.
          </p>
        </motion.div>

        {/* Responsive Grid: 1 col on mobile, 3 cards on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">

          {/* Card 1: Address & Location */}
          <motion.div
            variants={rightReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="p-6 rounded-2xl bg-white border border-[#f3f3f4] rc-card flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#3e34d3]/10 text-[#3e34d3] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0d0c22] font-serif-title">
                Store Location
              </h3>
              <div className="text-xs text-gray-600 leading-relaxed font-mono-tag">
                <p className="font-bold text-[#0d0c22]">ROYAL COLLECTION</p>
                <p>Shri Nagar Colony,</p>
                <p>Mohibullapur, Madiyaon,</p>
                <p className="text-[#ea4c89] font-semibold">Lucknow, Uttar Pradesh</p>
              </div>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="rc-btn-secondary text-xs py-2.5 px-4 justify-center border-gray-200 hover:border-gray-900 group"
            >
              <Navigation className="w-3.5 h-3.5 text-[#3e34d3] group-hover:rotate-45 transition-transform" />
              <span>Get Google Maps Directions</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          </motion.div>

          {/* Card 2: Contact & Phone Direct */}
          <motion.div
            variants={rightReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="p-6 rounded-2xl bg-white border border-[#f3f3f4] rc-card flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#ea4c89]/10 text-[#ea4c89] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0d0c22] font-serif-title">
                Direct Call & Inquiry
              </h3>
              <p className="text-xs text-gray-500">
                Call our showroom directly for size checks, instant holds, or directions.
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href="tel:7007326371"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs font-mono-tag font-bold text-[#0d0c22] transition-colors"
                >
                  <span>Primary: +91 7007326371</span>
                  <span className="text-[10px] text-[#ea4c89]">CALL</span>
                </a>

                <a
                  href="tel:8574553890"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-xs font-mono-tag font-bold text-[#0d0c22] transition-colors"
                >
                  <span>Secondary: +91 8574553890</span>
                  <span className="text-[10px] text-[#ea4c89]">CALL</span>
                </a>
              </div>
            </div>

            <a
              href="tel:7007326371"
              className="rc-btn-primary text-xs py-2.5 px-4 justify-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Showroom Now</span>
            </a>
          </motion.div>

          {/* Card 3: Social & Timings */}
          <motion.div
            variants={rightReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="p-6 rounded-2xl bg-white border border-[#f3f3f4] rc-card flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-purple-500/10 text-[#ea4c89] flex items-center justify-center">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0d0c22] font-serif-title">
                Instagram & Hours
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0d0c22]">Store Timings</p>
                    <p className="text-[11px] text-gray-500">Mon – Sun: 10:30 AM – 9:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#ea4c89] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#0d0c22]">Official Handle</p>
                    <p className="text-[11px] font-mono-tag text-[#ea4c89]">@ROYAL_COLLECTION_LUCKNOW</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="rc-btn-secondary text-xs py-2.5 px-4 justify-center border-gray-200 hover:border-gray-900"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#ea4c89]" />
              <span>Follow on Instagram</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
