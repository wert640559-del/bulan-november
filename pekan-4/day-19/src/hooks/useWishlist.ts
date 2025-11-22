import { useState, useEffect } from 'react';
import { simpleStorage } from '../services/storage';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const result = await simpleStorage.multiGet(['@wishlist_ids', '@wishlist_meta']);
      
      if (result['@wishlist_ids']) {
        setWishlist(result['@wishlist_ids']);
        setCount(result['@wishlist_ids'].length);
      }
      
      if (result['@wishlist_meta']) {
        setCount(result['@wishlist_meta'].count || 0);
      }
    } catch (error) {
      console.log('Error loading wishlist:', error);
    }
  };

  const toggleWishlist = async (productId: string) => {
    try {
      const newWishlist = wishlist.includes(productId)
        ? wishlist.filter(id => id !== productId)
        : [...wishlist, productId];

      const newCount = newWishlist.length;
      
      // Simpan dengan multiSet
      await simpleStorage.multiSet([
        ['@wishlist_ids', newWishlist],
        ['@wishlist_meta', { 
          count: newCount, 
          updatedAt: new Date().toISOString() 
        }]
      ]);

      setWishlist(newWishlist);
      setCount(newCount);
      
      return true;
    } catch (error) {
      console.log('Error toggling wishlist:', error);
      return false;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  return {
    wishlist,
    wishlistCount: count,
    toggleWishlist,
    isInWishlist
  };
};