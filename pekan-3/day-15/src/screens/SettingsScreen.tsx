import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addAnalyticsEvent } from '../../App'; 

interface SettingsScreenProps {
  drawerLocked?: boolean;
  onDrawerLockChange?: (locked: boolean) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  drawerLocked = false, 
  onDrawerLockChange 
}) => {
  const navigation = useNavigation();

  const handleDrawerLockToggle = (value: boolean) => {
    if (onDrawerLockChange) {
      onDrawerLockChange(value);
    }
    addAnalyticsEvent(`Drawer ${value ? 'locked' : 'unlocked'}`);
  };

  const handleNavigateHomeAndCloseDrawer = () => {
    navigation.navigate('Main' as any);
    navigation.getParent()?.closeDrawer();
    addAnalyticsEvent('Navigated to Home and closed drawer');
  };

  const handleViewAnalytics = () => {
    navigation.navigate('Analytics' as any);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      {/* Drawer Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kontrol Navigasi</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Kunci Drawer Gesture</Text>
            <Text style={styles.settingDescription}>
              Mencegah drawer terbuka dengan swipe
            </Text>
          </View>
          <Switch
            value={drawerLocked}
            onValueChange={handleDrawerLockToggle}
            trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
          />
        </View>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleNavigateHomeAndCloseDrawer}
        >
          <Text style={styles.actionButtonText}>Ke Home & Tutup Drawer</Text>
        </TouchableOpacity>
      </View>

      {/* Analytics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analytics</Text>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleViewAnalytics}
        >
          <Text style={styles.actionButtonText}>Lihat Analytics History</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Aplikasi</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Versi</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Developer</Text>
          <Text style={styles.infoValue}>React Native Team</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>API</Text>
          <Text style={styles.infoValue}>dummyjson.com</Text>
        </View>
      </View>

      {/* Navigation Debug */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Navigation</Text>
        
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={() => {
            const parent = navigation.getParent();
            console.log('Parent navigator:', parent);
            addAnalyticsEvent('Debug: Checked parent navigator');
          }}
        >
          <Text style={styles.debugButtonText}>Check Parent Navigator</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  debugButton: {
    backgroundColor: '#FF9500',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  debugButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});