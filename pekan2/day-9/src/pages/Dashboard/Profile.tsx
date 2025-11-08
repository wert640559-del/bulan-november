import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

export const Profile: React.FC = () => {
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profile */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/120' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.avatarBadge}>
            <FontAwesome6 name="camera" size={14} color="#fff" iconStyle='solid'/>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
        
        <TouchableOpacity style={styles.editProfileButton}>
          <FontAwesome6 name="pen-to-square" size={16} color="#FF3B30" />
          <Text style={styles.editProfileButtonText}>Edit Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Pesanan</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Wishlist</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Voucher</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <FontAwesome6 name="right-from-bracket" size={20} color="#FF3B30" iconStyle='solid'/>
        <Text style={styles.logoutButtonText}>Keluar</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>Rits Marketplace v1.0.0</Text>
    </ScrollView>
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
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B3020',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 8,
  },
  editProfileButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 20,
  },
});