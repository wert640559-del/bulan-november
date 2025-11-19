import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/Auth/OnboardingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import DrawerNav from './DrawerNav';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { addAnalyticsEvent } from '../../App';
import { simpleStorage } from '../services/storage';
import { getToken, removeToken } from '../services/keychain';
import { Alert } from 'react-native';

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
    try {
      const [userData, token] = await Promise.all([
        simpleStorage.get('@user_data'),
        getToken(),
      ]);

      console.log('Load data:', { userData: !!userData, token: !!token });

      if (userData && token) {
        setUserData(userData);
        setIsLoggedIn(true);
        setShowOnboarding(false);
      }
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
    
    // ✅ SOAL d: Hapus dari Keychain dan AsyncStorage
    await removeToken();
    await simpleStorage.multiRemove(['@user_data', '@cart', '@cached_products']);
    
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