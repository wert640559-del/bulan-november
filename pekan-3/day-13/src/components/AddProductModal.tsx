import { Modal, StyleSheet, View } from "react-native";
import { Product, ProductFormData } from "../types";
import ProductForm from "./ProductForm";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onAddProduct: (formData: ProductFormData) => Promise<void>;
  editingProduct?: Product | null;
  onUpdateProduct?: (productId: string, formData: ProductFormData) => Promise<void>;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
    visible,
    onClose,
    onAddProduct
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const insets = useSafeAreaInsets();

    const handleSubmit = async (formData: ProductFormData) => {
        setIsLoading(true);
        try {
            await onAddProduct(formData);
            onClose();
        } catch (error) {
            // Error sudah dihandle di ProductForm
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={onClose}
        >
            <View style={[
                styles.modalContainer,
                { paddingTop: insets.top }
            ]}>
                <ProductForm
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    isLoading={isLoading}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    }
})