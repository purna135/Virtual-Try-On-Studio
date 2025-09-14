import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Play, Trash2 } from 'lucide-react';
import { TryOnResult } from '../types';

interface ImageGalleryModalProps {
  isOpen: boolean;
  images: TryOnResult[];
  initialIndex: number;
  onClose: () => void;
  onTryOnAction: (id: string, action: 'select' | 'delete' | 'motion') => void;
  activeVideo: string | null;
  onVideoToggle: (resultId: string, videoUrl?: string) => void;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  images,
  initialIndex,
  onClose,
  onTryOnAction,
  activeVideo,
  onVideoToggle
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Update current index when initial index changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigatePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const navigatePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const navigateNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const isVideo = activeVideo === currentImage.id && currentImage.videoUrl;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 
                     rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={navigatePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 
                         bg-white/10 hover:bg-white/20 rounded-full text-white 
                         transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={navigateNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 
                         bg-white/10 hover:bg-white/20 rounded-full text-white 
                         transition-all duration-200 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Main Content */}
        <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center p-4">
          {/* Image/Video Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] h-full bg-black rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
              {isVideo ? (
                // Video mode
                <video
                  src={currentImage.videoUrl}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-contain"
                />
              ) : (
                // Static image
                <img
                  src={currentImage.imageUrl}
                  alt={`Try-on: ${currentImage.outfit.title}`}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-4 left-4">
                  <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentIndex + 1} of {images.length}
                  </div>
                </div>
              )}

              {/* Selected indicator */}
              {currentImage.isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center 
                                  shadow-lg border-2 border-white">
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {/* See in Motion */}
                {currentImage.videoUrl && (
                  <button
                    onClick={() => onVideoToggle(currentImage.id, currentImage.videoUrl)}
                    className={`p-2 rounded-lg flex items-center justify-center transition-all 
                               border shadow-sm hover:scale-105 ${
                      isVideo
                        ? 'bg-accent-500 border-accent-500 text-white' 
                        : 'bg-white/90 border-neutral-200 text-neutral-700 hover:bg-white'
                    }`}
                    title="See in Motion"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}

                {/* Select Outfit */}
                <button
                  onClick={() => onTryOnAction(currentImage.id, 'select')}
                  className={`p-2 rounded-lg flex items-center justify-center transition-all 
                             border shadow-sm hover:scale-105 ${
                    currentImage.isSelected
                      ? 'bg-accent-500 border-accent-500 text-white' 
                      : 'bg-white/90 border-neutral-200 text-neutral-700 hover:bg-white'
                  }`}
                  title="Select Outfit"
                >
                  <Heart className={`w-4 h-4 ${currentImage.isSelected ? 'fill-current' : ''}`} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => onTryOnAction(currentImage.id, 'delete')}
                  className="p-2 rounded-lg flex items-center justify-center transition-all 
                             border shadow-sm hover:scale-105
                             bg-white/90 border-neutral-200 text-neutral-700 
                             hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="mt-4 w-full flex justify-center">
              <div className="flex space-x-3 bg-black/20 backdrop-blur-sm rounded-lg p-3 max-w-full overflow-x-auto scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-20 rounded overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      index === currentIndex
                        ? 'border-accent-400 shadow-lg shadow-accent-400/30'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageGalleryModal;
