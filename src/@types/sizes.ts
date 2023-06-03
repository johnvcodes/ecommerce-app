export type ClothingSize = {
  uid: string;
  value: string;
  label: string;
};

export type FootwearSize = {
  uid: string;
  value: string;
};

export type ProductSizes = {
  clothingSizes: {
    uid: string;
    name: string;
    sizes: ClothingSize[];
  };
  footwearSizes: {
    uid: string;
    name: string;
    sizes: FootwearSize[];
  };
};
