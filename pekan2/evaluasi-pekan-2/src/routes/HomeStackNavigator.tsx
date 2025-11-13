import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../pages/Dashboard/Home';
import { ProductDetailScreen } from '../pages/ProductDetailScreen';
import { CheckoutScreen } from '../pages/CheckoutScreen';

export type HomeStackParamList = {
  HomeTabs: undefined;
  ProductDetail: { productId: string };
  Checkout: { productId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="HomeTabs" 
        component={Home}
        options={{ 
          headerShown: true,
          title: 'Rits Marketplace',
          headerRight: () => null, // Kita akan handle header buttons di Home component
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ 
          headerShown: true,
          title: 'Detail Produk',
          presentation: 'card',
        }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ 
          headerShown: true,
          title: 'Checkout',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};