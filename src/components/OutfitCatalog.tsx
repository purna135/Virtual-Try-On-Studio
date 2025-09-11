import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag, Tag, Users, Palette, Filter as FilterIcon } from 'lucide-react';
import { Outfit, Filter, OutfitCategory, Gender, Size, Season } from '../types';

interface OutfitCatalogProps {
  outfits: Outfit[];
  currentFilter: Filter;
  selectedOutfitId: string | null;
  isLoading: boolean;
  onOutfitSelect: (outfit: Outfit) => void;
  onFilterChange: (filter: Filter) => void;
}

const categoryLabels: Record<OutfitCategory, string> = {
  all: 'All Styles',
  casual: 'Casual',
  formal: 'Formal',
  ethnic: 'Ethnic',
  sportswear: 'Sportswear',
  party: 'Party'
};

const genderLabels: Record<Gender, string> = {
  all: 'Everyone',
  men: 'Men',
  women: 'Women',
  unisex: 'Unisex'
};

const sizeLabels: Record<Size, string> = {
  'XS': 'XS', 'S': 'S', 'M': 'M', 'L': 'L', 'XL': 'XL', 'XXL': 'XXL',
  '28': '28', '30': '30', '32': '32', '34': '34', '36': '36', '38': '38', '40': '40', '42': '42'
};

const seasonLabels: Record<Season, string> = {
  'spring': 'Spring',
  'summer': 'Summer',
  'fall': 'Fall',
  'winter': 'Winter',
  'all-season': 'All Season'
};

const OutfitCatalog: React.FC<OutfitCatalogProps> = ({
  outfits,
  currentFilter,
  selectedOutfitId,
  isLoading,
  onOutfitSelect,
  onFilterChange
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: OutfitCategory) => {
    onFilterChange({ ...currentFilter, category });
  };

  const handleGenderChange = (gender: Gender) => {
    onFilterChange({ ...currentFilter, gender });
  };

  const handleSizeChange = (size: Size | undefined) => {
    onFilterChange({ ...currentFilter, size });
  };

  const handleColorChange = (color: string | undefined) => {
    onFilterChange({ ...currentFilter, color });
  };

  const handleBrandChange = (brand: string | undefined) => {
    onFilterChange({ ...currentFilter, brand });
  };

  const handleSeasonChange = (season: Season | undefined) => {
    onFilterChange({ ...currentFilter, season });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: 'all',
      gender: 'all',
      size: undefined,
      color: undefined,
      brand: undefined,
      season: undefined,
      priceRange: undefined
    });
  };

  const handleOutfitClick = (outfit: Outfit) => {
    if (isLoading) return;
    onOutfitSelect(outfit);
  };

  // Get unique values for filter options
  const uniqueColors = [...new Set(outfits.flatMap(outfit => outfit.colors || []))].sort();
  const uniqueBrands = [...new Set(outfits.map(outfit => outfit.brand).filter(Boolean))].sort();
  const uniqueSizes = [...new Set(outfits.flatMap(outfit => outfit.sizes || []))];
  const availableSeasons = [...new Set(outfits.map(outfit => outfit.season).filter(Boolean))] as Season[];

  return (
    <div className="h-full flex flex-col">
      {/* Compact Filter Header */}
      <div className="flex-shrink-0 p-3 border-b border-neutral-200">
        {/* Title and Clear All - Single Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-primary-500" />
            <h2 className="text-base font-display font-semibold text-neutral-900">
              Outfit Catalog
            </h2>
            <span className="text-neutral-600 text-xs">
              ({outfits.length} items)
            </span>
          </div>
          <button
            onClick={clearAllFilters}
            disabled={isLoading}
            className="px-2 py-1 text-xs text-neutral-500 hover:text-neutral-700
                       hover:bg-neutral-100 rounded transition-colors disabled:opacity-50"
          >
            Clear All
          </button>
        </div>

        {/* Single Line Filters with Pipe Separators */}
        <div className="flex items-center space-x-3 flex-wrap">
          {/* Gender Filters */}
          <div className="flex items-center space-x-2">
            <Users className="w-3 h-3 text-neutral-500" />
            <span className="text-xs text-neutral-600">Gender:</span>
            <div className="flex gap-1">
              {(Object.keys(genderLabels) as Gender[]).map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleGenderChange(gender)}
                  disabled={isLoading}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 
                             border disabled:opacity-50 ${
                    currentFilter.gender === gender
                      ? 'bg-secondary-500 text-white border-secondary-500'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-secondary-300'
                  }`}
                >
                  {genderLabels[gender]}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="text-neutral-300 text-sm">|</div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2">
            <Tag className="w-3 h-3 text-neutral-500" />
            <span className="text-xs text-neutral-600">Type:</span>
            <div className="flex gap-1">
              {(Object.keys(categoryLabels) as OutfitCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  disabled={isLoading}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 
                             border disabled:opacity-50 ${
                    currentFilter.category === category
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="text-neutral-300 text-sm">|</div>

          {/* Size Filters */}
          <div className="flex items-center space-x-2">
            <FilterIcon className="w-3 h-3 text-neutral-500" />
            <span className="text-xs text-neutral-600">Size:</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleSizeChange(undefined)}
                disabled={isLoading}
                className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200
                           border disabled:opacity-50 ${
                  !currentFilter.size
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-accent-300'
                }`}
              >
                Any
              </button>
              {uniqueSizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  disabled={isLoading}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 
                             border disabled:opacity-50 ${
                    currentFilter.size === size
                      ? 'bg-accent-500 text-white border-accent-500'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-accent-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="text-neutral-300 text-sm">|</div>

          {/* Color Filters */}
          <div className="flex items-center space-x-2">
            <Palette className="w-3 h-3 text-neutral-500" />
            <span className="text-xs text-neutral-600">Color:</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleColorChange(undefined)}
                disabled={isLoading}
                className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 
                           border disabled:opacity-50 ${
                  !currentFilter.color
                    ? 'bg-accent-500 text-white border-accent-500'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-accent-300'
                }`}
              >
                Any
              </button>
              {uniqueColors.slice(0, 3).map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  disabled={isLoading}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-200 
                             border disabled:opacity-50 ${
                    currentFilter.color === color
                      ? 'bg-accent-500 text-white border-accent-500'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-accent-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outfit Horizontal Scroll */}
      <div className="flex-1 overflow-hidden">
        {outfits.length === 0 ? (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6 text-neutral-400" />
              </div>
              <h3 className="text-base font-display font-semibold text-neutral-900 mb-1">
                No outfits found
              </h3>
              <p className="text-neutral-600 text-sm">
                Try adjusting your filters
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 p-4 h-full overflow-x-auto scrollbar-hide"
               style={{ scrollSnapType: 'x mandatory' }}>
            <AnimatePresence mode="popLayout">
              {outfits.map((outfit, index) => (
                <motion.div
                  key={outfit.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.2,
                    delay: index * 0.02 
                  }}
                  className="flex-shrink-0 w-48"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOutfitClick(outfit)}
                    className={`relative cursor-pointer group h-full ${
                      isLoading ? 'cursor-wait' : 'cursor-pointer'
                    } ${
                      selectedOutfitId === outfit.id 
                        ? 'opacity-60' 
                        : ''
                    }`}
                  >
                    <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden transition-all duration-300 h-full ${
                      selectedOutfitId === outfit.id 
                        ? 'border-primary-300 bg-primary-50' 
                        : 'group-hover:border-neutral-300 group-hover:shadow-md'
                    }`}>
                      {/* Outfit Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={outfit.imageUrl}
                          alt={outfit.title}
                          className="w-full h-full object-cover transition-transform duration-300 
                                     group-hover:scale-105"
                        />
                        
                        {/* Processing overlay */}
                        {selectedOutfitId === outfit.id && isLoading && (
                          <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white/30 border-t-white 
                                         rounded-full"
                            />
                          </div>
                        )}

                        {/* Category badge */}
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full 
                                           backdrop-blur-sm">
                            {categoryLabels[outfit.category]}
                          </span>
                        </div>

                        {/* Gender badge */}
                        {outfit.gender !== 'all' && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 bg-white/90 text-neutral-700 text-xs rounded-full 
                                             backdrop-blur-sm">
                              {genderLabels[outfit.gender]}
                            </span>
                          </div>
                        )}

                        {/* Try on overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent 
                                        to-transparent opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300 flex items-end justify-center pb-3">
                          <div className="text-white text-center">
                            <Sparkles className="w-5 h-5 mx-auto mb-1" />
                            <p className="text-xs font-medium">
                              {isLoading && selectedOutfitId === outfit.id ? 'Processing...' : 'Try On'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Outfit Info */}
                      <div className="p-3 space-y-1 flex-1">
                        <h3 className="font-display font-semibold text-neutral-900 text-sm leading-tight">
                          {outfit.title}
                        </h3>
                        
                        {outfit.brand && (
                          <p className="text-xs text-neutral-600">
                            {outfit.brand}
                          </p>
                        )}
                        
                        {outfit.price && (
                          <p className="text-sm font-semibold text-primary-600">
                            ${outfit.price.toFixed(2)}
                          </p>
                        )}

                        {outfit.description && (
                          <p className="text-xs text-neutral-500 line-clamp-2">
                            {outfit.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitCatalog;
