/**
 * Utility to validate, compress, and convert user-uploaded images to lightweight Data URLs
 * Prevents LocalStorage quota overflow while preserving crisp editorial clarity.
 */

export function validateImageFile(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  const MAX_RAW_SIZE = 5 * 1024 * 1024; // 5MB raw limit

  if (!file) {
    return { valid: false, error: 'No image file provided.' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please upload a JPEG, PNG, or WEBP image.' 
    };
  }

  if (file.size > MAX_RAW_SIZE) {
    return { 
      valid: false, 
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 5MB.` 
    };
  }

  return { valid: true, error: null };
}

export async function compressAndConvertToDataUrl(file, maxWidth = 1000, maxHeight = 1200, quality = 0.82) {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to lightweight webp or jpeg
        const dataUrl = canvas.toDataURL('image/jpeg', quality);

        // Calculate compressed approximate size
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const compressedSizeBytes = Math.round((base64Length * 3) / 4);

        resolve({
          dataUrl,
          fileName: file.name,
          originalSize: file.size,
          compressedSize: compressedSizeBytes,
          width,
          height
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to parse uploaded image.'));
      };

      img.src = readerEvent.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Error reading image file from disk.'));
    };

    reader.readAsDataURL(file);
  });
}
