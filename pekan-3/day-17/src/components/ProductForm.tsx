import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ProductFormData } from '../types/types';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: { uri: '' },
    description: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.price.trim()) newErrors.price = 'Harga wajib diisi';
    else if (isNaN(Number(formData.price))) newErrors.price = 'Harga harus angka';
    if (!formData.image.uri.trim()) newErrors.image = 'URL gambar wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tambah Produk</Text>
      
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nama Produk"
        value={formData.name}
        onChangeText={(text) => setFormData({...formData, name: text})}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.price && styles.inputError]}
        placeholder="Harga"
        value={formData.price}
        onChangeText={(text) => setFormData({...formData, price: text})}
        keyboardType="numeric"
      />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <TextInput
        style={[styles.input, errors.image && styles.inputError]}
        placeholder="URL Gambar"
        value={formData.image.uri}
        onChangeText={(text) => setFormData({...formData, image: { uri: text }})}
      />
      {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Deskripsi"
        value={formData.description}
        onChangeText={(text) => setFormData({...formData, description: text})}
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Batal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Tambah</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});