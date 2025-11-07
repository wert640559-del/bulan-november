import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { ProductList } from './src/components/ProductList';
import { Product, ProductFormData } from './src/types';
import { initialProducts } from './src/data/initialProducts';
import { AddProductModal } from './src/components/AddProductModal';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchHeader } from './src/components/SearchHeader';

const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const insets = useSafeAreaInsets();

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  };

  const handleAddProduct = async (formData: ProductFormData): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    
    const newProduct: Product = {
      id: generateId(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description
    };

    setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = async (productId: string, formData: ProductFormData): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? {
              ...product,
              name: formData.name,
              price: Number(formData.price),
              image: formData.image,
              description: formData.description
            }
          : product
      )
    );
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingProduct(null);
  };

  const handleAddButtonPress = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery(''); // Clear search when closing
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[
        styles.container,
        { paddingTop: insets.top }
      ]}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>

        {/* Header dengan Search */}
        <SearchHeader
          searchVisible={searchVisible}
          searchQuery={searchQuery}
          onSearchToggle={handleSearchToggle}
          onSearchChange={handleSearchChange}
          onAddProduct={handleAddButtonPress}
        />

        {/* ProductList */}
        <View style={[
          styles.content,
          { paddingBottom: insets.bottom }
        ]}>
          <ProductList 
            products={filteredProducts}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            searchQuery={searchQuery}
          />
        </View>

        {/* Add Product Modal */}
        <AddProductModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onAddProduct={handleAddProduct}
          editingProduct={editingProduct}
          onUpdateProduct={handleUpdateProduct}
        />
      </View>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
});

export default App;