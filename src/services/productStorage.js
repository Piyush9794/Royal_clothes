import { INITIAL_DEMO_PRODUCTS } from '../data/demoProducts';

const STORAGE_KEY = 'royal_collection_products';
const CART_STORAGE_KEY = 'royal_collection_cart';
const WISHLIST_STORAGE_KEY = 'royal_collection_wishlist';

/**
 * Generates a collision-resistant unique ID for Royal Collection products
 */
export function generateProductId() {
  return `rc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Safely retrieve products from LocalStorage with fallback to initial demo dataset
 */
export function getProducts() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return [...INITIAL_DEMO_PRODUCTS];
    }

    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // First time initialization: seed demo products
      saveProducts(INITIAL_DEMO_PRODUCTS);
      return [...INITIAL_DEMO_PRODUCTS];
    }

    const parsed = JSON.parse(rawData);
    if (!Array.isArray(parsed)) {
      console.warn('LocalStorage data is not an array. Resetting with initial collection.');
      saveProducts(INITIAL_DEMO_PRODUCTS);
      return [...INITIAL_DEMO_PRODUCTS];
    }

    return parsed;
  } catch (error) {
    console.error('Error reading products from LocalStorage:', error);
    return [...INITIAL_DEMO_PRODUCTS];
  }
}

/**
 * Persist products array to LocalStorage
 */
export function saveProducts(products) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return true;
    }
  } catch (error) {
    console.error('Error saving products to LocalStorage:', error);
    if (error.name === 'QuotaExceededError') {
      alert('Browser storage limit reached. Please remove unnecessary images or older products.');
    }
    return false;
  }
  return false;
}

/**
 * Add a new product to LocalStorage
 */
export function addProduct(newProductData) {
  try {
    const products = getProducts();
    const product = {
      id: generateProductId(),
      name: newProductData.name.trim(),
      category: newProductData.category,
      price: Number(newProductData.price),
      salePrice: newProductData.salePrice ? Number(newProductData.salePrice) : null,
      description: newProductData.description ? newProductData.description.trim() : '',
      image: newProductData.image,
      additionalImages: Array.isArray(newProductData.additionalImages) ? newProductData.additionalImages : [],
      badge: newProductData.badge || 'None',
      stock: newProductData.stock !== '' && newProductData.stock !== undefined ? Number(newProductData.stock) : 10,
      sizes: Array.isArray(newProductData.sizes) ? newProductData.sizes : ['M', 'L', 'XL'],
      colors: Array.isArray(newProductData.colors) ? newProductData.colors : ['Standard'],
      featured: Boolean(newProductData.featured),
      deal: Boolean(newProductData.deal),
      createdAt: new Date().toISOString()
    };

    const updated = [product, ...products];
    saveProducts(updated);
    return product;
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
}

/**
 * Update an existing product by ID
 */
export function updateProduct(id, updatedFields) {
  try {
    const products = getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error(`Product with ID "${id}" not found.`);
    }

    const updatedProduct = {
      ...products[index],
      ...updatedFields,
      price: Number(updatedFields.price !== undefined ? updatedFields.price : products[index].price),
      salePrice: updatedFields.salePrice !== undefined 
        ? (updatedFields.salePrice ? Number(updatedFields.salePrice) : null) 
        : products[index].salePrice,
      stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : products[index].stock,
      updatedAt: new Date().toISOString()
    };

    products[index] = updatedProduct;
    saveProducts(products);
    return updatedProduct;
  } catch (error) {
    console.error(`Failed to update product ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a product by ID
 */
export function deleteProduct(id) {
  try {
    const products = getProducts();
    const filtered = products.filter((p) => p.id !== id);
    saveProducts(filtered);
    return filtered;
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    throw error;
  }
}

/**
 * Reset LocalStorage back to initial curated demo products
 */
export function resetDemoProducts() {
  try {
    saveProducts(INITIAL_DEMO_PRODUCTS);
    return [...INITIAL_DEMO_PRODUCTS];
  } catch (error) {
    console.error('Failed to reset demo products:', error);
    return [...INITIAL_DEMO_PRODUCTS];
  }
}

/**
 * Cart Storage Helpers
 */
export function getCart() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  } catch (e) {
    console.warn('Could not persist cart:', e);
  }
}

/**
 * Wishlist Storage Helpers
 */
export function getWishlist() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWishlist(wishlist) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  } catch (e) {
    console.warn('Could not persist wishlist:', e);
  }
}
