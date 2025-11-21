import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { simpleStorage } from '../services/storage';

export const useAdvancedCart = () => {
  const [cart, setCart] = useState<{[key: string]: any}>({});

  // Load cart saat app start
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const savedCart = await simpleStorage.get('@cart');
    if (savedCart) {
      setCart(savedCart);
    }
  };

  // ✅ UPDATE ITEM DENGAN MERGE (efisien untuk perubahan kecil)
  const updateCartItem = async (productId: string, quantity: number) => {
    const newCart = { ...cart, [productId]: quantity };
    
    try {
      // Simpan dengan mergeItem untuk update kecil
      await AsyncStorage.mergeItem('@cart', JSON.stringify({
        [productId]: quantity
      }));
      
      setCart(newCart);
      console.log('✅ Cart item updated:', productId, quantity);
      
    } catch (error: any) {
      console.log('❌ Cart update error:', error);
      
      // ✅ HANDLE QUOTA EXCEEDED ERROR
      if (error.message.includes('QuotaExceeded') || error.message.includes('Database')) {
        console.log('🔄 Storage full, clearing some cache...');
        
        // Bersihkan cache lama
        await simpleStorage.remove('@cached_products');
        
        // Coba save lagi
        await simpleStorage.save('@cart', newCart);
        setCart(newCart);
      }
    }
  };

  const addToCart = async (product: any) => {
    const currentQty = cart[product.id] || 0;
    await updateCartItem(product.id, currentQty + 1);
  };

  const removeFromCart = async (productId: string) => {
    const newCart = { ...cart };
    delete newCart[productId];
    
    await simpleStorage.save('@cart', newCart);
    setCart(newCart);
  };

  const clearCart = async () => {
    await simpleStorage.remove('@cart');
    setCart({});
  };

  // Hitung total items
  const cartCount = Object.values(cart).reduce((total: number, qty: any) => total + qty, 0);

  // Get cart items sebagai array
  const cartItems = Object.entries(cart).map(([productId, quantity]) => ({
    productId,
    quantity
  }));

  return {
    cart,
    cartItems,
    cartCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  };
};