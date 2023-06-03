import { doc, getDoc } from "firebase/firestore";
import { Params, useLoaderData } from "react-router-dom";
import { firestore } from "../firebase/firebaseConfig";
import { Product } from "../@types/product";

export const SingleProductLoader = async ({
  params,
}: {
  params: Params<string>;
}) => {
  const getProduct = await getDoc(
    doc(firestore, "products", params.productId as string)
  );
  if (!getProduct.exists()) return false;
  return getProduct.data();
};

export const useSingleProduct = () => {
  return useLoaderData() as Product;
};
