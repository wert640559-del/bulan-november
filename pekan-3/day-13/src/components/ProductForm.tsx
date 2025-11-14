// FILE: ./components/ProductForm.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { ProductFormData } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    image: any;
    description: string;
    category: string;
    specificationsInput: string; // Input sementara sebagai string
  }>({
    name: '',
    price: '',
    image: { uri: '' },
    description: '',
    category: 'electronics',
    specificationsInput: ''
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const insets = useSafeAreaInsets();

  // Daftar kategori yang tersedia
  const categories = [
    { value: 'electronics', label: '📱 Elektronik' },
    { value: 'clothing', label: '👕 Pakaian' },
    { value: 'jewelry', label: '💍 Perhiasan' },
    { value: 'backpack', label: '🎒 Tas & Backpack' },
    { value: 'home', label: '🏠 Perlengkapan Rumah' },
    { value: 'sports', label: '⚽ Olahraga' },
    { value: 'books', label: '📚 Buku' },
    { value: 'beauty', label: '💄 Kecantikan' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama produk wajib diisi';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama produk minimal 2 karakter';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Harga wajib diisi';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Harga harus berupa angka positif';
    }

    if (!formData.image.uri.trim()) {
      newErrors.image = 'Link gambar wajib diisi';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const minimumDelay = new Promise<void>((resolve) => setTimeout(resolve, 1000));
        
        // Convert specificationsInput ke array untuk onSubmit
        const specificationsArray = formData.specificationsInput 
          ? formData.specificationsInput.split('\n').filter(spec => spec.trim() !== '')
          : [];

        // Prepare data untuk onSubmit dengan tipe yang benar
        const formDataForSubmit: ProductFormData = {
          name: formData.name,
          price: formData.price,
          image: formData.image,
          description: formData.description,
          category: formData.category,
          specifications: specificationsArray // Ini sudah string[]
        };

        await Promise.all([
          onSubmit(formDataForSubmit),
          minimumDelay
        ]);

        // Reset form setelah submit berhasil
        setFormData({
          name: '',
          price: '',
          image: { uri: '' },
          description: '',
          category: 'electronics',
          specificationsInput: ''
        });
        setErrors({});
      } catch (error) {
        Alert.alert('Error', 'Gagal menambah produk');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error jika field diperbaiki
    if (errors[field as keyof ProductFormData]) {
      setErrors(prev => ({ ...prev, [field as keyof ProductFormData]: undefined }));
    }
  };

  const handleImageChange = (uri: string) => {
    setFormData(prev => ({ ...prev, image: { uri } }));
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: undefined }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: undefined }));
    }
  };

  // Fungsi untuk load contoh produk
  const loadExampleProduct = () => {
    setFormData({
      name: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
      price: '500000',
      image: { uri: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
      description: '21.5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16:9. Color Supported - 16.7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
      category: 'electronics',
      specificationsInput: 'Display: 21.5 inches Full HD (1920 x 1080)\nPanel Type: IPS\nRefresh Rate: 75Hz\nResponse Time: 4ms\nAspect Ratio: 16:9\nConnectivity: HDMI\nFeatures: Zero-frame design, Ultra-thin'
    });
    setErrors({});
  };

  const isFormDisabled = isLoading || isSubmitting;

  // Contoh specifications berdasarkan kategori
  const getSpecificationsHint = () => {
    switch (formData.category) {
      case 'electronics':
        return 'Masukkan spesifikasi, satu per baris:\nContoh:\n- Display: 21.5 inches Full HD\n- Panel Type: IPS\n- Refresh Rate: 75Hz\n- Response Time: 4ms';
      case 'clothing':
        return 'Masukkan spesifikasi, satu per baris:\nContoh:\n- Material: 100% Cotton\n- Ukuran: S, M, L, XL\n- Warna: Hitam, Putih, Navy\n- Perawatan: Mesin cuci';
      case 'jewelry':
        return 'Masukkan spesifikasi, satu per baris:\nContoh:\n- Material: Sterling Silver\n- Batu: Cubic Zirconia\n- Panjang: 45cm\n- Jenis: Kalung';
      case 'backpack':
        return 'Masukkan spesifikasi, satu per baris:\nContoh:\n- Kapasitas: 20L\n- Material: Nylon\n- Kompartemen: Laptop 15"\n- Fitur: Water resistant';
      default:
        return 'Masukkan spesifikasi produk, satu per baris\nContoh:\n- Material: ...\n- Ukuran: ...\n- Warna: ...';
    }
  };

  return (
    <ScrollView 
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.formTitle}>Tambah Produk Baru</Text>
      
      {/* Tombol Contoh Produk */}
      <TouchableOpacity 
        style={styles.exampleButton}
        onPress={loadExampleProduct}
        disabled={isFormDisabled}
      >
        <Text style={styles.exampleButtonText}>📋 Load Contoh Produk Monitor</Text>
      </TouchableOpacity>
      
      <View style={styles.form}>
        {/* Nama Produk */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Produk *</Text>
          <TextInput
            style={[
              styles.input,
              errors.name && styles.inputError
            ]}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Contoh: Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin"
            editable={!isFormDisabled}
            multiline
            numberOfLines={2}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        {/* Harga */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Harga (Rp) *</Text>
          <TextInput
            style={[
              styles.input,
              errors.price && styles.inputError
            ]}
            value={formData.price}
            onChangeText={(text) => handleChange('price', text)}
            placeholder="Contoh: 500000"
            keyboardType="numeric"
            editable={!isFormDisabled}
          />
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        {/* Link Gambar */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Link Gambar *</Text>
          <TextInput
            style={[
              styles.input,
              errors.image && styles.inputError
            ]}
            value={formData.image.uri}
            onChangeText={handleImageChange}
            placeholder="Contoh: https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
            editable={!isFormDisabled}
            multiline
            numberOfLines={2}
          />
          {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
          <Text style={styles.hintText}>
            Gunakan link gambar dari FakeStoreAPI atau sumber terpercaya lainnya
          </Text>
        </View>

        {/* Kategori */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategori *</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.categoryButton,
                  formData.category === cat.value && styles.categoryButtonSelected
                ]}
                onPress={() => handleCategorySelect(cat.value)}
                disabled={isFormDisabled}
              >
                <Text style={[
                  styles.categoryButtonText,
                  formData.category === cat.value && styles.categoryButtonTextSelected
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Deskripsi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deskripsi Produk</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Masukkan deskripsi lengkap produk..."
            multiline
            numberOfLines={6}
            editable={!isFormDisabled}
            textAlignVertical="top"
          />
          <Text style={styles.hintText}>
            Jelaskan fitur, keunggulan, dan detail produk secara lengkap
          </Text>
        </View>

        {/* Spesifikasi */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Spesifikasi Produk</Text>
          <Text style={[styles.hintText, styles.specHint]}>
            {getSpecificationsHint()}
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.specificationsInput}
            onChangeText={(text) => handleChange('specificationsInput', text)}
            placeholder="Masukkan spesifikasi produk (satu per baris)..."
            multiline
            numberOfLines={6}
            editable={!isFormDisabled}
            textAlignVertical="top"
          />
          <Text style={styles.subHintText}>
            * Setiap baris akan menjadi item spesifikasi terpisah
          </Text>
        </View>

        {/* Preview Spesifikasi */}
        {formData.specificationsInput && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>Preview Spesifikasi:</Text>
            {formData.specificationsInput.split('\n')
              .filter(spec => spec.trim() !== '')
              .map((spec, index) => (
                <Text key={index} style={styles.previewItem}>
                  • {spec.trim()}
                </Text>
              ))
            }
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton, isFormDisabled && styles.buttonDisabled]} 
            onPress={onCancel}
            disabled={isFormDisabled}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.submitButton, isFormDisabled && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isFormDisabled}
          >
            {isSubmitting ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.loadingText}>Memproses...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Tambah Produk</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading Overlay */}
      {isSubmitting && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingMessage}>Menambahkan produk...</Text>
            <Text style={styles.loadingSubmessage}>Harap tunggu sebentar</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

// Styles tetap sama seperti sebelumnya
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  contentContainer: { 
    padding: 16,
    flexGrow: 1,
  },
  formTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#333', 
    textAlign: 'center', 
    marginBottom: 16 
  },
  exampleButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  exampleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    backgroundColor: '#fff',
    minHeight: 50,
  },
  textArea: { 
    minHeight: 120, 
    textAlignVertical: 'top' 
  },
  inputError: { 
    borderColor: '#ff3b30' 
  },
  errorText: { 
    color: '#ff3b30', 
    fontSize: 12, 
    marginTop: 4 
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  categoryButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  specHint: {
    marginBottom: 8,
  },
  subHintText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  previewContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  previewItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    lineHeight: 16,
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 24, 
    marginBottom: 20,
    gap: 12,
  },
  button: { 
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center',
    minHeight: 50,
  },
  cancelButton: { 
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: { 
    backgroundColor: '#007AFF' 
  },
  buttonDisabled: { 
    opacity: 0.6 
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  loadingText: { 
    color: '#fff', 
    fontSize: 14,
    fontWeight: '500',
  },
  loadingOverlay: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1000 
  },
  loadingBox: { 
    backgroundColor: '#fff', 
    padding: 24, 
    borderRadius: 12, 
    alignItems: 'center', 
    minWidth: 200 
  },
  loadingMessage: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333', 
    marginTop: 12, 
    marginBottom: 4 
  },
  loadingSubmessage: { 
    fontSize: 12, 
    color: '#666', 
    textAlign: 'center' 
  },
});

export default ProductForm;