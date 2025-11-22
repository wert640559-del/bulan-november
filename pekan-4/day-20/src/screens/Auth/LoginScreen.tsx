import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { 
  checkBiometric, 
  loginWithBiometric, 
  saveTokenForBiometric,
  getTokenWithBiometric 
} from '../../services/biometric';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onNavigateToRegister?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister }) => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  // Cek sensor biometrik saat screen load
  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    try {
      setDebugInfo('🔄 Mengecek sensor biometrik...');
      const result = await checkBiometric();
      
      if (result.available) {
        setBiometricAvailable(true);
        setBiometricType(result.biometryType || 'Biometrics');
        setDebugInfo(`✅ ${result.biometryType} tersedia`);
      } else {
        setDebugInfo(`❌ Sensor tidak tersedia: ${result.error}`);
      }
    } catch (error: any) {
      setDebugInfo(`💥 Error: ${error.message}`);
    }
  };

  // Login manual biasa
  const handleManualLogin = async () => {
    setLoading(true);
    try {
      // Simulasi login sukses
      const fakeToken = 'token_' + Date.now();
      
      // Simpan token untuk biometrik
      const saveSuccess = await saveTokenForBiometric(fakeToken);
      
      if (saveSuccess) {
        // Panggil callback login
        onLogin({ 
          username: 'user', 
          email: 'user@example.com',
          token: fakeToken 
        });
        
        Alert.alert('✅ Sukses', 'Login berhasil! Token disimpan untuk biometrik.');
      } else {
        Alert.alert('❌ Gagal', 'Gagal menyimpan token untuk biometrik.');
      }
    } catch (error: any) {
      Alert.alert('💥 Error', 'Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login dengan biometrik
  const handleBiometricLogin = async () => {
    setLoading(true);
    try {
      setDebugInfo('🔐 Memulai verifikasi biometrik...');
      
      // 1. Verifikasi biometrik dulu
      const bioResult = await loginWithBiometric();
      
      if (!bioResult.success) {
        Alert.alert('❌ Gagal', bioResult.error || 'Verifikasi biometrik gagal');
        setDebugInfo(`❌ ${bioResult.error}`);
        return;
      }

      setDebugInfo('✅ Biometrik sukses, mengambil token...');
      
      // 2. Jika biometrik sukses, ambil token
      const token = await getTokenWithBiometric();
      
      if (token) {
        onLogin({ 
          username: 'user_biometric', 
          email: 'biometric@example.com',
          token: token 
        });
        setDebugInfo('🎉 Login biometrik berhasil!');
        Alert.alert('✅ Sukses', 'Login dengan biometrik berhasil!');
      } else {
        setDebugInfo('❌ Token tidak ditemukan, login manual dulu');
        Alert.alert(
          'ℹ️ Info', 
          'Token tidak ditemukan. Silakan login manual terlebih dahulu.',
          [{ text: 'OK', onPress: handleManualLogin }]
        );
      }
    } catch (error: any) {
      setDebugInfo(`💥 Error: ${error.message}`);
      Alert.alert('💥 Error', 'Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick login untuk testing
  const handleQuickLogin = () => {
    onLogin({ 
      username: 'quick_user', 
      email: 'quick@example.com',
      token: 'quick_token_' + Date.now()
    });
    Alert.alert('⚡ Quick Login', 'Login cepat berhasil!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login ke Aplikasi</Text>
      <Text style={styles.subtitle}>Pilih metode login yang diinginkan</Text>

      {/* Tombol Login Manual */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleManualLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>🔓 Login Manual</Text>
        )}
      </TouchableOpacity>

      {/* Tombol Biometrik (hanya tampil jika tersedia) */}
      {biometricAvailable && (
        <TouchableOpacity 
          style={[styles.button, styles.bioButton, loading && styles.buttonDisabled]} 
          onPress={handleBiometricLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {biometricType === 'FaceID' ? '👤 Login dengan Face ID' : 
               biometricType === 'TouchID' ? '👆 Login dengan Touch ID' : 
               '🖐️ Login dengan Sidik Jari'}
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Tombol Quick Login untuk testing */}
      <TouchableOpacity 
        style={[styles.button, styles.quickButton]}
        onPress={handleQuickLogin}
      >
        <Text style={styles.buttonText}>⚡ Quick Login (Testing)</Text>
      </TouchableOpacity>

      {/* Debug Info */}
      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>Status Sistem:</Text>
        <Text style={styles.debugText}>
          {debugInfo || 'Tekan tombol untuk memulai...'}
        </Text>
        
        <Text style={styles.info}>
          Status Biometrik: {biometricAvailable ? '✅ Tersedia' : '❌ Tidak Tersedia'}
        </Text>
        {biometricAvailable && (
          <Text style={styles.info}>Tipe: {biometricType}</Text>
        )}
      </View>

      {/* Troubleshooting Tips */}
      {!biometricAvailable && (
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Tips Biometrik:</Text>
          <Text style={styles.tipsText}>
            • Pastikan sidik jari/wajah sudah terdaftar{'\n'}
            • Pastikan screen lock (PIN/Password) aktif{'\n'}
            • Login manual dulu untuk menyimpan token
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  bioButton: {
    backgroundColor: '#34C759'
  },
  quickButton: {
    backgroundColor: '#FF9500'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  debugSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF'
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    lineHeight: 16
  },
  info: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  tipsSection: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500'
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#E65100'
  },
  tipsText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16
  }
});