import axios from 'axios';
import { addAnalyticsEvent } from '../../App';
import { simpleApi } from './simpleApi';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers['X-Client-Platform'] = 'React-Native';
    addAnalyticsEvent(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Transform successful response
    if (response.status === 200) {
      addAnalyticsEvent(`API Success: ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    
    if (error.response?.status === 400) {
      addAnalyticsEvent(`API Error 400: ${error.config.url}`);
    } else if (error.response?.status === 404) {
      addAnalyticsEvent(`API Error 404: ${error.config.url}`);
    } else if (error.response?.status === 500) {
      addAnalyticsEvent(`API Error 500: ${error.config.url}`);
    } else if (!error.response) {
      addAnalyticsEvent(`Network Error: ${error.message}`);
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const productService = {
  async login(username: string, password: string) {
    return await simpleApi.login(username, password);
  },

  async getProducts(signal?: AbortSignal) {
    try {
      const controller = new AbortController();
      if (signal) {
        signal.addEventListener('abort', () => controller.abort());
      }

      const response = await fetch('https://dummyjson.com/products', {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get product by ID
  async getProductById(id: string, signal?: AbortSignal) {
    try {
      const response = await apiClient.get(`/products/${id}`, { signal });
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Simulate login
//   async login(username: string, password: string) {
//     try {
//         console.log('🔐 Attempting login with:', { username });
        
//         // Gunakan fetch langsung untuk menghindari interceptor issues
//         const response = await fetch('https://dummyjson.com/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username,
//             password,
//             expiresInMins: 30,
//         }),
//         });

//         console.log('✅ Login response status:', response.status);

//         if (!response.ok) {
//         const errorData = await response.json();
//         console.log('❌ Login failed:', errorData);
//         return {
//             success: false,
//             error: errorData.message || 'Login failed'
//         };
//         }

//         const data = await response.json();
//         console.log('✅ Login success data:', data);

//         // Transform response - STRUCTURE YANG BENAR
//         return {
//         success: true,
//         data: {
//             userID: data.id.toString(), // Langsung dari root, bukan data.user.id
//             username: data.username,    // Langsung dari root
//             email: data.email,          // Langsung dari root  
//             firstName: data.firstName,
//             lastName: data.lastName,
//             image: data.image,
//             token: data.token           // Langsung dari root
//         }
//         };
//     } catch (error: any) {
//         console.log('❌ Login fetch error:', error);
//         return {
//         success: false,
//         error: error.message || 'Network error'
//         };
//     }
//     },

  // Search products
  async searchProducts(query: string, signal?: AbortSignal) {
    try {
      const response = await apiClient.get(`/products/search?q=${query}`, { signal });
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default apiClient;