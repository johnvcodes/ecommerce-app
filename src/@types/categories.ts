import { Timestamp } from "firebase/firestore";

export type TCategory = {
  uid: string;
  label: string;
  value: string;
  createdAt: Timestamp;
};

export type TSubcategory = {
  uid: string;
  label: string;
  value: string;
  createdAt: Timestamp;
};

export type TCategories = {
  mainCategories: TCategory[];
  subcategories: TSubcategory[];
};
