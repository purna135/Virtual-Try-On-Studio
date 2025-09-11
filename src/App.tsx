import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, ShoppingBag } from 'lucide-react';
import { AppState, Filter, TryOnResult, UserPhoto, Outfit, CartItem } from './types';
import { mockOutfits, mockTryOnImages, mockTryOnVideos } from './data/mockData';
import TryOnGallery from './components/TryOnGallery';
import OutfitCatalog from './components/OutfitCatalog';
import PhotoCapture from './components/PhotoCapture';
import Cart from './components/Cart';

const initialFilter: Filter = {
  category: 'all',
  gender: 'all',
  size: undefined,
  color: undefined,
  brand: undefined,
  season: undefined,
  priceRange: undefined
};

function App() {
  const [appState, setAppState] = useState<AppState>({
    userPhoto: null,
    tryOnResults: [],
    outfits: mockOutfits,
    currentFilter: initialFilter,
    isLoading: false,
    selectedOutfitId: null,
    cartItems: []
  });
  
  const [showCart, setShowCart] = useState(false);

  // Handle user photo upload/capture
  const handlePhotoCapture = useCallback((photo: UserPhoto) => {
    setAppState(prev => ({
      ...prev,
      userPhoto: photo
    }));
  }, []);

  // Handle photo removal
  const handlePhotoRemove = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      userPhoto: null,
      tryOnResults: [], // Clear try-on results when photo is removed
      cartItems: [] // Clear cart when photo is removed
    }));
  }, []);

  // Handle outfit selection for try-on
  const handleOutfitSelect = useCallback((outfit: Outfit) => {
    if (!appState.userPhoto) {
      // TODO: Show toast to capture photo first
      return;
    }

    // Set loading state without adding the result yet
    setAppState(prev => ({
      ...prev,
      selectedOutfitId: outfit.id,
      isLoading: true
    }));

    // Simulate try-on processing
    setTimeout(() => {
      const newTryOn: TryOnResult = {
        id: `tryon-${Date.now()}`,
        outfitId: outfit.id,
        outfit,
        imageUrl: mockTryOnImages[outfit.id] || outfit.imageUrl,
        videoUrl: mockTryOnVideos[outfit.id],
        isSelected: false,
        isProcessing: false,
        createdAt: new Date()
      };

      setAppState(prev => ({
        ...prev,
        tryOnResults: [...prev.tryOnResults, newTryOn],
        isLoading: false,
        selectedOutfitId: null
      }));
    }, 2500);
  }, [appState.userPhoto]);

  // Handle filter changes
  const handleFilterChange = useCallback((filter: Filter) => {
    setAppState(prev => ({
      ...prev,
      currentFilter: filter
    }));
  }, []);

  // Handle try-on result actions
  const handleTryOnAction = useCallback((id: string, action: 'select' | 'delete' | 'motion') => {
    setAppState(prev => {
      switch (action) {
        case 'select':
          const tryOnResult = prev.tryOnResults.find(result => result.id === id);
          if (!tryOnResult) return prev;

          const isCurrentlySelected = tryOnResult.isSelected;
          const updatedTryOnResults = prev.tryOnResults.map(result =>
            result.id === id
              ? { ...result, isSelected: !result.isSelected }
              : result
          );

          let updatedCartItems = [...prev.cartItems];

          if (isCurrentlySelected) {
            // Remove from cart
            updatedCartItems = prev.cartItems.filter(item => item.tryOnResult.id !== id);
          } else {
            // Add to cart
            const newCartItem: CartItem = {
              id: `cart-${Date.now()}-${id}`,
              tryOnResult: { ...tryOnResult, isSelected: true },
              addedAt: new Date()
            };
            updatedCartItems = [...prev.cartItems, newCartItem];
          }

          return {
            ...prev,
            tryOnResults: updatedTryOnResults,
            cartItems: updatedCartItems
          };

        case 'delete':
          return {
            ...prev,
            tryOnResults: prev.tryOnResults.filter(result => result.id !== id),
            // Also remove from cart if it was there
            cartItems: prev.cartItems.filter(item => item.tryOnResult.id !== id)
          };

        case 'motion':
          // TODO: Implement video playback
          return prev;
        default:
          return prev;
      }
    });
  }, []);

  // Filter outfits based on current filter
  const filteredOutfits = appState.outfits.filter(outfit => {
    const categoryMatch = appState.currentFilter.category === 'all' || 
                          outfit.category === appState.currentFilter.category;
    const genderMatch = appState.currentFilter.gender === 'all' || 
                        outfit.gender === appState.currentFilter.gender ||
                        outfit.gender === 'unisex';
    const sizeMatch = !appState.currentFilter.size || 
                     outfit.sizes?.includes(appState.currentFilter.size);
    const colorMatch = !appState.currentFilter.color || 
                      outfit.colors?.some(color => color.toLowerCase().includes(appState.currentFilter.color!.toLowerCase()));
    const brandMatch = !appState.currentFilter.brand || 
                      outfit.brand === appState.currentFilter.brand;
    const seasonMatch = !appState.currentFilter.season || 
                       outfit.season === appState.currentFilter.season || 
                       outfit.season === 'all-season';
    const priceMatch = !appState.currentFilter.priceRange || 
                      (outfit.price && outfit.price >= appState.currentFilter.priceRange[0] && 
                       outfit.price <= appState.currentFilter.priceRange[1]);
    
    return categoryMatch && genderMatch && sizeMatch && colorMatch && 
           brandMatch && seasonMatch && priceMatch;
  });

  // Handle cart actions
  const handleRemoveFromCart = useCallback((cartItemId: string) => {
    setAppState(prev => {
      const cartItem = prev.cartItems.find(item => item.id === cartItemId);
      if (!cartItem) return prev;

      // Also update the corresponding try-on result to unselect it
      const updatedTryOnResults = prev.tryOnResults.map(result =>
        result.id === cartItem.tryOnResult.id
          ? { ...result, isSelected: false }
          : result
      );

      return {
        ...prev,
        cartItems: prev.cartItems.filter(item => item.id !== cartItemId),
        tryOnResults: updatedTryOnResults
      };
    });
  }, []);

  const handlePlaceOrder = useCallback(() => {
    // TODO: Implement order placement logic
    alert(`Order placed! Total: $${appState.cartItems.reduce((total, item) => total + (item.tryOnResult.outfit.price || 0), 0).toFixed(2)}`);
    setShowCart(false);
    
    // Clear cart after order
    setAppState(prev => ({
      ...prev,
      cartItems: [],
      tryOnResults: prev.tryOnResults.map(result => ({
        ...result,
        isSelected: false
      }))
    }));
  }, [appState.cartItems]);

  const handleCloseCart = useCallback(() => {
    setShowCart(false);
  }, []);

  // Handle escape key to close cart
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCart) {
        setShowCart(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm border-b border-neutral-200 px-8 py-4 shadow-sm sticky top-0 z-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 
                            rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-neutral-900">
                Virtual Try-On Studio
              </h1>
              <p className="text-sm text-neutral-600">
                Try on outfits virtually before you buy
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Cart Indicator */}
            {appState.cartItems.length > 0 && (
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-neutral-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white 
                                 text-xs font-bold rounded-full flex items-center justify-center">
                  {appState.cartItems.length}
                </span>
              </button>
            )}

            {!appState.userPhoto && (
              <div className="hidden sm:block text-right">
                <p className="text-sm text-neutral-600 mb-1">Get Started</p>
                <div className="flex items-center space-x-2 text-primary-600">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload your photo</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        
        {/* Top Section - Try-On Results Gallery */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 p-6 pb-3"
        >
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 h-full">
            <TryOnGallery
              userPhoto={appState.userPhoto}
              tryOnResults={appState.tryOnResults}
              isLoading={appState.isLoading}
              selectedOutfitId={appState.selectedOutfitId}
              onPhotoCapture={handlePhotoCapture}
              onPhotoRemove={handlePhotoRemove}
              onTryOnAction={handleTryOnAction}
            />
          </div>
        </motion.section>

        {/* Bottom Section - Outfit Catalog */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 p-6 pt-3"
        >
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 h-full">
            <OutfitCatalog
              outfits={filteredOutfits}
              currentFilter={appState.currentFilter}
              selectedOutfitId={appState.selectedOutfitId}
              onOutfitSelect={handleOutfitSelect}
              onFilterChange={handleFilterChange}
              isLoading={appState.isLoading}
            />
          </div>
        </motion.section>
      </div>

      {/* Cart */}
      <Cart
        isOpen={showCart}
        cartItems={appState.cartItems}
        onClose={handleCloseCart}
        onRemoveItem={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}

export default App;
