import cleanserImg from "@/assets/product-cleanser.jpg";
import moisturizerImg from "@/assets/product-moisturizer.jpg";
import sunscreenImg from "@/assets/product-sunscreen.jpg";
import type { Product } from "@/types/product";

export const products: Product[] = [
  // Cleansers
  {
    id: "p1",
    name: "Gentle Foam Cleanser",
    category: "cleansers",
    description:
      "A sulfate-free foaming cleanser that removes impurities without stripping moisture. Ideal for daily use.",
    price: 14.0,
    rating: 4.5,
    image: cleanserImg,
  },
  {
    id: "p2",
    name: "Calm & Soothe Gel Wash",
    category: "cleansers",
    description:
      "A gel-based cleanser with aloe and green tea to calm redness and refresh the skin barrier.",
    price: 16.0,
    rating: 4.4,
    image: cleanserImg,
  },
  {
    id: "p3",
    name: "Milky Micellar Cleanser",
    category: "cleansers",
    description:
      "A rinse-free micellar formula that gently lifts makeup and sunscreen while leaving a hydrated finish.",
    price: 13.0,
    rating: 4.2,
    image: cleanserImg,
  },
  {
    id: "p4",
    name: "Balancing Clay Cleanser",
    category: "cleansers",
    description:
      "Cream-clay hybrid with kaolin to refine pores and balance oils without over-drying.",
    price: 18.0,
    rating: 4.3,
    image: cleanserImg,
  },
  // Moisturizers
  {
    id: "p5",
    name: "Hydra Cloud Moisturizer",
    category: "moisturizers",
    description:
      "Featherlight gel-cream with hyaluronic acid and squalane for all-day bounce and glow.",
    price: 22.0,
    rating: 4.7,
    image: moisturizerImg,
  },
  {
    id: "p6",
    name: "Barrier Repair Cream",
    category: "moisturizers",
    description:
      "Ceramide-rich daily moisturizer that strengthens the skin barrier and locks in hydration.",
    price: 24.0,
    rating: 4.6,
    image: moisturizerImg,
  },
  {
    id: "p7",
    name: "Dewy Glow Emulsion",
    category: "moisturizers",
    description:
      "Weightless emulsion that delivers dewy moisture with niacinamide for refined tone and texture.",
    price: 21.0,
    rating: 4.4,
    image: moisturizerImg,
  },
  {
    id: "p8",
    name: "Overnight Recovery Mask",
    category: "moisturizers",
    description:
      "A sleeping mask with panthenol and peptides to visibly plump and recharge skin by morning.",
    price: 26.0,
    rating: 4.8,
    image: moisturizerImg,
  },
  // Sunscreens
  {
    id: "p9",
    name: "Daily Sheer SPF 50",
    category: "sunscreens",
    description:
      "Broad-spectrum SPF 50 with a sheer, no-cast finish. Layers perfectly under makeup.",
    price: 20.0,
    rating: 4.6,
    image: sunscreenImg,
  },
  {
    id: "p10",
    name: "Mineral Silk SPF 40",
    category: "sunscreens",
    description:
      "100% mineral sunscreen with a silky texture and soft-focus finish suitable for sensitive skin.",
    price: 23.0,
    rating: 4.3,
    image: sunscreenImg,
  },
  {
    id: "p11",
    name: "Glow Guard SPF 30",
    category: "sunscreens",
    description:
      "Hydrating SPF with vitamin E for a natural glow and everyday protection.",
    price: 18.0,
    rating: 4.2,
    image: sunscreenImg,
  },
  {
    id: "p12",
    name: "Matte Defense SPF 45",
    category: "sunscreens",
    description:
      "Oil-controlling sunscreen with a soft matte finish. Great for combination to oily skin.",
    price: 21.0,
    rating: 4.5,
    image: sunscreenImg,
  },
];
