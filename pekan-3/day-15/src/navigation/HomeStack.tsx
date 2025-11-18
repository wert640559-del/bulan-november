import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { 
    productId: string;
    product?: any;
  };
  Checkout: { 
    productId: string;
    product: any;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

interface HomeStackProps {
  userData?: any;
}

export default function HomeStack({ userData }: HomeStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackTitle: 'Kembali',
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Jelajahi Produk',
          headerLeft: () => null, // Remove back button from home
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({ 
          title: route.params.product?.name || 'Detail Produk',
        })}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{ 
          title: 'Checkout',
          presentation: 'modal',
          headerShown: false, // Fullscreen modal
        }}
      />
    </Stack.Navigator>
  );
}