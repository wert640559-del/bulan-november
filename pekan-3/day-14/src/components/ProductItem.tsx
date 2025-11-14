import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Product } from '../types/types'; 

interface ProductItemProps {
  product: Product;
  onPress: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onPress }) => {
  const { width } = useWindowDimensions();
  const isLandscape = width > 600;
  
  return (
    <TouchableOpacity 
      style={[styles.container, isLandscape && styles.landscapeContainer]} 
      onPress={onPress}
    >
      <Image 
        source={product.image} 
        style={[styles.image, isLandscape && styles.landscapeImage]} 
        defaultSource={{ uri: 'https://picsum.photos/300/200' }}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        {product.category && (
          <Text style={styles.category}>{product.category}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  landscapeContainer: {
    flexDirection: 'row',
    height: 120,
  },
  image: {
    width: '100%',
    height: 150,
  },
  landscapeImage: {
    width: 120,
    height: '100%',
  },
  info: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});