// FILE: ./App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import RootNavigator from './src/routes/RootNavigator';
import { ProductsProvider } from './src/context/ProductContext';
 // Import CartProvider

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <CartProvider> {/* Wrap dengan CartProvider */}
          <RootNavigator />
        </CartProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}