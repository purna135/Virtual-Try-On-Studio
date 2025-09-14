# Virtual Try-On Setup Guide

## CORS Issue Solution

Due to browser CORS (Cross-Origin Resource Sharing) restrictions, the frontend cannot directly call the SeedREAM API. We've implemented two solutions:

### Solution 1: Development Proxy (Recommended for Development)

The Vite development server is configured to proxy API requests automatically. Just start your dev server and it will work!

### Solution 2: Backend Proxy Server (For Production)

Use the included proxy server in the `proxy-server/` directory for production deployments.

## Environment Variables Configuration

### Frontend Environment Variables

Create a `.env` file in the root directory of your project and add:

```env
# SeedREAM API Configuration for Virtual Try-On
VITE_SEEDREAM_API_KEY=your_seedream_api_key_here

# Optional: SeedREAM Model ID (defaults to seedream-4-0-250828 if not specified)
VITE_SEEDREAM_MODEL_ID=seedream-4-0-250828

# Optional: For production with proxy server
VITE_SEEDREAM_API_URL=http://localhost:3001/api/seedream/generate

# Optional: Default mock mode (true/false, defaults to true for development)
VITE_DEFAULT_MOCK_MODE=true
```

## Quick Start

### For Development (Recommended)

1. **Get your API key** from [BytePlus Console](https://console.ark.bytepluses.com/)
2. **Create `.env` file** in the project root:
   ```env
   VITE_SEEDREAM_API_KEY=your_seedream_api_key_here
   ```
3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

The Vite proxy will automatically handle CORS issues during development!

## Mock Mode vs AI Mode

The application includes a toggle to switch between mock images and real AI-generated images:

### 🎭 Mock Mode (Default)
- **Instant results**: No API calls, uses pre-defined mock images
- **No costs**: Perfect for UI testing and development
- **Faster iteration**: Test UI changes without waiting for API calls
- **Simulates delay**: Still shows loading animation (1.5s) for realistic UX testing

### 🤖 AI Mode  
- **Real AI generation**: Uses SeedREAM API to generate actual try-on images
- **API costs**: Each generation consumes API credits
- **Slower**: Takes time for real AI processing
- **Production quality**: Real results for actual try-on experience

### How to Toggle
1. **UI Toggle**: Click the toggle switch in the header (🖼️ Mock / 🤖 AI)
2. **Environment Variable**: Set `VITE_DEFAULT_MOCK_MODE=false` in `.env` for AI mode by default
3. **Console Logs**: Check browser console to see which mode is active

### For Production

1. **Set up the proxy server**:
   ```bash
   cd proxy-server
   npm install
   ```

2. **Create proxy server `.env` file**:
   ```env
   SEEDREAM_API_KEY=your_seedream_api_key_here
   PORT=3001
   ALLOWED_ORIGINS=https://your-domain.com
   ```

3. **Start the proxy server**:
   ```bash
   npm start
   ```

4. **Update frontend `.env`** to use proxy:
   ```env
   VITE_SEEDREAM_API_URL=https://your-proxy-domain.com/api/seedream/generate
   ```

## Getting Your SeedREAM API Key

1. Visit [BytePlus Console](https://console.ark.bytepluses.com/)
2. Sign up for an account if you don't have one
3. Navigate to the API section
4. Create a new API key for SeedREAM-4.0
5. Copy the API key and paste it into your `.env` file

## Proxy Server API

### Endpoints

- `GET /health` - Health check
- `POST /api/seedream/generate` - SeedREAM API proxy

### Request Format

Same as the original SeedREAM API, but sent to your proxy server instead.

## Important Security Notes

- **Never commit API keys** to version control
- **Use environment variables** for all sensitive configuration
- **Restrict CORS origins** in production
- **Use HTTPS** in production environments

## How It Works

The application uses multi-image blending with SeedREAM-4.0:

1. **Input**: User's photo (converted to Base64) + Outfit image (URL)
2. **Prompt**: "[Combination] Dress the character in Image 1 with the outfit from Image 2."
3. **Output**: AI-generated try-on image showing the user wearing the selected outfit

## Troubleshooting

### Common Errors

- **"SeedREAM API key not configured"**: Make sure `VITE_SEEDREAM_API_KEY` is set in your `.env` file
- **"Failed to convert image to Base64"**: Check that the uploaded image is in JPEG or PNG format
- **API request failures**: Verify your API key is valid and you have sufficient credits

### Image Requirements

- **Formats**: JPEG, PNG
- **Aspect ratio**: Between 1/3 and 3 (width/height)
- **Dimensions**: Minimum 14px width and height
- **Size**: Maximum 10MB per image
- **Maximum input images**: 10 (we use 2: person + outfit)
