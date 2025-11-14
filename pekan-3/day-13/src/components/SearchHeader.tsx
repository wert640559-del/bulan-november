// FILE: ./components/SearchHeader.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

interface SearchHeaderProps {
  searchVisible: boolean;
  searchQuery: string;
  onSearchToggle: () => void;
  onSearchChange: (query: string) => void;
  onAddProduct: () => void;
  onCartPress: () => void; // Tambahkan prop baru untuk cart
  cartItemCount?: number; // Tambahkan prop untuk jumlah item di cart
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchVisible,
  searchQuery,
  onSearchToggle,
  onSearchChange,
  onAddProduct,
  onCartPress, // Terima prop baru
  cartItemCount = 0 // Default 0
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searchVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [searchVisible]);

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const opacityInterpolate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (searchVisible) {
    return (
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onSearchToggle}
          >
            <FontAwesome6 name="arrow-left" size={20} color="#333" iconStyle='solid' />
          </TouchableOpacity>
          
          <Animated.View 
            style={[
              styles.searchInputContainer,
              {
                transform: [{ translateX: slideInterpolate }],
                opacity: opacityInterpolate
              }
            ]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Cari produk..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={onSearchChange}
              autoFocus={true}
            />
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Rits Marketplace</Text>
      
      <View style={styles.headerButtons}>
        {/* Tombol Pencarian */}
        <TouchableOpacity 
          style={styles.searchIconButton}
          onPress={onSearchToggle}
        >
          <FontAwesome6 name="magnifying-glass" size={18} color="#333" iconStyle='solid'/>
        </TouchableOpacity>
        
        {/* Tombol Keranjang dengan Badge */}
        <TouchableOpacity 
          style={styles.cartIconButton}
          onPress={onCartPress}
        >
          <FontAwesome6 name="cart-shopping" size={18} color="#333" iconStyle='solid'/>
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Tombol Jual */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddProduct}
        >
          <FontAwesome6 name="plus" size={16} color="#fff" iconStyle='solid'/>
          <Text style={styles.addButtonText}>Jual</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF3B30',
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Kurangi gap agar lebih compact
  },
  searchIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  cartIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    position: 'relative', // Untuk badge positioning
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
});