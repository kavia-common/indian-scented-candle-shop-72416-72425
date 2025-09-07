/**
 * Mock product catalog for Indian scented candles.
 * In a real app, replace with API calls.
 */
export const PRODUCTS = [
  {
    id: 'cn-001',
    name: 'Sandalwood Serenity',
    description: 'Warm sandalwood with hints of cardamom and saffron.',
    price: 19.99,
    image: null,
    scents: ['Sandalwood', 'Cardamom'],
    colors: ['Ivory'],
    sizes: ['Small', 'Medium', 'Large'],
    rating: 4.7,
    stock: 28,
    tags: ['classic', 'wood', 'calming']
  },
  {
    id: 'cn-002',
    name: 'Monsoon Jasmine',
    description: 'Fresh jasmine blossoms carried by the summer monsoon.',
    price: 24.5,
    image: null,
    scents: ['Jasmine', 'Rain'],
    colors: ['Pearl'],
    sizes: ['Medium', 'Large'],
    rating: 4.6,
    stock: 16,
    tags: ['floral', 'fresh']
  },
  {
    id: 'cn-003',
    name: 'Masala Chai Glow',
    description: 'Cinnamon, clove, ginger, and sweet black tea.',
    price: 17.0,
    image: null,
    scents: ['Cinnamon', 'Clove', 'Ginger'],
    colors: ['Amber'],
    sizes: ['Small', 'Medium'],
    rating: 4.8,
    stock: 35,
    tags: ['spice', 'cozy', 'kitchen']
  },
  {
    id: 'cn-004',
    name: 'Temple Rose',
    description: 'Sacred rose petals with a hint of sandalwood.',
    price: 22.0,
    image: null,
    scents: ['Rose', 'Sandalwood'],
    colors: ['Blush'],
    sizes: ['Small', 'Medium', 'Large'],
    rating: 4.5,
    stock: 40,
    tags: ['floral', 'rituals']
  },
  {
    id: 'cn-005',
    name: 'Mango Lassi Delight',
    description: 'Juicy mango and creamy vanilla with a cool finish.',
    price: 18.5,
    image: null,
    scents: ['Mango', 'Vanilla'],
    colors: ['Sunset'],
    sizes: ['Small', 'Medium'],
    rating: 4.4,
    stock: 22,
    tags: ['fruity', 'dessert']
  },
  {
    id: 'cn-006',
    name: 'Himalayan Pine',
    description: 'Crisp pine needles and mountain air.',
    price: 20.0,
    image: null,
    scents: ['Pine', 'Cedar'],
    colors: ['Sage'],
    sizes: ['Medium', 'Large'],
    rating: 4.3,
    stock: 12,
    tags: ['fresh', 'outdoor']
  }
];

export const SCENTS = [
  'Sandalwood','Jasmine','Cardamom','Cinnamon','Clove','Ginger','Rose','Mango','Vanilla','Pine','Cedar'
];

export const SIZES = ['Small','Medium','Large'];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
