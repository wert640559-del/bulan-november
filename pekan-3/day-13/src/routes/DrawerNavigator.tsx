// FILE: ./routes/DrawerNavigator.tsx
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Home } from '../pages/Dashboard/Home';
import { Profile } from '../pages/Dashboard/Profile';
import { Product } from '../pages/Dashboard/Product';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Settings } from '../pages/Dashboard/Setting';
import { BottomTabsNavigator } from './BottomTabsNavigator';

const Drawer = createDrawerNavigator();

// Custom hook untuk drawer locking - EKSPORT hook ini
export const useDrawerLock = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [drawerLocked, setDrawerLocked] = useState(false);

  useEffect(() => {
    const currentRouteName = route.name;
    const lockedScreens = ['ProductDetail', 'Checkout'];
    const shouldLock = lockedScreens.includes(currentRouteName);

    console.log(`Drawer locking: ${shouldLock ? 'LOCKED' : 'UNLOCKED'} for ${currentRouteName}`);
    
    // Untuk Drawer Navigator, gunakan swipeEnabled saja
    navigation.setOptions({
      swipeEnabled: !shouldLock,
    });
  }, [navigation, route.name]);
};

// Component untuk Profile dengan drawer lock
const ProfileWithDrawerLock: React.FC<any> = (props) => {
  useDrawerLock();
  return <Profile {...props} />;
};

// Component untuk Settings dengan drawer lock  
const SettingsWithDrawerLock: React.FC<any> = (props) => {
  useDrawerLock();
  return <Settings {...props} />;
};

export default function DrawerNavigator() {
  const [drawerLocked, setDrawerLocked] = useState(false);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#FF3B30',
        swipeEnabled: !drawerLocked,
      }}
    >
      <Drawer.Screen
        name="MainApp"
        component={BottomTabsNavigator}
        options={{
          title: "Rits Marketplace",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="house" size={size} color={color} iconStyle="solid" />
          ),
          headerShown: false, // Header ditangani oleh child navigators
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileWithDrawerLock}
        options={{
          title: "Profil",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="user" size={size} color={color} iconStyle="solid" />
          ),
        }}
      />

      <Drawer.Screen
        name="Product"
        component={Product}
        options={{
          title: "Produk",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="box" size={size} color={color} iconStyle="solid" />
          ),
        }}
      />

      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="chart-column" size={size} color={color} iconStyle="solid" />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsWithDrawerLock}
        options={{
          title: "Pengaturan",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="gear" size={size} color={color} iconStyle="solid" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}