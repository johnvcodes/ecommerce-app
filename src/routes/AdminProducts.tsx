import useProductsSnapshot from "../hooks/useProductsSnapshot";
import { useAdmin } from "../loaders/AdminLoader";

function AdminProducts() {
  const { categories } = useAdmin();

  const snapshotProducts = useProductsSnapshot();

  const getCategoryName = (productCategories: string[]) => {
    const categoryNames: string[] = [];
    productCategories.forEach((productCategory) => {
      const mainCategory = categories.mainCategories.find(
        (category) => category.uid === productCategory
      );
      if (mainCategory) categoryNames.push(mainCategory.name);
    });
    return categoryNames;
  };

  const getSubCategoryName = (productSubCategory: string) => {
    const subCategory = categories.subCategories.find((subCat) => {
      return subCat.uid === productSubCategory;
    });
    if (!subCategory) return "Sem sub-categoria";
    return subCategory.name;
  };

  return (
    <div className="grid grow gap-2">
      <div className="grid grid-cols-6 gap-2 p-2">
        {snapshotProducts.map((product) => (
          <div
            key={product.uid}
            className="grid border border-slate-300 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <img src={product.images[0]} alt="" className="" />
            <div className="flex flex-col p-2">
              <h2 className="grow font-medium">{product.title}</h2>
              <div className="flex flex-col gap-1">
                <div className="border border-slate-300 px-1 dark:border-slate-700">
                  <h2 className="border-b border-slate-300 dark:border-slate-700">
                    Categorias
                  </h2>
                  {getCategoryName(product.categories).map((category) => (
                    <span key={category} className="flex items-center">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="border border-slate-300 px-1 dark:border-slate-700">
                  <h2 className="border-b border-slate-300 dark:border-slate-700">
                    Sub categoria
                  </h2>
                  <span className="flex items-center">
                    {getSubCategoryName(product.subCategory)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
