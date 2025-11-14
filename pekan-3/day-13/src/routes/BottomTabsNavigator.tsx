import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Product } from '../pages/Dashboard/Product';
import { Profile } from '../pages/Dashboard/Profile';
import { HomeStackNavigator } from './HomeStackNavigator';

export type BottomTabParamList = {
  HomeStack: undefined;
  Dashboard: undefined;
  Product: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'HomeStack') {
            iconName = 'house';
          } else if (route.name === 'Dashboard') {
            iconName = 'chart-column';
          } else if (route.name === 'Product') {
            iconName = 'box';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = 'circle-question';
          }

          return (
            <FontAwesome6 
              name={iconName as 'house'} 
              size={size} 
              color={color}
              iconStyle='solid'
            />
          );
        },
        tabBarActiveTintColor: '#FF3B30',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e8e8e8',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false, // Header akan ditangani oleh Stack Navigator
        lazy: true,
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator}
        options={{
          title: 'Beranda',
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Product" 
        component={Product}
        options={{
          title: 'Produk',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          title: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};