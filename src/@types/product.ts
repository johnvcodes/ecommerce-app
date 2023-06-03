import { Timestamp } from "firebase/firestore";
import { ClothingSize, FootwearSize } from "./sizes";

export type Product = {
  uid: string;
  title: string;
  description: string;
  categories: string[];
  subCategory: string;
  sizes: ClothingSize[] | FootwearSize[];
  price: number;
  stock: number;
  images: string[];
  rating: number;
  createdAt: Timestamp;
};

export type CartProduct = Product & {
  productSize: ClothingSize | FootwearSize;
  quantity: number;
};
