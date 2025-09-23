  import React, { useState, useRef, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Play, Heart, Trash2, ChevronLeft, ChevronRight, User, X, ZoomIn } from 'lucide-react';
import { TryOnResult, UserPhoto } from '../types';
import PhotoCapture from './PhotoCapture';
import ImageGalleryModal from './ImageGalleryModal';

interface TryOnGalleryProps {
  userPhoto: UserPhoto | null;
  tryOnResults: TryOnResult[];
  isLoading: boolean;
  selectedOutfitId: string | null;
  useMockMode: boolean;
  onPhotoCapture: (photo: UserPhoto) => void;
  onPhotoRemove: () => void;
  onTryOnAction: (id: string, action: 'select' | 'delete' | 'motion') => void;
}

const TryOnGallery: React.FC<TryOnGalleryProps> = ({
  userPhoto,
  tryOnResults,
  isLoading,
  selectedOutfitId,
  useMockMode,
  onPhotoCapture,
  onPhotoRemove,
  onTryOnAction
}) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to show latest items while keeping first item accessible
  useEffect(() => {
    if (tryOnResults.length > 0 && scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.clientWidth;
      const scrollWidth = container.scrollWidth;
      
      // Add a small delay to ensure proper rendering
      setTimeout(() => {
        if (tryOnResults.length === 1) {
          // First item is naturally centered with 50% padding
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else if (tryOnResults.length <= 3) {
          // For small groups (2-3 items), keep them centered
          const centerPosition = Math.max(0, (scrollWidth - containerWidth) / 2);
          container.scrollTo({
            left: centerPosition,
            behavior: 'smooth'
          });
        } else {
          // For larger groups, show the latest items but ensure first is still accessible
          // Scroll to show the newest items while maintaining full scroll range
          const maxScroll = scrollWidth - containerWidth;
          const showLatestPosition = Math.max(0, maxScroll * 0.7); // Show 70% towards the end
          
          container.scrollTo({
            left: showLatestPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [tryOnResults.length]);

  const handleVideoToggle = (resultId: string, videoUrl?: string) => {
    if (!videoUrl) return;
    
    if (activeVideo === resultId) {
      setActiveVideo(null);
    } else {
      setActiveVideo(resultId);
      onTryOnAction(resultId, 'motion');
    }
  };

  // Modal handlers
  const openGalleryModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsGalleryModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
  };

  // Clickable Image Component
  const ClickableImage: React.FC<{
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
    showZoomIcon?: boolean;
  }> = ({ src, alt, className = '', onClick, showZoomIcon = true }) => {
    return (
      <div className="relative group h-full cursor-pointer" onClick={onClick}>
        <img
          src={src}
          alt={alt}
          className={className}
        />
        
        {/* Zoom Hint Overlay */}
        {showZoomIcon && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const scrollLeft = () => {
    const cardWidth = 384; // Width of each try-on card (w-96 = 384px)
    const gap = 16; // space-x-4 = 16px
    const scrollDistance = cardWidth + gap;
    scrollRef.current?.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const cardWidth = 384; // Width of each try-on card (w-96 = 384px)
    const gap = 16; // space-x-4 = 16px
    const scrollDistance = cardWidth + gap;
    scrollRef.current?.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  // Show photo capture if no user photo AND not in mock mode
  if (!userPhoto && !useMockMode) {
    return (
      <div className="h-full">
        <PhotoCapture onPhotoCapture={onPhotoCapture} />
      </div>
    );
  }

  // Show placeholder if no try-ons yet
  if (tryOnResults.length === 0 && !isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-sm"
          >
            {userPhoto ? (
              <>
                <div className="relative inline-block mb-6">
                  <div className="relative">
                    <ClickableImage
                      src={userPhoto.imageUrl}
                      alt="Your photo"
                      className="w-48 h-60 object-cover rounded-lg shadow-lg border-4 border-white"
                      onClick={() => {
                        // For user photo, we can show it in modal too if there are try-on results
                        if (tryOnResults.length > 0) {
                          openGalleryModal(0); // Start from first try-on result
                        }
                      }}
                      showZoomIcon={tryOnResults.length > 0} // Only show zoom if there are results
                    />
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 
                                     rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    {/* Remove Photo Button */}
                    <button
                      onClick={onPhotoRemove}
                      className="absolute -top-2 -left-2 w-8 h-8 bg-red-500 hover:bg-red-600 
                                 rounded-full flex items-center justify-center shadow-lg 
                                 transition-colors group z-20"
                      title="Remove photo"
                    >
                      <X className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2">
                    Great! Photo Uploaded
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Browse the outfit catalog below and click on any outfit to see how it looks on you
                  </p>
                  
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-primary-500"
                  >
                    <ChevronLeft className="w-5 h-5 mx-auto transform rotate-90" />
                  </motion.div>
                </motion.div>
              </>
            ) : (
              // Mock Mode without user photo
              <>
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-28 h-28 bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100
                             rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <User className="w-16 h-16 text-secondary-500" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2">
                    Preview Mode Active
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    Browse the outfit catalog below to preview different styles. No photo needed in Preview Mode!
                  </p>
                  
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-secondary-500"
                  >
                    <ChevronLeft className="w-5 h-5 mx-auto transform rotate-90" />
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Try-On Results Carousel */}
      <div className="h-full relative">
        {/* Navigation Arrows */}
        {tryOnResults.length > 2 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 
                         bg-white/90 hover:bg-white rounded-full shadow-lg border border-neutral-200 
                         flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-700" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 
                         bg-white/90 hover:bg-white rounded-full shadow-lg border border-neutral-200 
                         flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-neutral-700" />
            </button>
          </>
        )}

        {/* Horizontal Scrolling Container */}
        <div 
          ref={scrollRef}
          className="h-full overflow-x-auto scrollbar-hide flex items-center"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex space-x-4 py-4" style={{ paddingLeft: '50%', paddingRight: '50%' }}>
            <AnimatePresence>
              {tryOnResults.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  className="flex-shrink-0 w-96 h-[28rem]"
                  style={{ scrollSnapAlign: 'center' }}
                >
                <div className={`relative h-full rounded-lg overflow-hidden shadow-md border-2 transition-all duration-300 ${
                  result.isSelected 
                    ? 'border-accent-400 shadow-accent-200/50' 
                    : 'border-white hover:border-neutral-300 hover:shadow-lg'
                }`}>
                  
                  {/* Try-on Image/Video */}
                  <div className="relative h-full">
                    {result.isProcessing ? (
                      // Loading state with original try-on image
                      <div className="relative h-full">
                        {/* Background try-on image with modal capability */}
                        <ClickableImage
                          src={result.imageUrl}
                          alt={result.outfit.title}
                          className="w-full h-full object-cover"
                          onClick={() => {
                            const imageIndex = tryOnResults.findIndex(r => r.id === result.id);
                            openGalleryModal(imageIndex);
                          }}
                          showZoomIcon={false} // Don't show icon during processing
                        />
                        
                        {/* Loading overlay */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm 
                                        flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-10 h-10 border-4 border-white/30 border-t-white 
                                         rounded-full mx-auto mb-2"
                            />
                            <p className="text-xs font-medium text-white">
                              Processing...
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : activeVideo === result.id && result.videoUrl ? (
                      // Video mode
                      <video
                        src={result.videoUrl}
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Static image with modal capability
                      <ClickableImage
                        src={result.imageUrl}
                        alt={`Try-on: ${result.outfit.title}`}
                        className="w-full h-full object-cover"
                        onClick={() => {
                          const imageIndex = tryOnResults.findIndex(r => r.id === result.id);
                          openGalleryModal(imageIndex);
                        }}
                      />
                    )}

                    {/* Selected indicator */}
                    {result.isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center 
                                        shadow-lg border-2 border-white">
                          <Heart className="w-3 h-3 text-white fill-current" />
                        </div>
                      </motion.div>
                    )}

                    {/* Outfit info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                                    from-black/80 via-black/40 to-transparent p-3 text-white">
                      <h3 className="font-semibold text-xs mb-1">{result.outfit.title}</h3>
                      <p className="text-xs opacity-90">{result.outfit.brand}</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {!result.isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-2 left-2 flex space-x-1"
                    >
                      {/* See in Motion */}
                      {result.videoUrl && (
                        <button
                          onClick={() => handleVideoToggle(result.id, result.videoUrl)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all 
                                     border shadow-sm hover:scale-105 ${
                            activeVideo === result.id 
                              ? 'bg-accent-500 border-accent-500 text-white' 
                              : 'bg-white/90 border-neutral-200 text-neutral-700 hover:bg-white'
                          }`}
                          title="See in Motion"
                        >
                          <Play className="w-3 h-3" />
                        </button>
                      )}

                      {/* Select Outfit */}
                      <button
                        onClick={() => onTryOnAction(result.id, 'select')}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all 
                                   border shadow-sm hover:scale-105 ${
                          result.isSelected 
                            ? 'bg-accent-500 border-accent-500 text-white' 
                            : 'bg-white/90 border-neutral-200 text-neutral-700 hover:bg-white'
                        }`}
                        title="Select Outfit"
                      >
                        <Heart className={`w-3 h-3 ${result.isSelected ? 'fill-current' : ''}`} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onTryOnAction(result.id, 'delete')}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all 
                                   border shadow-sm hover:scale-105
                                   bg-white/90 border-neutral-200 text-neutral-700 
                                   hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Loading indicator for new try-on */}
            {isLoading && selectedOutfitId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="flex-shrink-0 w-96 h-[28rem]"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className="h-full rounded-lg overflow-hidden shadow-md border-2 border-primary-200 relative">
                  {/* Background user photo or placeholder */}
                  {userPhoto ? (
                    <img
                      src={userPhoto.imageUrl}
                      alt="Processing try-on"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary-100 via-accent-100 to-primary-100 flex items-center justify-center">
                      <User className="w-24 h-24 text-secondary-300" />
                    </div>
                  )}
                  
                  {/* Loading overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm 
                                  flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-white/30 border-t-white 
                                   rounded-full mx-auto mb-3"
                      />
                      <p className="text-sm font-medium text-white">
                        Creating your try-on...
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryModalOpen}
        images={tryOnResults}
        initialIndex={selectedImageIndex}
        onClose={closeGalleryModal}
        onTryOnAction={onTryOnAction}
        activeVideo={activeVideo}
        onVideoToggle={handleVideoToggle}
      />
    </div>
  );
};

export default TryOnGallery;
