// Simple Express proxy server for SeedREAM API
// This server acts as a proxy to avoid CORS issues when calling SeedREAM API from frontend

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins (adjust in production)
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Parse JSON requests
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SeedREAM Proxy Server is running' });
});

// Proxy endpoint for SeedREAM API
app.post('/api/seedream/generate', async (req, res) => {
  try {
    // Get API key from environment or request headers
    const apiKey = process.env.SEEDREAM_API_KEY || req.headers['x-seedream-api-key'];
    
    if (!apiKey) {
      return res.status(400).json({
        error: 'API_KEY_MISSING',
        message: 'SeedREAM API key is required. Set SEEDREAM_API_KEY environment variable or pass x-seedream-api-key header.'
      });
    }

    // SeedREAM API configuration
    const seedreamUrl = process.env.SEEDREAM_API_URL || 'https://ark.ap-southeast.bytepluses.com/api/v3/images/generations';
    
    console.log('Proxying request to SeedREAM API...');
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Image inputs:', req.body.image ? req.body.image.length : 0);

    // Forward the request to SeedREAM API
    const response = await fetch(seedreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Virtual-TryOn-Proxy/1.0'
      },
      body: JSON.stringify(req.body)
    });

    // Get response data
    const responseData = await response.json();

    // Forward the response status and data
    if (!response.ok) {
      console.error('SeedREAM API error:', response.status, responseData);
      return res.status(response.status).json(responseData);
    }

    console.log('SeedREAM API success:', responseData.usage);
    res.json(responseData);

  } catch (error) {
    console.error('Proxy server error:', error);
    res.status(500).json({
      error: 'PROXY_ERROR',
      message: 'Internal proxy server error',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unexpected error:', error);
  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /health - Health check',
      'POST /api/seedream/generate - SeedREAM API proxy'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SeedREAM Proxy Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔄 Proxy endpoint: http://localhost:${PORT}/api/seedream/generate`);
  
  if (!process.env.SEEDREAM_API_KEY) {
    console.warn('⚠️  SEEDREAM_API_KEY environment variable not set');
  }
});

module.exports = app;
