# SeedREAM API Proxy Server

This is a simple Express.js proxy server that handles SeedREAM API calls on behalf of the frontend application, resolving CORS issues that prevent direct browser-to-API communication.

## Why This Proxy Server?

Browser security policies (CORS) prevent frontend applications from directly calling third-party APIs like SeedREAM. This proxy server:

- ✅ Eliminates CORS issues
- ✅ Keeps API keys secure on the server
- ✅ Provides a simple REST interface
- ✅ Includes error handling and logging
- ✅ Ready for production deployment

## Quick Setup

### 1. Install Dependencies

```bash
cd proxy-server
npm install
```

### 2. Configure Environment

Create a `.env` file in the `proxy-server/` directory:

```env
# Required: Your SeedREAM API Key
SEEDREAM_API_KEY=your_seedream_api_key_here

# Optional: Server port (default: 3001)
PORT=3001

# Optional: Allowed origins for CORS (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com

# Optional: SeedREAM API URL (default: official endpoint)
SEEDREAM_API_URL=https://ark.ap-southeast.bytepluses.com/api/v3/images/generations
```

### 3. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3001` (or your configured port).

## API Endpoints

### Health Check
```http
GET /health
```

Response:
```json
{
  "status": "ok",
  "message": "SeedREAM Proxy Server is running"
}
```

### Generate Try-On Image
```http
POST /api/seedream/generate
Content-Type: application/json

{
  "model": "seedream-4-0-250828",
  "prompt": "[Combination] Dress the character in Image 1 with the outfit from Image 2.",
  "image": ["data:image/jpeg;base64,...", "https://example.com/outfit.jpg"],
  "sequential_image_generation": "disabled",
  "size": "2K",
  "response_format": "url",
  "watermark": false
}
```

## Deployment Options

### Option 1: Serverless (Vercel, Netlify Functions)

Deploy as a serverless function for automatic scaling and cost efficiency.

### Option 2: Traditional Hosting (Railway, Heroku, DigitalOcean)

Deploy as a Node.js application for consistent performance.

### Option 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Frontend Integration

Update your frontend `.env` to use the proxy server:

```env
# Point to your deployed proxy server
VITE_SEEDREAM_API_URL=https://your-proxy-domain.com/api/seedream/generate
```

## Security Considerations

- **Never expose your SeedREAM API key** in the frontend
- **Use HTTPS** in production environments
- **Restrict CORS origins** to your domains only
- **Implement rate limiting** for production use
- **Add authentication** if needed for your use case

## Monitoring & Logging

The proxy server logs all requests for debugging:

```
Proxying request to SeedREAM API...
Request body keys: ['model', 'prompt', 'image', 'sequential_image_generation', 'size', 'response_format', 'watermark']
Image inputs: 2
SeedREAM API success: { generated_images: 1, output_tokens: 4096, total_tokens: 4096 }
```

## Error Handling

Common errors and their meanings:

- `API_KEY_MISSING` - No API key provided
- `PROXY_ERROR` - Internal server error
- `SeedREAM API errors` - Forwarded from the original API

## Support

For issues with:
- **This proxy server**: Check the logs and verify your configuration
- **SeedREAM API**: Refer to BytePlus documentation
- **CORS issues**: Verify your `ALLOWED_ORIGINS` configuration
