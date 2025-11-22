import { useState, useEffect } from 'react';
import { simpleStorage } from '../services/storage';

export const useProductCache = (productId: string) => {
  const [cachedProduct, setCachedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const TTL = 30 * 60 * 1000; // 30 menit

  const getCachedProduct = async () => {
    try {
      const cacheKey = `@product_detail:${productId}`;
      const cached = await simpleStorage.get(cacheKey);
      
      if (cached && cached.value && cached.ttl_product) {
        const isExpired = Date.now() - cached.ttl_product > TTL;
        if (!isExpired) {
          console.log('✅ Using cached product');
          setCachedProduct(cached.value);
          setLoading(false);
          return cached.value;
        }
      }
      return null;
    } catch (error) {
      console.log('Error reading cache:', error);
      return null;
    }
  };

  const saveProductToCache = async (productData: any) => {
    try {
      const cacheKey = `@product_detail:${productId}`;
      await simpleStorage.save(cacheKey, {
        value: productData,
        ttl_product: Date.now()
      });
    } catch (error) {
      console.log('Error saving to cache:', error);
    }
  };

  const loadProduct = async (fetchProduct: () => Promise<any>) => {
    setLoading(true);
    
    // Cek cache dulu
    const cached = await getCachedProduct();
    if (cached) {
      setLoading(false);
      return cached;
    }

    // Jika tidak ada cache, fetch dari API
    try {
      const freshData = await fetchProduct();
      await saveProductToCache(freshData);
      setCachedProduct(freshData);
      setLoading(false);
      return freshData;
    } catch (error) {
      console.log('Error fetching product:', error);
      setLoading(false);
      return null;
    }
  };

  return {
    cachedProduct,
    loading,
    loadProduct
  };
};