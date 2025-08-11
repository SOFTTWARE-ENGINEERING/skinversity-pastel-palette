import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";

type CartItem = { product: Product; quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "skinversity_cart_v1";

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((a, i) => a + i.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((a, i) => a + i.product.price * i.quantity, 0),
    [items]
  );

  const value = { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
