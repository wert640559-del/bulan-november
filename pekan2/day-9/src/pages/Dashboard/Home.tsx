import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductList } from '../../components/ProductList';
import { Product, ProductFormData } from '../../types';
import { initialProducts } from '../../data/initialProducts';
import { AddProductModal } from '../../components/AddProductModal';
import { SearchHeader } from '../../components/SearchHeader';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
      setSearchQuery('');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductPress = (product: Product) => {
    console.log('Product pressed:', product.name);
    // Navigate to product detail
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header dengan Search */}
      <SearchHeader
        searchVisible={searchVisible}
        searchQuery={searchQuery}
        onSearchToggle={handleSearchToggle}
        onSearchChange={handleSearchChange}
        onAddProduct={handleAddButtonPress}
      />

      {/* ProductList */}
      <View style={styles.content}>
        <ProductList 
          products={filteredProducts}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          searchQuery={searchQuery}
          onProductPress={handleProductPress}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
});