import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  showCount: {},
  isModalOpen: false,

  addProductToCart: (product) =>
    set((state) => {
      const findProductInCart = state.cart.find(
        (item) => item.name === product.name
      );
      if (findProductInCart) {
        return {
          cart: state.cart.map((item) => 
            item.name === findProductInCart.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          showCount: { ...state.showCount, [product.name]: true },
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
          showCount: { ...state.showCount, [product.name]: true },
        };
      }
    }),

  increaseQuantity: (product) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.name === product.name
          ? {...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (product) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.name === product.name && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        cart: updatedCart,
        showCount:
          updatedCart.find((item) => item.name === product.name) === undefined
            ? { ...state.showCount, [product.name]: false }
            : state.showCount,
      };
    }),

  showModal: () => set({ isModalOpen: true }),
  closeModal: () =>
    set(() => ({ isModalOpen: false, cart: [], showCount: {}, total: 0 })), // کل قیمت هم صفر می‌شود
}));
