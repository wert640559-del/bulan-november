import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

// Buat array kosong dengan panjang 20, lalu isi untuk iterasi
const array = Array.from({ length: 20 })

export default function SimpleList() {
    const [refreshing, setRefreshing] = useState(false)
    // const [data, setData] = useState(0) // Variabel ini dihapus karena tidak digunakan

    return (
        // Menghilangkan Fragment (<>) yang tidak diperlukan karena hanya ada satu root element (ScrollView)
        <ScrollView style={styles.container}>
            {/* SOLUSI: Menggunakan Array.map() */}
            {array.map((_, index) => (
                // PENTING: Setiap item di list harus memiliki key yang unik
                <View key={index} style={styles.item}>
                    <Text style={styles.text}>Item ke-{index + 1}</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    text: {
        fontSize: 16,
        color: '#ffd7d7ff',
    }
});
