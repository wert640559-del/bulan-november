import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { addAnalyticsEvent } from '../routes/RootNavigator';

export interface NetInfoState {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string;
  connectionType: string;
}

export const useNetInfo = () => {
  const [netInfo, setNetInfo] = useState<NetInfoState>({
    isConnected: null,
    isInternetReachable: null,
    type: 'unknown',
    connectionType: 'unknown',
  });

  useEffect(() => {
    // Fetch initial state
    NetInfo.fetch().then(state => {
      const newState = {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        connectionType: state.type,
      };
      
      setNetInfo(newState);
      addAnalyticsEvent(`Initial network state: ${state.isConnected ? 'Connected' : 'Disconnected'} (${state.type})`);
    });

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      const newState = {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        connectionType: state.type,
      };
      
      setNetInfo(newState);
      
      // Log network changes for analytics
      if (state.isConnected !== netInfo.isConnected) {
        addAnalyticsEvent(`Network connection changed: ${state.isConnected ? 'Connected' : 'Disconnected'}`);
      }
      
      if (state.type !== netInfo.type) {
        addAnalyticsEvent(`Network type changed: ${state.type}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return netInfo;
};

// Hook khusus untuk conditional polling
export const usePollingCondition = () => {
  const netInfo = useNetInfo();
  
  // Hentikan polling jika menggunakan cellular
  const shouldPoll = !(netInfo.type === 'cellular');
  
  useEffect(() => {
    if (netInfo.type === 'cellular') {
      addAnalyticsEvent('Polling disabled due to cellular connection');
    }
  }, [netInfo.type]);

  return shouldPoll;
};