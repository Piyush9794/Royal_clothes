// Image service providing live Unsplash API queries with resilient curated fallback datasets

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

const FALLBACK_CATEGORY_IMAGES = {
  Jeans: [
    'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80'
  ],
  Shirts: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80'
  ],
  'T-Shirts': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
  ],
  Jackets: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544022613-e87ce7526edb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80'
  ],
  Shoes: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
  ],
  Watches: [
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547996160-71dfabb1a7cf?auto=format&fit=crop&w=800&q=80'
  ],
  Belts: [
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80'
  ],
  Other: [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
  ]
};

export async function fetchFashionImages(query = "men's fashion", count = 8) {
  if (!UNSPLASH_ACCESS_KEY) {
    return getFallbackImagesForQuery(query, count);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=portrait`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.warn('Unsplash API returned non-OK status, switching to fallback imagery.');
      return getFallbackImagesForQuery(query, count);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results.map((item) => ({
        id: item.id,
        url: item.urls.regular || item.urls.small,
        thumb: item.urls.thumb,
        alt: item.alt_description || query,
        photographer: item.user?.name || 'Unsplash'
      }));
    }
  } catch (error) {
    console.warn('Error fetching from Unsplash API:', error);
  }

  return getFallbackImagesForQuery(query, count);
}

export async function fetchCategoryImages(category) {
  const query = `men ${category.toLowerCase()}`;
  return fetchFashionImages(query, 6);
}

export async function fetchProductImages(query) {
  return fetchFashionImages(query, 4);
}

function getFallbackImagesForQuery(query, count = 8) {
  const normalized = Object.keys(FALLBACK_CATEGORY_IMAGES).find(cat => 
    query.toLowerCase().includes(cat.toLowerCase())
  );

  let pool = [];
  if (normalized && FALLBACK_CATEGORY_IMAGES[normalized]) {
    pool = FALLBACK_CATEGORY_IMAGES[normalized];
  } else {
    pool = Object.values(FALLBACK_CATEGORY_IMAGES).flat();
  }

  return pool.slice(0, count).map((url, index) => ({
    id: `fallback-${index}-${Date.now()}`,
    url,
    thumb: url,
    alt: query,
    photographer: 'Royal Collection Editorial'
  }));
}

export const FALLBACK_STORE_IMAGE = '/images/boutique_interior.jpg';
export const FALLBACK_HERO_IMAGE = '/images/hero_fashion.jpg';
export const FALLBACK_BAG_IMAGE = '/images/royal_bag.jpg';
