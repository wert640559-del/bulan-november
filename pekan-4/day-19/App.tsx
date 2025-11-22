import React, { useRef } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigation/RootStack';
import ErrorBoundary from './src/components/ErrorBoundary';
import { NetworkProvider } from './src/context/NetworkContext'; 

// Global analytics
let analyticsHistory: string[] = [];

export const addAnalyticsEvent = (event: string) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${event}`;
  analyticsHistory.unshift(logEntry);
  // Keep only last 100 events
  if (analyticsHistory.length > 100) {
    analyticsHistory = analyticsHistory.slice(0, 100);
  }
  console.log('📊 Analytics:', logEntry);
};

export const getAnalyticsHistory = (): string[] => {
  return [...analyticsHistory];
};

export const clearAnalyticsHistory = () => {
  analyticsHistory = [];
};

export default function App() {
  const routeNameRef = useRef<string>();

  const handleStateChange = (state: NavigationState | undefined) => {
    if (!state) return;
    
    const currentRouteName = getActiveRouteName(state);
    
    if (routeNameRef.current !== currentRouteName) {
      addAnalyticsEvent(`Navigated to: ${currentRouteName}`);
      routeNameRef.current = currentRouteName;
    }
  };

  const getActiveRouteName = (state: NavigationState): string => {
    const route = state.routes[state.index ?? 0];
    if (route.state) {
      return getActiveRouteName(route.state as NavigationState);
    }
    return route.name;
  };

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <NetworkProvider>
          <NavigationContainer 
            onStateChange={handleStateChange}
            // ✅ SOAL j: Tambahkan linking configuration
            linking={{
              prefixes: ['miniecom://'],
              config: {
                screens: {
                  MainApp: {
                    screens: {
                      HomeStack: {
                        screens: {
                          Home: 'home',
                          ProductDetail: 'product/:id',
                          Checkout: 'checkout'
                        }
                      },
                      Profile: 'profile'
                    }
                  },
                  Login: 'login'
                }
              },
            }}
          >
            <RootStack />
          </NavigationContainer>
        </NetworkProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}