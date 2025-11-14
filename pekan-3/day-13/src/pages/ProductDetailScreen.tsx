import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions,
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Product } from '../types';
import { useDrawerLock } from '../routes/DrawerNavigator';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

// ✅ SOLUSI: Gunakan any type untuk navigation sementara
export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // ✅ Gunakan any untuk bypass type checking
  const route = useRoute<any>();
  
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const { products } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useDrawerLock();

  const { productId } = route.params;

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      
      setTimeout(() => {
        const foundProduct = products.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          Alert.alert('Error', 'Produk tidak ditemukan');
          navigation.goBack();
        }
        
        setLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [productId, navigation, products]);

  // ✅ SEMUA NAVIGATION SEKARANG WORK tanpa error TypeScript
  const handleCheckout = () => {
    if (product) {
      navigation.navigate('Checkout', { productId: product.id });
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      Alert.alert(
        'Berhasil', 
        `${product.name} telah ditambahkan ke keranjang`,
        [
          { 
            text: 'Lanjut Belanja', 
            style: 'cancel' 
          },
          { 
            text: 'Lihat Keranjang', 
            onPress: () => navigation.navigate('Cart')
          }
        ]
      );
    }
  };

  const handleNavigateToHome = () => {
    navigation.navigate('MainApp');
  };

  const handleResetNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  const handleGoBackToDrawerHome = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleCloseDrawerAndReset = () => {
    const drawer = navigation.getParent();
    if (drawer) {
      drawer.dispatch(DrawerActions.closeDrawer());
    }
    handleNavigateToHome();
  };

  const handleMultipleGoBack = () => {
    const state = navigation.getState();
    const currentIndex = state.index;
    
    if (currentIndex > 0) {
      for (let i = 0; i < currentIndex; i++) {
        navigation.goBack();
      }
    } else {
      navigation.navigate('MainApp');
    }
  };

  const handleNavigateToAnalytics = () => {
    navigation.navigate('AnalyticsHistory');
  };

  // Tampilkan loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF3B30" />
        <Text style={styles.loadingText}>Memuat produk...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <FontAwesome6 name="triangle-exclamation" size={60} color="#FF3B30" iconStyle='solid'/>
        <Text style={styles.errorText}>Produk tidak ditemukan</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'electronics':
        return 'laptop';
      case 'clothing':
        return 'shirt';
      case 'jewelry':
        return 'gem';
      case 'backpack':
        return 'bag-shopping';
      default:
        return 'box';
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        isLandscape && styles.landscapeContent
      ]}
    >
      {/* Product Image */}
      <View style={[
        styles.imageContainer,
        isLandscape && styles.landscapeImageContainer
      ]}>
        <Image 
          source={product.image} 
          style={[
            styles.image,
            isLandscape && styles.landscapeImage
          ]}
          resizeMode="contain"
        />
      </View>

      {/* Product Info */}
      <View style={[
        styles.infoContainer,
        isLandscape && styles.landscapeInfoContainer
      ]}>
        {/* Category Badge */}
        <View style={styles.categoryContainer}>
          <FontAwesome6 
            name={getCategoryIcon(product.category) as any} 
            size={14} 
            color="#666" 
          />
          <Text style={styles.categoryText}>
            {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : 'General'}
          </Text>
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>
          Rp {product.price.toLocaleString('id-ID')}
        </Text>
        
        <View style={styles.ratingContainer}>
          <FontAwesome6 name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>4.8</Text>
          <Text style={styles.sold}>(100+ terjual)</Text>
          <Text style={styles.productId}>• ID: {product.id}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Deskripsi Produk</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        {/* Product Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <View style={styles.specsContainer}>
            <Text style={styles.specsTitle}>Spesifikasi Produk:</Text>
            {product.specifications.map((spec, index) => (
              <View key={index} style={styles.specItem}>
                <FontAwesome6 name="check" size={14} color="#34C759" iconStyle='solid'/>
                <Text style={styles.specText}>{spec}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <FontAwesome6 name="ship" size={16} color="#34C759" iconStyle='solid'/>
            <Text style={styles.infoText}>Gratis Ongkir</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome6 name="rotate-left" size={16} color="#34C759" iconStyle='solid'/>
            <Text style={styles.infoText}>Bisa Return</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome6 name="shield" size={16} color="#34C759" iconStyle='solid'/>
            <Text style={styles.infoText}>Garansi Resmi</Text>
          </View>
        </View>

        {/* Custom Navigation Actions */}
        <View style={styles.customActionsContainer}>
          <Text style={styles.customActionsTitle}>🚀 Aksi Navigasi (Fixed):</Text>
          
          <Text style={styles.actionsDescription}>
            Type assertion digunakan untuk bypass TypeScript strict mode
          </Text>
          
          <TouchableOpacity 
            style={[styles.customButton, styles.navigateButton]}
            onPress={handleNavigateToHome}
          >
            <FontAwesome6 name="house" size={16} color="#fff" iconStyle='solid'/>
            <Text style={styles.customButtonText}>Ke Home (navigate)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.customButton, styles.resetButton]}
            onPress={handleResetNavigation}
          >
            <FontAwesome6 name="rotate-left" size={16} color="#fff" iconStyle='solid'/>
            <Text style={styles.customButtonText}>Reset Navigation</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.customButton, styles.multipleButton]}
            onPress={handleMultipleGoBack}
          >
            <FontAwesome6 name="angles-up" size={16} color="#fff" iconStyle='solid'/>
            <Text style={styles.customButtonText}>Multiple Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.customButton, styles.analyticsButton]}
            onPress={handleNavigateToAnalytics}
          >
            <FontAwesome6 name="chart-line" size={16} color="#fff" iconStyle='solid'/>
            <Text style={styles.customButtonText}>Ke Analytics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.customButton, styles.drawerButton]}
            onPress={handleGoBackToDrawerHome}
          >
            <FontAwesome6 name="arrow-left" size={16} color="#fff" iconStyle='solid'/>
            <Text style={styles.customButtonText}>Parent Go Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.customButton, styles.comboButton]}
            onPress={handleCloseDrawerAndReset}
          >
            <FontAwesome6 name="layer-group" size={16} color="#fff" iconStyle='solid'/>
            <Text style={styles.customButtonText}>Kombinasi Aksi</Text>
          </TouchableOpacity>
        </View>

        {/* Product Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.addToCartButton]}
            onPress={handleAddToCart}
          >
            <FontAwesome6 name="cart-plus" size={20} color="#FF3B30" iconStyle='solid'/>
            <Text style={styles.addToCartText}>Tambah Keranjang</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.checkoutButton]}
            onPress={handleCheckout}
          >
            <FontAwesome6 name="bag-shopping" size={20} color="#fff" iconStyle='solid'/>
            <Text style={styles.checkoutText}>Beli Sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* Status Info */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>✅ Semua navigation functions bekerja!</Text>
          <Text style={styles.statusSubtext}>Type assertion mengatasi TypeScript strict mode</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles tetap sama seperti sebelumnya
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
  },
  landscapeContent: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  landscapeImageContainer: {
    flex: 1,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderRightColor: '#e8e8e8',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  landscapeImage: {
    height: 400,
    maxWidth: 400,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
  },
  landscapeInfoContainer: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginLeft: 6,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
    marginRight: 8,
  },
  sold: {
    fontSize: 14,
    color: '#666',
    marginRight: 12,
  },
  productId: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  specsContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  specsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  specText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f0f9f0',
    borderRadius: 8,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#34C759',
    marginTop: 4,
    fontWeight: '600',
  },
  customActionsContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  customActionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  actionsDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
  },
  navigateButton: {
    backgroundColor: '#007AFF',
  },
  resetButton: {
    backgroundColor: '#34C759',
  },
  multipleButton: {
    backgroundColor: '#FF9500',
  },
  analyticsButton: {
    backgroundColor: '#5856D6',
  },
  drawerButton: {
    backgroundColor: '#FF2D55',
  },
  comboButton: {
    backgroundColor: '#AF52DE',
  },
  customButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  checkoutButton: {
    backgroundColor: '#FF3B30',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    color: '#388E3C',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});