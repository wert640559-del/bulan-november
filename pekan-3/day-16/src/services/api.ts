import axios from 'axios';
import { addAnalyticsEvent } from '../../App';
import { simpleApi } from './simpleApi';
import * as Keychain from 'react-native-keychain';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ SOAL e: Simpan API Key ke Keychain
const saveApiKey = async () => {
  try {
    await Keychain.setGenericPassword('api', 'SECRET_API_KEY_12345', {
      service: 'com.ecom:apikey',
    });
    console.log('✅ API Key saved to Keychain');
  } catch (error) {
    console.log('❌ Failed to save API Key:', error);
  }
};

// ✅ SOAL e: Ambil API Key dari Keychain
const getApiKey = async (): Promise<string | null> => {
  try {
    const apiCred = await Keychain.getGenericPassword({ service: 'com.ecom:apikey' });
    return apiCred ? apiCred.password : null;
  } catch (error) {
    console.log('❌ Failed to get API Key:', error);
    return null;
  }
};

// Panggil saat module load
saveApiKey();

// ✅ SOAL e: Single Request Interceptor dengan API Key
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Tambah header standard
      config.headers['X-Client-Platform'] = 'React-Native';
      
      // ✅ SOAL e: Ambil API Key dari Keychain dan tambahkan ke header
      const apiKey = await getApiKey();
      if (apiKey) {
        config.headers['X-API-Key'] = apiKey;
      } else {
        console.log('⚠️ API Key not found in Keychain');
      }
      
      // Log analytics
      addAnalyticsEvent(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      
    } catch (error) {
      console.log('❌ Request interceptor error:', error);
    }
    
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    if (response.status === 200) {
      addAnalyticsEvent(`API Success: ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.message);
    
    // Handle different error types
    if (error.response?.status === 400) {
      addAnalyticsEvent(`API Error 400: ${error.config.url}`);
    } else if (error.response?.status === 401) {
      addAnalyticsEvent(`API Error 401: Unauthorized - ${error.config.url}`);
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
  },

  // ✅ SOAL e: Test function untuk API Key
  async testApiKey() {
    try {
      const apiKey = await getApiKey();
      return {
        success: true,
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found'
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