import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { addAnalyticsEvent } from '../../App';

interface NetworkContextType {
  isConnected: boolean | null;
  type: string;
  isInternetReachable: boolean | null;
}

const NetworkContext = createContext<NetworkContextType>({ 
  isConnected: true,
  type: 'unknown',
  isInternetReachable: true
});

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

interface NetworkProviderProps {
  children: React.ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [networkState, setNetworkState] = useState<NetworkContextType>({
    isConnected: true,
    type: 'unknown',
    isInternetReachable: true
  });

  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const newState = {
        isConnected: state.isConnected,
        type: state.type,
        isInternetReachable: state.isInternetReachable
      };

      setNetworkState(newState);

      // Tampilkan/sembunyikan banner berdasarkan status koneksi
      if (!state.isConnected || !state.isInternetReachable) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }

      // Log perubahan status koneksi
      if (state.isConnected !== networkState.isConnected) {
        const event = state.isConnected ? 
          `Koneksi pulih (${state.type}). Melanjutkan operasi.` : 
          `Koneksi terputus (${state.type}). Menggunakan mode offline.`;
        
        addAnalyticsEvent(event);
      }
    });

    // Fetch initial state
    NetInfo.fetch().then(state => {
      setNetworkState({
        isConnected: state.isConnected,
        type: state.type,
        isInternetReachable: state.isInternetReachable
      });
      
      if (!state.isConnected || !state.isInternetReachable) {
        setShowBanner(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={networkState}>
      {children}
      
      {/* Global Network Banner */}
      {showBanner && (
        <View style={[
          styles.banner,
          networkState.isConnected ? styles.onlineBanner : styles.offlineBanner
        ]}>
          <Text style={styles.bannerText}>
            {!networkState.isConnected ? 
              '📶 Koneksi terputus. Menggunakan mode offline.' :
              '🌐 Koneksi terbatas. Beberapa fitur mungkin tidak tersedia.'
            }
          </Text>
        </View>
      )}
    </NetworkContext.Provider>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  offlineBanner: {
    backgroundColor: '#FF3B30',
  },
  onlineBanner: {
    backgroundColor: '#FF9500',
  },
  bannerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});