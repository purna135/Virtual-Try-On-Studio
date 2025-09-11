# Virtual Try-On Kiosk 👗✨

A modern, interactive **Virtual Try-On Kiosk App** designed for offline clothing stores and malls. Built with React, TypeScript, and Framer Motion for smooth, engaging user experiences on large horizontal touch screens.

## 🌟 Features

### 📸 Full-Body Photo Capture
- **Photo Upload**: Customers can upload their full-body photos
- **Camera Integration**: Direct photo capture using device camera
- **Smart Processing**: Optimized for full-body recognition

### 🎯 Virtual Try-On Experience
- **AI-Powered Try-Ons**: Generate realistic try-on images (mock implementation)
- **Horizontal Gallery**: Scrollable carousel of try-on results
- **Video Mode**: "See in Motion" feature with animated previews
- **Interactive Controls**: Select favorites, delete unwanted try-ons

### 👔 Smart Outfit Catalog
- **Dynamic Filtering**: Filter by category (Casual, Formal, Ethnic, Party, etc.)
- **Gender Selection**: Men, Women, and Unisex options
- **Touch-Friendly**: Large buttons optimized for kiosk interactions
- **Real-time Updates**: Instant filtering and selection feedback

### 🎨 Kiosk-Optimized Design
- **Horizontal Layout**: Designed for landscape orientation
- **Touch-First UI**: Large, accessible buttons and controls
- **Beautiful Animations**: Smooth transitions with Framer Motion
- **Pastel Theme**: Modern color palette with soft blues, greens, and pinks
- **Loading States**: Engaging shimmer effects and spinners

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with camera support (for photo capture)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd virtual-tryon-kiosk

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production
```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 🏗️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and building)
- **Styling**: Tailwind CSS with custom kiosk-optimized design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React (beautiful, consistent icons)
- **State Management**: React hooks (useState, useCallback)

## 🎨 Design System

### Color Palette
- **Primary**: Soft blues (#0ea5e9 variants)
- **Secondary**: Fresh greens (#22c55e variants)
- **Accent**: Warm pinks (#ec4899 variants)
- **Neutral**: Clean grays for backgrounds and text

### Components
- **Kiosk Buttons**: Large, touch-friendly with rounded corners
- **Cards**: Elevated design with subtle shadows
- **Loading States**: Shimmer effects and animated spinners

## 📱 Kiosk Deployment

### Hardware Requirements
- **Display**: Large horizontal touch screen (recommended 32"+)
- **Resolution**: 1920x1080 or higher
- **Touch**: Multi-touch capable screen
- **Camera**: Optional for photo capture feature
- **Performance**: Modern device with hardware acceleration

### Browser Configuration
For kiosk deployment, configure your browser:

1. **Full-screen mode**: Press F11 or use kiosk mode extensions
2. **Disable context menus**: Prevent right-click interactions
3. **Auto-refresh**: Set up periodic page refreshes for stability
4. **Touch optimization**: Enable touch-friendly scrolling

### Example Kiosk Setup (Chrome)
```bash
# Launch Chrome in kiosk mode
google-chrome --kiosk --no-first-run --disable-infobars --disable-session-crashed-bubble --disable-background-timer-throttling http://localhost:3000
```

## 🔧 Customization

### Adding New Outfits
Edit `src/data/mockData.ts` to add your outfit catalog:

```typescript
{
  id: 'unique-id',
  title: 'Outfit Name',
  category: 'casual' | 'formal' | 'ethnic' | 'party',
  gender: 'men' | 'women' | 'unisex',
  imageUrl: 'path-to-image.jpg',
  price: 99.99,
  brand: 'Brand Name'
}
```

### Theming
Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Your primary colors */ },
      secondary: { /* Your secondary colors */ },
      accent: { /* Your accent colors */ }
    }
  }
}
```

### API Integration
Replace mock data with real API calls:

1. Update `src/data/mockData.ts` with API endpoints
2. Add loading and error states
3. Implement real try-on generation service

## 📐 Component Architecture

```
src/
├── components/
│   ├── PhotoCapture.tsx      # Photo upload/capture UI
│   ├── TryOnGallery.tsx      # Try-on results display
│   └── OutfitCatalog.tsx     # Outfit browsing and filtering
├── data/
│   └── mockData.ts           # Sample outfits and mock data
├── types/
│   └── index.ts              # TypeScript type definitions
├── App.tsx                   # Main application component
└── main.tsx                  # Application entry point
```

## 🎯 User Flow

1. **Welcome Screen**: Customer sees intro with photo upload options
2. **Photo Capture**: Upload or take full-body photo
3. **Browse Outfits**: Use filters to find desired clothing
4. **Try-On**: Tap outfits to generate virtual try-on images
5. **Review Results**: Browse gallery, select favorites, see videos
6. **Decision Making**: Compare selected outfits before purchasing

## 🔮 Future Enhancements

- **Real AI Integration**: Connect to actual virtual try-on APIs
- **Size Recommendations**: AI-powered size suggestions
- **Social Sharing**: Share try-on results via QR codes
- **Purchase Integration**: Direct checkout from kiosk
- **Analytics Dashboard**: Track popular outfits and user behavior
- **Multi-language Support**: Localization for different markets
- **Accessibility**: Screen reader support and keyboard navigation

## 🐛 Troubleshooting

### Camera Not Working
- Check browser permissions for camera access
- Ensure HTTPS connection (required for camera in modern browsers)
- Test with different browsers

### Touch Interactions
- Verify touch events are enabled in browser
- Check CSS touch-action properties
- Test on actual touch devices

### Performance Issues
- Enable hardware acceleration in browser
- Check for memory leaks in long-running sessions
- Optimize image sizes and loading

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Built with ❤️ for the future of retail shopping experiences** 🛍️
