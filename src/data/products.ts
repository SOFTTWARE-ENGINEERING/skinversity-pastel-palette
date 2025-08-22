import type { Product } from "@/types/product";

import balancingCleanserImg from "@/assets/balancing-cleanser.jpg";
import brightSerumImg from "@/assets/bright-serum.jpg";
import cleanserImg from "@/assets/cleanser.jpg";
import exfoliatingTonerImg from "@/assets/exfoliating-toner.jpg";
import foamingCleanserImg from "@/assets/foaming-cleanser.jpg";
import lipBalmImg from "@/assets/lip-balm.jpg";
import lipTherapy1Img from "@/assets/lip-therapy1.jpg";
import lipTherapyImg from "@/assets/lip-therapy.jpg";
import lipTintImg from "@/assets/lip-tint.jpg";
import moisturizingCreamImg from "@/assets/moisturizing-cream.jpg";
import productCleanserImg from "@/assets/product-cleanser.jpg";
import productMoisturizerImg from "@/assets/product-moisturizer.jpg";
import productSunscreenImg from "@/assets/product-sunscreen.jpg";
import serumImg from "@/assets/serum.jpg";
import whipCleanserImg from "@/assets/whip-cleanser.jpg";

const productImages: { [key: string]: string } = {
  "Gentle Foam Cleanser": foamingCleanserImg,
  "Calm & Soothe Gel Wash": cleanserImg,
  "Milky Micellar Cleanser": productCleanserImg,
  "Balancing Clay Cleanser": balancingCleanserImg,
  "Hydra Cloud Moisturizer": moisturizingCreamImg,
  "Barrier Repair Cream": productMoisturizerImg,
  "Dewy Glow Emulsion": brightSerumImg,
  "Overnight Recovery Mask": serumImg,
  "Daily Sheer SPF 50": productSunscreenImg,
  "Mineral Silk SPF 40": productSunscreenImg,
  "Glow Guard SPF 30": productSunscreenImg,
  "Matte Defense SPF 45": productSunscreenImg,
  "Whip Cleanser": whipCleanserImg,
  "Exfoliating Toner": exfoliatingTonerImg,
};

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
    image: productImages["Gentle Foam Cleanser"],
  },
  {
    id: "p2",
    name: "Calm & Soothe Gel Wash",
    category: "cleansers",
    description:
      "A gel-based cleanser with aloe and green tea to calm redness and refresh the skin barrier.",
    price: 16.0,
    rating: 4.4,
    image: productImages["Calm & Soothe Gel Wash"],
  },
  {
    id: "p3",
    name: "Milky Micellar Cleanser",
    category: "cleansers",
    description:
      "A rinse-free micellar formula that gently lifts makeup and sunscreen while leaving a hydrated finish.",
    price: 13.0,
    rating: 4.2,
    image: productImages["Milky Micellar Cleanser"],
  },
  {
    id: "p4",
    name: "Balancing Clay Cleanser",
    category: "cleansers",
    description:
      "Cream-clay hybrid with kaolin to refine pores and balance oils without over-drying.",
    price: 18.0,
    rating: 4.3,
    image: productImages["Balancing Clay Cleanser"],
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
    image: productImages["Hydra Cloud Moisturizer"],
  },
  {
    id: "p6",
    name: "Barrier Repair Cream",
    category: "moisturizers",
    description:
      "Ceramide-rich daily moisturizer that strengthens the skin barrier and locks in hydration.",
    price: 24.0,
    rating: 4.6,
    image: productImages["Barrier Repair Cream"],
  },
  {
    id: "p7",
    name: "Dewy Glow Emulsion",
    category: "moisturizers",
    description:
      "Weightless emulsion that delivers dewy moisture with niacinamide for refined tone and texture.",
    price: 21.0,
    rating: 4.4,
    image: productImages["Dewy Glow Emulsion"],
  },
  {
    id: "p8",
    name: "Overnight Recovery Mask",
    category: "moisturizers",
    description:
      "A sleeping mask with panthenol and peptides to visibly plump and recharge skin by morning.",
    price: 26.0,
    rating: 4.8,
    image: productImages["Overnight Recovery Mask"],
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
    image: productImages["Daily Sheer SPF 50"],
  },
  {
    id: "p10",
    name: "Mineral Silk SPF 40",
    category: "sunscreens",
    description:
      "100% mineral sunscreen with a silky texture and soft-focus finish suitable for sensitive skin.",
    price: 23.0,
    rating: 4.3,
    image: productImages["Mineral Silk SPF 40"],
  },
  {
    id: "p11",
    name: "Glow Guard SPF 30",
    category: "sunscreens",
    description:
      "Hydrating SPF with vitamin E for a natural glow and everyday protection.",
    price: 18.0,
    rating: 4.2,
    image: productImages["Glow Guard SPF 30"],
  },
  {
    id: "p12",
    name: "Matte Defense SPF 45",
    category: "sunscreens",
    description:
      "Oil-controlling sunscreen with a soft matte finish. Great for combination to oily skin.",
    price: 21.0,
    rating: 4.5,
    image: productImages["Matte Defense SPF 45"],
  },

  // Lip Care
  {
    id: "p13",
    name: "Hydrating Lip Balm",
    category: "lip care",
    description:
      "A nourishing lip balm infused with shea butter and vitamin E for soft, hydrated lips.",
    price: 8.0,
    rating: 4.6,
    image: lipBalmImg,
  },
  {
    id: "p14",
    name: "Overnight Lip Mask",
    category: "lip care",
    description:
      "An intensive overnight mask that deeply moisturizes and repairs dry, chapped lips.",
    price: 12.0,
    rating: 4.8,
    image: lipTherapyImg,
  },
  {
    id: "p15",
    name: "Tinted Lip Oil",
    category: "lip care",
    description:
      "A non-sticky lip oil that provides a subtle tint and long-lasting hydration.",
    price: 10.0,
    rating: 4.4,
    image: lipTintImg,
  },
  {
    id: "p16",
    name: "SPF 30 Lip Treatment",
    category: "lip care",
    description:
      "Protect your lips from sun damage with this broad-spectrum SPF 30 lip treatment.",
    price: 9.0,
    rating: 4.7,
    image: lipTherapy1Img,
  },

  // Toners
  {
    id: "p17",
    name: "Whip Cleanser",
    category: "toner",
    description:
      "A luxurious whip cleanser that gently purifies and leaves skin feeling soft and refreshed.",
    price: 15.0,
    rating: 4.5,
    image: productImages["Whip Cleanser"],
  },
  {
    id: "p18",
    name: "Exfoliating Toner",
    category: "toner",
    description:
      "An exfoliating toner with AHA/BHA to gently remove dead skin cells and refine pores.",
    price: 19.0,
    rating: 4.7,
    image: productImages["Exfoliating Toner"],
  },
];
