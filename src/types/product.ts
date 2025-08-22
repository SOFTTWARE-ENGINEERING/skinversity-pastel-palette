export type Category = "cleansers" | "moisturizers" | "sunscreens" | "lip care" | "toner";

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number; // in USD
  rating: number; // 0-5
  image: string; // import path
}
