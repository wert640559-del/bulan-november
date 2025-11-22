import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Product } from '../types/types';
import { initialProducts } from '../types/data';
import { productService } from '../services/api';

type Props = {
    route?: any;
    category?: string;
}

export default function ProductList({ route, category }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Ambil category dari route params atau langsung dari prop
    const currentCategory = route?.params?.category || category;

    const getProducts = async () => {
        try {
            setLoading(true);
            
            if (currentCategory === 'semua') {
                // ✅ TAB SEMUA: Gabungkan data lokal + SEMUA data dari API
                
                // 1. Ambil SEMUA data dari API (tanpa limit)
                const result = await productService.getProducts();
                
                if (result.success && result.data) {
                    // 2. Transform SEMUA data API ke format yang sama
                    const apiProducts: Product[] = result.data.products
                        .map((apiProduct: any) => ({
                            id: `api_${apiProduct.id}`, // Tambah prefix untuk hindari duplikat ID
                            name: apiProduct.title,
                            price: apiProduct.price,
                            image: { uri: apiProduct.thumbnail },
                            description: apiProduct.description,
                            category: apiProduct.category
                        }));
                    
                    // 3. Gabungkan data lokal + SEMUA data API
                    const combinedProducts = [...initialProducts, ...apiProducts];
                    setProducts(combinedProducts);
                    console.log(`✅ Tab Semua: ${initialProducts.length} produk lokal + ${apiProducts.length} produk API = ${combinedProducts.length} total`);
                } else {
                    // Jika API gagal, tetap tampilkan data lokal
                    setProducts(initialProducts);
                }
                
            } else {
                // ✅ TAB KATEGORI LAIN: Ambil dari API dan filter by kategori
                const result = await productService.getProducts();
                if (result.success && result.data) {
                    const filteredProducts = result.data.products
                        .filter((product: any) => product.category === currentCategory)
                        .map((apiProduct: any) => ({
                            id: apiProduct.id.toString(),
                            name: apiProduct.title,
                            price: apiProduct.price,
                            image: { uri: apiProduct.thumbnail },
                            description: apiProduct.description,
                            category: apiProduct.category
                        }));
                    setProducts(filteredProducts);
                    console.log(`✅ Tab ${currentCategory}: ${filteredProducts.length} produk`);
                } else {
                    setProducts([]);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback: Tampilkan data lokal saja jika error
            if (currentCategory === 'semua') {
                setProducts(initialProducts);
            } else {
                setProducts([]);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, [currentCategory]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Memuat produk...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image
                        style={styles.cardImage}
                        source={item.image}
                        defaultSource={{ uri: 'https://picsum.photos/300/200' }}
                    />
                    <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.source}>
                        {item.id.startsWith('api_') ? '🔄 From API' : '📱 Local'}
                    </Text>
                </View>
            )}
            ListEmptyComponent={
                <View style={styles.center}>
                    <Text>Tidak ada produk di kategori {currentCategory}</Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        maxWidth: '48%',
    },
    cardImage: {
        width: '100%',
        height: 120,
        borderRadius: 6,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF3B30',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    category: {
        fontSize: 10,
        color: '#007AFF',
        marginBottom: 2,
        textTransform: 'capitalize',
    },
    source: {
        fontSize: 10,
        color: '#888',
        fontStyle: 'italic',
    },
});