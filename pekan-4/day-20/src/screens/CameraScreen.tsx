import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { simpleStorage } from '../services/storage';

export const CameraScreen: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ SOAL a: Pilih 5 foto + simpan
  const pickMultipleImages = () => {
    const options = {
      mediaType: 'photo' as const,
      selectionLimit: 5, // Maksimal 5 foto
      maxWidth: 600,
      maxHeight: 600,
      quality: 0.7,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets) {
        const simpleImages = response.assets.map(img => ({
          uri: img.uri,
          fileName: img.fileName
        }));
        
        setImages(simpleImages);
        simpleStorage.save('@ecom:newProductAssets', simpleImages); // ✅ Simpan
        Alert.alert('Success', `${simpleImages.length} foto tersimpan`);
      }
    });
  };

  // ✅ SOAL c: Upload dengan loading
  const takeAndUploadPhoto = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.7, // Quality 0.7
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      // ✅ SOAL d: Handle error kamera
      if (response.errorCode === 'camera_unavailable') {
        Alert.alert('Error', 'Kamera error, buka galeri?', [
          { text: 'OK', onPress: pickMultipleImages }
        ]);
        return;
      }

      if (response.assets) {
        uploadImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async (image: any) => {
    setLoading(true); // ✅ Mulai loading
    
    try {
      // Simulasi upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Upload selesai!');
    } catch (error) {
      Alert.alert('Error', 'Upload gagal');
    } finally {
      setLoading(false); // ✅ Berhenti loading (SOAL c)
    }
  };

  // ✅ SOAL e: Base64 preview
  const pickImageWithBase64 = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      maxWidth: 300,
      maxHeight: 300,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets?.[0]?.base64) {
        const base64 = `data:image/jpeg;base64,${response.assets[0].base64}`;
        simpleStorage.save('@ecom:avatarPreview', base64); // ✅ Simpan base64
        Alert.alert('Success', 'Preview disimpan untuk offline');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitur Kamera</Text>

      {/* Button Utama */}
      <TouchableOpacity style={styles.button} onPress={pickMultipleImages}>
        <Text style={styles.buttonText}>📁 Pilih 5 Foto (SOAL a)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takeAndUploadPhoto}>
        <Text style={styles.buttonText}>📷 Foto & Upload (SOAL c,d)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pickImageWithBase64}>
        <Text style={styles.buttonText}>👤 Simpan Preview (SOAL e)</Text>
      </TouchableOpacity>

      {/* Loading */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>Uploading...</Text>
        </View>
      )}

      {/* Preview Images */}
      {images.length > 0 && (
        <View style={styles.preview}>
          <Text>Foto terpilih: {images.length}</Text>
          <Image source={{ uri: images[0].uri }} style={styles.image} />
        </View>
      )}

      {/* Jawaban Teori SOAL e */}
      <View style={styles.theory}>
        <Text style={styles.theoryTitle}>Jawaban Teori:</Text>
        <Text>Base64 → AsyncStorage (untuk preview, tidak sensitif)</Text>
        <Text>Token → Keychain (data sensitif, butuh enkripsi)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loading: {
    alignItems: 'center',
    padding: 20,
  },
  preview: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  theory: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  theoryTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CameraScreen;