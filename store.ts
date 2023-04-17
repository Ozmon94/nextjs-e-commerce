import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddToCartType } from "@/types/AddToCartType";

type CartState = {
  isOpen: boolean;
  cart: AddToCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddToCartType) => void;
  removeProduct: (item: AddToCartType) => void;
  paymentIntent: string;
  setPaymentIntent: (val: string) => void;
  onCheckout: string;
  setCheckout: (val: string) => void;
};

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return {
              cart: state.cart.filter((cartItem) => item.id !== cartItem.id),
            };
          }
        }),
      paymentIntent: "",
      setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
      onCheckout: "cart",
      setCheckout: (val) => set((state) => ({ onCheckout: val })),
      clearCart: () => set((state) => ({ cart: [] })),
    }),
    { name: "cart-store" }
  )
);
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: "theme-store" }
  )
);
