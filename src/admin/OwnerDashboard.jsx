import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShoppingBag, 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  Filter, 
  Check, 
  ShieldAlert, 
  Sparkles,
  Layers,
  Store
} from 'lucide-react';
import ProductStats from './ProductStats';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import { CATEGORIES } from '../data/categories';

export default function OwnerDashboard({
  products = [],
  stats,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetDemo,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'add' | 'edit'
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminCategory, setAdminCategory] = useState('all');
  const [showResetModal, setShowResetModal] = useState(false);

  // Handle Edit
  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setActiveTab('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setActiveTab('inventory');
  };

  const handleSaveEdit = (updatedData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, updatedData);
      setEditingProduct(null);
      setActiveTab('inventory');
    }
  };

  const handleCreateProduct = (productData) => {
    onAddProduct(productData);
    setActiveTab('inventory');
  };

  // Filtered inventory for admin search
  const filteredAdminProducts = products.filter((p) => {
    const matchesSearch = 
      adminSearch.trim() === '' ||
      p.name.toLowerCase().includes(adminSearch.toLowerCase().trim()) ||
      p.category.toLowerCase().includes(adminSearch.toLowerCase().trim());

    const matchesCategory = 
      adminCategory === 'all' || 
      p.category.toLowerCase() === adminCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8f7f9] text-[#0d0c22] pb-16">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0d0c22] text-white border-b border-[#232145] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ea4c89] text-white flex items-center justify-center font-bold text-sm shadow-sm font-serif-title">
              RC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
                  ROYAL COLLECTION
                </h1>
                <span className="bg-[#ea4c89] text-white text-[9px] font-mono-tag font-bold px-1.5 py-0.5 rounded">
                  OWNER PANEL
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono-tag">
                Lucknow Store Management • LocalStorage Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowResetModal(true)}
              className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs flex items-center gap-1.5 transition-colors"
              title="Reset catalog back to curated default products"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span className="hidden xs:inline">Reset Demo Data</span>
            </button>

            <button
              onClick={onClose}
              className="rc-btn-primary text-xs py-2 px-4 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        
        {/* Statistics Metric Overview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-mono-tag font-bold uppercase tracking-wider text-gray-500">
              Showroom Inventory Insights
            </h2>
            <span className="text-[11px] font-mono-tag text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <ProductStats stats={stats} />
        </section>

        {/* Action Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('inventory');
                setEditingProduct(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'bg-[#0d0c22] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inventory List ({products.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('add');
                setEditingProduct(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'add'
                  ? 'bg-[#ea4c89] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Add New Product</span>
            </button>
          </div>

          {activeTab === 'inventory' && (
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
              {/* Category Filter */}
              <select
                value={adminCategory}
                onChange={(e) => setAdminCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#ea4c89]"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.filter(c => c.slug !== 'all').map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>

              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Filter inventory..."
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] w-full sm:w-48"
                />
              </div>
            </div>
          )}
        </div>

        {/* Views Switching */}
        {activeTab === 'inventory' && (
          <section className="space-y-4">
            <ProductTable
              products={filteredAdminProducts}
              onEditProduct={handleStartEdit}
              onDeleteProduct={onDeleteProduct}
            />
          </section>
        )}

        {activeTab === 'add' && (
          <section>
            <ProductForm
              onSubmit={handleCreateProduct}
              onCancel={() => setActiveTab('inventory')}
              isEditing={false}
            />
          </section>
        )}

        {activeTab === 'edit' && editingProduct && (
          <section>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleSaveEdit}
              onCancel={handleCancelEdit}
              isEditing={true}
            />
          </section>
        )}

      </main>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 space-y-4"
              role="alertdialog"
              aria-modal="true"
            >
              <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-[#0d0c22]">
                  Restore Curated Demo Catalog?
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  This will re-populate LocalStorage with the default set of curated Royal Collection jeans, shirts, tees, jackets, and accessories.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetDemo();
                    setShowResetModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#ea4c89] hover:bg-[#d93d79] text-white text-xs font-semibold shadow-md shadow-[#ea4c89]/20"
                >
                  Reset Catalog
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
