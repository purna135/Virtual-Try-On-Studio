import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Trash2, CreditCard, ZoomIn } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  cartItems,
  onClose,
  onRemoveItem,
  onPlaceOrder
}) => {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.tryOnResult.outfit.price || 0);
  }, 0);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Modal state for image viewing
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; item: CartItem } | null>(null);

  // Close modal with ESC key
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Simple Modal Image Component for Cart
  const ModalImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
    cartItem: CartItem;
  }> = ({ src, alt, className = '', cartItem }) => {
    const handleImageClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent cart interactions
      setSelectedImage({ src, alt, item: cartItem });
    };

    return (
      <div className="relative group cursor-pointer" onClick={handleImageClick}>
        <img
          src={src}
          alt={alt}
          className={className}
        />
        
        {/* Zoom Hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                        transition-colors duration-200 flex items-center justify-center">
          <ZoomIn className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 
                            transition-opacity duration-200 bg-black/60 rounded-full p-0.5" />
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={handleOverlayClick}
        />

        {/* Cart Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md h-full bg-white shadow-xl border-l border-neutral-200 flex flex-col"
        >
          {/* Header */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Shopping Cart
                  </h2>
                  <p className="text-sm text-neutral-600">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="p-4 bg-neutral-100 rounded-full mb-4">
                  <ShoppingBag className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-neutral-600">
                  Select some try-on outfits to add them to your cart
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex space-x-3">
                      {/* Try-on Image with Modal */}
                      <div className="flex-shrink-0">
                        <ModalImage
                          src={item.tryOnResult.imageUrl}
                          alt={item.tryOnResult.outfit.title}
                          className="w-16 h-20 object-cover rounded-lg border border-neutral-200"
                          cartItem={item}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-neutral-900 truncate">
                              {item.tryOnResult.outfit.title}
                            </h3>
                            <p className="text-xs text-neutral-600 mt-1">
                              {item.tryOnResult.outfit.brand}
                            </p>
                            {item.tryOnResult.outfit.price && (
                              <p className="text-sm font-semibold text-primary-600 mt-1">
                                ${item.tryOnResult.outfit.price.toFixed(2)}
                              </p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 hover:bg-red-50 rounded transition-colors group"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
                          </button>
                        </div>

                        {/* Try-on Badge */}
                        <div className="flex items-center mt-2">
                          <div className="inline-flex items-center px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
                            <Heart className="w-3 h-3 mr-1 fill-current" />
                            Try-on Result
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="flex-shrink-0 border-t border-neutral-200 p-6 bg-neutral-50">
              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium text-neutral-900">
                  Total
                </span>
                <span className="text-xl font-bold text-neutral-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={onPlaceOrder}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 
                           hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg 
                           transition-colors shadow-sm"
              >
                <CreditCard className="w-5 h-5" />
                <span>Place Order</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 
                           rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full max-h-[70vh] object-contain"
                />
                
                {/* Selected indicator */}
                {selectedImage.item.tryOnResult.isSelected && (
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center 
                                    shadow-lg border-2 border-white">
                      <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                )}
              </div>

              {/* Image Info */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                      {selectedImage.item.tryOnResult.outfit.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {selectedImage.item.tryOnResult.outfit.brand}
                    </p>
                    {selectedImage.item.tryOnResult.outfit.price && (
                      <p className="text-lg font-semibold text-primary-600 mt-2">
                        ${selectedImage.item.tryOnResult.outfit.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-xs text-neutral-500 bg-accent-100 text-accent-700 
                                  px-2 py-1 rounded-full">
                    <Heart className="w-3 h-3 mr-1 inline fill-current" />
                    In Cart
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Cart;
