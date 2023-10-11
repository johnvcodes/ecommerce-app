import { useEffect, useState } from "react";
import { getCategories } from "../../firebase/firestore/categories";
import { firestore } from "../../firebase/config";

import { TMainCategory, TSubcategory } from "../../@types/categories";
import Divider from "../../components/Divider";
import { getSubcategories } from "../../firebase/firestore/subcategories";

function Categories() {
  const [categories, setCategories] = useState<TMainCategory[]>([]);

  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  async function getAllCategories() {
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
    setLoading(false);
  }

  useEffect(() => {
    getAllCategories().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return !loading ? (
    <div className="flex grow flex-col gap-2 p-4">
      <h2>Painel de Categorias</h2>
      <Divider />
      <div className="grid grow grid-flow-col gap-4">
        <div className="flex flex-col gap-2 rounded border border-neutral-300 p-2 dark:border-neutral-700">
          <h3>Categorias</h3>
          <Divider />
          <table className="table-auto text-center">
            <tbody>
              <tr>
                <th className="border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                  Título
                </th>
                <th className="border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                  UID
                </th>
              </tr>
              {categories.map((category) => (
                <tr key={category.uid}>
                  <td className="border border-neutral-300 dark:border-neutral-700">
                    {category.label}
                  </td>
                  <td className="border border-neutral-300 dark:border-neutral-700">
                    {category.uid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-2 rounded border border-neutral-300 p-2 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <h3>Subcategorias</h3>
          </div>
          <Divider />
          <table className="table-auto text-center">
            <tbody>
              <tr>
                <th className="border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                  Título
                </th>
                <th className="border border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                  UID
                </th>
              </tr>
              {subcategories.map((subcategory) => (
                <tr key={subcategory.uid}>
                  <td className="border border-neutral-300 dark:border-neutral-700">
                    {subcategory.label}
                  </td>
                  <td className="border border-neutral-300 dark:border-neutral-700">
                    {subcategory.uid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <p>Carregando</p>
  );
}

export default Categories;
