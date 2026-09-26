import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, ArrowUpDown, Tag, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onlyDeals,
  onToggleDeals,
  filterBadge,
  onBadgeChange,
  totalResults,
  onResetFilters,
  searchInputRef
}) {
  const hasActiveFilters = 
    searchTerm.trim() !== '' || 
    selectedCategory !== 'all' || 
    onlyDeals || 
    filterBadge !== 'ALL' ||
    sortBy !== 'featured';

  return (
    <div className="space-y-4 mb-6">
      
      {/* Top Search & Main Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Jeans, Shirts, T-Shirts, Watches, Belts..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-[#0d0c22] placeholder-gray-400 focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20 shadow-sm transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Sort & Deal Filters */}
        <div className="flex items-center gap-2">
          
          {/* Deals Only Toggle */}
          <button
            onClick={onToggleDeals}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
              onlyDeals 
                ? 'bg-[#ea4c89] text-white border-[#ea4c89] shadow-md shadow-[#ea4c89]/20' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Only Deals</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full sm:w-auto appearance-none pl-8 pr-8 py-2.5 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20 shadow-sm cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest Arrival</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Horizontally Scrollable Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-[#0d0c22] text-white font-semibold shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-[#0d0c22]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators & Result Count */}
      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-1">
        <div className="flex items-center gap-2">
          <span className="font-mono-tag font-semibold text-[#0d0c22]">
            {totalResults} {totalResults === 1 ? 'Product' : 'Products'} Available
          </span>
          {selectedCategory !== 'all' && (
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
              Category: {selectedCategory}
              <button onClick={() => onSelectCategory('all')} className="hover:text-red-500">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {onlyDeals && (
            <span className="bg-[#ea4c89]/10 text-[#ea4c89] px-2 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
              Deals Only
              <button onClick={onToggleDeals} className="hover:text-red-500">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-[11px] font-semibold text-[#ea4c89] hover:underline flex items-center gap-1 mt-1 sm:mt-0"
          >
            <X className="w-3 h-3" />
            Reset all filters
          </button>
        )}
      </div>

    </div>
  );
}
