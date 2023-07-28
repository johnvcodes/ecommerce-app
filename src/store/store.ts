import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeSlice from "./themeSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    cartReducer: cartSlice,
    filterReducer: filterSlice,
    themeReducer: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
