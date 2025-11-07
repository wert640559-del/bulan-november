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

interface SearchHeaderProps {
  searchVisible: boolean;
  searchQuery: string;
  onSearchToggle: () => void;
  onSearchChange: (query: string) => void;
  onAddProduct: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchVisible,
  searchQuery,
  onSearchToggle,
  onSearchChange,
  onAddProduct
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searchVisible) {
      // Animate search input in
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
      // Animate search input out
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
    outputRange: [-50, 0], // Slide from left
  });

  const opacityInterpolate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  if (searchVisible) {
    return (
      <View style={styles.header}>
        {/* Back Button and Search Input */}
        <View style={styles.searchContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onSearchToggle}
          >
            <Text style={styles.backButtonText}>←</Text>
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
      {/* Normal Header */}
      <Text style={styles.headerTitle}>Rits Marketplace</Text>
      
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={styles.searchIconButton}
          onPress={onSearchToggle}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={onAddProduct}
        >
          <Text style={styles.addButtonText}>➕ Jual</Text>
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
    gap: 12,
  },
  searchIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  searchIcon: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
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
  backButtonText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
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