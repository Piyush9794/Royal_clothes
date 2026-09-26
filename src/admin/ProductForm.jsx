import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  X, 
  Check, 
  Image as ImageIcon, 
  AlertCircle, 
  Sparkles, 
  Tag, 
  Layers, 
  Plus, 
  RefreshCw,
  Info
} from 'lucide-react';
import { CATEGORY_NAMES, BADGE_OPTIONS } from '../data/categories';
import { validateProductForm } from '../utils/validation';
import { compressAndConvertToDataUrl } from '../utils/imageCompression';
import { fetchProductImages } from '../services/imageService';

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '7 UK', '8 UK', '9 UK', '10 UK', 'One Size'];
const POPULAR_COLORS = ['Indigo Blue', 'Jet Black', 'Clean White', 'Olive Drab', 'Midnight Navy', 'Dusty Rose', 'Khaki Sand', 'Charcoal Grey', 'Chestnut Tan'];

export default function ProductForm({
  initialData = null,
  onSubmit,
  onCancel,
  isEditing = false
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Jeans',
    price: '',
    salePrice: '',
    description: '',
    image: '',
    additionalImages: [],
    badge: 'NEW',
    stock: 12,
    sizes: ['M', 'L', 'XL'],
    colors: ['Indigo Blue'],
    featured: true,
    deal: false
  });

  const [errors, setErrors] = useState({});
  const [imageMeta, setImageMeta] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [sampleImages, setSampleImages] = useState([]);
  const [loadingSamples, setLoadingSamples] = useState(false);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [customColorInput, setCustomColorInput] = useState('');

  const fileInputRef = useRef(null);

  // Populate initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Jeans',
        price: initialData.price !== undefined ? initialData.price : '',
        salePrice: initialData.salePrice !== undefined && initialData.salePrice !== null ? initialData.salePrice : '',
        description: initialData.description || '',
        image: initialData.image || '',
        additionalImages: initialData.additionalImages || [],
        badge: initialData.badge || 'None',
        stock: initialData.stock !== undefined ? initialData.stock : 10,
        sizes: initialData.sizes || ['M', 'L', 'XL'],
        colors: initialData.colors || ['Indigo Blue'],
        featured: Boolean(initialData.featured),
        deal: Boolean(initialData.deal)
      });

      if (initialData.image) {
        setImageMeta({
          fileName: 'Current Product Image',
          size: 'Saved in LocalStorage'
        });
      }
    }
  }, [initialData]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Handle File Upload & Compression
  const handleFileSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const result = await compressAndConvertToDataUrl(file);
      setFormData((prev) => ({
        ...prev,
        image: result.dataUrl
      }));
      setImageMeta({
        fileName: result.fileName,
        originalSize: (result.originalSize / 1024).toFixed(1) + ' KB',
        compressedSize: (result.compressedSize / 1024).toFixed(1) + ' KB'
      });

      if (errors.image) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    } catch (err) {
      alert(err.message || 'Error processing image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImageMeta(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Fetch online sample images if owner desires quick Unsplash photos
  const handleFetchSampleImages = async () => {
    setLoadingSamples(true);
    try {
      const results = await fetchProductImages(formData.category || 'fashion');
      setSampleImages(results);
    } catch (err) {
      console.warn('Could not fetch samples:', err);
    } finally {
      setLoadingSamples(false);
    }
  };

  // Toggle Sizes
  const handleToggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      const updated = exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size];
      return { ...prev, sizes: updated };
    });
  };

  const handleAddCustomSize = (e) => {
    e.preventDefault();
    if (!customSizeInput.trim()) return;
    if (!formData.sizes.includes(customSizeInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, customSizeInput.trim()]
      }));
    }
    setCustomSizeInput('');
  };

  // Toggle Colors
  const handleToggleColor = (color) => {
    setFormData((prev) => {
      const exists = prev.colors.includes(color);
      const updated = exists ? prev.colors.filter((c) => c !== color) : [...prev.colors, color];
      return { ...prev, colors: updated };
    });
  };

  const handleAddCustomColor = (e) => {
    e.preventDefault();
    if (!customColorInput.trim()) return;
    if (!formData.colors.includes(customColorInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, customColorInput.trim()]
      }));
    }
    setCustomColorInput('');
  };

  // Form Submit Handler
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validation = validateProductForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to top of form
      return;
    }

    onSubmit(formData);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      category: 'Jeans',
      price: '',
      salePrice: '',
      description: '',
      image: '',
      additionalImages: [],
      badge: 'None',
      stock: 10,
      sizes: ['M', 'L', 'XL'],
      colors: ['Indigo Blue'],
      featured: false,
      deal: false
    });
    setErrors({});
    setImageMeta(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7 space-y-6"
    >
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
        <div>
          <span className="text-[10px] font-mono-tag text-[#ea4c89] font-bold uppercase tracking-wider">
            {isEditing ? 'UPDATE PRODUCT' : 'NEW PRODUCT CREATION'}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#0d0c22] font-serif-title">
            {isEditing ? `Edit "${formData.name || 'Product'}"` : 'Upload Product to Storefront'}
          </h3>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="self-start sm:self-auto text-xs font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmitForm} className="space-y-6">
        
        {/* Main 2-Column Responsive Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Core Details */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                Product Name <span className="text-[#ea4c89]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Classic Straight Denim"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#0d0c22] placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.name 
                    ? 'border-red-400 focus:ring-red-100 bg-red-50/20' 
                    : 'border-gray-200 focus:border-[#ea4c89] focus:ring-[#ea4c89]/20'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Category & Badge (2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                  Category <span className="text-[#ea4c89]">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
                >
                  {CATEGORY_NAMES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                  Store Badge
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
                >
                  {BADGE_OPTIONS.map((badge) => (
                    <option key={badge} value={badge}>
                      {badge}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price, Sale Price, Stock (3 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                  Original Price (₹) <span className="text-[#ea4c89]">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1299"
                  min="1"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:ring-2 transition-all ${
                    errors.price 
                      ? 'border-red-400 focus:ring-red-100 bg-red-50/20' 
                      : 'border-gray-200 focus:border-[#ea4c89] focus:ring-[#ea4c89]/20'
                  }`}
                />
                {errors.price && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                  Sale Price (₹) <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  placeholder="999"
                  min="0"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:ring-2 transition-all ${
                    errors.salePrice 
                      ? 'border-red-400 focus:ring-red-100 bg-red-50/20' 
                      : 'border-gray-200 focus:border-[#ea4c89] focus:ring-[#ea4c89]/20'
                  }`}
                />
                {errors.salePrice && (
                  <p className="text-[10px] text-red-500 mt-1">{errors.salePrice}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                  Stock Units
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="10"
                  min="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#0d0c22] focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
                >
                </input>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-[#0d0c22] mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Product details, fabric, fit, styling tips..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#0d0c22] placeholder-gray-400 focus:outline-none focus:border-[#ea4c89] focus:ring-2 focus:ring-[#ea4c89]/20"
              />
            </div>

            {/* Toggles: Featured & Deal */}
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#ea4c89] focus:ring-[#ea4c89] accent-[#ea4c89]"
                />
                <span className="text-xs font-semibold text-[#0d0c22]">
                  Feature in Homepage Showcase
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="deal"
                  checked={formData.deal}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#ea4c89] focus:ring-[#ea4c89] accent-[#ea4c89]"
                />
                <span className="text-xs font-semibold text-[#ea4c89]">
                  Show in "Deals In Store"
                </span>
              </label>
            </div>

          </div>

          {/* Right Column: Image Upload & Preview, Sizes, Colors */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Image Upload Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#0d0c22]">
                  Main Product Image <span className="text-[#ea4c89]">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleFetchSampleImages}
                  className="text-[11px] font-semibold text-[#3e34d3] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Use Curated Sample</span>
                </button>
              </div>

              {/* Upload Dropzone / Preview */}
              {formData.image ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-[4/3] flex flex-col items-center justify-center group">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-full bg-white text-[#0d0c22] text-xs font-semibold shadow-md hover:bg-[#ea4c89] hover:text-white transition-colors"
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold shadow-md hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Metadata Tag */}
                  {imageMeta && (
                    <div className="absolute bottom-2 left-2 right-2 p-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-white text-[10px] font-mono-tag truncate flex items-center justify-between">
                      <span className="truncate">{imageMeta.fileName}</span>
                      {imageMeta.compressedSize && <span>{imageMeta.compressedSize}</span>}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-gray-50 flex flex-col items-center justify-center aspect-[4/3] ${
                    errors.image ? 'border-red-400 bg-red-50/10' : 'border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#ea4c89]/10 text-[#ea4c89] flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-[#0d0c22]">
                    {isCompressing ? 'Compressing & Optimizing Image...' : 'Click to Upload Image'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Supports JPG, PNG, WEBP (Max 5MB)
                  </p>
                  <p className="text-[9.5px] text-gray-400 font-mono-tag mt-1">
                    Auto-compressed for fast LocalStorage saving
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
              />

              {errors.image && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.image}
                </p>
              )}

              {/* Sample Images Quick Picker */}
              {sampleImages.length > 0 && (
                <div className="mt-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-[10px] font-semibold text-gray-600 mb-1.5">
                    Click to choose photo from Unsplash:
                  </p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {sampleImages.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, image: s.url }));
                          setImageMeta({ fileName: `Unsplash ${s.alt}`, compressedSize: 'CDN' });
                          setSampleImages([]);
                        }}
                        className="aspect-square rounded-md overflow-hidden border hover:border-[#ea4c89] transition-all"
                      >
                        <img src={s.thumb || s.url} alt={s.alt} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sizes Multi-Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#0d0c22] mb-1.5">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {AVAILABLE_SIZES.map((size) => {
                  const isSelected = formData.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(size)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#0d0c22] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Custom Size Adder */}
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customSizeInput}
                  onChange={(e) => setCustomSizeInput(e.target.value)}
                  placeholder="Custom size..."
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-[#0d0c22]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSize}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Colors Multi-Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#0d0c22] mb-1.5">
                Available Colors / Styles
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {POPULAR_COLORS.map((color) => {
                  const isSelected = formData.colors.includes(color);
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleToggleColor(color)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        isSelected
                          ? 'bg-[#ea4c89] text-white font-semibold shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Adder */}
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customColorInput}
                  onChange={(e) => setCustomColorInput(e.target.value)}
                  placeholder="Custom color..."
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-[#0d0c22]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomColor}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold"
                >
                  Add
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Submission Actions */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          {!isEditing && (
            <button
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold order-2 sm:order-1"
            >
              Reset Form
            </button>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold order-2 sm:order-1"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto rc-btn-primary text-xs sm:text-sm py-3 px-8 order-1 sm:order-2 justify-center shadow-lg"
          >
            <Check className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Publish Product to Storefront'}</span>
          </button>
        </div>

      </form>
    </motion.div>
  );
}
