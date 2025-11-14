import apiClient, { checkInternetConnection, fetchWithConnectivityCheck } from '../api/apiClient';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user?: any;
}

// Product service with cancellation support
export const productService = {
  // Get all products with cancellation and timeout
  async getProducts(signal?: AbortSignal): Promise<ProductsResponse> {
    try {
      // Check internet connection first
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        throw new Error('NO_INTERNET');
      }

      const response = await apiClient.get<ProductsResponse>('/products', {
        signal,
        timeout: 7000, // 7 seconds timeout as required
      });
      
      return response.data;
    } catch (error: any) {
      if (error.message === 'NO_INTERNET') {
        throw new Error('No internet connection. Please check your network and try again.');
      }
      
      if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
        throw new Error('Request was cancelled or timed out.');
      }
      
      throw error;
    }
  },

  // Get single product
  async getProductById(id: number, signal?: AbortSignal): Promise<Product> {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      throw new Error('NO_INTERNET');
    }

    const response = await apiClient.get<Product>(`/products/${id}`, { signal });
    return response.data;
  },

  // Search products
  async searchProducts(query: string, signal?: AbortSignal): Promise<ProductsResponse> {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      throw new Error('NO_INTERNET');
    }

    const response = await apiClient.get<ProductsResponse>(`/products/search?q=${query}`, { signal });
    return response.data;
  },

  // Simulate login with POST request
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        throw new Error('NO_INTERNET');
      }

      const response = await apiClient.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });

      // Transform response to match our expected format
      return {
        success: true,
        token: response.data.token,
        user: response.data,
      };
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Invalid username or password');
      }
      throw error;
    }
  },
};