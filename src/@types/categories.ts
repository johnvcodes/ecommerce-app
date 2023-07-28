import { Timestamp } from "firebase/firestore";

export type TMainCategory = {
  uid: string;
  title: string;
  createdAt: Timestamp;
};

export type TSubcategory = {
  uid: string;
  title: string;
  createdAt: Timestamp;
};

export type TCategories = {
  mainCategories: TMainCategory[];
  subcategories: TSubcategory[];
};
