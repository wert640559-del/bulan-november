import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, Modal, 
  TextInput, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { productService } from '../services/api';
import { addAnalyticsEvent } from '../../App'; 
import { useNetInfo } from '@react-native-community/netinfo';

interface CheckoutScreenProps {
  visible?: boolean;
  onClose?: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ 
  visible = true, 
  onClose 
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { product } = route.params as { product: any };
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'transfer'
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();


  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi';
    if (!formData.phone.trim()) newErrors.phone = 'Nomor HP wajib diisi';
    else if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'Nomor HP harus angka';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    if (!netInfo.isConnected) {
      Alert.alert('Offline', 'Tidak dapat proses checkout tanpa koneksi internet');
      return;
    }

    setLoading(true);

    try {
      // Simulasi API call dengan error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulasi random error untuk testing
          const random = Math.random();
          if (random < 0.3) {
            reject(new Error('400 - Validasi gagal: Alamat tidak lengkap'));
          } else if (random < 0.4) {
            reject(new Error('500 - Server error'));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      addAnalyticsEvent(`Checkout success: ${product.name}`);
      
      Alert.alert(
        'Checkout Berhasil!',
        `Pesanan ${product.name} berhasil diproses.\nTotal: Rp ${product.price.toLocaleString('id-ID')}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
              // Reset ke home setelah checkout
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' as any }],
              });
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('Checkout error:', error);
      
      // Handle different error types
      if (error.message.includes('400')) {
        setErrors({ 
          address: 'Alamat tidak valid. Pastikan alamat lengkap dan jelas.' 
        });
        Alert.alert('Validasi Gagal', 'Periksa kembali data alamat Anda.');
      } else if (error.message.includes('500')) {
        Alert.alert('Server Error', 'Server sedang mengalami masalah. Silakan coba lagi.');
      } else {
        Alert.alert('Error', 'Terjadi kesalahan saat proses checkout.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity onPress={handleClose} disabled={loading}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Product Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Produk Dipesan</Text>
            <View style={styles.productCard}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>Rp {product.price.toLocaleString('id-ID')}</Text>
            </View>
          </View>

          {/* Shipping Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Pengiriman</Text>
            
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Nama Lengkap"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              editable={!loading}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={[styles.input, styles.textArea, errors.address && styles.inputError]}
              placeholder="Alamat Lengkap"
              value={formData.address}
              onChangeText={(text) => setFormData({...formData, address: text})}
              multiline
              numberOfLines={3}
              editable={!loading}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

            <TextInput
              style={[styles.input, errors.city && styles.inputError]}
              placeholder="Kota"
              value={formData.city}
              onChangeText={(text) => setFormData({...formData, city: text})}
              editable={!loading}
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="Nomor HP"
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              keyboardType="phone-pad"
              editable={!loading}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Payment Method */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
            <View style={styles.paymentOptions}>
              {['transfer', 'cod', 'credit'].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentOption,
                    formData.paymentMethod === method && styles.paymentOptionSelected
                  ]}
                  onPress={() => setFormData({...formData, paymentMethod: method})}
                  disabled={loading}
                >
                  <Text style={styles.paymentText}>
                    {method === 'transfer' && 'Transfer Bank'}
                    {method === 'cod' && 'Bayar di Tempat (COD)'}
                    {method === 'credit' && 'Kartu Kredit'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>
              <Text>Rp {product.price.toLocaleString('id-ID')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Ongkos Kirim</Text>
              <Text>Rp 15.000</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>
                Rp {(product.price + 15000).toLocaleString('id-ID')}
              </Text>
            </View>
          </View>

          {/* Network Status */}
          <View style={styles.networkInfo}>
            <Text style={styles.networkText}>
              📶 {netInfo.isConnected ? 'Online' : 'Offline'} • {netInfo.type}
            </Text>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.checkoutButton, loading && styles.buttonDisabled]}
            onPress={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.checkoutButtonText}>
                Bayar Rp {(product.price + 15000).toLocaleString('id-ID')}
              </Text>
            )}
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
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  productCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF0F0',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  paymentOptions: {
    gap: 8,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  paymentOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  networkInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  networkText: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  checkoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});