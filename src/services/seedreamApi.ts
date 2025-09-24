// SeedREAM API integration for virtual try-on
interface SeedreamApiResponse {
  model: string;
  created: number;
  data: Array<{
    url?: string;
    b64_json?: string;
    size?: string;
    error?: {
      code: string;
      message: string;
    };
  }>;
  usage: {
    generated_images: number;
    output_tokens: number;
    total_tokens: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

interface TryOnRequest {
  personImageBase64: string;
  outfitImageUrl: string;
}

export class SeedreamApiError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SeedreamApiError';
  }
}

export async function generateTryOnImage(request: TryOnRequest): Promise<string> {
  const apiKey = import.meta.env.VITE_SEEDREAM_API_KEY;
  const modelId = import.meta.env.VITE_SEEDREAM_MODEL_ID || 'seedream-4-0-250828';
  
  // Determine API endpoint and setup
  const isDevelopment = import.meta.env.DEV;
  const configuredApiUrl = import.meta.env.VITE_SEEDREAM_API_URL;
  
  let apiUrl: string;
  let isProxyServer = false;
  
  if (isDevelopment) {
    // Development: Use Vite proxy
    apiUrl = '/api/seedream';
  } else if (configuredApiUrl && configuredApiUrl.includes('/api/seedream/generate')) {
    // Production: Using proxy server
    apiUrl = configuredApiUrl;
    isProxyServer = true;
  } else {
    // Direct API call (not recommended due to CORS)
    apiUrl = configuredApiUrl || 'https://ark.ap-southeast.bytepluses.com/api/v3/images/generations';
  }

  if (!apiKey) {
    throw new SeedreamApiError('SeedREAM API key not configured. Please set VITE_SEEDREAM_API_KEY in your environment variables.');
  }

  const requestBody = {
    model: modelId,
    prompt: '[Combination] Dress the character in Image 1 with the outfit from Image 2.',
    image: [
      request.personImageBase64, // Person's photo as Base64
      request.outfitImageUrl      // Outfit image as URL
    ],
    sequential_image_generation: 'disabled',
    size: '2K',
    response_format: 'url',
    watermark: false
  };

  // Set up headers based on whether we're using proxy server or direct API
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (isProxyServer) {
    // Proxy server expects API key in a custom header
    headers['x-seedream-api-key'] = apiKey;
  } else {
    // Direct API call uses Authorization header
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new SeedreamApiError(errorMessage, errorData?.error?.code);
    }

    const data: SeedreamApiResponse = await response.json();

    // Check for API-level errors
    if (data.error) {
      throw new SeedreamApiError(data.error.message, data.error.code);
    }

    // Check if we got any generated images
    if (!data.data || data.data.length === 0) {
      throw new SeedreamApiError('No images were generated');
    }

    const imageResult = data.data[0];
    
    // Check for image-specific errors
    if (imageResult.error) {
      throw new SeedreamApiError(imageResult.error.message, imageResult.error.code);
    }

    if (!imageResult.url) {
      throw new SeedreamApiError('No image URL returned from API');
    }

    return imageResult.url;
    
  } catch (error) {
    if (error instanceof SeedreamApiError) {
      throw error;
    }
    
    // Handle network errors, JSON parsing errors, etc.
    if (error instanceof Error) {
      throw new SeedreamApiError(`API request failed: ${error.message}`);
    }
    
    throw new SeedreamApiError('Unknown error occurred during API request');
  }
}


// Utility function to convert data URL to Base64 format expected by API
export function convertToApiBase64Format(dataUrl: string): string {
  // Check if it's already in the correct format
  if (dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }
  
  // If it's just Base64 string, add the proper prefix
  // Assume JPEG format if no format is specified
  return `data:image/jpeg;base64,${dataUrl}`;
}
