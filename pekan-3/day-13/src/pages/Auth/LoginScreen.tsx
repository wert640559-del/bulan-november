import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { RootStackParamList } from '../../types/navigation';
import { productService } from '../../services/productService';
import { addAnalyticsEvent } from '../../routes/RootNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Harap isi semua field');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('🔐 Attempting login...');
      
      // Using Axios POST request through our service
      const response = await productService.login(email, password);
      
      console.log('✅ Login successful:', response);
      addAnalyticsEvent(`User login successful: ${email}`);
      
      // Show success message with token
      Alert.alert(
        'Login Berhasil!', 
        `Token: ${response.token}\n\nToken ini disimulasikan dari API dummyjson.com`,
        [
          {
            text: 'Lanjutkan',
            onPress: () => {
              // Navigate ke MainApp dengan user data
              navigation.navigate('MainApp', {
                screen: 'Profile',
                params: { 
                  userID: 'U123',
                  userToken: response.token 
                }
              } as any);
            }
          }
        ]
      );
      
    } catch (error: any) {
      console.error('❌ Login failed:', error);
      addAnalyticsEvent(`Login failed: ${error.message}`);
      
      if (error.message === 'NO_INTERNET') {
        Alert.alert('Error', 'Tidak ada koneksi internet. Harap periksa jaringan Anda.');
      } else if (error.message.includes('Invalid username or password')) {
        Alert.alert('Error', 'Username atau password salah. Gunakan kredensial dari dummyjson.com');
      } else {
        Alert.alert('Error', 'Login gagal. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo login dengan kredensial dari dummyjson.com
  const handleDemoLogin = () => {
    setEmail('kminchelle');
    setPassword('0lelplR');
    Alert.alert(
      'Demo Credentials',
      'Username: kminchelle\nPassword: 0lelplR\n\nKredensial dari dummyjson.com telah diisi otomatis.',
      [{ text: 'OK' }]
    );
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleQuickLogin = () => {
    navigation.navigate('MainApp', {
      screen: 'Profile',
      params: { userID: 'U123' }
    } as any);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome6 name="shop" size={80} color="#FF3B30" iconStyle='solid'/>
        <Text style={styles.title}>Rits Marketplace</Text>
        <Text style={styles.subtitle}>Masuk ke akun Anda</Text>
        
        {/* API Info */}
        <View style={styles.apiInfo}>
          <Text style={styles.apiInfoText}>
            🔗 Menggunakan API: dummyjson.com
          </Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username / Email</Text>
          <View style={styles.inputContainer}>
            <FontAwesome6 name="envelope" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Masukkan username atau email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <FontAwesome6 name="lock" size={20} color="#666" style={styles.inputIcon} iconStyle='solid'/>
            <TextInput
              style={styles.input}
              placeholder="Masukkan password Anda"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              <FontAwesome6 
                name={showPassword ? 'eye-slash' : 'eye'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword} disabled={loading}>
          <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Masuk</Text>
          )}
        </TouchableOpacity>

        {/* Demo Login Button */}
        <TouchableOpacity 
          style={styles.demoButton}
          onPress={handleDemoLogin}
          disabled={loading}
        >
          <FontAwesome6 name="vial" size={16} color="#fff" iconStyle='solid'/>
          <Text style={styles.demoButtonText}>Isi Demo Credentials</Text>
        </TouchableOpacity>

        {/* Quick Login Demo Button */}
        <TouchableOpacity 
          style={styles.quickLoginButton} 
          onPress={handleQuickLogin}
          disabled={loading}
        >
          <Text style={styles.quickLoginButtonText}>Quick Login (Demo UserID)</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>atau</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <FontAwesome6 name="google" size={20} color="#DB4437" iconStyle='brand'/>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton} disabled={loading}>
            <FontAwesome6 name="facebook" size={20} color="#4267B2" iconStyle='brand'/>
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={handleRegister} disabled={loading}>
            <Text style={styles.registerLink}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* API Documentation Link */}
        <View style={styles.apiDocs}>
          <Text style={styles.apiDocsText}>
            📚 API Documentation: https://dummyjson.com/docs/auth
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  apiInfo: {
    marginTop: 12,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  apiInfoText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  inputIcon: {
    padding: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoButton: {
    backgroundColor: '#5856D6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 8,
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  quickLoginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  quickLoginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginHorizontal: 6,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  apiDocs: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
  },
  apiDocsText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});