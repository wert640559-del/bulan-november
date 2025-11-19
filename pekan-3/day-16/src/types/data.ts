// import { Product } from './types';

export const initialProducts = [
  {
    id: "1",
    name: "Laptop Gaming RTX 4080",
    price: 25000000,
    image: { uri: 'https://picsum.photos/300/200?random=1' },
    description: "Laptop gaming dengan GPU RTX 4080, processor Intel i9",
    category: "electronics",
    specifications: ["GPU: RTX 4080", "Processor: Intel i9", "RAM: 32GB", "Storage: 1TB SSD"]
  },
  {
    id: "2", 
    name: "Smartphone Flagship",
    price: 15000000,
    image: { uri: 'https://picsum.photos/300/200?random=2' },
    description: "Smartphone flagship dengan kamera 108MP",
    category: "electronics",
    specifications: ["Kamera: 108MP", "Battery: 5000mAh", "Storage: 256GB"]
  },
  {
    id: "3",
    name: "Headphone Wireless",
    price: 2500000,
    image: { uri: 'https://picsum.photos/300/200?random=3' },
    description: "Headphone wireless dengan noise cancellation",
    category: "electronics"
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 3500000,
    image: { uri: 'https://picsum.photos/300/200?random=4' },
    description: "Smart watch dengan monitoring kesehatan",
    category: "electronics"
  },
  {
    id: "5",
    name: "Kamera DSLR",
    price: 12000000,
    image: { uri: 'https://picsum.photos/300/200?random=5' },
    description: "Kamera DSLR profesional 24MP",
    category: "electronics"
  },
  {
    id: "6",
    name: "Sepatu Running",
    price: 800000,
    image: { uri: 'https://picsum.photos/300/200?random=6' },
    description: "Sepatu running dengan cushioning terbaik",
    category: "sports"
  },
  {
    id: "7",
    name: "Tas Laptop",
    price: 500000,
    image: { uri: 'https://picsum.photos/300/200?random=7' },
    description: "Tas laptop anti air dengan banyak kompartemen",
    category: "fashion"
  },
  {
    id: "8",
    name: "Buku Programming",
    price: 250000,
    image: { uri: 'https://picsum.photos/300/200?random=8' },
    description: "Buku belajar programming lengkap",
    category: "books"
  },
  {
    id: "9",
    name: "Mouse Gaming",
    price: 750000,
    image: { uri: 'https://picsum.photos/300/200?random=9' },
    description: "Mouse gaming dengan DPI tinggi",
    category: "electronics"
  },
  {
    id: "10",
    name: "Keyboard Mechanical",
    price: 1200000,
    image: { uri: 'https://picsum.photos/300/200?random=10' },
    description: "Keyboard mechanical dengan switch blue",
    category: "electronics"
  },
  {
    id: "11",
    name: "Monitor 4K",
    price: 5000000,
    image: { uri: 'https://picsum.photos/300/200?random=11' },
    description: "Monitor 4K 27 inch untuk gaming dan desain",
    category: "electronics"
  },
  {
    id: "12",
    name: "Power Bank 20000mAh",
    price: 450000,
    image: { uri: 'https://picsum.photos/300/200?random=12' },
    description: "Power bank kapasitas besar dengan fast charging",
    category: "electronics"
  }
];

export const categories = [
  'Populer', 'Terbaru', 'Diskon', 'Elektronik', 'Pakaian', 
  'Makanan', 'Otomotif', 'Hiburan', 'Perlengkapan Bayi'
];