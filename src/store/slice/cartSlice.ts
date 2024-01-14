import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  return [];
};

const initialState: CartState = {
  cart: getCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<CartItem>) => {
      const cart = [...state.cart];
      const productIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex !== -1) {
        cart[productIndex] = action.payload;
      } else {
        cart.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      state.cart = cart;
    },

    deleteCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const productIndex = state.cart.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        const validQuantity = Number.isFinite(quantity) ? quantity : 0;
        state.cart[productIndex].quantity = validQuantity;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { addCart, deleteCart, updateQuantity } = cartSlice.actions;

// Selector
export const selectCart = (state: { cart: CartState }) => state.cart.cart;

export default cartSlice.reducer;
