import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface SplashScreenProps {
  onLoadComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini E-Commerce</Text>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Memuat aplikasi...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});