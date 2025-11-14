// FILE: ./pages/CheckoutScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Modal,
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useDrawerLock } from '../routes/DrawerNavigator';
import { useCart } from '../context/CartContext'; // Import useCart

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const { cartItems, getTotalPrice, clearCart } = useCart(); // Gunakan cart context
  
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Apply drawer locking
  useDrawerLock();

  // Calculate totals dari cart
  const subtotal = getTotalPrice();
  const discountAmount = (subtotal * discount) / 100;
  const shippingCost = subtotal > 500000 ? 0 : 15000; // Free shipping above 500k
  const total = subtotal - discountAmount + shippingCost;

  // Apply promo code
  const applyPromoCode = () => {
    const promo = promoCode.trim().toUpperCase();
    
    if (!promo) {
      Alert.alert('Error', 'Masukkan kode promo');
      return;
    }

    // Simulasi cek promo code
    const validPromoCodes: { [key: string]: number } = {
      'DISKON10': 10,    //dapat diskon 10%
      'WELCOME15': 15,   //dapat diskon 15%
      'SPECIAL20': 20    //dapat diskon 20%
    };

    if (validPromoCodes[promo]) {
      setDiscount(validPromoCodes[promo]);
      Alert.alert('Berhasil', `Promo ${promo} berhasil diterapkan!`);
    } else {
      setDiscount(0);
      Alert.alert('Error', 'Kode promo tidak valid');
    }
  };

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Harap isi alamat pengiriman');
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Error', 'Keranjang belanja kosong');
      return;
    }

    Alert.alert(
      'Konfirmasi Pesanan',
      `Total pembayaran: Rp ${total.toLocaleString('id-ID')}\n\nAlamat: ${address}\nMetode: ${getPaymentMethodText()}`,
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Konfirmasi & Bayar',
          onPress: () => {
            // Simulasi proses pembayaran berhasil
            Alert.alert(
              'Pesanan Berhasil!',
              'Pesanan Anda sedang diproses. Terima kasih!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    clearCart(); // Kosongkan cart setelah berhasil
                    navigation.goBack();
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return 'Kartu Kredit';
      case 'bank_transfer':
        return 'Transfer Bank';
      case 'cod':
        return 'Bayar di Tempat (COD)';
      default:
        return paymentMethod;
    }
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome6 name="xmark" size={24} color="#333" iconStyle='solid'/>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Product Summary - Tampilkan semua produk di cart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Produk Dipesan ({cartItems.length} items)
            </Text>
            {cartItems.map((item, index) => (
              <View key={item.product.id} style={styles.productItem}>
                <Image 
                  source={item.product.image} 
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.productQuantity}>
                    Jumlah: {item.quantity}
                  </Text>
                  <Text style={styles.productPrice}>
                    Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Shipping Address */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
            <TextInput
              style={styles.addressInput}
              placeholder="Masukkan alamat lengkap pengiriman"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'credit_card' && styles.paymentOptionSelected
              ]}
              onPress={() => setPaymentMethod('credit_card')}
            >
              <FontAwesome6 name="credit-card" size={20} color="#007AFF" />
              <Text style={styles.paymentText}>Kartu Kredit</Text>
              {paymentMethod === 'credit_card' && (
                <FontAwesome6 name="check" size={16} color="#007AFF" iconStyle='solid'/>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'bank_transfer' && styles.paymentOptionSelected
              ]}
              onPress={() => setPaymentMethod('bank_transfer')}
            >
              <FontAwesome6 name="building-columns" size={20} color="#007AFF" iconStyle='solid'/>
              <Text style={styles.paymentText}>Transfer Bank</Text>
              {paymentMethod === 'bank_transfer' && (
                <FontAwesome6 name="check" size={16} color="#007AFF" iconStyle='solid'/>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.paymentOption,
                paymentMethod === 'cod' && styles.paymentOptionSelected
              ]}
              onPress={() => setPaymentMethod('cod')}
            >
              <FontAwesome6 name="money-bill-wave" size={20} color="#007AFF" iconStyle='solid'/>
              <Text style={styles.paymentText}>Bayar di Tempat (COD)</Text>
              {paymentMethod === 'cod' && (
                <FontAwesome6 name="check" size={16} color="#007AFF" iconStyle='solid'/>
              )}
            </TouchableOpacity>
          </View>

          {/* Promo Code Section */}
          <View style={styles.section}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</Text>
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
              <Text style={styles.totalLabel}>Total Pembayaran</Text>
              <Text style={styles.totalValue}>
                Rp {total.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerSummary}>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalValue}>
              Rp {total.toLocaleString('id-ID')}
            </Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.confirmButton,
              cartItems.length === 0 && styles.confirmButtonDisabled
            ]} 
            onPress={handleConfirmOrder}
            disabled={cartItems.length === 0}
          >
            <FontAwesome6 name="credit-card" size={20} color="#fff" />
            <Text style={styles.confirmButtonText}>
              {cartItems.length === 0 ? 'Keranjang Kosong' : 'Konfirmasi & Bayar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    marginTop: 40, // Account for status bar
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF3B30',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#f8f9fa',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF10',
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
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
    backgroundColor: '#f8f9fa',
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
    fontStyle: 'italic',
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
  confirmButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});