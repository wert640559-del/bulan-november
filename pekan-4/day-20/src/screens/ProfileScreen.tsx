import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { AuthGuard } from '../components/AuthGuard';
import { loginWithBiometric, checkBiometric } from '../services/biometric';

interface ProfileScreenProps {
  isAuthenticated?: boolean;
  userID?: string;
  username?: string;
  email?: string;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  isAuthenticated = false, 
  userID,
  username,
  email,
  onLogout 
}) => {
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [sensorInfo, setSensorInfo] = useState<any>(null);

  // Cek sensor saat component mount
  useEffect(() => {
    checkSensor();
  }, []);

  const checkSensor = async () => {
    const result = await checkBiometric();
    setSensorInfo(result);
    
    if (result.available) {
      setDebugInfo(`✅ Sensor TERSEDIA\nTipe: ${result.biometryType}`);
    } else {
      setDebugInfo(`❌ Sensor TIDAK TERSEDIA\nError: ${result.error}`);
    }
  };

  // Test biometrik - SIMPLE VERSION
  const testBiometric = async () => {
    try {
      setDebugInfo('🔄 Membuka dialog biometrik...');
      
      const result = await loginWithBiometric();
      
      if (result.success) {
        setDebugInfo('🎉 BIOMETRIK BERHASIL!');
        Alert.alert('✅ Sukses!', 'Verifikasi biometrik berhasil!');
      } else {
        setDebugInfo(`❌ BIOMETRIK GAGAL: ${result.error}`);
        Alert.alert('❌ Gagal', result.error || 'Verifikasi gagal');
      }
    } catch (error: any) {
      setDebugInfo(`💥 ERROR: ${error.message}`);
      Alert.alert('💥 Error', error.message);
    }
  };

  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Profile Pengguna</Text>
        
        {/* Info User */}
        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}>Username:</Text>
          <Text style={styles.infoValue}>{username || 'Guest'}</Text>
          
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{email || 'guest@example.com'}</Text>
        </View>

        {/* Debug Info */}
        <View style={styles.debugSection}>
          <Text style={styles.debugTitle}>Status Biometrik</Text>
          
          {sensorInfo && (
            <View style={[
              styles.sensorStatus, 
              sensorInfo.available ? styles.sensorAvailable : styles.sensorUnavailable
            ]}>
              <Text style={styles.sensorText}>
                Status: {sensorInfo.available ? '✅ TERSEDIA' : '❌ TIDAK TERSEDIA'}
              </Text>
              <Text style={styles.sensorText}>
                Tipe: {sensorInfo.biometryType || 'Unknown'}
              </Text>
            </View>
          )}

          <View style={styles.debugBox}>
            <Text style={styles.debugText}>
              {debugInfo || 'Tekan "Cek Sensor" untuk memulai...'}
            </Text>
          </View>
        </View>

        {/* Section Biometrik */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Biometrik</Text>
          
          <TouchableOpacity style={styles.bioButton} onPress={testBiometric}>
            <Text style={styles.buttonText}>🔐 Test Biometrik</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={checkSensor}>
            <Text style={styles.secondaryButtonText}>🔄 Cek Sensor</Text>
          </TouchableOpacity>
        </View>

        {/* Troubleshooting */}
        <View style={styles.troubleshoot}>
          <Text style={styles.troubleshootTitle}>Tips:</Text>
          <Text style={styles.troubleshootText}>
            • Pastikan sidik jari sudah terdaftar di pengaturan HP{'\n'}
            • Pastikan screen lock (PIN/Password) aktif{'\n'}
            • Coba tekan sensor dengan benar
          </Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </AuthGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  debugSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sensorStatus: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  sensorAvailable: {
    backgroundColor: '#E8F5E8',
  },
  sensorUnavailable: {
    backgroundColor: '#FFE8E6',
  },
  sensorText: {
    fontSize: 14,
    marginBottom: 4,
  },
  debugBox: {
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
    minHeight: 60,
  },
  debugText: {
    fontSize: 12,
    color: '#007AFF',
    lineHeight: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  bioButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  troubleshoot: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
  },
  troubleshootTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  troubleshootText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});

export default ProfileScreen;