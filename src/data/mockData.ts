import { Outfit } from '../types';

// Mock outfit data for the kiosk demo
export const mockOutfits: Outfit[] = [
  // Men's Casual
  {
    id: 'outfit-1',
    title: 'Classic Denim Jacket',
    category: 'casual',
    gender: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=300&fit=crop&crop=center',
    description: 'Timeless denim jacket perfect for casual outings',
    price: 89.99,
    brand: 'Urban Style',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Dark Blue', 'Black'],
    material: 'Cotton Denim',
    season: 'all-season'
  },
  {
    id: 'outfit-2',
    title: 'Casual White T-Shirt',
    category: 'casual',
    gender: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=300&fit=crop&crop=center',
    description: 'Comfortable white cotton t-shirt',
    price: 29.99,
    brand: 'Basic Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray', 'Navy'],
    material: '100% Cotton',
    season: 'summer'
  },
  
  // Men's Formal
  {
    id: 'outfit-3',
    title: 'Navy Blue Suit',
    category: 'formal',
    gender: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=300&fit=crop&crop=center',
    description: 'Elegant navy blue business suit',
    price: 299.99,
    brand: 'Executive Style',
    sizes: ['38', '40', '42'],
    colors: ['Navy Blue', 'Charcoal', 'Black'],
    material: 'Wool Blend',
    season: 'all-season'
  },
  {
    id: 'outfit-4',
    title: 'Black Tuxedo',
    category: 'formal',
    gender: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=center',
    description: 'Classic black tuxedo for special events',
    price: 449.99,
    brand: 'Formal Elite',
    sizes: ['36', '38', '40', '42'],
    colors: ['Black'],
    material: 'Premium Wool',
    season: 'all-season'
  },

  // Women's Casual
  {
    id: 'outfit-5',
    title: 'Floral Summer Dress',
    category: 'casual',
    gender: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=300&fit=crop&crop=center',
    description: 'Light and breezy floral dress',
    price: 69.99,
    brand: 'Summer Vibes',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Yellow', 'Blue', 'White'],
    material: 'Cotton Voile',
    season: 'summer'
  },
  {
    id: 'outfit-6',
    title: 'Denim & White Top',
    category: 'casual',
    gender: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=300&fit=crop&crop=center',
    description: 'Classic denim and white top combination',
    price: 79.99,
    brand: 'Casual Chic',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Light Blue', 'Dark Blue', 'Black'],
    material: 'Cotton Denim',
    season: 'spring'
  },

  // Women's Formal
  {
    id: 'outfit-7',
    title: 'Elegant Black Dress',
    category: 'formal',
    gender: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1566479179817-c979e8a73a16?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566479179817-c979e8a73a16?w=200&h=300&fit=crop&crop=center',
    description: 'Sophisticated black evening dress',
    price: 189.99,
    brand: 'Evening Elegance',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    material: 'Polyester Blend',
    season: 'all-season'
  },
  {
    id: 'outfit-8',
    title: 'Business Blazer Set',
    category: 'formal',
    gender: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=300&fit=crop&crop=center',
    description: 'Professional blazer and skirt set',
    price: 149.99,
    brand: 'Corporate Style',
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Charcoal', 'Navy', 'Black'],
    material: 'Wool Blend',
    season: 'all-season'
  },

  // Ethnic Wear
  {
    id: 'outfit-9',
    title: 'Traditional Kurta',
    category: 'ethnic',
    gender: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=200&h=300&fit=crop&crop=center',
    description: 'Traditional Indian kurta',
    price: 99.99,
    brand: 'Heritage Wear',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Royal Blue', 'Maroon'],
    material: 'Cotton Khadi',
    season: 'all-season'
  },
  {
    id: 'outfit-10',
    title: 'Silk Saree',
    category: 'ethnic',
    gender: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=200&h=300&fit=crop&crop=center',
    description: 'Beautiful silk saree with gold work',
    price: 199.99,
    brand: 'Traditional Elegance',
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Gold', 'Green', 'Purple'],
    material: 'Pure Silk',
    season: 'all-season'
  },

  // Party Wear
  {
    id: 'outfit-11',
    title: 'Sequin Party Dress',
    category: 'party',
    gender: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=300&fit=crop&crop=center',
    description: 'Sparkling sequin dress for parties',
    price: 129.99,
    brand: 'Party Perfect',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Gold', 'Silver', 'Rose Gold', 'Black'],
    material: 'Sequin Fabric',
    season: 'all-season'
  },
  {
    id: 'outfit-12',
    title: 'Sharp Party Shirt',
    category: 'party',
    gender: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop&crop=center',
    thumbnailUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=300&fit=crop&crop=center',
    description: 'Stylish party shirt for night outs',
    price: 79.99,
    brand: 'Night Life',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Burgundy'],
    material: 'Cotton Blend',
    season: 'all-season'
  }
];

// Mock try-on result images (these would normally be generated by AI)
export const mockTryOnImages: Record<string, string> = {
  'outfit-1': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=600&fit=crop&crop=center',
  'outfit-2': 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=600&fit=crop&crop=center',
  'outfit-3': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop&crop=center',
  'outfit-4': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center',
  'outfit-5': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=center',
  'outfit-6': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=center',
  'outfit-7': 'https://images.unsplash.com/photo-1566479179817-c979e8a73a16?w=400&h=600&fit=crop&crop=center',
  'outfit-8': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=center',
  'outfit-9': 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=600&fit=crop&crop=center',
  'outfit-10': 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&h=600&fit=crop&crop=center',
  'outfit-11': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center',
  'outfit-12': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop&crop=center'
};

// Mock video URLs for "See in Motion" feature
export const mockTryOnVideos: Record<string, string> = {
  'outfit-1': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-2': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-3': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-4': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-5': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-6': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-7': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-8': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-9': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-10': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-11': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'outfit-12': 'https://www.w3schools.com/html/mov_bbb.mp4'
};
