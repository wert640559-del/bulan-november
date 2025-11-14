// FILE: ./components/ProductItem.tsx
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Product } from "../types";
import { useNavigation } from "@react-navigation/native";

interface ProductItemProps {
    product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        // PERBAIKAN: Gunakan navigation yang benar
        navigation.navigate('ProductDetail', { productId: product.id });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
            {/* Image Container */}
            <View style={styles.imageContainer}>
                <Image
                  source={product.image}
                  style={styles.image}
                  resizeMode="contain"
                />
            </View>

            {/* Product Info */}
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    Rp {product.price.toLocaleString('id-ID')}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                    {product.description}
                </Text>
                
                {/* Additional Marketplace Info */}
                <View style={styles.marketplaceInfo}>
                    <Text style={styles.rating}>⭐ 4.8</Text>
                    <Text style={styles.sold}>• Terjual 100+</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 4,
        marginBottom: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    imageContainer: {
        width: '100%',
        height: 140,
        backgroundColor: '#f8f9fa',
        borderRadius: 6,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '80%',
        height: '80%',
    },
    info: {
        paddingHorizontal: 4,
    },
    name: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
        lineHeight: 16,
        minHeight: 32,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF3B30',
        marginBottom: 2,
    },
    description: {
        fontSize: 10,
        color: '#666',
        marginBottom: 6,
    },
    marketplaceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 10,
        color: '#666',
    },
    sold: {
        fontSize: 10,
        color: '#666',
        marginLeft: 4,
    },
})