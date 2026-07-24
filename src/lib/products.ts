// Central product catalogue. Framework-agnostic (no 'use client') so it can be
// imported from both Server Components (category / product routes) and Client
// Components (cart, cards).

export type Product = {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  category: CategoryKey
  image: string
  tag: string
  colors: string[]
  rating: number
  reviews: number
  description: string
}

export type CategoryKey =
  | 'new'
  | 'men'
  | 'women'
  | 'kids'
  | 'basketball'
  | 'running'
  | 'lifestyle'
  | 'classic'

export const CATEGORIES: { key: CategoryKey; name: string; blurb: string }[] = [
  { key: 'new', name: 'New', blurb: 'Just dropped' },
  { key: 'men', name: 'Men', blurb: 'Built for the bold' },
  { key: 'women', name: 'Women', blurb: 'Defined by motion' },
  { key: 'kids', name: 'Kids', blurb: 'Next generation' },
  { key: 'basketball', name: 'Basketball', blurb: 'Own the court' },
  { key: 'running', name: 'Running', blurb: 'Chase the horizon' },
  { key: 'lifestyle', name: 'Lifestyle', blurb: 'Everyday icon' },
  { key: 'classic', name: 'Classic', blurb: 'Timeless legends' },
]

const IMG = {
  jordan: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80',
  airmax90: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
  af1: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
  dunk: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
  airmax270: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
  blazer: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
  react: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
  pegasus: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  flex: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&q=80',
  star: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
  airmax1: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80',
}

const RED = '#CF0A2C'
const WHITE = '#FFFFFF'
const BLACK = '#111111'

export const PRODUCTS: Product[] = [
  // MEN
  { id: 1, slug: 'air-jordan-1-retro-high-og', name: 'Air Jordan 1 Retro High OG', price: 350, originalPrice: 400, category: 'men', image: IMG.jordan, tag: 'BESTSELLER', colors: [RED, WHITE, BLACK], rating: 4.9, reviews: 2148, description: 'The one that started a dynasty. Premium leather, the original wings logo, and Air cushioning that has defined culture for four decades.' },
  { id: 2, slug: 'nike-air-max-90', name: 'Nike Air Max 90', price: 280, category: 'men', image: IMG.airmax90, tag: 'CLASSIC', colors: [WHITE, RED, BLACK], rating: 4.7, reviews: 1320, description: 'Visible Air, unmistakable lines. The Air Max 90 keeps its heritage waffle sole and iconic silhouette intact.' },
  { id: 3, slug: 'nike-air-force-1-07', name: "Nike Air Force 1 '07", price: 220, category: 'men', image: IMG.af1, tag: 'ESSENTIAL', colors: [WHITE, BLACK], rating: 4.8, reviews: 3021, description: 'The blueprint. Crisp leather, court-ready cushioning, and a legacy that goes far beyond the hardwood.' },
  { id: 4, slug: 'nike-dunk-low', name: 'Nike Dunk Low', price: 195, category: 'men', image: IMG.dunk, tag: 'TRENDING', colors: [WHITE, BLACK, RED], rating: 4.6, reviews: 980, description: 'Born on the court, adopted by the streets. Low-cut, colour-blocked, and endlessly collectible.' },

  // WOMEN
  { id: 5, slug: 'nike-air-max-270', name: 'Nike Air Max 270', price: 295, category: 'women', image: IMG.airmax270, tag: 'NEW', colors: [BLACK, RED], rating: 4.7, reviews: 640, description: 'The tallest Air unit yet delivers all-day comfort with a bold, sculpted heel.' },
  { id: 6, slug: 'nike-blazer-mid-77', name: "Nike Blazer Mid '77", price: 245, category: 'women', image: IMG.blazer, tag: 'VINTAGE', colors: [WHITE, BLACK], rating: 4.5, reviews: 512, description: "Vintage hardwood style with a broken-in look straight out of the box." },
  { id: 7, slug: 'nike-react-infinity', name: 'Nike React Infinity', price: 310, category: 'women', image: IMG.react, tag: 'RUNNING', colors: [WHITE, BLACK, RED], rating: 4.8, reviews: 421, description: 'Designed to help reduce injury and keep you running. Soft, stable React foam underfoot.' },
  { id: 8, slug: 'nike-air-zoom-pegasus', name: 'Nike Air Zoom Pegasus', price: 265, category: 'women', image: IMG.pegasus, tag: 'COMFORT', colors: [WHITE, BLACK], rating: 4.7, reviews: 733, description: 'The workhorse of the running line, tuned with responsive Zoom Air for the daily mile.' },

  // KIDS
  { id: 9, slug: 'nike-flex-runner', name: 'Nike Flex Runner', price: 125, category: 'kids', image: IMG.flex, tag: 'KIDS', colors: [RED, WHITE], rating: 4.6, reviews: 288, description: 'Slip-on ease for little feet, with a flexible sole built for the playground.' },
  { id: 10, slug: 'nike-star-runner', name: 'Nike Star Runner', price: 110, category: 'kids', image: IMG.star, tag: 'KIDS', colors: [BLACK, RED], rating: 4.5, reviews: 201, description: 'Lightweight, durable, and ready for whatever the day throws at it.' },

  // BASKETBALL
  { id: 11, slug: 'air-jordan-37', name: 'Air Jordan 37', price: 425, category: 'basketball', image: IMG.jordan, tag: 'PRO', colors: [RED, BLACK], rating: 4.9, reviews: 356, description: 'Formula 23 cushioning and Leno-weave upper for explosive, lockdown performance.' },
  { id: 12, slug: 'nike-gt-cut-2', name: 'Nike G.T. Cut 2', price: 385, category: 'basketball', image: IMG.airmax90, tag: 'ELITE', colors: [WHITE, RED], rating: 4.8, reviews: 274, description: 'Built for the two-way player. Grip, containment, and a low-to-the-ground feel.' },

  // RUNNING
  { id: 13, slug: 'nike-air-zoom-alphafly', name: 'Nike Air Zoom Alphafly', price: 485, category: 'running', image: IMG.airmax270, tag: 'RACING', colors: [RED, WHITE], rating: 4.9, reviews: 190, description: 'Record-breaking propulsion with ZoomX foam and a full-length carbon plate.' },
  { id: 14, slug: 'nike-zoomx-vaporfly', name: 'Nike ZoomX Vaporfly', price: 450, category: 'running', image: IMG.pegasus, tag: 'MARATHON', colors: [BLACK, RED], rating: 4.9, reviews: 312, description: 'The marathon weapon. Feather-light, aggressively responsive, race-day proven.' },

  // LIFESTYLE
  { id: 15, slug: 'nike-sb-dunk-high', name: 'Nike SB Dunk High', price: 420, category: 'lifestyle', image: IMG.star, tag: 'STREET', colors: [BLACK, RED], rating: 4.7, reviews: 448, description: 'Skate DNA with a premium finish. Padded, protective, and street-certified.' },
  { id: 16, slug: 'nike-air-force-1-lv8', name: 'Nike Air Force 1 LV8', price: 240, category: 'lifestyle', image: IMG.af1, tag: 'RETRO', colors: [WHITE, BLACK], rating: 4.6, reviews: 389, description: 'The AF1 you know, elevated with premium materials and subtle detailing.' },

  // CLASSIC
  { id: 17, slug: 'nike-air-max-1', name: 'Nike Air Max 1', price: 310, category: 'classic', image: IMG.airmax1, tag: 'LEGEND', colors: [RED, WHITE], rating: 4.8, reviews: 875, description: 'The original visible Air. A 1987 revolution that still looks decades ahead.' },
  { id: 18, slug: 'nike-cortez', name: 'Nike Cortez', price: 195, category: 'classic', image: IMG.dunk, tag: 'ORIGINAL', colors: [WHITE, RED], rating: 4.5, reviews: 522, description: 'The 1972 icon. Clean lines, a herringbone sole, and pure running heritage.' },

  // NEW
  { id: 19, slug: 'nike-pegasus-41', name: 'Nike Pegasus 41', price: 275, category: 'new', image: IMG.react, tag: 'NEW', colors: [WHITE, BLACK, RED], rating: 4.8, reviews: 143, description: 'The latest Pegasus, now with dual Air Zoom units for a springy, energetic ride.' },
  { id: 20, slug: 'nike-invincible-3', name: 'Nike Invincible 3', price: 335, category: 'new', image: IMG.airmax270, tag: 'NEW', colors: [RED, BLACK], rating: 4.9, reviews: 167, description: 'Maximum ZoomX cushioning for the softest, most protected miles of your life.' },
]

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, limit)
}

// Legacy shape kept so any older imports keep working.
export const nikeProducts = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.key] = getProductsByCategory(c.key)
    return acc
  },
  {} as Record<CategoryKey, Product[]>,
)
