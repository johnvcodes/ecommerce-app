import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { getCategories } from "../../firebase/firestore/categories";
import { firestore } from "../../firebase/config";
import { TMainCategory, TSubcategory } from "../../@types/categories";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeFilter, changeSubFilter } from "../../store/filterSlice";
import { getSubcategories } from "../../firebase/firestore/subcategories";

function ProductsFilter() {
  const { filter, subFilter } = useAppSelector((state) => state.filterReducer);
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<TMainCategory[]>([]);

  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);

  const [showFilter, setShowFilter] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  const handleClickOut = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setShowFilter(false);
    }
  };

  async function getFilterOptions() {
    try {
      const [databaseCategories, databaseSubcategories] = await Promise.all([
        getCategories(firestore),
        getSubcategories(firestore),
      ]);
      setCategories(databaseCategories);
      setSubcategories(databaseSubcategories);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  function handleChangeFilter(categoryUID: string) {
    dispatch(changeFilter(categoryUID));
  }

  function handleChangeSubFilter(subcategoryUID: string) {
    dispatch(changeSubFilter(subcategoryUID));
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  useEffect(() => {
    getFilterOptions().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return (
    <div className="relative flex">
      <div className="flex items-center gap-2">
        <Button onClick={() => setShowFilter(!showFilter)} type="button">
          Filtros
        </Button>
      </div>
      {showFilter && (
        <div
          ref={filterRef}
          className="absolute top-[calc(100%_+_0.25rem)] z-10 grid rounded border border-neutral-300 bg-neutral-50 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
        >
          <div className="grid gap-1 ">
            <h2 className="pt-1 text-center text-blue-500">Categorias</h2>
            <div className="flex items-center divide-x">
              {categories.map((category) => (
                <button
                  key={category.uid}
                  onClick={() => handleChangeFilter(category.uid)}
                  type="button"
                  className={`${
                    filter === category.uid
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  } border-y border-neutral-300 p-1 transition-colors duration-300  dark:border-neutral-700 `}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-1">
            <h2 className="pt-1 text-center text-blue-500">Subcategorias</h2>
            <div className="grid grid-cols-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory.uid}
                  onClick={() => handleChangeSubFilter(subcategory.uid)}
                  type="button"
                  className={`${
                    subFilter === subcategory.uid
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  } border-t border-neutral-300 p-1 transition-colors duration-300 odd:border-r  dark:border-neutral-700`}
                >
                  {subcategory.title}
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
