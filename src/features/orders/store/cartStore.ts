import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  qty: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (id) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          }
          return { cart: [...state.cart, { id, qty: 1 }] };
        }),
      changeQty: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
            )
            .filter((item) => item.qty > 0),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'acacia-cart-storage',
    }
  )
);
