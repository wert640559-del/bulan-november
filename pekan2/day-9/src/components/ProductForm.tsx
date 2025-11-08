import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { ProductFormData } from '../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    image: require('../assets/images/mouse.png'),
    description: ''
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const insets = useSafeAreaInsets();

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const minimumDelay = new Promise<void>((resolve) => setTimeout(resolve, 1000));
        await Promise.all([
          onSubmit(formData),
          minimumDelay
        ]);

        setFormData({
          name: '',
          price: '',
          image: require('../assets/images/mouse.png'),
          description: ''
        });
        setErrors({});
      } catch (error) {
        Alert.alert('Error', 'Gagal menambah produk');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isFormDisabled = isLoading || isSubmitting;

  return (
    <ScrollView 
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.formTitle}>Tambah Produk Baru</Text>
      
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Produk *</Text>
          <TextInput
            style={[
              styles.input,
              errors.name && styles.inputError
            ]}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Masukkan nama produk"
            editable={!isFormDisabled}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Harga *</Text>
          <TextInput
            style={[
              styles.input,
              errors.price && styles.inputError
            ]}
            value={formData.price}
            onChangeText={(text) => handleChange('price', text)}
            placeholder="Masukkan harga"
            keyboardType="numeric"
            editable={!isFormDisabled}
          />
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deskripsi</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Masukkan deskripsi produk"
            multiline
            numberOfLines={3}
            editable={!isFormDisabled}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Text 
            style={[styles.button, styles.cancelButton, isFormDisabled && styles.buttonDisabled]} 
            onPress={onCancel}
          >
            Batal
          </Text>
          <View style={[styles.button, styles.submitButton, isFormDisabled && styles.buttonDisabled]}>
            {isSubmitting ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.loadingText}>Memproses...</Text>
              </View>
            ) : (
              <Text 
                style={styles.buttonText}
                onPress={handleSubmit}
              >
                Tambah Produk
              </Text>
            )}
          </View>
        </View>
      </View>

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
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  form: {
    flex: 1,
  },
  inputGroup: { 
    marginBottom: 16 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '500', 
    color: '#333', 
    marginBottom: 6 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 6, 
    padding: 12, 
    fontSize: 14, 
    backgroundColor: '#fff' 
  },
  textArea: { 
    minHeight: 80, 
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
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20, 
    marginBottom: 20 
  },
  button: { 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 6, 
    minWidth: 120, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 14 
  },
  cancelButton: { 
    backgroundColor: '#6c757d' 
  },
  submitButton: { 
    backgroundColor: '#007AFF' 
  },
  buttonDisabled: { 
    opacity: 0.6 
  },
  loadingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  loadingText: { 
    color: '#fff', 
    fontSize: 12 
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