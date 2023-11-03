import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TCategory, TSubcategory } from "@/@types/categories";
import { getCategories } from "@libs/firebase/firestore/categories";
import { getSubcategories } from "@libs/firebase/firestore/subcategories";
import Accordion from "@components/common/Accordion";
import Checkbox from "@components/common/Checkbox";
import DrawerFilter from "@components/DrawerFilter";
import DrawerSort from "@components/DrawerSort";
import MenuSort from "@components/MenuSort";

type Props = {
  sortOptions: Array<{ label: string; value: string }>;
};

function ProductsOptions({ sortOptions }: Props) {
  const [categories, setCategories] = useState<TCategory[]>([]);

  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeCategory(event: ChangeEvent<HTMLInputElement>) {
    const categoryParams = searchParams.getAll("categoria");

    if (categoryParams.includes(event.target.value)) {
      searchParams.delete("categoria", event.target.value);

      setSearchParams(searchParams);
    } else {
      searchParams.append("categoria", event.target.value);

      setSearchParams(searchParams);
    }
  }

  function handleChangeSubcategory(event: ChangeEvent<HTMLInputElement>) {
    const subcategoryParams = searchParams.getAll("subcategoria");

    if (subcategoryParams.includes(event.target.value)) {
      searchParams.delete("subcategoria", event.target.value);

      setSearchParams(searchParams);
    } else {
      searchParams.append("subcategoria", event.target.value);

      setSearchParams(searchParams);
    }
  }

  async function getProductCategories() {
    try {
      const [resultCategories, resultSubcategories] = await Promise.all([
        getCategories(),
        getSubcategories(),
      ]);

      setCategories(resultCategories);

      setSubcategories(resultSubcategories);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getProductCategories();
  }, []);

  return (
    <>
      <div className="container mx-auto flex items-center gap-4 px-4 md:hidden md:px-0">
        <DrawerFilter
          categories={categories}
          handleChangeCategory={handleChangeCategory}
        />
        <DrawerSort options={sortOptions} />
      </div>
      <div className="hidden divide-y divide-neutral-300 border-r border-neutral-300 md:flex md:flex-col">
        <MenuSort options={sortOptions} />
        <Accordion title="Categorias">
          <div className="grid gap-1 py-1">
            {categories.map((category) => (
              <Checkbox
                onChange={handleChangeCategory}
                key={category.uid}
                id={category.value}
                name={category.value}
                value={category.value}
                label={category.label}
                checked={searchParams
                  .getAll("categoria")
                  .includes(category.value)}
              />
            ))}
          </div>
        </Accordion>
        <Accordion title="Subcategorias">
          <div className="grid gap-1 py-1">
            {subcategories.map((subcategory) => (
              <Checkbox
                onChange={handleChangeSubcategory}
                key={subcategory.uid}
                id={subcategory.value}
                name={subcategory.value}
                value={subcategory.value}
                label={subcategory.label}
                checked={searchParams
                  .getAll("subcategoria")
                  .includes(subcategory.value)}
              />
            ))}
          </div>
        </Accordion>
      </div>
    </>
  );
}

export default ProductsOptions;
