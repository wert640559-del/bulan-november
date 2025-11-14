import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/Auth/OnboardingScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import DrawerNav from './DrawerNav';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { addAnalyticsEvent } from '../../App';

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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    addAnalyticsEvent('Onboarding completed');
  };

  const handleLogin = (userData: any) => {
    console.log('🔑 Login successful, setting state...');
    setUserData(userData);
    setIsLoggedIn(true);
    addAnalyticsEvent(`User login: ${userData.username}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    addAnalyticsEvent('User logout');
  };

  // TAMPILKAN ONBOARDING JIKA BELUM SELESAI
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

  // TAMPILKAN LOGIN ATAU MAIN APP BERDASARKAN isLoggedIn
  return (
    <Stack.Navigator>
      {!isLoggedIn ? (
        // TAMPILKAN LOGIN SCREEN JIKA BELUM LOGIN
        <Stack.Screen 
          name="Login" 
          options={{ headerShown: false }}
        >
          {(props) => (
            <LoginScreen
              {...props}
              onLogin={handleLogin}
              onNavigateToRegister={() => console.log('Navigate to register')}
            />
          )}
        </Stack.Screen>
      ) : (
        // TAMPILKAN MAIN APP JIKA SUDAH LOGIN
        <Stack.Screen 
          name="MainApp" 
          options={{ headerShown: false }}
        >
          {(props) => (
            <DrawerNav 
              {...props} 
              userData={userData}
              onLogout={handleLogout}
            />
          )}
        </Stack.Screen>
      )}
      
      {/* Analytics screen tetap available */}
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