import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export const Product: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>('all');

  const products = [
    {
      id: '1',
      name: 'Laptop Gaming',
      price: 15000000,
      status: 'active',
      stock: 15,
      sales: 45,
    },
    {
      id: '2',
      name: 'Mouse Gaming',
      price: 500000,
      status: 'active',
      stock: 32,
      sales: 128,
    },
    {
      id: '3',
      name: 'Keyboard Mechanical',
      price: 800000,
      status: 'inactive',
      stock: 0,
      sales: 76,
    },
    {
      id: '4',
      name: 'Headset Wireless',
      price: 750000,
      status: 'active',
      stock: 8,
      sales: 92,
    },
  ];

  const filteredProducts = products.filter(product => {
    if (activeTab === 'all') return true;
    return product.status === activeTab;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Kelola Produk</Text>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome6 name="plus" size={16} color="#fff" iconStyle='solid'/>
          <Text style={styles.addButtonText}>Tambah Produk</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <FontAwesome6 name="magnifying-glass" size={20} color="#666" iconStyle='solid'/>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk..."
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome6 name="sliders" size={20} color="#333" iconStyle='solid' />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Semua
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Aktif
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inactive' && styles.activeTab]}
          onPress={() => setActiveTab('inactive')}
        >
          <Text style={[styles.tabText, activeTab === 'inactive' && styles.activeTabText]}>
            Nonaktif
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={[
                  styles.statusBadge,
                  product.status === 'active' ? styles.activeBadge : styles.inactiveBadge
                ]}>
                  <Text style={styles.statusText}>
                    {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.productPrice}>
                Rp {product.price.toLocaleString('id-ID')}
              </Text>
              
              <View style={styles.productStats}>
                <View style={styles.stat}>
                  <FontAwesome6 name="box" size={12} color="#666" iconStyle='solid'/>
                  <Text style={styles.statText}>Stok: {product.stock}</Text>
                </View>
                <View style={styles.stat}>
                  <FontAwesome6 name="chart-line" size={12} color="#666" iconStyle='solid'/>
                  <Text style={styles.statText}>Terjual: {product.sales}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.productActions}>
              <TouchableOpacity style={styles.actionButton}>
                <FontAwesome6 name="pen-to-square" size={16} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <FontAwesome6 name="trash" size={16} color="#FF3B30" iconStyle='solid'/>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <View style={styles.emptyState}>
          <FontAwesome6 name="box-open" size={60} color="#ccc" iconStyle='solid'/>
          <Text style={styles.emptyStateTitle}>Tidak ada produk</Text>
          <Text style={styles.emptyStateText}>
            {activeTab === 'all' 
              ? 'Belum ada produk yang ditambahkan' 
              : `Tidak ada produk ${activeTab === 'active' ? 'aktif' : 'nonaktif'}`
            }
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF3B30',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FF3B30',
  },
  productsList: {
    flex: 1,
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeBadge: {
    backgroundColor: '#34C75920',
  },
  inactiveBadge: {
    backgroundColor: '#FF3B3020',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 8,
  },
  productStats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  productActions: {
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
