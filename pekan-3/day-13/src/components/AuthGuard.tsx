import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { RootStackParamList } from '../routes/RootNavigator';

// Definisikan tipe untuk route parameters
interface MainAppParams {
  userToken?: string;
  userID?: string;
}

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigation = useNavigation();
  const routes = useNavigationState(state => state.routes);
  
  // SOLUSI 1: Type assertion yang aman
  const rootRoute = routes.find(route => route.name === 'MainApp');
  const params = rootRoute?.params as MainAppParams | undefined;
  const isAuthenticated = params?.userToken !== undefined;

  // SOLUSI 2: Alternatif dengan type guard
  // const isAuthenticated = (() => {
  //   const rootRoute = routes.find(route => route.name === 'MainApp');
  //   if (rootRoute?.params && typeof rootRoute.params === 'object' && 'userToken' in rootRoute.params) {
  //     return (rootRoute.params as MainAppParams).userToken !== undefined;
  //   }
  //   return false;
  // })();

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>⚠️ Akses Terbatas</Text>
        <Text style={styles.authMessage}>
          Harap login untuk mengakses fitur ini
        </Text>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.loginButtonText}>Login Sekarang</Text>
        </TouchableOpacity>
        
        {/* Debug info untuk development */}
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            Debug: {params ? `Token: ${params.userToken || 'null'}` : 'No params'}
          </Text>
        </View>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  authTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  authMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  debugInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
});