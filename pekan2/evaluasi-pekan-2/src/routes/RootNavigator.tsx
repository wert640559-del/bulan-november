import React, { useRef } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../pages/Auth/LoginScreen';
import { RegisterScreen } from '../pages/Auth/RegisterScreen';
import DrawerNavigator from './DrawerNavigator';
import { AnalyticsHistoryScreen } from '../pages/AnalyticsHistoryScreen';
import { ProductDetailScreen } from '../pages/ProductDetailScreen';
import { CheckoutScreen } from '../pages/CheckoutScreen';
import CartScreen from '../pages/CartScreen';
import { CartProvider } from '../context/CartContext';
import { ProductsProvider } from '../context/ProductContext';

const Stack = createNativeStackNavigator();

// Global analytics state
let analyticsHistory: string[] = [];

export const addAnalyticsEvent = (event: string) => {
  const timestamp = new Date().toLocaleTimeString();
  analyticsHistory.push(`[${timestamp}] ${event}`);
  console.log(`[ANALYTICS] ${event}`);
};

export const getAnalyticsHistory = () => [...analyticsHistory];

export const clearAnalyticsHistory = () => {
  analyticsHistory = [];
};

// Helper function to get active route name
const getActiveRouteName = (state: NavigationState): string => {
  if (!state) return 'Unknown';
  
  const route = state.routes[state.index ?? 0];
  
  if (route.state) {
    return getActiveRouteName(route.state as NavigationState);
  }
  
  return route.name;
};

// Custom hook untuk analytics tracking
const useAnalyticsTracker = () => {
  const routeNameRef = useRef<string>('Unknown');
  
  const handleStateChange = (state: NavigationState | undefined) => {
    if (!state) return;
    
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);
    
    if (previousRouteName !== currentRouteName) {
      addAnalyticsEvent(`Navigated from ${previousRouteName} to ${currentRouteName}`);
      
      // Log informasi nested structure
      const routeStack = getRouteStack(state);
      addAnalyticsEvent(`Route Stack: ${routeStack.join(' → ')}`);
    }
    
    routeNameRef.current = currentRouteName;
  };

  const getRouteStack = (state: NavigationState): string[] => {
    const stack: string[] = [];
    
    const traverseRoutes = (navState: NavigationState) => {
      const route = navState.routes[navState.index ?? 0];
      stack.push(route.name);
      
      if (route.state) {
        traverseRoutes(route.state as NavigationState);
      }
    };
    
    traverseRoutes(state);
    return stack;
  };

  return { handleStateChange };
};

export default function RootNavigator() {
  const { handleStateChange } = useAnalyticsTracker();

  return (
    <ProductsProvider>
      <CartProvider>
        <NavigationContainer onStateChange={handleStateChange}>
          <Stack.Navigator 
            initialRouteName="Login" 
            screenOptions={{ 
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            {/* Auth Screens */}
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              listeners={{
                focus: () => addAnalyticsEvent('Login Screen focused'),
              }}
            />
            
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              listeners={{
                focus: () => addAnalyticsEvent('Register Screen focused'),
              }}
            />
            
            {/* Main App dengan Nested Navigation */}
            <Stack.Screen 
              name="MainApp" 
              component={DrawerNavigator}
              initialParams={{ 
                userToken: 'DEMO_TOKEN_123', // SOAL PRAKTIK 5: Token untuk auth guard
                userID: 'U123'
              }}
              listeners={{
                focus: () => addAnalyticsEvent('Main App Drawer focused'),
              }}
            />
            
            {/* Modal Screens */}
            <Stack.Screen 
              name="AnalyticsHistory" 
              component={AnalyticsHistoryScreen}
              options={{ 
                headerShown: true, 
                title: 'Analytics History',
                presentation: 'modal',
                animation: 'slide_from_bottom'
              }}
              listeners={{
                focus: () => addAnalyticsEvent('Analytics History Modal opened'),
              }}
            />
            
            {/* Product Flow Screens */}
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
              options={{ 
                headerShown: true,
                title: 'Detail Produk',
                presentation: 'card',
                animation: 'slide_from_right'
              }}
              listeners={{
                focus: () => addAnalyticsEvent('Product Detail Screen focused'),
              }}
            />
            
            <Stack.Screen 
              name="Checkout" 
              component={CheckoutScreen}
              options={{ 
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_bottom'
              }}
              listeners={{
                focus: () => addAnalyticsEvent('Checkout Modal opened'),
              }}
            />
            
            <Stack.Screen 
              name="Cart" 
              component={CartScreen}
              options={{ 
                headerShown: true,
                title: 'Keranjang Belanja',
                presentation: 'card'
              }}
              listeners={{
                focus: () => addAnalyticsEvent('Cart Screen focused'),
              }}
            />
            
            {/* ✅ SOLUSI: Group dengan children atau hapus Group jika tidak digunakan */}
            {/* 
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
                animation: 'fade'
              }}
            >
              {/* Future modal screens bisa ditambahkan di sini */}
              {/* Contoh: <Stack.Screen name="CustomModal" component={CustomModal} /> */}
            {/* </Stack.Group> 
            */}
            
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </ProductsProvider>
  );
}

// Export types untuk TypeScript
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainApp: { 
    userToken?: string;
    userID?: string;
  };
  AnalyticsHistory: undefined;
  ProductDetail: { productId: string };
  Checkout: { productId: string };
  Cart: undefined;
};

// Extend Native Stack Navigation Prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}