import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// --- Komponen Sederhana Tanpa Ikon ---

const HeaderSection = () => (
  <View style={styles.headerContainer}>
    <View style={styles.locationContainer}>
      <Text style={[styles.textBase, styles.locationText]}>📍 Home</Text>
      <Text style={[styles.textBase, styles.iconPlaceholder]}>⌄</Text>
    </View>
    <View style={styles.headerRightIcons}>
      <Text style={[styles.textBase, styles.iconPlaceholder]}>🔍</Text>
      <Text style={[styles.textBase, styles.iconPlaceholder]}>💬</Text>
    </View>
  </View>
);

const GopaySection = () => (
  <View style={styles.gopayContainer}>
    <View style={styles.gopayHeader}>
      <Text style={styles.gopayLogoText}>GO-PAY</Text>
      <Text style={styles.gopayBalance}>Rp125.000</Text>
      <Text style={styles.gopayPlusText}>➕</Text>
    </View>
    <View style={styles.gopayActions}>
      <TouchableOpacity style={styles.gopayActionButton}>
        <Text style={styles.gopayActionIconText}>💳</Text>
        <Text style={styles.gopayActionText}>Bayar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gopayActionButton}>
        <Text style={styles.gopayActionIconText}>↑</Text>
        <Text style={styles.gopayActionText}>Top Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.gopayActionButton}>
        <Text style={styles.gopayActionIconText}>🧭</Text>
        <Text style={styles.gopayActionText}>Explore</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const FeatureButton = ({ text, symbol }: { text: string; symbol: string }) => (
  <TouchableOpacity style={styles.featureButton}>
    <View style={styles.featureIconContainer}>
      <Text style={styles.featureSymbol}>{symbol}</Text>
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </TouchableOpacity>
);

const MainFeaturesSection = () => (
  <View style={styles.mainFeaturesContainer}>
    {/* Menggunakan emoji atau placeholder teks sebagai pengganti ikon */}
    <FeatureButton symbol="🏍️" text="GoRide" />
    <FeatureButton symbol="🚗" text="GoCar" />
    <FeatureButton symbol="🍔" text="GoFood" />
    <FeatureButton symbol="📦" text="GoSend" />
    <FeatureButton symbol="🛒" text="GoMart" />
    <FeatureButton symbol="🏥" text="GoMed" />
    <FeatureButton symbol="🛍️" text="GoShop" />
    <FeatureButton symbol="•••" text="Lainnya" />
  </View>
);

const PromoBanner = () => (
  <View style={styles.promoBannerContainer}>
    <Text style={styles.promoBannerText}>PROMO! Diskon 50% untuk GoFood!</Text>
  </View>
);

const BottomNavBar = () => (
  <View style={styles.bottomNavContainer}>
    <TouchableOpacity style={styles.bottomNavItem}>
      <Text style={[styles.bottomNavIconText, styles.bottomNavActiveIcon]}>🏠</Text>
      <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>Beranda</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomNavItem}>
      <Text style={styles.bottomNavIconText}>🏷️</Text>
      <Text style={styles.bottomNavText}>Promo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomNavItem}>
      <Text style={styles.bottomNavIconText}>📄</Text>
      <Text style={styles.bottomNavText}>Pesanan</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bottomNavItem}>
      <Text style={styles.bottomNavIconText}>💬</Text>
      <Text style={styles.bottomNavText}>Chat</Text>
    </TouchableOpacity>
  </View>
);

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>

        <HeaderSection />
        <GopaySection />
        <MainFeaturesSection />
        <PromoBanner />

        {/* Spacer for bottom nav */}
        <View style={{ height: 80 }} /> 

      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollView: { backgroundColor: '#f5f5f5' },
    textBase: { color: '#333' },

    // --- Header Styles ---
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    locationText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
        marginRight: 4,
    },
    iconPlaceholder: {
        fontSize: 18,
        marginHorizontal: 5,
    },
    headerRightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // --- GoPay Section Styles ---
    gopayContainer: {
        backgroundColor: '#008800', // Warna hijau GoPay
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 15,
        padding: 15,
        elevation: 3,
    },
    gopayHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        paddingBottom: 10,
        marginBottom: 10,
    },
    gopayLogoText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff',
        marginRight: 10,
    },
    gopayBalance: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    gopayPlusText: {
        color: '#fff',
        fontSize: 16,
    },
    gopayActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
    },
    gopayActionButton: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: 5,
    },
    gopayActionIconText: {
        fontSize: 24,
    },
    gopayActionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },

    // --- Main Features Styles ---
    mainFeaturesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginTop: 12,
        borderRadius: 15,
        marginHorizontal: 16,
        elevation: 1,
    },
    featureButton: {
        width: '23%',
        alignItems: 'center',
        marginBottom: 15,
    },
    featureIconContainer: {
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 8, // Sedikit padding untuk menampung emoji
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    featureSymbol: {
        fontSize: 24, // Ukuran emoji
    },
    featureText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        marginTop: 6,
        textAlign: 'center',
    },

    // --- Promo Banner Styles ---
    promoBannerContainer: {
        marginTop: 15,
        marginHorizontal: 16,
        borderRadius: 15,
        backgroundColor: '#ffaa00', // Warna kuning/oranye untuk promo
        padding: 15,
        elevation: 2,
    },
    promoBannerText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },

    // --- Bottom Navigation Bar Styles ---
    bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    bottomNavItem: {
        alignItems: 'center',
        flex: 1,
    },
    bottomNavIconText: {
        fontSize: 24,
        marginBottom: 2,
        // Emojis mungkin tidak bisa di-tint color, jadi kita atur warna text aktifnya
    },
    bottomNavActiveIcon: {
        // Jika emoji mendukung warna, ini bisa lebih baik
    },
    bottomNavText: {
        fontSize: 10,
        color: '#999',
    },
    bottomNavTextActive: {
        color: '#00AA13', // Warna hijau Gojek
        fontWeight: 'bold',
    },
});

export default App;