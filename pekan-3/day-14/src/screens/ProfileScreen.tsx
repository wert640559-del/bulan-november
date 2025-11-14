import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthGuard } from '../components/AuthGuard';

interface ProfileScreenProps {
  isAuthenticated?: boolean;
  userID?: string;
  username?: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  isAuthenticated = false, 
  userID,
  username 
}) => {
  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        
        <View style={styles.userInfo}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{userID}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{username}</Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, styles.status]}>Terverifikasi</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Pesanan</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
        </View>
      </View>
    </AuthGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  status: {
    color: '#34C759',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});