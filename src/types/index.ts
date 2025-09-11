// Core data types for the Virtual Try-On Kiosk

export interface Outfit {
  id: string;
  title: string;
  category: OutfitCategory;
  gender: Gender;
  imageUrl: string;
  thumbnailUrl: string;
  description?: string;
  price?: number;
  brand?: string;
  tags?: string[];
  sizes?: Size[];
  colors?: string[];
  material?: string;
  season?: Season;
}

export interface TryOnResult {
  id: string;
  outfitId: string;
  outfit: Outfit;
  imageUrl: string;
  videoUrl?: string;
  isSelected: boolean;
  isProcessing: boolean;
  createdAt: Date;
}

export interface UserPhoto {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  uploadedAt: Date;
}

export type OutfitCategory = 'all' | 'casual' | 'formal' | 'ethnic' | 'sportswear' | 'party';
export type Gender = 'all' | 'men' | 'women' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '28' | '30' | '32' | '34' | '36' | '38' | '40' | '42';
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all-season';

export interface Filter {
  category: OutfitCategory;
  gender: Gender;
  size?: Size;
  color?: string;
  brand?: string;
  season?: Season;
  priceRange?: [number, number];
}

export interface CartItem {
  id: string;
  tryOnResult: TryOnResult;
  addedAt: Date;
}

export interface AppState {
  userPhoto: UserPhoto | null;
  tryOnResults: TryOnResult[];
  outfits: Outfit[];
  currentFilter: Filter;
  isLoading: boolean;
  selectedOutfitId: string | null;
  cartItems: CartItem[];
}

export interface KioskConfig {
  maxTryOns: number;
  processingTimeoutMs: number;
  autoDeleteAfterMs: number;
  supportedImageFormats: string[];
  maxImageSize: number;
}

// Animation and UI types
export interface AnimationConfig {
  duration: number;
  easing: string;
}

export type LoadingState = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}
