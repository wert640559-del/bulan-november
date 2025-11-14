// FILE: ./data/initialProducts.ts
import { Product } from "../types";

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 500000,
    image: { uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png' },
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "backpack",
    specifications: [
      "Material: Polyester",
      "Capacity: 15 Laptops", 
      "Compartments: Multiple pockets",
      "Straps: Padded shoulder straps",
      "Water resistant"
    ]
  },
  {
    id: "2",
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 250000,
    image: { uri: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png' },
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "clothing",
    specifications: [
      "Material: 100% Cotton",
      "Fit: Slim Fit",
      "Style: Casual",
      "Care: Machine wash",
      "Sizes: S, M, L, XL"
    ]
  },
  {
    id: "3",
    name: "Mens Cotton Jacket",
    price: 750000,
    image: { uri: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png' },
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "clothing",
    specifications: [
      "Material: 100% Cotton",
      "Closure: Zipper",
      "Pockets: 2 side pockets",
      "Season: All seasons",
      "Style: Casual"
    ]
  },
  {
    id: "4",
    name: "Mens Casual Slim Fit",
    price: 350000,
    image: { uri: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png' },
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "clothing",
    specifications: [
      "Material: Cotton Polyester",
      "Fit: Slim Fit", 
      "Neck: Round neck",
      "Sleeve: Long sleeve",
      "Pattern: Solid"
    ]
  },
  {
    id: "5",
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 2500000,
    image: { uri: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png' },
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelry",
    specifications: [
      "Material: Gold & Silver",
      "Closure: Station chain",
      "Style: Bracelet",
      "Gender: Women's",
      "Collection: Legends"
    ]
  },
  {
    id: "6",
    name: "Solid Gold Petite Micropave",
    price: 3500000,
    image: { uri: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png' },
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.",
    category: "jewelry",
    specifications: [
      "Material: Solid Gold",
      "Style: Micropave",
      "Stone: Diamond",
      "Setting: Prong setting",
      "Guarantee: 30 days return"
    ]
  },
  {
    id: "7",
    name: "White Gold Plated Princess",
    price: 1800000,
    image: { uri: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png' },
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelry",
    specifications: [
      "Material: White Gold Plated",
      "Style: Princess cut",
      "Stone: Diamond",
      "Occasion: Engagement, Wedding",
      "Type: Promise ring"
    ]
  },
  {
    id: "8",
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 850000,
    image: { uri: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png' },
    description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelry",
    specifications: [
      "Material: Stainless Steel",
      "Plating: Rose Gold",
      "Style: Double flared",
      "Type: Tunnel plug",
      "Gauge: 14G"
    ]
  },
  {
    id: "9",
    name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 1200000,
    image: { uri: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png' },
    description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems",
    category: "electronics",
    specifications: [
      "Capacity: 2TB",
      "Interface: USB 3.0",
      "Compatibility: USB 2.0",
      "Type: Portable HDD",
      "Formatted: NTFS"
    ]
  },
  {
    id: "10",
    name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 1500000,
    image: { uri: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png' },
    description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    specifications: [
      "Capacity: 1TB",
      "Type: Internal SSD", 
      "Interface: SATA III 6Gb/s",
      "Speed: 535MB/s read, 450MB/s write",
      "Form Factor: 2.5 inch"
    ]
  },
  {
    id: "11",
    name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 800000,
    image: { uri: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png' },
    description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    specifications: [
      "Capacity: 256GB",
      "NAND: 3D NAND",
      "Cache: SLC Cache",
      "Interface: SATA III",
      "Form Factor: 2.5 inch"
    ]
  },
  {
    id: "12",
    name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 1800000,
    image: { uri: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png' },
    description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    specifications: [
      "Capacity: 4TB",
      "Compatibility: PS4",
      "Type: Portable HDD",
      "Warranty: 3 years",
      "Design: Sleek gaming design"
    ]
  }
];