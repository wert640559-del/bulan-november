import { 
  isSensorAvailable, 
  simplePrompt,
  BiometryType 
} from '@sbaiahmed1/react-native-biometrics';
import * as Keychain from 'react-native-keychain';

// Cek sensor biometrik
export const checkBiometric = async () => {
  try {
    console.log('🔍 Checking biometric sensor...');
    const result = await isSensorAvailable();
    console.log('📱 Sensor result:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error: any) {
    console.log('❌ Error cek sensor:', error);
    return { 
      available: false, 
      error: error.message,
      biometryType: 'unknown' as BiometryType
    };
  }
};

// Login dengan biometrik - FIXED API
export const loginWithBiometric = async () => {
  try {
    console.log('🔐 Starting biometric prompt...');
    
    // Cek sensor dulu sebelum prompt
    const sensorCheck = await checkBiometric();
    if (!sensorCheck.available) {
      return { 
        success: false, 
        error: `Sensor tidak tersedia: ${sensorCheck.error}` 
      };
    }

    // ✅ PERBAIKAN: simplePrompt sekarang return boolean langsung
    const success = await simplePrompt('Verifikasi identitas Anda untuk login');
    
    console.log('📋 Biometric prompt result:', success);
    
    return { 
      success, 
      error: success ? undefined : 'Authentication failed or cancelled'
    };
  } catch (error: any) {
    console.log('💥 Error biometric prompt:', error);
    
    let errorMessage = error.message || 'Unknown error';
    
    if (error.message?.includes('User canceled')) {
      errorMessage = 'Anda membatalkan verifikasi';
    } else if (error.message?.includes('Authentication failed')) {
      errorMessage = 'Sidik jari/wajah tidak cocok';
    }
    
    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

// Simpan token
export const saveTokenForBiometric = async (token: string) => {
  try {
    await Keychain.setGenericPassword('user_token', token);
    console.log('✅ Token saved to Keychain');
    return true;
  } catch (error: any) {
    console.log('❌ Error save token:', error);
    return false;
  }
};

// Ambil token dengan biometrik
export const getTokenWithBiometric = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error: any) {
    console.log('❌ Error get token:', error);
    return null;
  }
};