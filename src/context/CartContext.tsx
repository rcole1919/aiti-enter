"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import CartLimitNotification from "../components/CartLimitNotification";
import { useCartLimitNotification } from "../components/CartLimitNotification/useCartLimitNotification";
import { MAX_CART_ITEM_QUANTITY } from "../constants/cart";
import { getDiscountedPrice } from "../utils/price";

export type Product = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  description: string;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => boolean;
  totalItems: number;
  totalPrice: number;
  showLimitNotification: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const {
    open: limitNotificationOpen,
    notificationKey,
    showNotification: showLimitNotification,
    hideNotification: hideLimitNotification,
  } = useCartLimitNotification();

  const addToCart = useCallback((product: Product): boolean => {
    let added = false;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= MAX_CART_ITEM_QUANTITY) {
          return prev;
        }
        added = true;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      added = true;
      return [...prev, { ...product, quantity: 1 }];
    });

    return added;
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number): boolean => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((item) => item.id !== productId));
        return true;
      }
      if (quantity > MAX_CART_ITEM_QUANTITY) {
        return false;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
      return true;
    },
    []
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) =>
      sum + getDiscountedPrice(item.price, item.discount) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        showLimitNotification,
      }}
    >
      {children}
      <CartLimitNotification
        open={limitNotificationOpen}
        notificationKey={notificationKey}
        onClose={hideLimitNotification}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
