# React Native Learning Notes

## 1. Definisi Mobile App Development

Mobile App Development adalah proses end-to-end untuk merancang, membangun, menguji, merilis, dan memelihara aplikasi yang berjalan di aplikasi mobile seperti smartphone dan tablet. Digunakan dalam platform spesifik seperti Android dan IOS yang dapat memiliki kemampuan perangkat seperti kamera, GPS, sensor gerak dan lain-lain.

**Fokus utama:**
- Pengalaman pengguna yang selaras dengan platform.
- Performa yang stabil pada perangkat beragam. 
- Kepatuhan terhadap kebijakan distribusi (Play Store/App store).

**Output teknis:**
- Paket rilis dalam bentuk APK/AAB di Android & IPA di IOS.
- Sertifikat penandatanganan (signing).
- Konfigurasi izin (permission).
- Metadata rilis (ikon, deskripsi, kebijakan privasi).

## 2. Perbedaan Web dan Mobile App Development

| Aspek | Web Development | Mobile App Development |
| :--- | :--- | :--- |
| Target eksekusi | Browser (DOM) | Runtime native (Android/iOS, komponen UI native) |
| Distribusi | URL, server deploy | Store (Play/App Store), sideload/enterprise |
| Update | Server-side, cache invalidation | Client-side, versi aplikasi, review store |
| UI/UX | DOM, responsif, input mouse/keyboard | Gesture, haptic, pola navigasi native |
| Akses hardware | Terbatas, via API browser | Luas: kamera, GPS, sensor, background tasks |
| Lifecycle | Halaman/tab, focus/visibility | App lifecycle, foreground/background, AppState |
| Penyimpanan | Cookies, localStorage, IndexedDB | AsyncStorage/SQLite, Keychain/Keystore |
| Performa | Bergantung browser & DOM | Dekat native, optimasi bridge/jembatan |
| Keamanan | CORS, CSP, XSS, CSRF | Sandbox, signing, permission, data-at-rest |
| Testing | Unit/UI via browser (Jest, Playwright) | Unit, E2E di device/simulator (Jest, Detox) |

**Implikasi Praktis:**
- Mobile menuntut pengelolaan izin
- Penanganan jaringan fluktuatif
- Optimasi konsumsi baterai dan memori
- Proses rilis yang tunduk pada kebijakan toko aplikasi

## 3. Tahapan Discovery & Requirement

Tahap ini mengidentifikasi masalah bisnis utama dan menentukan target platform berdasarkan audiens dan pasar.

**Pengaruh keputusan platform:**
- Berdasarkan analisis demografi pengguna
- Karakteristik pasar

**Kebutuhan offline/online:**
- Didefinisikan use-case inti
- Prioritas fitur berdasarkan analisis risiko awal

## 4. Perancangan Arsitektur & Teknologi (React Native)

Tahap ini menentukan pendekatan pengembangan dan struktur modul aplikasi dalam konteks React Native.

**Pentingnya strategi state management:**
- Memastikan skalabilitas dan keandalan aplikasi

**Pentingnya pola navigasi:**
- Merancang mekanisme navigasi (stack/tab-based)
- Pengalaman pengguna yang optimal

## 5. Perbedaan Native vs Hybrid Development

### Native Development
**Keuntungan:**
- Performa maksimal
- Pengalaman pengguna otentik

**Kekurangan:**
- Dua codebase terpisah
- Biaya tinggi

**Framework:**
- Kotlin/Java (Android)
- Swift/Objective-C (iOS)

### Hybrid Development  
**Keuntungan:**
- Satu codebase multi-platform
- Biaya rendah

**Kekurangan:**
- Performa lebih rendah
- Pengalaman kurang native

**Framework:**
- Apache Cordova
- Ionic

## 6. Cross-Platform Native Development

**Definisi:** Pembuatan aplikasi menggunakan satu basis kode yang dirender menjadi komponen UI native asli tanpa bergantung pada WebView.

**Perbandingan dengan Native:**

**Keuntungan:**
- Satu codebase
- Skalabilitas tinggi  
- Biaya rendah

**Kekurangan:**
- Overhead bridge
- Debugging kompleks
- Potensi inkonsistensi UI

## 7. Posisi React Native

**Perbedaan dengan ReactJS:**

| Aspek | ReactJS | React Native |
|-------|---------|--------------|
| **Target** | DOM | Komponen UI native |
| **Sintaks Dasar** | JSX | JSX |
| **Styling** | CSS | JavaScript Objects |

## 8. Tantangan Mobile Development & Solusi React Native

**Tantangan utama:**
- Pengelolaan izin perangkat
- Penanganan jaringan fluktuatif
- Optimasi konsumsi baterai dan memori
- Proses rilis yang kompleks

**Solusi React Native:**
- Menggunakan bridge untuk komunikasi dengan API native
- Satu codebase untuk multi-platform
- Komunitas besar dengan library siap pakai

## 9. Tahapan Pengujian dan Release

**Pengujian:**
- Pengujian unit untuk fungsi individu
- Pengujian snapshot untuk kestabilan UI
- Pengujian end-to-end di simulator/perangkat nyata
- Pengujian manual untuk berbagai skenario

**Build, Signing, Release:**
- Menyiapkan paket rilis aman melalui signing dan enkripsi
- Konfigurasi metadata aplikasi
- Validasi kepatuhan standar keamanan dan regulasi platform

## 10. Alasan React Native Menjadi Pilihan

React Native menjadi pilihan karena:
- Menggunakan satu codebase untuk multi-platform
- Menghasilkan UI native yang mendekati performa native
- Filosofi dan sintaks mirip ReactJS yang familiar
- Komunitas besar dan ekosistem library yang kaya
- Skalabilitas tinggi untuk pengembangan tim
- Waktu rilis yang cepat dengan biaya efektif

---

## Quick Start React Native

### Setup Environment
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init MyFirstApp

# Run on Android
npx react-native run-android

# Run on iOS (Mac only)
npx react-native run-ios


