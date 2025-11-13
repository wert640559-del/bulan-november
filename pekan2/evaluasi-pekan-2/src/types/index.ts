export interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
    description: string;
    specifications?: string[];
    category?: string;
}

export interface ProductFormData {
    name: string;
    price: string;
    image: any;
    description: string;
    specifications?: string[];
    category?: string;
}

export interface EnvironmentInfo {
    reactNativeVersion: string;
    nodeVersion: string;
    platform: string;
    typescript: boolean
}
