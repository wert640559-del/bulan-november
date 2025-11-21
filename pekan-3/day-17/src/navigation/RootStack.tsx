import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking, Alert } from 'react-native';
import { OnboardingScreen } from '../screens/Auth/OnboardingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import DrawerNav from './DrawerNav';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { addAnalyticsEvent } from '../../App';
import { simpleStorage } from '../services/storage';
import { getToken, removeToken } from '../services/keychain';
import { SplashScreen } from '../screens/SplashScreen';
import { useDeepLink } from '../hooks/useDeepLink';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  MainApp: undefined;
  Analytics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// ✅ SOAL j: Deep Linking Configuration
const linking = {
  prefixes: ['miniecom://'],
  config: {
    screens: {
      MainApp: {
        screens: {
          HomeStack: {
            screens: {
              Home: 'home',
              ProductDetail: 'product/:id'
            }
          },
          Profile: 'profile'
        }
      },
      Login: 'login'
    }
  },
  
  // Custom handling untuk deep linking
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url) {
      return handleDeepLinkValidation(url);
    }
    return null;
  },
  
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      listener(handleDeepLinkValidation(url));
    };

    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => subscription.remove();
  }
};

const handleDeepLinkValidation = (url: string): string => {
  console.log('🔗 Validating deep link:', url);
  
  // ✅ SOAL j: Validasi params - product ID harus angka
  if (url.includes('miniecom://product/')) {
    const productId = url.replace('miniecom://product/', '');
    if (!/^\d+$/.test(productId)) {
      console.log('❌ Invalid product ID, redirecting to home');
      Alert.alert('Tautan tidak valid', 'Tautan tidak valid, dialihkan ke beranda');
      return 'miniecom://home';
    }
  }
  
  return url;
};

export default function RootStack() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ SOAL f: Gunakan deep link handler
  useDeepLink();

  // ✅ SOAL g: Load semua data startup
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Load semua data secara paralel
      const [userData, token, cart, wishlistData] = await Promise.all([
        simpleStorage.get('@user_data'),
        getToken(),
        simpleStorage.get('@cart'),
        simpleStorage.multiGet(['@wishlist_ids', '@wishlist_meta'])
      ]);

      console.log('✅ All data loaded:', { 
        userData: !!userData, 
        token: !!token,
        cart: !!cart,
        wishlist: !!wishlistData['@wishlist_ids']
      });

      setUserData(userData);
      setIsLoggedIn(!!token);
      setShowOnboarding(!userData); // Tampilkan onboarding jika pertama kali

    } catch (error: any) {
      // ✅ SOAL c: Handle access denied error
      if (error.message && error.message.includes('access denied')) {
        Alert.alert(
          'Keamanan Diubah', 
          'Keamanan perangkat diubah, mohon login ulang.',
          [{ text: 'OK' }]
        );
        await removeToken();
      }
      console.log('❌ Error loading initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    addAnalyticsEvent('Onboarding completed');
  };

  const handleLogin = async (userData: any) => {
    // ✅ SIMPLE SAVE USER DATA
    await simpleStorage.save('@user_data', userData);
    setUserData(userData);
    setIsLoggedIn(true);
    addAnalyticsEvent('User login successful');
  };

  // ✅ SOAL h: Clear Storage - Logout function
  const handleLogout = async () => {
    console.log('🚪 Logging out...');
    
    try {
      // ✅ Hapus dari Keychain dan AsyncStorage secara paralel
      await Promise.all([
        removeToken(),
        simpleStorage.multiRemove(['@user_data', '@cart', '@cached_products', '@wishlist_ids', '@wishlist_meta'])
      ]);
      
      setIsLoggedIn(false);
      setUserData(null);
      addAnalyticsEvent('User logout');
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.log('❌ Logout error:', error);
    }
  };

  // ✅ SOAL j: Handle deep link dengan auth check
  const handleDeepLinkWithAuth = (url: string) => {
    if (url.includes('miniecom://product/') && !isLoggedIn) {
      // Simpan target URL untuk redirect setelah login
      simpleStorage.save('@pending_deeplink', url);
      // Arahkan ke login
      setIsLoggedIn(false);
    }
  };

  // Tampilkan splash screen saat loading
  if (isLoading) {
    return <SplashScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  // Tampilkan onboarding jika diperlukan
  if (showOnboarding) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen
              {...props}
              onComplete={handleOnboardingComplete}
              onSkip={handleOnboardingComplete}
              screen={0}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <LoginScreen
              {...props}
              onLogin={handleLogin}
              onNavigateToRegister={() => console.log('Navigate to register')}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="MainApp" options={{ headerShown: false }}>
          {(props) => (
            <DrawerNav 
              {...props} 
              userData={userData}
              onLogout={handleLogout}
            />
          )}
        </Stack.Screen>
      )}
      
      <Stack.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{ 
          title: 'Analytics History',
          presentation: 'modal'
        }}
      />
    </Stack.Navigator>
  );
}