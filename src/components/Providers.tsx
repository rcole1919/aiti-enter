"use client";

import { CartProvider } from "../context/CartContext";
import Header from "./Header";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
