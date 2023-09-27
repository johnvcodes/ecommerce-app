import { Timestamp } from "firebase/firestore";

export type TMainCategory = {
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
  mainCategories: TMainCategory[];
  subcategories: TSubcategory[];
};
