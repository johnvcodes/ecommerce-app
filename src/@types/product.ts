import { Timestamp } from "firebase/firestore";
import { TMainCategory, TSubcategory } from "./categories";
import { TSize } from "./size";

export type TProduct = {
  uid: string;
  title: string;
  price: number;
  stock: number;
  categories: TMainCategory[];
  subcategory: TSubcategory;
  sizes: TSize[];
  description: string;
  images: string[];
  rating: number;
  createdAt: Timestamp;
};

export type TCartProduct = TProduct & {
  selectedSize: TSize;
  quantity: number;
};
