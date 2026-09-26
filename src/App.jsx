import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, HelpCircle, ShoppingBag } from 'lucide-react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductFilters from './components/ProductFilters';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import CustomerQueryModal from './components/CustomerQueryModal';
import Loader from './components/Loader';
import CartDrawer from './components/CartDrawer';
import DealsSection from './components/DealsSection';
import LucknowSection from './components/LucknowSection';
import StoreInfo from './components/StoreInfo';
import PolicySection from './components/PolicySection';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import OwnerDashboard from './admin/OwnerDashboard';
import { useProducts } from './hooks/useProducts';

export default function App() {
  const {
    products,
    filteredProducts,
    loading,
    stats,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filterBadge,
    setFilterBadge,
    onlyDeals,
    setOnlyDeals,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleResetDemo,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    wishlist,
    toggleWishlist,
    selectedProductForModal,
    setSelectedProductForModal,
    toast,
    showToast,
    dismissToast
  } = useProducts();

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const searchInputRef = useRef(null);
  const shopSectionRef = useRef(null);

  // Initial loader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'shop') {
      shopSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById(`${sectionId}-section`) || document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchFocus = () => {
    scrollToSection('shop');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  const handleResetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('featured');
    setFilterBadge('ALL');
    setOnlyDeals(false);
  };

  // Filtered deal products specifically for Deals section
  const dealProducts = products.filter(
    (p) => p.deal === true || (p.salePrice && p.salePrice < p.price)
  );

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-[#0d0c22] flex flex-col selection:bg-[#ea4c89] selection:text-white font-sans antialiased overflow-x-hidden">

      {/* Branded Initial Page Loader */}
      {isInitialLoading && <Loader text="Loading Royal Collection Lucknow..." />}

      {/* Toast Notification Container */}
      <ToastNotification toast={toast} onDismiss={dismissToast} />

      {/* Customer Help & Query Modal */}
      <CustomerQueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
        onQuerySubmitted={(msg) => showToast(msg)}
      />

      {/* Floating Customer Query Pill — Bottom Left */}
      {!isAdminOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-5 left-5 z-40 flex items-center gap-0 bg-[#0d0c22] rounded-full shadow-2xl border border-[#807ea399]/30 backdrop-blur-md overflow-hidden"
        >
          {/* Pulse Dot */}
          <div className="pl-3 pr-1 flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#ea4c89] animate-pulse" />
          </div>

          {/* Customer Query Button */}
          <motion.button
            whileHover={{ backgroundColor: 'rgba(62,52,211,0.3)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsQueryModalOpen(true)}
            className="relative flex items-center justify-center w-9 h-9 text-[#ea4c89] transition-colors"
            aria-label="Open Customer Query Help Desk"
            title="Ask Store Query"
          >
            <MessageSquarePlus className="w-4 h-4" />
          </motion.button>

          {/* Right padding */}
          <div className="pr-1" />
        </motion.div>
      )}

      {/* Floating Shopping Bag Button — Bottom Right */}
      {!isAdminOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 w-12 h-12 bg-[#0d0c22] rounded-full shadow-2xl border border-[#807ea399]/30 backdrop-blur-md flex items-center justify-center text-[#ea4c89] transition-colors hover:bg-[#3e34d3]"
          aria-label="Open Shopping Bag"
          title="View Shopping Bag"
        >
          <motion.div
            key={cart.reduce((s, i) => s + i.quantity, 0)}
            initial={cart.length > 0 ? { scale: 1.4, rotate: -15 } : { scale: 1 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.div>
          {cart.reduce((s, i) => s + i.quantity, 0) > 0 && (
            <motion.span
              key={`fab-badge-${cart.reduce((s, i) => s + i.quantity, 0)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#ea4c89] text-white text-[9px] font-bold flex items-center justify-center px-1 shadow-sm"
            >
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </motion.span>
          )}
        </motion.button>
      )}

      {/* Main View Router: Owner Dashboard vs Public Storefront */}
      {isAdminOpen ? (
        <OwnerDashboard
          products={products}
          stats={stats}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDemo={handleResetDemo}
          onClose={() => setIsAdminOpen(false)}
        />
      ) : (
        <>
          {/* Top Announcement Bar */}
          <AnnouncementBar />

          {/* Sticky Main Navigation */}
          <Navbar
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            wishlistCount={wishlist.length}
            onOpenAdmin={() => setIsAdminOpen(true)}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onSearchFocus={handleSearchFocus}
            onOpenQueryModal={() => setIsQueryModalOpen(true)}
          />

          {/* Mobile Drawer Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onNavigate={scrollToSection}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onSelectCategory={(categorySlug) => {
              setSelectedCategory(categorySlug);
              scrollToSection('shop');
            }}
          />

          {/* Hero Showcase */}
          <Hero
            onShopClick={() => scrollToSection('shop')}
            onDealsClick={() => scrollToSection('deals')}
            onStoreClick={() => scrollToSection('store')}
          />

          {/* Categories Grid */}
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={(categorySlug) => {
              setSelectedCategory(categorySlug);
              scrollToSection('shop');
            }}
            categoryCounts={stats.categoryCounts}
          />

          {/* Main Customer Storefront & Catalog */}
          <main ref={shopSectionRef} id="shop-section" className="py-6 sm:py-8 lg:py-10 bg-[#fdfcfb] border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Product Filtering & Search */}
              <ProductFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onlyDeals={onlyDeals}
                onToggleDeals={() => setOnlyDeals(!onlyDeals)}
                filterBadge={filterBadge}
                onBadgeChange={setFilterBadge}
                totalResults={filteredProducts.length}
                onResetFilters={handleResetAllFilters}
                searchInputRef={searchInputRef}
              />

              {/* Product Grid */}
              <ProductGrid
                products={filteredProducts}
                onAddToCart={(product, size, color, qty) => addToCart(product, size, color, qty)}
                onOpenModal={(product) => setSelectedProductForModal(product)}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onResetFilters={handleResetAllFilters}
                onOpenQueryModal={() => setIsQueryModalOpen(true)}
                title={
                  selectedCategory !== 'all'
                    ? `${selectedCategory} Collection`
                    : onlyDeals
                      ? 'Exclusive Deals In Store'
                      : 'Featured Collection'
                }
                subtitle={
                  searchTerm
                    ? `Showing search results for "${searchTerm}"`
                    : 'Directly sourced & curated for Lucknow contemporary styling.'
                }
              />

            </div>
          </main>

          {/* Deals In Store Section */}
          <DealsSection
            dealProducts={dealProducts}
            onAddToCart={(product, size, color, qty) => addToCart(product, size, color, qty)}
            onOpenModal={(product) => setSelectedProductForModal(product)}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onShopClick={() => scrollToSection('shop')}
            onOpenQueryModal={() => setIsQueryModalOpen(true)}
          />

          {/* Lucknow Section & Shopping Bag Heritage Reference */}
          <LucknowSection onShopClick={() => scrollToSection('shop')} />

          {/* Visit Royal Collection Showroom Details */}
          <StoreInfo />

          {/* Official Store Exchange Policy */}
          <PolicySection />

          {/* Footer */}
          <Footer
            onNavigate={scrollToSection}
            onSelectCategory={(categorySlug) => {
              setSelectedCategory(categorySlug);
              scrollToSection('shop');
            }}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />

          {/* Slide-in Shopping Bag Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            onShopClick={() => scrollToSection('shop')}
          />

          {/* Product Detail Quick View Modal */}
          <ProductDetailModal
            product={selectedProductForModal}
            onClose={() => setSelectedProductForModal(null)}
            onAddToCart={addToCart}
            isWishlisted={
              selectedProductForModal ? wishlist.includes(selectedProductForModal.id) : false
            }
            onToggleWishlist={toggleWishlist}
          />
        </>
      )}

    </div>
  );
}
