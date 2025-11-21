import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthGuard } from '../components/AuthGuard';

interface ProfileScreenProps {
  isAuthenticated?: boolean;
  userID?: string;
  username?: string;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  isAuthenticated = false, 
  userID,
  username,
  onLogout 
}) => {
  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        
        <View style={styles.userInfo}>
          <Text>User ID: {userID}</Text>
          <Text>Username: {username}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </AuthGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});