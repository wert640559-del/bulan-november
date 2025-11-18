import React from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, 
  useWindowDimensions, Alert 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '../types/types'; 
import { useDrawerLock } from '../hooks/useDrawerLock';

export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  const { product } = route.params as { product: Product };
  
  // Lock drawer di detail screen
  useDrawerLock();

  const handleCheckout = () => {
    navigation.navigate('Checkout' as any, { 
      productId: product.id,
      product 
    });
  };

  const handleResetStack = () => {
    // Reset ke home dan close drawer
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' as any }],
    });
    
    // Close drawer programmatically
    navigation.getParent()?.closeDrawer();
    
    Alert.alert('Sukses', 'Navigasi direset ke Home');
  };

  const handleBackToDrawerHome = () => {
    // Navigate back ke parent drawer
    const parent = navigation.getParent();
    if (parent) {
      parent.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleToggleDrawer = () => {
    // Toggle drawer dari child component
    navigation.getParent()?.toggleDrawer();
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={isLandscape && styles.landscapeContent}
    >
      <Image 
        source={product.image} 
        style={[styles.image, isLandscape && styles.landscapeImage]} 
      />
      
      <View style={[styles.content, isLandscape && styles.landscapeInfo]}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {product.specifications && (
          <View style={styles.specs}>
            <Text style={styles.specsTitle}>Spesifikasi:</Text>
            {product.specifications.map((spec, index) => (
              <Text key={index} style={styles.specItem}>• {spec}</Text>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Beli Sekarang</Text>
        </TouchableOpacity>

        {/* Cross-Level Navigation Actions */}
        <View style={styles.navigationActions}>
          <Text style={styles.actionsTitle}>Aksi Navigasi Lanjutan:</Text>
          
          <TouchableOpacity style={styles.navButton} onPress={handleToggleDrawer}>
            <Text style={styles.navButtonText}>Toggle Drawer</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={handleResetStack}>
            <Text style={styles.navButtonText}>Reset ke Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={handleBackToDrawerHome}>
            <Text style={styles.navButtonText}>Kembali ke Drawer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  landscapeContent: {
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 300,
  },
  landscapeImage: {
    width: '40%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  landscapeInfo: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 28,
    color: '#FF3B30',
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  specs: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  specsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  specItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  checkoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  navigationActions: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 16,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  navButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});