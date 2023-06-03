import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Categories } from "../@types/categories";

type Props = {
  categories: Categories;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  subFilter: string;
  setSubFilter: Dispatch<SetStateAction<string>>;
};

function ProductsFilter({
  categories,
  filter,
  setFilter,
  subFilter,
  setSubFilter,
}: Props) {
  const { mainCategories, subCategories } = categories;
  const [showFilter, setShowFilter] = useState(false);

  const currentCategory = mainCategories.find(
    (mainCategory) => mainCategory.uid === filter
  );

  const currentSubCategory = subCategories.find(
    (subCategory) => subCategory.uid === subFilter
  );

  const filteredSubCategories = subCategories.filter((subCategory) => {
    if (!currentCategory) return true;
    if (!currentCategory.subCategories.includes(subCategory.name)) return false;
    return subCategory;
  });

  const handleChangeFilter = (category: string) => {
    if (category === filter) return setFilter("");
    mainCategories.forEach((mainCategory) => {
      if (!mainCategory.subCategories.includes(subFilter)) setSubFilter("");
    });
    return setFilter(category);
  };

  const handleChangeSubFilter = (subCategory: string) => {
    if (subCategory === subFilter) return setSubFilter("");
    return setSubFilter(subCategory);
  };

  const filterRef = useRef<HTMLDivElement>(null);

  const handleClickOut = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <div className="relative flex">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilter(!showFilter)}
          type="button"
          className="border border-neutral-300 bg-slate-50 px-2 py-1 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          Filtrar por
        </button>
        <span>
          {`${currentCategory ? `${currentCategory.name} / ` : ""} ${
            currentSubCategory ? `${currentSubCategory.name}` : ""
          }`}
        </span>
      </div>
      {showFilter && (
        <div
          ref={filterRef}
          className="absolute top-[calc(100%_+_0.25rem)] z-10 flex w-80 border border-neutral-300 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex flex-col border-r border-slate-300 dark:border-slate-700">
            <h3 className="p-2 font-medium uppercase">Departamento</h3>
            {mainCategories.map((mainCategory) => (
              <div key={mainCategory.uid} className="flex items-center gap-2">
                <button
                  onClick={() => handleChangeFilter(mainCategory.uid)}
                  key={mainCategory.uid}
                  type="button"
                  className={`${
                    filter === mainCategory.uid
                      ? "bg-slate-200 dark:bg-slate-700"
                      : "hover:bg-slate-200 dark:hover:bg-slate-800"
                  } flex w-full items-start px-2 py-1 text-sm transition-colors duration-300`}
                >
                  {mainCategory.name}
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <h3 className="p-2 font-medium uppercase">Sub-categorias</h3>
            <div className="grid grid-cols-2">
              {filteredSubCategories.map((subCategory) => (
                <button
                  onClick={() => handleChangeSubFilter(subCategory.uid)}
                  key={subCategory.uid}
                  type="button"
                  className={`${
                    subFilter === subCategory.uid
                      ? "bg-slate-200 dark:bg-slate-700"
                      : "hover:bg-slate-200 dark:hover:bg-slate-800"
                  } flex w-full items-start px-2 py-1 text-sm transition-colors duration-300`}
                >
                  {subCategory.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsFilter;
