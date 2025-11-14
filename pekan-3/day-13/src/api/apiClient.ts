import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add custom headers
apiClient.interceptors.request.use(
  (config) => {
    // Add custom header
    config.headers['X-Client-Platform'] = 'React-Native';
    
    // Add timestamp for debugging
    config.headers['X-Request-Timestamp'] = new Date().toISOString();
    
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for transformation and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received from: ${response.config.url}`, response.status);
    
    // Transform successful response
    if (response.status === 200) {
      // You can transform the response data here if needed
      return response;
    }
    
    return response;
  },
  (error) => {
    console.error('❌ Response interceptor error:', error);
    
    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }
    
    if (!error.response) {
      console.error('Network error - no response received');
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    
    return Promise.reject(error);
  }
);

// Helper function to check internet connectivity before making requests
export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const netInfoState = await NetInfo.fetch();
    const isConnected = netInfoState.isConnected && netInfoState.isInternetReachable;
    
    console.log(`🌐 Internet connection: ${isConnected ? 'ONLINE' : 'OFFLINE'}`);
    console.log(`📶 Connection type: ${netInfoState.type}`);
    
    return isConnected || false;
  } catch (error) {
    console.error('Error checking internet connection:', error);
    return false;
  }
};

// Enhanced fetch with connectivity check
export const fetchWithConnectivityCheck = async (url: string, options?: any) => {
  const isConnected = await checkInternetConnection();
  
  if (!isConnected) {
    throw new Error('NO_INTERNET');
  }
  
  return apiClient.get(url, options);
};

export default apiClient;