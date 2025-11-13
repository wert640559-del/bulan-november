// Dalam Home.tsx, tambahkan navigation ke cart dan state untuk cart items
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ProductList } from '../../components/ProductList';
import { Product, ProductFormData } from '../../types';
import { initialProducts } from '../../data/initialProducts';
import { AddProductModal } from '../../components/AddProductModal';
import { SearchHeader } from '../../components/SearchHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useCart } from '../../context/CartContext';

// Define types untuk navigation
type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Product: undefined;
  Dashboard: undefined;
  Settings: undefined;
};

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

const Tab = createMaterialTopTabNavigator();

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartItemCount } = useCart();

  
  // State untuk cart items (simulasi)
  const [cartItemCount, setCartItemCount] = useState(3); // Default 3 items
  
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

  const handleAddProduct = async (formData: ProductFormData) => {
    const newProduct: Product = {
      id: generateId(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = async (productId: string, formData: ProductFormData) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, ...formData, price: Number(formData.price) }
          : product
      )
    );
    setEditingProduct(null);
  };

  // Handler untuk tombol cart
  const handleCartPress = () => {
    navigation.navigate('Cart' as any);
  };

  // Handler untuk add to cart dari product list (optional)
  const handleAddToCart = (product: Product) => {
    setCartItemCount(prev => prev + 1);
    // Bisa tambahkan Alert atau feedback lainnya
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cross-level action: Toggle drawer dari child component
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  // Komponen untuk Tab Populer dengan dynamic header
 const PopularTabScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      console.log('Tab Populer aktif - Mengubah header');
      return () => {
        console.log('Tab Populer tidak aktif');
      };
    }, [])
  );

  const handleProductPress = (product: Product) => {
    // Navigasi ke ProductDetail di Stack Navigator parent
    navigation.navigate('ProductDetail', { 
      productId: product.id 
    });
  };

  return (
    <View style={styles.tabContainer}>
      <ProductList
        products={filteredProducts}
        onEditProduct={setEditingProduct}
        onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
        searchQuery={searchQuery}
        onProductPress={handleProductPress} // Gunakan handler baru
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

  // Komponen untuk tab lainnya
  const ProductTabScreen = ({ category }: { category?: string }) => {
    useFocusEffect(
      useCallback(() => {
        console.log(`${category || 'Default'} tab aktif`);
        
        // Reset header untuk tab selain Populer
        if (category !== 'Populer') {
          navigation.setOptions({
            title: 'Rits Marketplace',
            headerRight: undefined,
          });
        }

        return () => {
          console.log(`${category || 'Default'} tab tidak aktif`);
        };
      }, [category, navigation])
    );

    return (
      <View style={styles.tabContainer}>
        <ProductList
          products={filteredProducts}
          onEditProduct={setEditingProduct}
          onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
          searchQuery={searchQuery}
          onProductPress={(product) => console.log('Product pressed:', product.name)}
          onAddToCart={handleAddToCart} // Optional: tambahkan handler untuk add to cart
        />
      </View>
    );
  };

  const categories = [
    'Populer',
    'Terbaru',
    'Diskon',
    'Pakaian',
    'Makanan',
    'Otomotif',
    'Hiburan',
    'Perlengkapan Bayi'
  ];

  return (
    <View style={styles.container}>
      <SearchHeader
        searchVisible={searchVisible}
        searchQuery={searchQuery}
        onSearchToggle={() => {
          setSearchVisible(!searchVisible);
          if (searchVisible) setSearchQuery('');
        }}
        onSearchChange={setSearchQuery}
        onAddProduct={() => {
          setEditingProduct(null);
          setModalVisible(true);
        }}
        onCartPress={handleCartPress} // Tambahkan handler untuk cart
        cartItemCount={getCartItemCount()} // Kirim jumlah item cart
      />

      <View style={styles.content}>
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            lazyPreloadDistance: 1,
            tabBarIndicatorStyle: { backgroundColor: '#FF3B30' },
            tabBarLabelStyle: { 
              textTransform: 'none', 
              fontSize: 14,
              fontWeight: '600'
            },
            swipeEnabled: true,
            tabBarScrollEnabled: true,
            tabBarItemStyle: { width: 'auto', minWidth: 100 },
            tabBarActiveTintColor: '#FF3B30',
            tabBarInactiveTintColor: '#6c757d',
            tabBarStyle: {
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#e8e8e8',
            },
          }}
        >
          <Tab.Screen
            name="Populer"
            component={PopularTabScreen}
          />
          {categories.slice(1).map(cat => (
            <Tab.Screen
              key={cat}
              name={cat}
              children={() => <ProductTabScreen category={cat} />}
            />
          ))}
        </Tab.Navigator>
      </View>

      <AddProductModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
        onAddProduct={handleAddProduct}
        editingProduct={editingProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  content: { 
    flex: 1 
  },
  tabContainer: { 
    flex: 1 
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  toggleDrawerButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  toggleDrawerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  crossActionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  crossActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  crossActionButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  crossActionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  crossActionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default Home;