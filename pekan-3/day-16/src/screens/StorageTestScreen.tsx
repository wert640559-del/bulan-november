import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAdvancedCart } from '../hooks/useAdvancedCart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageTestScreen: React.FC = () => {
  const { cartCount, addToCart, clearCart } = useAdvancedCart();

  const testStorageFull = async () => {
    // Simulasi isi storage sampai penuh
    const bigData = new Array(10000).fill('test data').join('');
    try {
      await AsyncStorage.setItem('@test_big_data', bigData);
      Alert.alert('Success', 'Storage test completed');
    } catch (error: any) {
      if (error.message.includes('QuotaExceeded')) {
        Alert.alert('Storage Full', 'Quota exceeded error handled!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Cart Items: {cartCount}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => addToCart({id: 'test'})}>
        <Text>Add Test Item</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testStorageFull}>
        <Text>Test Storage Full</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={clearCart}>
        <Text>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, margin: 10, borderRadius: 8 }
});