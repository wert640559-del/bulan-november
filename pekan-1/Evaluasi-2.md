### **1. Konsep Dasar React Native, Perbedaan dengan React Web, dan Peran New Architecture v0.80**

**Konsep Dasar React Native:**
React Native adalah framework open-source untuk membangun aplikasi mobile native (iOS dan Android) menggunakan JavaScript dan React. Berbeda dengan aplikasi web hybrid, React Native merender UI menggunakan komponen native (seperti `View` dan `Text` yang dikonversi ke `UIView` di iOS atau `android.view` di Android), bukan elemen HTML. Ini memberikan performa dan feel yang mendekati aplikasi asli (native). Keunggulan utamanya adalah code sharing antar platform yang bisa mencapai 90%, hot reloading untuk pengembangan cepat, dan akses ke API native melalui sebuah bridge.

**Perbedaan Utama dengan React untuk Web:**
- **Lingkungan Render:** React untuk web merender komponen ke dalam DOM (Document Object Model) dan menghasilkan HTML/CSS. Sebaliknya, React Native merender komponen ke dalam komponen UI native mobile. Komponen `<View>` dan `<Text>` di React Native setara dengan `<div>` dan `<p>` di web, tetapi di balik layar, mereka dipetakan ke elemen native.
- **Styling:** React Native tidak menggunakan CSS, melainkan JavaScript object dengan `StyleSheet.create()` yang meniru subset CSS, terutama Flexbox untuk layout.
- **API dan Kehidupan Siklus:** React Native memiliki akses ke API perangkat mobile (seperti kamera, GPS) melalui bridge, sedangkan React web berinteraksi dengan API browser.

**Peran New Architecture di React Native v0.80:**
New Architecture (diaktifkan default di v0.80) menggantikan legacy bridge dengan dua komponen utama:
- **JSI (JavaScript Interface):** Memungkinkan komunikasi synchronous yang lebih cepat antara kode JavaScript dan native, berbeda dengan bridge lama yang asynchronous dan bisa menjadi bottleneck.
- **Fabric (Renderer Baru) dan TurboModules:** Fabric memungkinkan rendering UI yang lebih efisien dan TurboModules untuk lazy loading module native.
**Dampak pada Performa:** Pergantian ini mengurangi latency hingga 50% pada operasi kompleks seperti animasi dan scrolling yang berat, karena menghilangkan overhead serialisasi data di bridge lama. Aplikasi menjadi lebih responsif dan memiliki performa yang mendekati aplikasi yang sepenuhnya native.

---

### **2. Perbandingan React Native CLI dan Expo**

**Perbandingan Arsitektur dan Proses Build:**
- **Arsitektur:** CLI menghasilkan proyek "bare" dengan akses penuh ke folder native (`ios/` dan `android/`), memungkinkan modifikasi langsung kode Objective-C/Swift atau Java/Kotlin. Expo menggunakan "managed workflow" di mana native code disembunyikan dan developer berinteraksi melalui Expo SDK.
- **Proses Build:** Dengan CLI, build dilakukan secara lokal menggunakan Xcode (iOS) atau Android Studio/Gradle (Android). Dengan Expo (managed), build dapat dilakukan di cloud (EAS Build) atau aplikasi diuji langsung di Expo Go tanpa proses build lokal.

**Kelebihan dan Kekurangan:**
- **React Native CLI:**
  - *Kelebihan:* Akses penuh ke native code untuk modul kustom dan integrasi hardware khusus (contoh: Bluetooth LE tingkat rendah).
  - *Kekurangan:* Setup yang kompleks dan rawan error konfigurasi, serta waktu build yang lama.
- **Expo:**
  - *Kelebihan:* Setup yang sangat cepat dan Expo Go untuk preview instan tanpa build, ideal untuk prototyping.
  - *Kekurangan:* Keterbatasan akses native di managed workflow dan ketergantungan pada Expo SDK (vendor lock-in).

**Contoh Skenario Pemilihan:**
- **Saya akan memilih React Native CLI** untuk proyek aplikasi enterprise yang membutuhkan integrasi dengan perangkat hardware khusus, seperti scanner barcode internal yang menggunakan SDK native tertentu. Alasannya, CLI memberikan fleksibilitas untuk menulis dan menghubungkan modul native kustom (TurboModules) yang mungkin tidak didukung oleh Expo SDK.
- **Saya akan memilih Expo** untuk membuat MVP (Minimum Viable Product) aplikasi e-commerce standar dalam waktu singkat. Alasannya, Expo memungkinkan tim kecil untuk berfokus pada pengembangan logika bisnis dan UI tanpa terbebani konfigurasi native yang kompleks, serta memanfaatkan modul pra-bangun seperti kamera dan notifikasi push.

---

### **3. Pentingnya Komponen Android SDK untuk React Native**

Berikut penjelasan mengapa setiap komponen SDK diperlukan dan contoh masalah jika tidak ada:

- **SDK Platforms (android-35):**
  - **Alasan Diperlukan:** Menyediakan API libraries dan system images untuk membangun aplikasi yang menargetkan Android 15 (API Level 35). React Native membutuhkannya untuk memastikan kompatibilitas dengan fitur OS terbaru dan agar kode native dapat dikompilasi dengan benar.
  - **Contoh Masalah:** Jika tidak ada, perintah `npx react-native run-android` akan gagal dengan error seperti `"Failed to find target with hash string 'android-35'"`, karena Gradle tidak dapat menemukan platform SDK yang diperlukan untuk melakukan build.

- **Build Tools (35.0.0):**
  - **Alasan Diperlukan:** Berisi alat-alat seperti `aapt2` (Android Asset Packaging Tool) untuk mengkompilasi resource (gambar, layout) dan `d8`/`R8` untuk kompilasi dan optimasi kode. Alat-alat ini digunakan oleh Gradle untuk mengemas kode JavaScript, resource, dan kode native menjadi file APK/AAB yang dapat dijalankan.
  - **Contoh Masalah:** Tanpa Build Tools, proses build akan terhenti dengan error `"Could not find build tools version 35.0.0"`. Aplikasi tidak akan bisa dibuat file instalasinya (APK).

- **Platform Tools:**
  - **Alasan Diperlukan:** Termasuk `adb` (Android Debug Bridge), yang merupakan alat kunci untuk berkomunikasi dengan emulator atau perangkat Android fisik. `adb` digunakan untuk menginstal APK, menjalankan perintah shell, dan yang paling penting, untuk menampilkan log JavaScript dan native melalui `logcat` yang sangat vital untuk debugging di React Native.
  - **Contoh Masalah:** Jika Platform Tools tidak ada di PATH, perintah `react-native run-android` mungkin tidak dapat menemukan perangkat/emulator yang terhubung (`"No Android device or emulator found"`). Bahkan jika APK berhasil dibangun, proses debugging menjadi sangat sulit tanpa `adb logcat`.

---

### **4. Prasyarat Umum Setup React Native CLI v0.80 dan Alasannya**

- **Node.js (v20.18+ LTS):**
  - **Alasan Diperlukan:** Bertindak sebagai runtime JavaScript untuk menjalankan Metro Bundler (yang bertugas membundle kode JavaScript) dan untuk mengelola dependensi proyek melalui npm atau Yarn. Tanpa Node.js, perintah untuk memulai proyek (`npx react-native init`) dan server development tidak dapat dijalankan.

- **Watchman (v2025.04.21.00+):**
  - **Alasan Diperlukan:** Adalah tool "file watching" yang dikembangkan Facebook. Ia memantau perubahan pada file di proyek secara efisien. Ini adalah fondasi untuk fitur **hot reloading** di React Native. Ketika developer menyimpan perubahan kode, Watchman mendeteksinya dengan cepat dan memberi sinyal ke Metro Bundler untuk melakukan rebuild bundle parsial, sehingga perubahan langsung terlihat di emulator.

- **Yarn (v4.5+, opsional tapi direkomendasikan):**
  - **Alasan Diperlukan:** Sebagai package manager, Yarn lebih cepat dan andal dalam mengelola `node_modules` dibandingkan npm, terutama untuk proyek besar atau monorepo. Ia memastikan proses `install` dependensi berjalan konsisten di semua lingkungan development, mengurangi kemungkinan error "works on my machine" yang disebabkan oleh perbedaan versi dependency.

Ketiga alat ini bersama-sama membentuk fondasi yang menjembatani kode JavaScript/TypeScript ke native runtime: Node.js menjalankan logika JS, Watchman memungkinkan pengembangan yang gesit, dan Yarn mengelola semua kode pihak ketiga yang menghubungkan React dengan platform native.

---

### **5. Struktur Folder Proyek React Native CLI dan Dukungannya**

**Deskripsi Struktur Folder dan File Utama:**

- **`android/` dan `ios/`:**
  - **Fungsi:** Folder ini berisi kode native spesifik platform. `android/` berisi proyek Android (Gradle, kode Java/Kotlin, manifest), sedangkan `ios/` berisi proyek Xcode (kode Swift/Objective-C, Podfile). Folder inilah yang dikompilasi menjadi aplikasi native sebenarnya.
- **`App.js`:**
  - **Fungsi:** Ini adalah komponen root atau komponen utama aplikasi. Semua kode UI dan logika dimulai dari sini. Ini adalah file yang paling sering diedit oleh developer.
- **`index.js`:**
  - **Fungsi:** Sebagai entry point JavaScript. File ini mendaftarkan komponen `App` ke sistem native React Native menggunakan `AppRegistry`, sehingga kode JavaScript tahu komponen mana yang harus dirender sebagai root.
- **`metro.config.js`:**
  - **Fungsi:** File konfigurasi untuk Metro Bundler. Di sini, developer dapat mengatur hal-hal seperti alias path untuk impor modul (misalnya `@components` merujuk ke folder `src/components`) atau menambahkan ekstensi file yang harus dibundle (misalnya `.svg`).

**Dukungan untuk Pengembangan Cross-Platform:**
Struktur ini secara jelas memisahkan kode yang sama (JavaScript/TypeScript di root) dari kode yang berbeda (native di folder `android/` dan `ios/`). Prinsip "belum sekali, tulis di mana saja" diterapkan: developer menulis logika dan UI utama sekali di `App.js` dan file JS/TS lainnya, lalu React Native CLI akan membangunnya untuk kedua platform menggunakan kode native di folder masing-masing. Ini mendukung pengembangan cross-platform yang efisien.

**Dukungan untuk Navigasi di VS Code:**
Struktur yang terorganisir dengan baik memudahkan navigasi di VS Code. Developer dapat dengan mudah:
- Membuka dan mengedit `App.js` untuk mengubah UI.
- Melihat konfigurasi build di `android/app/build.gradle` atau `ios/Podfile` jika diperlukan.
- Menggunakan fitur "Go to File" (Ctrl+P) untuk langsung melompat ke file mana pun.
- Ekstensi seperti "React Native Tools" dapat memanfaatkan struktur standar ini untuk memberikan fitur debugging dan snippet yang lebih baik.