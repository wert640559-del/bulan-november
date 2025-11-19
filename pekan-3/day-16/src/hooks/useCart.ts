import { useState, useEffect } from 'react';
import { simpleStorage } from '../services/storage';

export const useSimpleCart = () => {
  const [cart, setCart] = useState<any[]>([]);

  // Load cart dari storage saat app start
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const savedCart = await simpleStorage.get('@cart');
    if (savedCart) {
      setCart(savedCart);
    }
  };

  const saveCart = async (newCart: any[]) => {
    setCart(newCart);
    await simpleStorage.save('@cart', newCart);
  };

  const addToCart = async (product: any) => {
    const newCart = [...cart];
    const existingItem = newCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }

    await saveCart(newCart);
  };

  const removeFromCart = async (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    await saveCart(newCart);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0)
  };
};