import { useOutletContext } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";

import { Categories, MainCategory, SubCategory } from "../@types/categories";
import getErrorMessage from "../utilities/get-error-message";

export type CategoriesContext = {
  categories: Categories;
};

export const useCategories = () => {
  return useOutletContext<CategoriesContext>();
};

const CategoriesLoader = async () => {
  try {
    const categories: Categories = {
      mainCategories: [],
      subCategories: [],
    };

    const getMainCategoriesPromise = getDocs(
      collection(firestore, "mainCategories")
    );
    const getSubCategoriesPromise = getDocs(
      collection(firestore, "subCategories")
    );

    const [getMainCategories, getSubCategories] = await Promise.all([
      getMainCategoriesPromise,
      getSubCategoriesPromise,
    ]);

    getMainCategories.forEach((mainCategory) => {
      if (!mainCategory.exists()) return false;

      return categories.mainCategories.push(
        mainCategory.data() as MainCategory
      );
    });
    getSubCategories.forEach((subCategory) => {
      if (!subCategory.exists()) return false;
      return categories.subCategories.push(subCategory.data() as SubCategory);
    });

    return { categories };
  } catch (error) {
    return getErrorMessage(error);
  }
};

export default CategoriesLoader;
