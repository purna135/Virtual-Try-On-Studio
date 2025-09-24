# Mock Mode Feature

The Virtual Try-On application includes a powerful mock mode toggle that allows developers to switch between real AI-generated images and mock images for efficient testing and development.

## ✨ Why Mock Mode?

### 🎯 **Development Efficiency**
- **No API costs**: Test UI changes without consuming API credits
- **Instant results**: Immediate try-on generation for rapid iteration
- **No network dependency**: Work offline or with poor connectivity
- **Consistent results**: Same mock images every time for reliable testing

### 💡 **Perfect for**
- UI/UX development and testing
- Component styling and layout changes
- User flow testing
- Demo purposes and presentations
- CI/CD pipeline testing

## 🎮 **How It Works**

### **Toggle Options**

#### **1. UI Toggle Switch (Recommended)**
Located in the header next to the cart icon:
- **🖼️ Mock Mode**: Gray toggle - Uses pre-defined mock images
- **🤖 AI Mode**: Blue toggle - Uses real SeedREAM AI generation

#### **2. Environment Variable**
Set default mode in your `.env` file:
```env
# Start in mock mode (default)
VITE_DEFAULT_MOCK_MODE=true

# Start in AI mode
VITE_DEFAULT_MOCK_MODE=false
```

#### **3. Console Feedback**
Check browser console to see which mode is active:
- `🎭 Using mock mode - generating try-on with mock images`
- `🚀 Using real AI mode - generating try-on with SeedREAM API`

## 📊 **Mode Comparison**

| Feature | Mock Mode | AI Mode |
|---------|-----------|---------|
| **Speed** | ~1.5s (simulated) | ~5-15s (real AI) |
| **Cost** | Free | API credits consumed |
| **Results** | Pre-defined images | Real AI-generated |
| **Network** | Not required | Required |
| **Consistency** | Same every time | Varies each generation |
| **Quality** | Mock placeholders | Production quality |

## 🎨 **Mock Data Details**

### **Image Sources**
Mock Mode now uses the preview images from each outfit's `thumbnailUrl` array:

```typescript
// Example: Classic Blue Jeans outfit
{
  id: 'outfit-1',
  title: 'Classic Blue Jeans',
  thumbnailUrl: [
    'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/k/l/x/...',  // Preview 1
    'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/k/e/b/...',  // Preview 2
    'https://rukminim2.flixcart.com/image/128/128/xif0q/jean/e/y/g/...',  // Preview 3
    '/images/jean1.png'                                                    // Preview 4
  ],
  // ... other outfit properties
}
```

### **Preview Behavior**
- Shows all 4 thumbnail images as separate "try-on results"
- Each preview appears as a different angle/view of the outfit
- First preview is automatically selected by default
- Maintains consistent UI behavior across both modes
- Simulates realistic loading times for UX testing

## 🔧 **Technical Implementation**

### **State Management**
```typescript
const [useMockMode, setUseMockMode] = useState(() => {
  const envDefault = import.meta.env.VITE_DEFAULT_MOCK_MODE;
  return envDefault ? envDefault.toLowerCase() === 'true' : true;
});
```

### **Generation Logic**
```typescript
if (useMockMode) {
  // Create preview try-on results using thumbnailUrl images
  const previewResults: TryOnResult[] = outfit.thumbnailUrl.map((thumbnailUrl, index) => ({
    id: `preview-${outfit.id}-${index}`,
    outfitId: outfit.id,
    outfit: outfit,
    imageUrl: thumbnailUrl, // Use thumbnailUrl as preview image
    isSelected: index === 0, // Select first preview by default
    isProcessing: false,
    createdAt: new Date()
  }));
  
  setAppState(prev => ({
    ...prev,
    tryOnResults: previewResults
  }));
  return; // Exit early - no API call needed
} else {
  // Use real AI API for actual try-on generation
  tryOnImageUrl = await generateTryOnImage({
    personImageBase64,
    outfitImageUrl: outfit.thumbnailUrl[0] || outfit.imageUrl
  });
}
```

### **Visual Indicators**
- Toggle switch with icons: 🖼️ (Mock) / 🤖 (AI)
- Mode label shows current state
- Smooth transitions between states
- Hover tooltips for clarity

## 🎯 **Best Practices**

### **Development Workflow**
1. **Start with Mock Mode**: Develop and test UI changes quickly
2. **Switch to AI Mode**: Test real API integration periodically
3. **Mock for Demos**: Use consistent results for presentations
4. **AI for Production**: Deploy with AI mode for real functionality

### **Team Collaboration**
- **Designers**: Use mock mode for rapid UI iterations
- **Frontend Devs**: Mock mode for component development
- **Backend Devs**: AI mode for API integration testing
- **QA Teams**: Test both modes for comprehensive coverage

### **Environment Setup**
```env
# Development
VITE_DEFAULT_MOCK_MODE=true

# Staging/Testing
VITE_DEFAULT_MOCK_MODE=false

# Production
VITE_DEFAULT_MOCK_MODE=false
```

## 🚀 **Usage Examples**

### **Rapid UI Testing**
1. Enable mock mode
2. Upload test photo
3. Click multiple outfits rapidly
4. Test image gallery modal navigation
5. Test cart functionality
6. All without API costs!

### **Demo Preparation**
1. Set mock mode
2. Use consistent test images
3. Practice user flow
4. Reliable, fast results every time

### **API Integration Testing**
1. Switch to AI mode
2. Test real API calls
3. Verify error handling
4. Check actual generation quality

## 🐛 **Troubleshooting**

### **Common Issues**
- **Toggle not working**: Check browser console for errors
- **Mock images not loading**: Verify network access to image URLs
- **Slow mock mode**: Check simulated delay in code (1.5s default)

### **Debug Tips**
- Check console logs to verify active mode
- Toggle switch state matches expected mode
- Mock images fallback to outfit images if unavailable

## 🔮 **Future Enhancements**

Potential improvements for mock mode:
- **Custom mock images**: Upload your own mock try-on results
- **Mock delay adjustment**: Configure simulation delay
- **Mock error simulation**: Test error handling scenarios
- **Batch mock generation**: Generate multiple mock results at once

The mock mode feature makes development efficient and cost-effective while maintaining the full user experience for testing! 🎉
