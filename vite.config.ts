import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      // Proxy API requests to avoid CORS issues in development
      '/api/seedream': {
        target: 'https://ark.ap-southeast.bytepluses.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/seedream/, '/api/v3/images/generations'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Log proxy requests for debugging
            console.log('Proxying request:', req.method, req.url, '→', options.target + proxyReq.path);
          });
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})
