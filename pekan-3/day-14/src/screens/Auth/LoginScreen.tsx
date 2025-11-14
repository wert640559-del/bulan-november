import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator 
} from 'react-native';
import { directLogin } from '../../services/directLogin';
import { useNetwork } from '../../context/NetworkContext';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const netInfo = useNetwork();

  const handleLogin = async () => {
  if (!username || !password) {
    Alert.alert('Error', 'Username dan password harus diisi');
    return;
  }

  console.log('🎯 Starting login process...', { username, password });
  setLoading(true);

  try {
    const result = await directLogin(username, password);
    
    console.log('🎯 Full login result:', JSON.stringify(result, null, 2));
    
    if (result.success && result.data) {
      console.log('✅ Login successful! User data:', result.data);
      onLogin(result.data);
    } else {
      console.log('❌ Login failed:', result.error);
      Alert.alert('Login Gagal ❌', result.error || 'Terjadi kesalahan');
    }
  } catch (error: any) {
    console.log('❌ Login process error:', error);
    Alert.alert('Error', error.message || 'Terjadi kesalahan saat login');
  } finally {
    setLoading(false);
  }
};

  const handleDemoLogin = () => {
    setUsername('emilys');
    setPassword('emilyspass');
    handleLogin();
  };

  const handleQuickLogin = () => {
    setUsername('emilys');
    setPassword('emilyspass');
    console.log('⚡ Quick login - credentials set, press login button');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login ke Rits Marketplace</Text>
      <Text style={styles.subtitle}>Masuk untuk mulai berbelanja</Text>

      <View style={styles.networkStatus}>
        <Text style={styles.networkText}>
          📶 Status: {netInfo.isConnected ? 'Online' : 'Offline'} • {netInfo.type}
        </Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="kminchelle"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!loading}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="0lelplR"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>🚀 Login Sekarang</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.quickButton} 
        onPress={handleQuickLogin}
        disabled={loading}
      >
        <Text style={styles.quickButtonText}>⚡ Isi Credentials Cepat</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.demoButton} 
        onPress={handleDemoLogin}
        disabled={loading}
      >
        <Text style={styles.demoButtonText}>🎯 Auto Login (Demo)</Text>
      </TouchableOpacity>

      {/* Debug Info */}
      <View style={styles.debugBox}>
        <Text style={styles.debugTitle}>Status Login:</Text>
        <Text style={styles.debugText}>
          {loading ? '🔄 Sedang login...' : '✅ Siap login'}
        </Text>
        <Text style={styles.debugText}>User: {username || 'Belum diisi'}</Text>
      </View>

      {/* Valid Credentials */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Credentials untuk Testing:</Text>
        <Text style={styles.infoText}>• kminchelle / 0lelplR</Text>
        <Text style={styles.infoText}>• Klik "Auto Login" untuk langsung masuk</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  networkStatus: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  networkText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickButton: {
    backgroundColor: '#5856D6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  quickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  demoButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugBox: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#E65100',
  },
  debugText: {
    fontSize: 12,
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2E7D32',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
});