import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Trash2, 
  Sparkles, 
  Tag, 
  AlertCircle, 
  Check, 
  X, 
  Package,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { FALLBACK_BAG_IMAGE } from '../services/imageService';

export default function ProductTable({
  products = [],
  onEditProduct,
  onDeleteProduct
}) {
  const [productToDelete, setProductToDelete] = useState(null);

  const confirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mx-auto">
          <Package className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-[#0d0c22]">No products in catalog</h4>
        <p className="text-xs text-gray-500 max-w-xs mx-auto">
          Use the product form above to add your first garment or reset demo products.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 1. Desktop & Tablet View: Clean Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-mono-tag uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / Sale</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Badges</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Thumbnail + Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-13 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img
                          src={product.image || FALLBACK_BAG_IMAGE}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_BAG_IMAGE;
                          }}
                        />
                      </div>
                      <div className="min-w-0 max-w-[220px]">
                        <p className="font-bold text-[#0d0c22] truncate" title={product.name}>
                          {product.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono-tag truncate">
                          ID: {product.id.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-700">
                      {product.category}
                    </span>
                  </td>

                  {/* Pricing */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0d0c22]">
                        ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                      </span>
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4">
                    <span className={`font-mono-tag font-bold ${
                      product.stock <= 0 ? 'text-red-500' : product.stock <= 5 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>

                  {/* Badges & Tags */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {product.badge && product.badge !== 'None' && (
                        <span className="rc-badge text-[7.5px] py-0.5 px-1.5">
                          {product.badge}
                        </span>
                      )}
                      {product.featured && (
                        <span className="bg-[#3e34d3]/10 text-[#3e34d3] text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                      {product.deal && (
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                          Deal
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onEditProduct(product)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-[#3e34d3] hover:bg-[#3e34d3]/10 transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setProductToDelete(product)}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Mobile View: Responsive Stacked Cards (Under 768px) */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm space-y-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                <img
                  src={product.image || FALLBACK_BAG_IMAGE}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-tag font-bold text-[#ea4c89] uppercase">
                    {product.category}
                  </span>
                  <span className={`text-[10px] font-mono-tag font-bold ${
                    product.stock <= 0 ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#0d0c22] truncate mt-0.5">
                  {product.name}
                </h4>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-bold text-[#0d0c22]">
                    ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                  </span>
                  {product.salePrice && product.salePrice < product.price && (
                    <span className="text-[10px] text-gray-400 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mt-1.5">
                  {product.badge && product.badge !== 'None' && (
                    <span className="rc-badge text-[7px] py-0.5 px-1.5">
                      {product.badge}
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-[#3e34d3]/10 text-[#3e34d3] text-[8px] font-bold px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                  {product.deal && (
                    <span className="bg-amber-100 text-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded">
                      Deal
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Action Controls */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => onEditProduct(product)}
                className="flex-1 py-1.5 px-3 rounded-lg border border-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-gray-50"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#3e34d3]" />
                <span>Edit</span>
              </button>
              
              <button
                onClick={() => setProductToDelete(product)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-red-50 text-red-600 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-red-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 space-y-4"
              role="alertdialog"
              aria-modal="true"
            >
              <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-[#0d0c22]">
                  Delete "{productToDelete.name}"?
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Are you sure you want to remove this product from Royal Collection store inventory? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md shadow-red-600/20"
                >
                  Delete Item
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
