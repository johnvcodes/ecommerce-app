import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCartProduct } from "@/@types/product";

type CartState = {
  cart: TCartProduct[];
  total: number;
};

const LOCAL_STORAGE_CART_SLICE_KEY = "cartState";

function getCartState() {
  if (!localStorage.getItem(LOCAL_STORAGE_CART_SLICE_KEY)) {
    return { cart: [], total: 0 };
  }
  const cartState = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CART_SLICE_KEY) || "",
  ) as CartState;
  return cartState;
}

function calculateTotal(cart: TCartProduct[]) {
  return cart.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0,
  );
}

function saveToLocalStorage(cartState: CartState) {
  localStorage.setItem(LOCAL_STORAGE_CART_SLICE_KEY, JSON.stringify(cartState));
}

const initialState: CartState = getCartState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<TCartProduct, "quantity">>) {
      const draft = state;

      const isProductInCart = draft.cart.findIndex(
        (product) => product.uid === action.payload.uid,
      );

      if (isProductInCart >= 0) {
        draft.cart[isProductInCart].quantity += 1;
      } else {
        draft.cart.push({ ...action.payload, quantity: 1 });
      }
      draft.total = calculateTotal(draft.cart);
      saveToLocalStorage(draft);
      return draft;
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const draft = state;
      const productIndex = draft.cart.findIndex(
        (product) => product.uid === action.payload,
      );
      draft.cart[productIndex].quantity += 1;
      draft.total = calculateTotal(draft.cart);
      saveToLocalStorage(draft);

      return draft;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const draft = state;
      const productIndex = draft.cart.findIndex(
        (product) => product.uid === action.payload,
      );
      if (draft.cart[productIndex].quantity === 1) {
        draft.cart.splice(productIndex, 1);
      } else {
        draft.cart[productIndex].quantity -= 1;
      }
      draft.total = calculateTotal(draft.cart);
      saveToLocalStorage(draft);
      return draft;
    },
    removeFromCart(state, action) {
      const draft = state;
      const productIndex = draft.cart.findIndex(
        (product) => product.uid === action.payload,
      );
      draft.cart.splice(productIndex, 1);
      draft.total = calculateTotal(draft.cart);
      saveToLocalStorage(draft);
      return draft;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
