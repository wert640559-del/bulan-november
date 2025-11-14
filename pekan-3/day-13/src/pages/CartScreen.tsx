// FILE: ./pages/CartScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useCart } from '../context/CartContext';
import { usePollingCondition, useNetInfo } from '../hooks/useNetInfo';
import { addAnalyticsEvent } from '../routes/RootNavigator';

export const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getTotalPrice 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [pollingCount, setPollingCount] = useState(0);
  
  const netInfo = useNetInfo();
  const shouldPoll = usePollingCondition();

  // Polling implementation for cart updates
  useEffect(() => {
    if (!shouldPoll || cartItems.length === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setPollingCount(prev => {
        const newCount = prev + 1;
        console.log(`🔄 Cart polling update #${newCount}`);
        addAnalyticsEvent(`Cart polling update #${newCount}`);
        
        // Simulate price updates or stock changes
        if (newCount % 3 === 0) {
          Alert.alert(
            'Price Update',
            'Some items in your cart have updated prices. Please review your cart.',
            [{ text: 'OK' }]
          );
        }
        
        return newCount;
      });
    }, 15000); // Poll every 15 seconds

    return () => {
      console.log('🧹 Cleaning up cart polling');
      clearInterval(intervalId);
    };
  }, [shouldPoll, cartItems.length]);

  // Apply promo code
  const applyPromoCode = () => {
    const promo = promoCode.trim().toUpperCase();
    
    if (!promo) {
      Alert.alert('Error', 'Masukkan kode promo');
      return;
    }

    // Simulasi cek promo code
    const validPromoCodes: { [key: string]: number } = {
      'DISKON10': 10,
      'WELCOME15': 15,
      'SPECIAL20': 20
    };

    if (validPromoCodes[promo]) {
      setDiscount(validPromoCodes[promo]);
      Alert.alert('Berhasil', `Promo ${promo} berhasil diterapkan!`);
      addAnalyticsEvent(`Promo code applied: ${promo}`);
    } else {
      setDiscount(0);
      Alert.alert('Error', 'Kode promo tidak valid');
    }
  };

  // Remove item dari cart
  const removeItem = (productId: string) => {
    Alert.alert(
      'Hapus Item',
      'Apakah Anda yakin ingin menghapus item ini dari keranjang?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: () => removeFromCart(productId)
        }
      ]
    );
  };

  // Calculate totals
  const subtotal = getTotalPrice();
  const discountAmount = (subtotal * discount) / 100;
  const shippingCost = subtotal > 500000 ? 0 : 15000; // Free shipping above 500k
  const total = subtotal - discountAmount + shippingCost;

  // Checkout handler
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Keranjang Kosong', 'Tambahkan produk ke keranjang terlebih dahulu');
      return;
    }

    // Navigasi ke CheckoutScreen
    navigation.navigate('Checkout' as any);
  };

  // Navigate to product detail
  const navigateToProduct = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  // Polling status indicator
  const renderPollingStatus = () => {
    if (cartItems.length === 0) return null;

    return (
      <View style={[
        styles.pollingStatus,
        !shouldPoll && styles.pollingDisabled
      ]}>
        <FontAwesome6 
          name={shouldPoll ? "circle-check" : "circle-pause"} 
          size={14} 
          color={shouldPoll ? "#34C759" : "#FF9500"} 
        />
        <Text style={styles.pollingText}>
          {shouldPoll 
            ? `Live updates enabled • Poll #${pollingCount}`
            : 'Live updates paused (cellular)'
          }
        </Text>
      </View>
    );
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome6 name="cart-shopping" size={80} color="#ccc" iconStyle='solid'/>
        <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
        <Text style={styles.emptyText}>
          Belum ada produk di keranjang belanja Anda
        </Text>
        <TouchableOpacity 
          style={styles.shopButton}
          onPress={() => navigation.navigate('Home' as any)}
        >
          <Text style={styles.shopButtonText}>Mulai Belanja</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={20} color="#333" iconStyle='solid'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Keranjang Belanja</Text>
        <View style={styles.cartCount}>
          <Text style={styles.cartCountText}>
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Text>
        </View>
      </View>

      {/* Polling Status */}
      {renderPollingStatus()}

      <ScrollView style={styles.content}>
        {/* Cart Items */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>
            Item Belanja ({cartItems.length} produk)
          </Text>
          
          {cartItems.map((item) => (
            <View key={item.product.id} style={styles.cartItem}>
              {/* Product Image */}
              <TouchableOpacity 
                style={styles.imageContainer}
                onPress={() => navigateToProduct(item.product.id)}
              >
                <Image 
                  source={item.product.image} 
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <TouchableOpacity onPress={() => navigateToProduct(item.product.id)}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.productPrice}>
                  Rp {item.product.price.toLocaleString('id-ID')}
                </Text>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Jumlah:</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <FontAwesome6 name="minus" size={12} color="#333" iconStyle='solid'/>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <FontAwesome6 name="plus" size={12} color="#333" iconStyle='solid'/>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Item Total */}
                <Text style={styles.itemTotal}>
                  Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                </Text>
              </View>

              {/* Remove Button */}
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeItem(item.product.id)}
              >
                <FontAwesome6 name="trash" size={16} color="#FF3B30" iconStyle='solid'/>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Promo Code Section */}
        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Kode Promo</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Masukkan kode promo"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={applyPromoCode}
            >
              <Text style={styles.applyButtonText}>Terapkan</Text>
            </TouchableOpacity>
          </View>
          {discount > 0 && (
            <Text style={styles.discountApplied}>
              ✅ Diskon {discount}% berhasil diterapkan
            </Text>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Ringkasan Belanja</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              Rp {subtotal.toLocaleString('id-ID')}
            </Text>
          </View>

          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Diskon ({discount}%)</Text>
              <Text style={[styles.summaryValue, styles.discountText]}>
                - Rp {discountAmount.toLocaleString('id-ID')}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
            <Text style={styles.summaryValue}>
              {shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}
            </Text>
          </View>

          {shippingCost === 0 && subtotal > 0 && (
            <Text style={styles.freeShippingText}>
              🎉 Selamat! Anda mendapatkan gratis ongkir
            </Text>
          )}

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              Rp {total.toLocaleString('id-ID')}
            </Text>
          </View>

          {/* Network Info */}
          <View style={styles.networkInfo}>
            <Text style={styles.networkText}>
              📶 {netInfo.isConnected ? 'Online' : 'Offline'} • {netInfo.type}
              {!shouldPoll && ' • Live updates paused'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Footer */}
      <View style={styles.footer}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerTotalLabel}>Total Pembayaran</Text>
          <Text style={styles.footerTotalValue}>
            Rp {total.toLocaleString('id-ID')}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <FontAwesome6 name="credit-card" size={20} color="#fff" />
          <Text style={styles.checkoutButtonText}>Lanjutkan Pembayaran</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  cartCount: {
    backgroundColor: '#FF3B30',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  // Polling status styles
  pollingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  pollingDisabled: {
    backgroundColor: '#FFF3E0',
  },
  pollingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  itemsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  imageContainer: {
    marginRight: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: '#f8f9fa',
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  promoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  promoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  discountApplied: {
    marginTop: 8,
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  discountText: {
    color: '#34C759',
  },
  freeShippingText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF3B30',
  },
  networkInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  networkText: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  footerSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF3B30',
  },
  checkoutButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;