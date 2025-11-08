import { Product } from "../types";

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Gaming",
    price: 5000000,
    image: require("../assets/images/laptop-gaming.png"),
    description: "Laptop gaming yang kuat dan siap untuk game berat."
  },
  {
    id: "2",
    name: "Mouse Gaming",
    price: 500000,
    image: require("../assets/images/mouse.png"),
    description: "Mouse gaming dengan sensor akurat dan kontrol nyaman."
  },
  {
    id: "3",
    name: "Keyboard Gaming",
    price: 500000,
    image: require("../assets/images/keyboard.png"),
    description: "Keyboard RGB dengan switch responsif untuk gamer sejati."
  },
  {
    id: "4",
    name: "Headset Gaming",
    price: 500000,
    image: require("../assets/images/headset.png"),
    description: "Headset surround dengan bass mantap untuk pengalaman imersif."
  },
  {
    id: "5",
    name: "Monitor Gaming",
    price: 500000,
    image: require("../assets/images/monitor.png"),
    description: "Monitor gaming refresh rate tinggi, visual tajam dan mulus."
  },
  {
    id: "6",
    name: "CPU Gaming (AMD Ryzen)",
    price: 500000,
    image: require("../assets/images/cpu.png"),
    description: "Prosesor Ryzen siap overclock untuk performa gaming gahar."
  },
  {
    id: "7",
    name: "RAM Gaming (Corsair)",
    price: 500000,
    image: require("../assets/images/ram.png"),
    description: "RAM DDR4 kencang untuk multitasking dan gameplay lancar."
  },
  {
    id: "8",
    name: "GPU Gaming",
    price: 500000,
    image: require("../assets/images/gpu.png"),
    description: "GPU powerful untuk performa grafis maksimal."
  },
  {
    id: "9",
    name: "Storage Gaming",
    price: 500000,
    image: require("../assets/images/ssd.png"),
    description: "SSD NVMe super cepat, loading game lebih singkat."
  },
  {
    id: "10",
    name: "Motherboard Gaming",
    price: 500000,
    image: require("../assets/images/motherboard.png"),
    description: "Motherboard gaming stabil dan mendukung komponen high-end."
  }
];
