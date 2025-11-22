import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, isAuthenticated }) => {
  console.log('🔐 AuthGuard - isAuthenticated:', isAuthenticated); // ✅ DEBUG
  
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Harap Login</Text>
        <Text style={styles.message}>Silakan login untuk mengakses fitur ini</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});