import React, { useState, useEffect, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, 
  ActivityIndicator, useWindowDimensions, Alert 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ProductItem } from '../components/ProductItem';
import { ProductForm } from '../components/ProductForm'; 
import { productService } from '../services/api';
import { Product, ProductFormData } from '../types/types';
import { categories, initialProducts } from '../types/data';
import { useNetwork } from '../context/NetworkContext';


const Tab = createMaterialTopTabNavigator();

// Product List Component dengan API
const ProductList: React.FC<{ 
  category: string; 
  onProductPress: (product: Product) => void;
  localProducts: Product[];
}> = ({ category, onProductPress, localProducts }) => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const isLandscape = width > 600;
  const numColumns = isLandscape ? 2 : 2;
  const netInfo = useNetwork(); // ✅ TAMBAHKAN INI

  const fetchProducts = useCallback(async () => {
    if (!netInfo.isConnected) {
      setError('Tidak ada koneksi internet');
      return;
    }

    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    try {
      const result = await productService.getProducts(controller.signal);
      
      if (result.success && result.data) {
        // Transform API data ke format kita
        const transformedProducts: Product[] = result.data.products.slice(0, 10).map((apiProduct: any) => ({
          id: apiProduct.id.toString(),
          name: apiProduct.title,
          price: apiProduct.price,
          image: { uri: apiProduct.thumbnail },
          description: apiProduct.description,
          category: apiProduct.category,
          specifications: [
            `Brand: ${apiProduct.brand}`,
            `Rating: ${apiProduct.rating}/5`,
            `Stock: ${apiProduct.stock}`,
            `Category: ${apiProduct.category}`
          ]
        }));
        
        setApiProducts(transformedProducts);
      } else {
        setError(result.error || 'Gagal memuat produk');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setError('Request timeout - terlalu lama memuat');
      } else {
        setError('Gagal memuat data dari API');
      }
    } finally {
      setLoading(false);
      clearTimeout(timeoutId);
    }

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [netInfo.isConnected]);

  useFocusEffect(
    useCallback(() => {
      if (category === 'Populer') {
        fetchProducts();
      }
    }, [category, fetchProducts])
  );

  // Combine local and API products
  const allProducts = [...localProducts, ...apiProducts];
  
  // ✅ PERBAIKI FILTER PRODUCTS
  const filteredProducts = allProducts.filter(product => {
    switch (category) {
      case 'Populer':
        return apiProducts.length > 0 ? apiProducts.includes(product) : true;
      case 'Terbaru':
        return localProducts.includes(product);
      case 'Diskon':
        return product.price > 1000000; // Contoh: produk dengan harga > 1jt
      case 'Elektronik':
        return product.category === 'electronics';
      case 'Pakaian':
        return product.category === 'fashion';
      case 'Makanan':
        return product.category === 'food';
      case 'Otomotif':
        return product.category === 'automotive';
      case 'Hiburan':
        return product.category === 'entertainment';
      case 'Perlengkapan Bayi':
        return product.category === 'baby';
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Memuat produk...</Text>
      </View>
    );
  }

  if (error && allProducts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={[styles.productContainer, { flex: 1 / numColumns }]}>
          <ProductItem 
            product={item} 
            onPress={() => onProductPress(item)}
          />
        </View>
      )}
      numColumns={2}
      columnWrapperStyle={isLandscape ? styles.columnWrapper : undefined}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tidak ada produk di kategori {category}</Text>
        </View>
      }
    />
  );
};

// Main Home Screen
export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [localProducts, setLocalProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
      category: formData.category || 'general',
    };
    setLocalProducts(prev => [newProduct, ...prev]);
    setModalVisible(false);
    Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { 
      productId: product.id,
      product 
    });
  };

  // Dynamic header title untuk tab Populer
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: 'Product ter Populer!'
      });

      return () => {
        navigation.setOptions({
          title: 'Jelajahi Produk'
        });
      };
    }, [navigation])
  );

  const renderTabScreen = (category: string) => (
    <ProductList 
      category={category}
      onProductPress={handleProductPress}
      localProducts={localProducts}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Tambah Produk</Text>
      </TouchableOpacity>

      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#007AFF' },
          tabBarLabelStyle: { 
            textTransform: 'none', 
            fontSize: 14,
            fontWeight: '600'
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: 'auto' },
          tabBarStyle: {
            backgroundColor: '#fff',
          },
          lazy: true,
          lazyPreloadDistance: 1,

        }}
      >
        {categories.map((category) => (
          <Tab.Screen 
            key={category} 
            name={category}
            children={() => renderTabScreen(category)}
            listeners={{
              focus: () => {
                if (category === 'Diskon') {
                  console.log('Tab Diskon aktif - memuat konten');
                }
              },
              blur: () => {
                if (category === 'Diskon') {
                  console.log('Tab Diskon tidak aktif - membersihkan');
                }
              }
            }}
          />
        ))}
      </Tab.Navigator>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 8,
  },
  productContainer: {
    margin: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});