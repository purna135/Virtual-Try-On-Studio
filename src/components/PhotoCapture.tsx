import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, User, Image as ImageIcon, Sparkles } from 'lucide-react';
import { UserPhoto } from '../types';

interface PhotoCaptureProps {
  onPhotoCapture: (photo: UserPhoto) => void;
  className?: string;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoCapture, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  
  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPreviewUrl(imageUrl);
      
      const photo: UserPhoto = {
        id: `photo-${Date.now()}`,
        imageUrl,
        thumbnailUrl: imageUrl,
        uploadedAt: new Date()
      };
      
      onPhotoCapture(photo);
    };
    reader.readAsDataURL(file);
  }, [onPhotoCapture]);

  // Start camera capture
  const startCamera = useCallback(async () => {
    try {
      setCameraLoading(true);
      setIsCapturing(true);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: 'user' // Front camera for selfies
        },
        audio: false
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Ensure video starts playing
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
          setCameraLoading(false); // Camera feed is ready
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraLoading(false);
      setIsCapturing(false);
      
      // More user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        alert('Camera access denied. Please allow camera permissions and try again, or upload a photo instead.');
      } else if (errorMessage.includes('NotFoundError')) {
        alert('No camera found. Please upload a photo instead.');
      } else {
        alert('Unable to access camera. Please upload a photo instead.');
      }
    }
  }, []);

  // Capture photo from camera
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !stream) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageUrl = canvas.toDataURL('image/jpeg', 0.8);
    setPreviewUrl(imageUrl);
    
    // Stop camera
    stream.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsCapturing(false);
    
    const photo: UserPhoto = {
      id: `photo-${Date.now()}`,
      imageUrl,
      thumbnailUrl: imageUrl,
      uploadedAt: new Date()
    };
    
    onPhotoCapture(photo);
  }, [stream, onPhotoCapture]);

  // Cancel camera capture
  const cancelCapture = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
    setCameraLoading(false);
  }, [stream]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setPreviewUrl(null);
    startCamera();
  }, [startCamera]);

  if (previewUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex flex-col items-center justify-center h-full ${className} p-8`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
            Perfect! Photo Captured
          </h2>
          <p className="text-neutral-600 text-lg">
            Now you can start trying on outfits from the catalog below
          </p>
        </div>

        <div className="relative mb-6">
          <img
            src={previewUrl}
            alt="Captured photo"
            className="w-64 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
          />
          <div className="absolute -top-3 -right-3">
            <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 
                          rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={retakePhoto}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
                     text-white px-6 py-3 rounded-xl flex items-center justify-center
                     font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Camera className="w-5 h-5 mr-2" />
          Retake Photo
        </motion.button>
      </motion.div>
    );
  }

  if (isCapturing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex flex-col items-center justify-center h-full ${className} p-8`}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
            Camera Active
          </h2>
          <p className="text-neutral-600">
            Position yourself in the frame and click capture when ready
          </p>
        </div>

        <div className="relative mb-4">
          {/* Video Feed */}
          <div className="relative w-80 h-60 bg-neutral-900 rounded-xl overflow-hidden border-4 border-white shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              onLoadedMetadata={() => {
                // Ensure video is playing
                if (videoRef.current) {
                  videoRef.current.play();
                  setCameraLoading(false);
                }
              }}
            />
            
            {/* Loading overlay while camera initializes */}
            {cameraLoading && (
              <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-3"
                  />
                  <p className="text-sm font-medium">Initializing camera...</p>
                </div>
              </div>
            )}
            
            {/* Guide Overlay - only show when camera is ready */}
            {!cameraLoading && (
              <div className="absolute inset-4 border-2 border-dashed border-white/60 rounded-lg flex items-center justify-center pointer-events-none">
                <div className="text-white/80 text-center bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <User className="w-6 h-6 mx-auto mb-1" />
                  <p className="text-sm font-medium">Position yourself here</p>
                </div>
              </div>
            )}

            {/* Camera Status Indicator - only show when recording */}
            {!cameraLoading && (
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>REC</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={capturePhoto}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl 
                       flex items-center justify-center font-medium
                       transition-all duration-200 hover:shadow-lg hover:scale-105
                       border-2 border-primary-600"
          >
            <div className="w-6 h-6 bg-white rounded-full mr-3 flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-600" />
            </div>
            Capture Photo
          </button>
          
          <button
            onClick={cancelCapture}
            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-6 py-3 rounded-xl 
                       font-medium transition-all duration-200 hover:shadow-md"
          >
            Cancel
          </button>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center h-full ${className} p-8`}
    >
      <div className="text-center mb-4 max-w-md">
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
          className="w-28 h-28 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100
                     rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <User className="w-16 h-16 text-primary-500" />
        </motion.div>
        
        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-3">
          Let's Get Started!
        </h2>
        <p className="text-neutral-600">
          Upload or capture your full-body photo to begin trying on amazing outfits
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
                     text-white px-6 py-3 rounded-xl flex items-center justify-center min-w-[160px] 
                     font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="w-6 h-6 bg-white/20 rounded-lg mr-3 flex items-center justify-center">
            <Upload className="w-4 h-4" />
          </div>
          Upload Photo
        </motion.button>
        
        <motion.button
          onClick={startCamera}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 
                     text-white px-6 py-3 rounded-xl flex items-center justify-center min-w-[160px] 
                     font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="w-6 h-6 bg-white/20 rounded-lg mr-3 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          Take Photo
        </motion.button>
      </div>
      
      <div className="mt-6 text-center text-sm text-neutral-500">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <ImageIcon className="w-4 h-4 mr-1" />
            <span>JPG, PNG accepted</span>
          </div>
          <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
          <div className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            <span>Full body photos work best</span>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </motion.div>
  );
};

export default PhotoCapture;
