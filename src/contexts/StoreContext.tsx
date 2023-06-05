import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useBeforeUnload } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  FirestoreDataConverter,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
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
  userRole: "user" | "admin";
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

type UserDoc = {
  uid: string;
  displayName: string;
  email: string;
  userRole: "user" | "admin";
};

type UserCart = {
  cart: CartProduct[];
};

const userDocConverter: FirestoreDataConverter<UserDoc> = {
  toFirestore(userDoc) {
    return userDoc;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as UserDoc;
  },
};

const userCartConverter: FirestoreDataConverter<UserCart> = {
  toFirestore(userCart) {
    return userCart;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as UserCart;
  },
};

function StoreProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState<boolean>(true);

  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialValue);
  const cartTotal = cartState.cart.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getUserDoc = useCallback(async () => {
    if (!currentUser) return;
    const userDoc = await getDoc(
      doc(firestore, "users", currentUser.uid).withConverter(userDocConverter)
    );
    if (!userDoc.exists()) return;
    setUserRole(userDoc.data().userRole);
    const userCart = await getDoc(
      doc(firestore, "carts", currentUser.uid).withConverter(userCartConverter)
    );
    if (!userCart.exists()) return;
    cartDispatch({ type: "GET_USER_CART", payload: userCart.data().cart });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    getUserDoc().catch((error) => getErrorMessage(error));
  }, [currentUser, getUserDoc]);

  useBeforeUnload(() =>
    localStorage.setItem("cart", JSON.stringify(cartState.cart))
  );

  const value = useMemo(
    () => ({
      currentUser,
      userRole,
      cart: cartState.cart,
      total: cartTotal,
      dispatch: cartDispatch,
    }),
    [currentUser, userRole, cartState.cart, cartTotal]
  );

  return (
    <StoreContext.Provider value={value}>
      {!loading && children}
    </StoreContext.Provider>
  );
}

export { StoreProvider, useStore };
