import React, { createContext, useState } from "react";
import type { Product } from "../types/types";

// a product in the cart = a normal product + how many of it
export type CartItem = Product & {
  quantity: number;
};

type CartProviderProps = {
  children: React.ReactNode;
};

type CartContextProps = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
};

// shared space, shared by all components
export const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      // already in cart: increase quantity
      if (exists) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      // new product: add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // total number of items (adds up quantities)
  function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // total price (price x quantity for each item)
  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}


