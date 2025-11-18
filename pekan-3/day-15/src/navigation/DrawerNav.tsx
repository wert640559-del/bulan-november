import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import { SettingsScreen } from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props: any) => {
  const navigation = useNavigation();
  const { userID, username, email } = props.userData || {};
  const { onLogout } = props;

  // ✅ SIMPLE LOGOUT HANDLER
  const handleLogout = () => {
    console.log('🗑️ Logout clicked');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.drawerHeader}>
        <Image 
          source={{ uri: 'https://picsum.photos/100/100?random=avatar' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{username || 'Guest'}</Text>
        <Text style={styles.userEmail}>{email || 'guest@example.com'}</Text>
        {userID && <Text style={styles.userId}>ID: {userID}</Text>}
      </View>

      <DrawerItem
        label="Beranda"
        onPress={() => navigation.navigate('Main' as any)}
        labelStyle={styles.drawerLabel}
      />
      <DrawerItem
        label="Pengaturan"
        onPress={() => navigation.navigate('Settings' as any)}
        labelStyle={styles.drawerLabel}
      />

      {/* ✅ LOGOUT BUTTON */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// Main Drawer Navigator
interface DrawerNavProps {
  route?: any;
  userData?: any;
  onLogout?: () => void; // ✅ TERIMA PROPS ONLOGOUT
}

export default function DrawerNav({ route, userData, onLogout }: DrawerNavProps) {
  const [drawerLocked, setDrawerLocked] = useState(false);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent 
          {...props} 
          userData={userData} 
          onLogout={onLogout} // ✅ PASS KE CUSTOM DRAWER
        />
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        swipeEnabled: !drawerLocked,
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Main">
        {(props) => (
          <BottomTabs 
            {...props} 
            userData={userData}
            onDrawerLockChange={setDrawerLocked}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Settings">
        {(props) => (
          <SettingsScreen 
            {...props}
            onDrawerLockChange={setDrawerLocked}
            drawerLocked={drawerLocked}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userId: {
    fontSize: 12,
    color: '#999',
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    marginTop: 'auto',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});