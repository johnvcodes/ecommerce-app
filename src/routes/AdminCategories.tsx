import { useAdmin } from "../loaders/AdminLoader";

export default function AdminCategories() {
  const {
    categories: { mainCategories, subCategories },
  } = useAdmin();

  const getSubCategoryName = (categories: string[]) => {
    const subCategoryName: string[] = [];
    if (!categories || categories.length === 0) return ["Nenhuma"];

    categories.forEach((category) => {
      const isSubCategory = subCategories.find(
        (subCategory) => subCategory.name === category
      );

      if (isSubCategory) subCategoryName.push(isSubCategory.name);
    });
    return subCategoryName;
  };

  return (
    <div className="flex grow items-center justify-center p-4">
      <div className="grid gap-2">
        <h2 className="w-fit bg-orange-200 p-2 text-slate-950">Categorias</h2>
        <div className="flex flex-col gap-4">
          {mainCategories.map((mainCategory) => (
            <div
              key={mainCategory.uid}
              className="flex gap-2 border border-neutral-300 bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex flex-col border-r border-neutral-300 px-2 dark:border-slate-700">
                <h2 className="font-medium uppercase">Título</h2>
                <p>{mainCategory.name}</p>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-medium uppercase">Sub-categorias</h2>
                <div className="flex flex-wrap items-center gap-2">
                  {getSubCategoryName(mainCategory.subCategories)
                    .sort((a, b) => a.localeCompare(b))
                    .map((subCategory) => (
                      <span
                        key={subCategory}
                        className="rounded border border-neutral-300 p-1 shadow-sm dark:border-slate-700"
                      >
                        {subCategory}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
