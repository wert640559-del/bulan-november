export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  description: string;
  category?: string;
  specifications?: string[];
}

export interface ProductFormData {
  name: string;
  price: string;
  image: any;
  description: string;
  category?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}