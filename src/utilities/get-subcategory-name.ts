import { SubCategory } from "../@types/categories";

const getSubcategoryName = (
  categories: string[],
  subCategories: SubCategory[]
) => {
  const subCategoryName: string[] = [];
  if (!categories || categories.length === 0) return ["Nenhuma"];

  categories.forEach((category) => {
    const isSubCategory = subCategories.find(
      (subCategory) => subCategory.uid === category
    );

    if (isSubCategory) subCategoryName.push(isSubCategory.name);
  });
  return subCategoryName;
};

export default getSubcategoryName;
