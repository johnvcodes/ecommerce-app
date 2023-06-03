import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { firestore } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";
import { MainCategory, SubCategory } from "../@types/categories";

function AdminAddCategories() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [categoryInput, setCategoryInput] = useState<MainCategory["name"]>("");
  const [categorySubCategories, setCategorySubCategories] = useState<
    SubCategory[]
  >([]);

  const getSubCategoryName = (categories: SubCategory[]) => {
    const subCategoryName: string[] = [];
    if (!categories || categories.length === 0) return ["Nenhuma"];

    categories.forEach((category) => {
      const isSubCategory = subCategories.find(
        (subCategory) => subCategory.uid === category.uid
      );

      if (isSubCategory) subCategoryName.push(isSubCategory.name);
    });
    return subCategoryName;
  };

  const handleAddCategory = (event: FormEvent) => {
    event.preventDefault();
    if (!categorySubCategories) return;
    const uid = nanoid(21);
    setDoc(doc(firestore, "mainCategories", uid), {
      uid,
      name: categoryInput,
      subCategories: getSubCategoryName(categorySubCategories),
    })
      .then()
      .catch((error) => getErrorMessage(error));
  };

  const handleCategorySubCategories = (subCategory: SubCategory) => {
    if (categorySubCategories.includes(subCategory)) return;
    setCategorySubCategories((previous) => [...previous, subCategory]);
  };

  const handleRemoveSubCategory = (subCategory: string) => {
    const isSubCategory = subCategories.find(
      (subCat) => subCat.name === subCategory
    );
    setCategorySubCategories((previous) =>
      previous.filter((item) => isSubCategory !== item)
    );
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "subCategories"),
      (snapshot) => {
        const databaseSubCategories: SubCategory[] = [];
        snapshot.forEach((databaseSubCategory) => {
          if (!databaseSubCategory.exists()) return;
          databaseSubCategories.push(databaseSubCategory.data() as SubCategory);
        });
        setSubCategories(databaseSubCategories);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex grow items-center justify-center p-4">
      <form
        onSubmit={handleAddCategory}
        className="grid h-fit min-w-[320px] gap-1 border border-neutral-300 bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="font-medium uppercase">Adicionar Categoria</h2>
        <label htmlFor="category-name" className="font-medium">
          Título
        </label>
        <input
          onChange={(event) => setCategoryInput(event.target.value)}
          value={categoryInput}
          type="text"
          name="pt"
          id="category-name"
          required
          placeholder="Título da categoria"
          className="border border-slate-300 bg-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800"
        />
        <label htmlFor="category-current-sub-categories">
          Sub-categorias atuais
        </label>
        <div className="flex flex-wrap items-center gap-2 border-y border-slate-300 py-2 dark:border-slate-700">
          {categorySubCategories.length !== 0 ? (
            categorySubCategories.map((subCat) => (
              <button
                onClick={() => handleRemoveSubCategory(subCat.name)}
                key={subCat.uid}
                type="button"
                className="bg-orange-200 p-1 text-sm text-slate-950 transition-colors duration-300 hover:bg-orange-300"
              >
                {subCat.name}
              </button>
            ))
          ) : (
            <span className="opacity-50">Nenhuma sub-categoria</span>
          )}
        </div>
        <label htmlFor="category-sub-categories">
          Adicionar sub-categorias
        </label>
        <div className="grid grid-cols-3 gap-2">
          {subCategories.map((subCategory) => (
            <button
              onClick={() => handleCategorySubCategories(subCategory)}
              key={subCategory.uid}
              type="button"
              className=" border border-slate-300 bg-slate-300 p-1 text-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-950"
            >
              {subCategory.name}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-fit justify-self-center bg-orange-200 p-1 text-slate-950"
        >
          Confirmar
        </button>
      </form>
    </div>
  );
}

export default AdminAddCategories;
