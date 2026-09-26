import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetDemoProducts,
  getCart,
  saveCart,
  getWishlist,
  saveWishlist
} from '../services/productStorage';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filterBadge, setFilterBadge] = useState('ALL');
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [toast, setToast] = useState(null);

  // Cart & Wishlist states
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Initial load
  useEffect(() => {
    try {
      const initialProducts = getProducts();
      setProducts(initialProducts);
      setCart(getCart());
      setWishlist(getWishlist());
    } catch (e) {
      console.error('Failed to load initial data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // CRUD Actions
  const handleAddProduct = useCallback((productData) => {
    try {
      const created = addProduct(productData);
      setProducts((prev) => [created, ...prev]);
      showToast(`"${created.name}" added successfully.`);
      return created;
    } catch (error) {
      showToast(error.message || 'Failed to add product.', 'error');
      throw error;
    }
  }, [showToast]);

  const handleUpdateProduct = useCallback((id, productData) => {
    try {
      const updated = updateProduct(id, productData);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      showToast(`"${updated.name}" updated successfully.`);
      return updated;
    } catch (error) {
      showToast(error.message || 'Failed to update product.', 'error');
      throw error;
    }
  }, [showToast]);

  const handleDeleteProduct = useCallback((id) => {
    try {
      const productToDelete = products.find((p) => p.id === id);
      const name = productToDelete ? productToDelete.name : 'Product';
      const updated = deleteProduct(id);
      setProducts(updated);
      showToast(`"${name}" deleted successfully.`);
      return true;
    } catch (error) {
      showToast(error.message || 'Failed to delete product.', 'error');
      throw error;
    }
  }, [products, showToast]);

  const handleResetDemo = useCallback(() => {
    const reset = resetDemoProducts();
    setProducts(reset);
    showToast('Catalog restored to default Royal Collection demo.');
  }, [showToast]);

  // Cart operations
  const addToCart = useCallback((product, selectedSize = null, selectedColor = null, qty = 1) => {
    setCart((prevCart) => {
      const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
      const color = selectedColor || (product.colors && product.colors[0]) || 'Standard';
      const cartItemId = `${product.id}-${size}-${color}`;

      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      let updatedCart;

      if (existingIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + qty
        };
      } else {
        const unitPrice = product.salePrice ? product.salePrice : product.price;
        const newItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          price: unitPrice,
          originalPrice: product.price,
          image: product.image,
          size,
          color,
          quantity: qty
        };
        updatedCart = [newItem, ...prevCart];
      }

      saveCart(updatedCart);
      return updatedCart;
    });

    showToast(`Added ${product.name} to shopping bag.`);
  }, [showToast]);

  const updateCartQuantity = useCallback((cartItemId, delta) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      saveCart(updated);
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.cartItemId !== cartItemId);
      saveCart(updated);
      return updated;
    });
    showToast('Item removed from shopping bag.');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    saveCart([]);
  }, []);

  // Wishlist operations
  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      let updated;
      const exists = prev.includes(productId);
      if (exists) {
        updated = prev.filter((id) => id !== productId);
        showToast('Removed from wishlist.');
      } else {
        updated = [...prev, productId];
        showToast('Added to wishlist.');
      }
      saveWishlist(updated);
      return updated;
    });
  }, [showToast]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = products.length;
    const featured = products.filter((p) => p.featured).length;
    const deals = products.filter((p) => p.deal || (p.salePrice && p.salePrice < p.price)).length;
    const outOfStock = products.filter((p) => p.stock <= 0).length;

    const categoryCounts = products.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      featured,
      deals,
      outOfStock,
      categoryCounts
    };
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.badge && p.badge.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Deals filter
    if (onlyDeals) {
      result = result.filter((p) => p.deal === true || (p.salePrice && p.salePrice < p.price));
    }

    // Badge filter
    if (filterBadge && filterBadge !== 'ALL') {
      result = result.filter((p) => p.badge === filterBadge);
    }

    // Sorting
    result.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      return 0;
    });

    return result;
  }, [products, searchTerm, selectedCategory, onlyDeals, filterBadge, sortBy]);

  return {
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
    // CRUD
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleResetDemo,
    // Cart & Modal
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
    // Toast
    toast,
    showToast,
    dismissToast
  };
}
