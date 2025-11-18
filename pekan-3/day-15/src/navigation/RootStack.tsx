import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/Auth/OnboardingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import DrawerNav from './DrawerNav';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { addAnalyticsEvent } from '../../App';
import { simpleStorage } from '../services/storage';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  MainApp: undefined;
  Analytics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // ✅ SIMPLE CHECK LOGIN STATUS
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
  // ✅ MULTI-GET untuk load semua data sekaligus
    const initialData = await simpleStorage.multiGet([
      '@user_data',
      '@app_theme', 
      '@notification_status'
    ]);

    console.log('📦 Initial data loaded:', initialData);

    if (initialData['@user_data']) {
      setUserData(initialData['@user_data']);
      setIsLoggedIn(true);
      setShowOnboarding(false);
    }

    // Bisa pakai data lain juga
    if (initialData['@app_theme']) {
      console.log('Theme:', initialData['@app_theme']);
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
  };

  // ✅ SIMPLE LOGOUT FUNCTION
  const handleLogout = async () => {
    console.log('🚪 Logging out...');
    
    // ✅ MULTI-REMOVE untuk hapus semua data sensitif
    const success = await simpleStorage.multiRemove([
      '@user_data',
      '@cart',
      '@cached_products'
      // Bisa tambah key lain: '@app_theme', '@notifications', dll
    ]);
    
    if (success) {
      console.log('✅ All user data cleared');
    }
    
    setIsLoggedIn(false);
    setUserData(null);
    addAnalyticsEvent('User logout');
  };

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
              onLogout={handleLogout} // ✅ KIRIM LOGOUT FUNCTION
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