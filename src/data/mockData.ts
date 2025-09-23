import { Outfit } from '../types';

// Mock outfit data for the kiosk demo
export const mockOutfits: Outfit[] = [
  // Men's Casual
  {
    id: 'outfit-1',
    title: 'Classic Denim Jacket',
    category: 'casual',
    gender: 'men',
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/7/5/s/40-pesfwslbi86146-peter-england-original-imahfz5zmvrxw7zd.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/7/5/s/40-pesfwslbi86146-peter-england-original-imahfz5zmvrxw7zd.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/v/s/a/40-pesfwslbi86146-peter-england-original-imahfz5zhz2cvzxv.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/i/6/y/40-pesfwslbi86146-peter-england-original-imahfz5zvyzwchfz.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/y/m/i/40-pesfwslbi86146-peter-england-original-imahfz5zcjsffsvy.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/i/d/i/44-lpsfmslci53961-louis-philippe-original-imah4rwzqkbzq3kh.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/i/d/i/44-lpsfmslci53961-louis-philippe-original-imah4rwzqkbzq3kh.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/p/i/u/44-lpsfmslci53961-louis-philippe-original-imah4rwzx3kqreav.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/i/f/z/44-lpsfmslci53961-louis-philippe-original-imah4rwzrtg33yph.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/k/x/u/44-lpsfmslci53961-louis-philippe-original-imah4rwztvwerdy3.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/t/x/y/32-a00879009lb02-diesel-original-imah7jn6avjsnzeq.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/j/s/e/32-a00879009lb02-diesel-original-imah7jn6utkrtkwd.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/d/7/o/32-a00879009lb02-diesel-original-imah7jn6pnxsctpj.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/c/e/k/32-a00879009lb02-diesel-original-imah7jn6vd2zug5d.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/b/l/n/32-a00879009lb02-diesel-original-imah7jn6cggpj7fu.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/blazer/x/m/k/36-31100596-mr-bowerbird-original-imah78rwqw7mx4we.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/blazer/r/o/t/36-31100596-mr-bowerbird-original-imah78rwxjx2gchb.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/blazer/x/m/k/36-31100596-mr-bowerbird-original-imah78rwqw7mx4we.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/blazer/u/2/y/36-31100596-mr-bowerbird-original-imah78rwkavr72p9.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/blazer/i/e/h/36-31100596-mr-bowerbird-original-imah78rwteggg3pu.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/l4ln8nk0/kurta/y/r/c/s-rv-001-anarkali-kurti-black-s-rupvali-original-imagfgpnkryyym3s.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/l4ln8nk0/kurta/m/f/l/s-rv-001-anarkali-kurti-black-s-rupvali-original-imagfgpn8ygwnfuh.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/l4ln8nk0/kurta/y/r/c/s-rv-001-anarkali-kurti-black-s-rupvali-original-imagfgpnkryyym3s.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/l4ln8nk0/kurta/0/d/t/s-rv-001-anarkali-kurti-black-s-rupvali-original-imagfgpn7tzx6qna.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/l4ln8nk0/kurta/t/7/9/s-rv-001-anarkali-kurti-black-s-rupvali-original-imagfgpn9hmegsp5.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/gown/1/r/c/na-xl-full-sleeve-stitched-1187-a-sancia-na-original-imah9n9ybhgggznq.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/gown/1/r/c/na-xl-full-sleeve-stitched-1187-a-sancia-na-original-imah9n9ybhgggznq.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/gown/z/h/t/na-xl-full-sleeve-stitched-1187-a-sancia-na-original-imah9n9yb9vbs9xp.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/gown/g/z/v/na-xl-full-sleeve-stitched-1187-a-sancia-na-original-imah9n9yncb6frrn.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/gown/k/1/h/na-xl-full-sleeve-stitched-1187-a-sancia-na-original-imah9n9ypydcjezc.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/k/4/x/xxl-a1-zwerlon-original-imahg4hsnjzhxkhb.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/k/4/x/xxl-a1-zwerlon-original-imahg4hsnjzhxkhb.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/g/r/z/xl-a1-zwerlon-original-imahg4hsngkgs25a.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/shopsy-dress/u/x/8/xl-a1-2-shopsy-lookshine-original-imahay49gkx3ggkh.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/0/s/0/xxl-a1-zwerlon-original-imahg4hsxhsvfrmy.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/c/p/n/30-kttwomenspant336-kotty-original-imahdq9fry35e9q2.jpeg',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/2/z/2/30-kttwomenspant336-kotty-original-imahdq9f7yekets2.jpeg',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/k/g/v/28-kttwomenspant336-kotty-original-imahdq9fftg2f4mx.jpeg',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/y/m/h/30-kttwomenspant336-kotty-original-imahdq9fvs6gg7bh.jpeg',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/y/s/x/30-kttwomenspant336-kotty-original-imahdq9f5gaxbnqt.jpeg'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/track-pant/j/g/g/m-jn3459-adidas-original-imahdzvedzhcgkjj.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/track-pant/j/g/g/m-jn3459-adidas-original-imahdzvedzhcgkjj.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/track-pant/r/a/z/m-jn3459-adidas-original-imahdzvew3aywpku.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/track-pant/e/j/x/m-jn3459-adidas-original-imahdzvevbfv9cns.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/track-pant/f/a/k/m-jn3459-adidas-original-imahdzve4zzgkd5z.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/e/o/k/free-4486s552r-satrani-unstitched-original-imahff9y6ept9trh.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/e/o/k/free-4486s552r-satrani-unstitched-original-imahff9y6ept9trh.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/v/h/g/free-4486s552r-satrani-unstitched-original-imahff9ytnrdwjdp.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/z/7/x/free-4486s552r-satrani-unstitched-original-imahff9y6fh9huyh.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/sari/r/m/c/free-4486s552r-satrani-unstitched-original-imahff9ywgg4ggts.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/c/2/j/-original-imahg2rfy4mcfacv.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/c/2/j/-original-imahg2rfy4mcfacv.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/r/e/5/-original-imahg2rfjyfspujp.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/e/b/n/-original-imahg2rfrhzv88cf.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/u/u/h/-original-imahg2rfnnymxnyy.jpeg?q=70&crop=false'
    ],
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
    imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/y/t/v/s-40bm416280-calvin-klein-jeans-original-imahejwyqhq77nvh.jpeg?q=70&crop=false',
    thumbnailUrl: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/v/u/y/xxl-40bm416280-calvin-klein-jeans-original-imahejwybhnmphgh.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/l/o/7/xxl-40bm416280-calvin-klein-jeans-original-imahejwyhxgtgj6g.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/f/j/o/xxl-40bm416280-calvin-klein-jeans-original-imahejwyeachghuv.jpeg?q=70&crop=false',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/r/l/h/s-40bm416280-calvin-klein-jeans-original-imahejwyft2vmrsf.jpeg?q=70&crop=false'
    ],
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
