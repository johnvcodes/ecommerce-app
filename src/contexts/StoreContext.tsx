import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useBeforeUnload } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CartProduct } from "../@types/product";
import { auth, firestore } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";

type CartState = {
  cart: CartProduct[];
};

type CartAction =
  | { type: "GET_CART"; payload: CartProduct[] }
  | { type: "GET_USER_CART"; payload: CartProduct[] }
  | { type: "ADD_TO_CART"; payload: CartProduct }
  | { type: "INCREASE_QUANTITY"; payload: string }
  | { type: "DECREASE_QUANTITY"; payload: string }
  | { type: "REMOVE_FROM_CART"; payload: string };

type StoreContextType = {
  currentUser: User | null;
  cart: CartProduct[];
  total: number;
  dispatch: Dispatch<CartAction>;
};

const StoreContext = createContext<StoreContextType | null>(null);

const useStore = () => {
  const storeContextCheck = useContext(StoreContext);

  if (!storeContextCheck) {
    throw new Error("Something went wrong");
  }

  return storeContextCheck;
};

const cartInitialValue: CartState = {
  cart: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "GET_CART":
      return { cart: action.payload };
    case "GET_USER_CART":
      return { cart: action.payload };
    case "ADD_TO_CART": {
      const isProductInCart = state.cart.find(
        (item) => item.uid === action.payload.uid
      );
      if (isProductInCart) {
        return {
          cart: state.cart.map((product) =>
            product.uid === action.payload.uid
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }
      return {
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "INCREASE_QUANTITY": {
      const isProductInCart = state.cart.find(
        (item) => item.uid === action.payload
      );
      if (!isProductInCart) return state;

      return {
        cart: state.cart.map((product) =>
          product.uid === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    }
    case "DECREASE_QUANTITY": {
      const isProductInCart = state.cart.find(
        (item) => item.uid === action.payload
      );
      if (isProductInCart?.quantity === 1) {
        return {
          cart: state.cart.filter((product) => product.uid !== action.payload),
        };
      }
      return {
        cart: state.cart.map((product) =>
          product.uid === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.uid !== action.payload),
      };
    default:
      return state;
  }
};

function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialValue);
  const cartTotal = cartState.cart.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (!localCart) return;
    cartDispatch({
      type: "GET_CART",
      payload: JSON.parse(localCart) as CartProduct[],
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getDoc(doc(firestore, "users", user.uid))
          .then((response) => {
            if (!response.exists()) return;
            if (response.data().userRole === "admin") setIsAdmin(true);
          })
          .catch((error) => getErrorMessage(error));

        getDoc(doc(firestore, "carts", user.uid))
          .then((response) => {
            if (!response.exists() || !response.data().cart) return;
            cartDispatch({
              type: "GET_USER_CART",
              payload: response.data().cart as CartProduct[],
            });
          })
          .catch((error) => getErrorMessage(error));
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useBeforeUnload(() =>
    localStorage.setItem("cart", JSON.stringify(cartState.cart))
  );

  const value = useMemo(
    () => ({
      currentUser,
      cart: cartState.cart,
      total: cartTotal,
      dispatch: cartDispatch,
    }),
    [currentUser, cartState.cart, cartTotal]
  );

  return (
    <StoreContext.Provider value={value}>
      {!loading && children}
    </StoreContext.Provider>
  );
}

export { StoreProvider, useStore };
