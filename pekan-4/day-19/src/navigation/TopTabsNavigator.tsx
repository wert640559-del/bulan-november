import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductList from '../components/ProductList';

const Tab = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { 
                    fontSize: 12,
                    fontWeight: '600',
                    textTransform: 'none'
                },
                tabBarItemStyle: { 
                    width: 'auto',
                    paddingHorizontal: 8
                },
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: {
                    backgroundColor: '#007AFF'
                }
            }}
        >
            <Tab.Screen name="Semua">
                {() => <ProductList category="semua" />}
            </Tab.Screen>
            <Tab.Screen name="Elektronik">
                {() => <ProductList category="electronics" />}
            </Tab.Screen>
            <Tab.Screen name="Kecantikan">
                {() => <ProductList category="beauty" />}
            </Tab.Screen>
            <Tab.Screen name="Parfum">
                {() => <ProductList category="fragrances" />}
            </Tab.Screen>
            <Tab.Screen name="Furnitur">
                {() => <ProductList category="furniture" />}
            </Tab.Screen>
            <Tab.Screen name="Makanan">
                {() => <ProductList category="groceries" />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}