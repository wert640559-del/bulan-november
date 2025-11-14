// FILE: ./components/ProductList.tsx
import React from "react"
import { Product } from "../types"
import { FlatList, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from "react-native"
import { ProductItem } from "./ProductItem"
import { useNavigation } from "@react-navigation/native"

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  searchQuery?: string;
  onProductPress: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products,
  searchQuery = '',
  onProductPress
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const navigation = useNavigation();
  
  // Tentukan jumlah kolom berdasarkan orientasi layar
  const numColumns = isLandscape ? 3 : 2;

  // Hitung lebar item dengan margin
  const itemWidth = (width - 24) / numColumns;

  const renderGridItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={[styles.gridItem, { width: itemWidth }]}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <ProductItem product={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {searchQuery ? `Hasil pencarian "${searchQuery}"` : 'Semua Produk'} 
        {` (${products.length})`}
      </Text>
      
      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
          </Text>
          <Text style={styles.emptyStateSubtext}>
            {searchQuery ? 'Coba kata kunci lain' : 'Tambahkan produk pertama Anda'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          key={`${numColumns}-columns`}
          keyExtractor={(item) => item.id}
          renderItem={renderGridItem}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 1,
  },
  gridContent: {
    padding: 8,
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridItem: {
    // Width dihitung secara dinamis
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
})