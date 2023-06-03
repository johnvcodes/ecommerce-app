import { ClothingSize, FootwearSize } from "./sizes";

export type MainCategory = {
  uid: string;
  name: string;
  subCategories: string[];
};

export type SubCategory = {
  uid: string;
  name: string;
  sizes: ClothingSize[] | FootwearSize[];
};

export type Categories = {
  mainCategories: MainCategory[];
  subCategories: SubCategory[];
};
