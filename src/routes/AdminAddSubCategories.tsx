import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";
import { useAdmin } from "../loaders/AdminLoader";
import { SubCategory } from "../@types/categories";
import isClothingSize from "../utilities/is-clothing-size";

function AdminAddSubCategories() {
  const { sizes } = useAdmin();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryInput, setSubCategoryInput] = useState({
    name: "",
    size: "default",
  });
  const [loading, setLoading] = useState(true);

  const currentSize = Object.values(sizes).find(
    (size) => size.uid === subCategoryInput.size
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSubCategoryInput((previous) => {
      return { ...previous, [name]: value };
    });
  };

  const handleAddSubCategory = (event: FormEvent) => {
    event.preventDefault();
    const uid = nanoid(21);
    setDoc(doc(firestore, "subCategories", uid), {
      uid,
      name: subCategoryInput.name,
      sizes: currentSize?.sizes,
    })
      .then()
      .catch((error) => getErrorMessage(error));
    setSubCategoryInput({ name: "", size: "default" });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "subCategories"),
      (snapshot) => {
        const snapshotSubCategories: SubCategory[] = [];
        snapshot.forEach((subCategory) => {
          if (!subCategory.exists()) return;
          snapshotSubCategories.push(subCategory.data() as SubCategory);
        });
        setSubCategories(snapshotSubCategories);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return !loading ? (
    <div className="flex grow items-center justify-center p-4">
      <div className="grid gap-4">
        <form
          onSubmit={handleAddSubCategory}
          className="grid gap-2 border border-neutral-300 bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <h2>Adicionar Sub-categoria</h2>
          <label htmlFor="name">Título</label>
          <input
            onChange={handleInputChange}
            value={subCategoryInput.name}
            type="text"
            name="name"
            id="name"
            required
            placeholder="Título da sub categoria"
            className="border border-slate-300 bg-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800"
          />
          <label htmlFor="size">Tamanhos</label>
          <select
            onChange={handleInputChange}
            value={subCategoryInput.size}
            name="size"
            id="size"
            className="w-fit border border-slate-300 bg-transparent p-1 dark:border-slate-700"
          >
            <option
              value="default"
              disabled
              className="bg-slate-50 disabled:bg-slate-50 disabled:opacity-50 dark:bg-slate-900 dark:disabled:bg-slate-900"
            >
              Selectionar tamanho
            </option>
            {Object.values(sizes).map((size) => (
              <option
                key={size.uid}
                value={size.uid}
                className="bg-slate-50 disabled:bg-slate-50 disabled:opacity-50 dark:bg-slate-900 dark:disabled:bg-slate-900"
              >
                {size.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-fit bg-orange-200 p-2 text-slate-950 transition-colors duration-300 hover:bg-orange-300"
          >
            Confirmar
          </button>
        </form>
        <div className="grid gap-2 border border-slate-50 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="w-fit border border-slate-300 p-1 font-medium dark:border-slate-700">
            Sub-categorias atuais
          </h2>
          <div className="grid grid-cols-3 gap-1">
            {subCategories.map((subCategory) => (
              <span
                key={subCategory.uid}
                className="border border-slate-300 bg-slate-300 px-1 text-sm dark:border-slate-700 dark:bg-slate-950"
              >
                {subCategory.name}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2 border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="w-fit border border-slate-300 p-2 font-medium dark:border-slate-700">
            Lista de tamanhos
          </h2>
          <div className="grid gap-2">
            {Object.values(sizes).map((category) => (
              <div
                key={category.uid}
                className="grid gap-1 border-b border-slate-300 pb-1 dark:border-slate-700"
              >
                <h2 className="w-fit font-medium">{category.name}:</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {category.sizes.map((size) => (
                    <span key={size.uid}>
                      {isClothingSize(size) && size.label
                        ? size.label
                        : size.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Carregando...</p>
  );
}

export default AdminAddSubCategories;
