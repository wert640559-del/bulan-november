import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useDrawerLock } from '../hooks//useDrawerLock';
import { Text } from 'react-native';

export type BottomTabParamList = {
  HomeStack: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface BottomTabsProps {
  userData?: any;
  onDrawerLockChange?: (locked: boolean) => void;
}

export default function BottomTabs({ userData, onDrawerLockChange }: BottomTabsProps) {
  // Gunakan custom hook untuk drawer locking
  useDrawerLock(onDrawerLockChange);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e8e8e8',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }}
      >
        {(props) => <HomeStack {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👤</Text>
          ),
        }}
      >
        {(props) => (
          <ProfileScreen 
            {...props}
            isAuthenticated={!!userData}
            userID={userData?.userID}
            username={userData?.username}
            email={userData?.email}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}