/**
 * Form validation helper for Royal Collection product creation and editing
 */

export function validateProductForm(formData) {
  const errors = {};

  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = 'Product name is required.';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Product name must be at least 3 characters.';
  }

  // Category validation
  if (!formData.category || !formData.category.trim()) {
    errors.category = 'Category selection is required.';
  }

  // Price validation
  const numPrice = Number(formData.price);
  if (formData.price === '' || formData.price === null || formData.price === undefined) {
    errors.price = 'Price is required.';
  } else if (isNaN(numPrice) || numPrice <= 0) {
    errors.price = 'Price must be a valid positive number greater than 0.';
  }

  // Sale price validation
  if (formData.salePrice !== '' && formData.salePrice !== null && formData.salePrice !== undefined) {
    const numSalePrice = Number(formData.salePrice);
    if (isNaN(numSalePrice) || numSalePrice <= 0) {
      errors.salePrice = 'Sale price must be a valid positive number.';
    } else if (numPrice && numSalePrice >= numPrice) {
      errors.salePrice = 'Sale price must be less than original price (₹' + numPrice + ').';
    }
  }

  // Stock validation
  if (formData.stock !== '' && formData.stock !== null && formData.stock !== undefined) {
    const numStock = Number(formData.stock);
    if (isNaN(numStock) || numStock < 0 || !Number.isInteger(numStock)) {
      errors.stock = 'Stock must be a non-negative whole integer.';
    }
  }

  // Main Image validation
  if (!formData.image || !formData.image.trim()) {
    errors.image = 'Main product image is required (upload or URL).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
