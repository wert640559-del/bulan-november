import { useEffect } from 'react';
import { Linking } from 'react-native';
import { useAdvancedCart } from './useAdvancedCart';

export const useDeepLink = () => {
  const { addToCart } = useAdvancedCart();

  useEffect(() => {
    const handleDeepLink = (url: string | null) => {
      if (!url) return;
      
      console.log('🔗 Deep link received:', url);
      
      // ✅ SOAL f: Tangani deep link warm start untuk modifikasi state
      if (url.startsWith('miniecom://add-to-cart/')) {
        const productId = url.replace('miniecom://add-to-cart/', '');
        if (productId) {
          console.log('🛒 Adding product to cart via deep link:', productId);
          // Simulasikan product object
          addToCart({ 
            id: productId, 
            name: `Product ${productId}`,
            price: 100000 // harga default
          });
        }
      }
    };

    // Handle cold start
    Linking.getInitialURL().then(url => {
      handleDeepLink(url);
    });

    // Handle warm start
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // ✅ SOAL f: Pastikan listener dibersihkan ketika unmount
    return () => {
      subscription.remove();
    };
  }, [addToCart]);
};