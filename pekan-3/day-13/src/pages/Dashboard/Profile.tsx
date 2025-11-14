import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainAppParams, ProfileParams } from '../../types/navigation';
import { AuthGuard } from '../../components/AuthGuard';

// ✅ SOLUSI: Hapus props yang tidak diperlukan dari Bottom Tab Navigator
export const Profile: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  
  // SOLUSI: Gunakan useNavigationState untuk mendapatkan state drawer
  const routes = useNavigationState(state => state.routes);
  
  // Type-safe way to get userToken
  const isAuthenticated = (() => {
    const rootRoute = routes.find(route => route.name === 'MainApp');
    if (rootRoute?.params) {
      const params = rootRoute.params as MainAppParams;
      return params.userToken !== undefined;
    }
    return false;
  })();
  
  const [userID, setUserID] = useState<string | null>(null);

  // Ambil parameter userID dari route parameters
  useEffect(() => {
    const params = route.params as ProfileParams;
    if (params?.userID) {
      setUserID(params.userID);
      console.log('UserID received in Profile:', params.userID);
    }
  }, [route.params]);

  const menuItems = [
    {
      icon: 'user-pen',
      title: 'Edit Profil',
      description: 'Ubah data pribadi Anda',
      color: '#007AFF',
    },
    {
      icon: 'location-dot',
      title: 'Alamat Saya',
      description: 'Kelola alamat pengiriman',
      color: '#34C759',
    },
    {
      icon: 'credit-card',
      title: 'Pembayaran',
      description: 'Metode pembayaran',
      color: '#FF9500',
    },
    {
      icon: 'heart',
      title: 'Wishlist',
      description: 'Produk yang disukai',
      color: '#FF3B30',
    },
    {
      icon: 'file-lines',
      title: 'Pesanan Saya',
      description: 'Riwayat pembelian',
      color: '#5856D6',
    },
    {
      icon: 'bell',
      title: 'Notifikasi',
      description: 'Pengaturan notifikasi',
      color: '#FF2D55',
    },
    {
      icon: 'shield-halved',
      title: 'Privasi & Keamanan',
      description: 'Pengaturan privasi',
      color: '#32D74B',
    },
    {
      icon: 'circle-question',
      title: 'Bantuan & Dukungan',
      description: 'Pusat bantuan',
      color: '#0A84FF',
    },
  ];

  // SOLUSI: Fungsi navigasi dengan type assertion
  const navigateToHomeStack = () => {
    const navigationAny = navigation as any;
    navigationAny.navigate('MainApp', {
      screen: 'HomeStack',
      params: { welcomeMessage: 'Dari Profile!' }
    });
  };

  const resetToRoot = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  // Fungsi untuk demo navigation state
  const showNavigationState = () => {
    const currentRoute = routes[routes.length - 1];
    Alert.alert(
      'Navigation State Info',
      `Current Route: ${currentRoute.name}\nTotal Routes: ${routes.length}\nAuthenticated: ${isAuthenticated ? 'Yes' : 'No'}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <AuthGuard>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/* ✅ PERBAIKAN: Gunakan {uri: 'url'} untuk gambar dari internet */}
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/lego/6.jpg' }}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.avatarBadge}>
              <FontAwesome6 name="camera" size={14} color="#fff" iconStyle='solid'/>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>Muhammad Harits</Text>
          <Text style={styles.userEmail}>wert640559@gmail.com</Text>
          
          {/* Display UserID dari parameter */}
          {userID && (
            <View style={styles.userIdContainer}>
              <Text style={styles.userIdLabel}>User ID:</Text>
              <Text style={styles.userIdValue}>{userID}</Text>
            </View>
          )}

          {/* Status Autentikasi */}
          <View style={[
            styles.authStatus, 
            isAuthenticated ? styles.authStatusAuthenticated : styles.authStatusUnauthenticated
          ]}>
            <FontAwesome6 
              name={isAuthenticated ? "circle-check" : "circle-exclamation"} 
              size={14} 
              color="#fff" 
              iconStyle='solid'
            />
            <Text style={styles.authStatusText}>
              {isAuthenticated ? 'Terverifikasi' : 'Belum Login'}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <FontAwesome6 name="pen-to-square" size={16} color="#FF3B30" />
            <Text style={styles.editProfileButtonText}>Edit Profil</Text>
          </TouchableOpacity>

          {/* Tombol untuk melihat navigation state */}
          <TouchableOpacity 
            style={styles.debugButton}
            onPress={showNavigationState}
          >
            <FontAwesome6 name="bug" size={14} color="#666" iconStyle='solid'/>
            <Text style={styles.debugButtonText}>Debug Navigation</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>Pesanan</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>87</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>999+</Text>
            <Text style={styles.statLabel}>Voucher</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => console.log(item.title)}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <FontAwesome6 name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <FontAwesome6 name="chevron-right" size={16} color="#ccc" iconStyle='solid'/>
            </TouchableOpacity>
          ))}
        </View>

        {/* Analytics History Button */}
        <TouchableOpacity 
          style={styles.analyticsButton}
          onPress={() => navigation.navigate('AnalyticsHistory')}
        >
          <FontAwesome6 name="chart-line" size={20} color="#007AFF" iconStyle='solid'/>
          <Text style={styles.analyticsButtonText}>Lihat History Analytics</Text>
        </TouchableOpacity>

        {/* Navigation Actions */}
        <View style={styles.navigationActions}>
          <Text style={styles.navigationActionsTitle}>Aksi Navigasi Lanjutan</Text>
          
          <TouchableOpacity 
            style={styles.navActionButton}
            onPress={navigateToHomeStack}
          >
            <FontAwesome6 name="house" size={16} color="#007AFF" iconStyle='solid'/>
            <Text style={styles.navActionButtonText}>Ke Home Stack</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navActionButton}
            onPress={resetToRoot}
          >
            <FontAwesome6 name="rotate-left" size={16} color="#34C759" iconStyle='solid'/>
            <Text style={styles.navActionButtonText}>Reset ke Root</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <FontAwesome6 name="right-from-bracket" size={20} color="#FF3B30" iconStyle='solid'/>
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Rits Marketplace v1.0.0</Text>
        <Text style={styles.nestedInfo}>
          🔗 Hierarki: Drawer → Bottom Tabs → Profile Screen
        </Text>
        <Text style={styles.typeInfo}>
          ✅ Fixed: Profile component tanpa custom props
        </Text>
      </ScrollView>
    </AuthGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  userIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  userIdLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 6,
  },
  userIdValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF3B30',
  },
  authStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  authStatusAuthenticated: {
    backgroundColor: '#34C759',
  },
  authStatusUnauthenticated: {
    backgroundColor: '#FF9500',
  },
  authStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B3020',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
    marginBottom: 12,
  },
  editProfileButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  debugButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6,
  },
  debugButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e8e8e8',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  analyticsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF20',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    gap: 8,
  },
  analyticsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  navigationActions: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  navigationActionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  navActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  navActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginBottom: 16,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  nestedInfo: {
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  typeInfo: {
    textAlign: 'center',
    fontSize: 11,
    color: '#34C759',
    fontStyle: 'italic',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});