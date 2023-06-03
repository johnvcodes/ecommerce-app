import { useOutletContext } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { Product } from "../@types/product";
import { Categories, MainCategory, SubCategory } from "../@types/categories";
import getErrorMessage from "../utilities/get-error-message";
import { ProductSizes } from "../@types/sizes";

export type AdminContext = {
  products: Product[];
  categories: Categories;
  sizes: ProductSizes;
};

export const useAdmin = () => {
  return useOutletContext<AdminContext>();
};

const AdminLoader = async () => {
  try {
    const products: Product[] = [];
    const categories: Categories = {
      mainCategories: [],
      subCategories: [],
    };
    const sizes: ProductSizes = {
      clothingSizes: {
        uid: "",
        name: "",
        sizes: [],
      },
      footwearSizes: {
        uid: "",
        name: "",
        sizes: [],
      },
    };

    const getProductsPromise = getDocs(collection(firestore, "products"));
    const getMainCategoriesPromise = getDocs(
      collection(firestore, "mainCategories")
    );
    const getSubCategoriesPromise = getDocs(
      collection(firestore, "subCategories")
    );
    const getClothingSizesPromise = getDoc(doc(firestore, "sizes", "clothing"));
    const getFootwearSizesPromise = getDoc(doc(firestore, "sizes", "footwear"));

    const [
      getProducts,
      getMainCategories,
      getSubCategories,
      getClothingSizes,
      getFootwearSizes,
    ] = await Promise.all([
      getProductsPromise,
      getMainCategoriesPromise,
      getSubCategoriesPromise,
      getClothingSizesPromise,
      getFootwearSizesPromise,
    ]);

    getProducts.forEach((product) => {
      if (!product.exists()) return false;
      return products.push(product.data() as Product);
    });

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

    if (!getClothingSizes.exists() || !getFootwearSizes.exists()) return false;
    sizes.clothingSizes =
      getClothingSizes.data() as ProductSizes["clothingSizes"];
    sizes.footwearSizes =
      getFootwearSizes.data() as ProductSizes["footwearSizes"];

    return { products, categories, sizes };
  } catch (error) {
    return getErrorMessage(error);
  }
};

export default AdminLoader;
