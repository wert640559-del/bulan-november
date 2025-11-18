// Simple API client tanpa interceptor masalah
export const simpleApi = {
  async login(username: string, password: string) {
    try {
      console.log('🔐 Simple API Login attempt:', username);
      
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, // 1 hour
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`
        };
      }

      // STRUCTURE YANG BENAR - langsung mapping dari response
      return {
        success: true,
        data: {
          userID: data.id.toString(),
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
          token: data.token
        }
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error'
      };
    }
  },

  async getProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=10');
      const data = await response.json();
      
      return {
        success: true,
        data: data.products
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};