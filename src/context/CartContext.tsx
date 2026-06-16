"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import CartLimitNotification from "../components/CartLimitNotification";
import { useCartLimitNotification } from "../components/CartLimitNotification/useCartLimitNotification";
import { MAX_CART_ITEM_QUANTITY } from "../constants/cart";
import { PROMO_DISCOUNT_PERCENT, VALID_PROMO_CODE } from "../constants/promo";
import { getDiscountedPrice } from "../utils/price";

export type ApplyPromoResult = "success" | "invalid" | "already_applied";

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

type CartStateValue = {
  items: CartItem[];
  isPromoApplied: boolean;
  totalItems: number;
  totalPrice: number;
  discountedTotalPrice: number;
};

type CartActionsValue = {
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => boolean;
  applyPromoCode: (code: string) => ApplyPromoResult;
  showLimitNotification: () => void;
};

const CartStateContext = createContext<CartStateValue | null>(null);
const CartActionsContext = createContext<CartActionsValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const isPromoAppliedRef = useRef(isPromoApplied);
  const {
    open: limitNotificationOpen,
    notificationKey,
    showNotification: showLimitNotification,
    hideNotification: hideLimitNotification,
  } = useCartLimitNotification();

  useEffect(() => {
    isPromoAppliedRef.current = isPromoApplied;
  }, [isPromoApplied]);

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

  const applyPromoCode = useCallback((code: string): ApplyPromoResult => {
    if (isPromoAppliedRef.current) {
      return "already_applied";
    }
    if (code === VALID_PROMO_CODE) {
      setIsPromoApplied(true);
      return "success";
    }
    return "invalid";
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + getDiscountedPrice(item.price, item.discount) * item.quantity,
        0
      ),
    [items]
  );

  const discountedTotalPrice = useMemo(
    () =>
      isPromoApplied
        ? getDiscountedPrice(totalPrice, PROMO_DISCOUNT_PERCENT)
        : totalPrice,
    [isPromoApplied, totalPrice]
  );

  const stateValue = useMemo(
    () => ({
      items,
      isPromoApplied,
      totalItems,
      totalPrice,
      discountedTotalPrice,
    }),
    [items, isPromoApplied, totalItems, totalPrice, discountedTotalPrice]
  );

  const actionsValue = useMemo(
    () => ({
      addToCart,
      removeFromCart,
      updateQuantity,
      applyPromoCode,
      showLimitNotification,
    }),
    [
      addToCart,
      removeFromCart,
      updateQuantity,
      applyPromoCode,
      showLimitNotification,
    ]
  );

  return (
    <CartActionsContext.Provider value={actionsValue}>
      <CartStateContext.Provider value={stateValue}>
        {children}
        <CartLimitNotification
          open={limitNotificationOpen}
          notificationKey={notificationKey}
          onClose={hideLimitNotification}
        />
      </CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error("useCartState must be used within CartProvider");
  }
  return context;
}

export function useCartActions() {
  const context = useContext(CartActionsContext);
  if (!context) {
    throw new Error("useCartActions must be used within CartProvider");
  }
  return context;
}
