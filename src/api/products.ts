import { products } from "@/data/products";
import type { Product } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 300);
  });
};

export const fetchProduct = async (id: string): Promise<Product | undefined> => {
  const list = await fetchProducts();
  return list.find((p) => p.id === id);
};
