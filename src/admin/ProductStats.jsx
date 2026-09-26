import React from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles, Tag, AlertTriangle } from 'lucide-react';

export default function ProductStats({ stats }) {
  const statItems = [
    {
      label: 'Total Products',
      value: stats.total,
      icon: Package,
      color: 'text-[#3e34d3]',
      bgColor: 'bg-[#3e34d3]/10',
      description: 'Active items in catalog'
    },
    {
      label: 'Featured Styles',
      value: stats.featured,
      icon: Sparkles,
      color: 'text-[#ea4c89]',
      bgColor: 'bg-[#ea4c89]/10',
      description: 'Highlighted on homepage'
    },
    {
      label: 'Active Deals',
      value: stats.deals,
      icon: Tag,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      description: 'Markdowns & promotions'
    },
    {
      label: 'Low / Out of Stock',
      value: stats.outOfStock,
      icon: AlertTriangle,
      color: stats.outOfStock > 0 ? 'text-red-500' : 'text-gray-400',
      bgColor: stats.outOfStock > 0 ? 'bg-red-500/10' : 'bg-gray-100',
      description: 'Items requiring restock'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">{item.label}</span>
              <div className={`w-8 h-8 rounded-lg ${item.bgColor} ${item.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-[#0d0c22] font-mono-tag">
                {item.value}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
