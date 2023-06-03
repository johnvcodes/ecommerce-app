import { ChangeEvent, FormEvent, useReducer, useRef } from "react";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import TextareaAutosize from "react-textarea-autosize";
import { firestore, storage } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";
import { useAdmin } from "../loaders/AdminLoader";

type AddProductState = {
  title: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  price: number;
  stock: number;
  images: FileList | null;
};

type AddProductAction =
  | {
      type: keyof Omit<AddProductState, "images">;
      payload: string;
    }
  | {
      type: "images";
      payload: FileList;
    }
  | { type: "clear" };

const clearValue: AddProductState = {
  title: "",
  description: "",
  mainCategory: "default",
  subCategory: "default",
  images: null,
  price: 0,
  stock: 0,
};

const addProductReducer = (
  state: AddProductState,
  action: AddProductAction
): AddProductState => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "mainCategory":
      return { ...state, mainCategory: action.payload };
    case "subCategory":
      return { ...state, subCategory: action.payload };
    case "price":
      return { ...state, price: Number(action.payload) };
    case "stock":
      return { ...state, stock: Number(action.payload) };
    case "images":
      return { ...state, images: action.payload };
    case "clear":
      return clearValue;
    default:
      return state;
  }
};

function AdminAddProduct() {
  const {
    categories: { mainCategories, subCategories },
  } = useAdmin();

  const [state, dispatch] = useReducer(addProductReducer, {
    title: "",
    description: "",
    mainCategory: "default",
    subCategory: "default",
    price: 0,
    stock: 0,
    images: null,
  });
  const imageInputRef = useRef<HTMLInputElement>(null);

  const currentCategory = mainCategories.find(
    (category) => category.uid === state.mainCategory
  );

  const filteredSubCategories = subCategories.filter((subCategory) => {
    if (!currentCategory) return true;
    if (!currentCategory.subCategories.includes(subCategory.name)) return false;
    return subCategory;
  });

  const currentSubCategory = subCategories.find(
    (subCategory) => subCategory.uid === state.subCategory
  );

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    dispatch({
      type: name as keyof Omit<
        AddProductState,
        "categories" | "images" | "clear"
      >,
      payload: value,
    });
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      dispatch({ type: "images", payload: files });
    }
  };

  const handleResetImageInput = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";
    imageInputRef.current.files = null;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const uid = nanoid(21);

    const {
      title,
      description,
      mainCategory,
      subCategory,
      price,
      stock,
      images,
    } = state;

    try {
      if (!images) return;

      const uploadImages = Array.from(images).map((image, index) =>
        uploadBytes(ref(storage, `products/${uid}-${index + 1}`), image)
      );

      const uploadResult = await Promise.all(uploadImages);

      const downloadURLS = await Promise.all(
        uploadResult.map((uploadedImage) => getDownloadURL(uploadedImage.ref))
      );

      setDoc(doc(firestore, "products", uid), {
        uid,
        title,
        description,
        categories: [mainCategory],
        subCategory,
        sizes: currentSubCategory?.sizes,
        price,
        stock,
        rating: Math.floor(Math.random() * (5 - 3 + 1) + 3),
        images: downloadURLS,
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      }).catch((error) => getErrorMessage(error));
    } catch (error) {
      getErrorMessage(error);
    }

    dispatch({ type: "clear" });
    handleResetImageInput();
  };

  return (
    <div className="flex grow items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="grid w-80 gap-2 md:w-auto">
        <h2 className="font-bold uppercase">Adicionar produto</h2>
        <label htmlFor="title" className="w-fit font-bold uppercase">
          Título
        </label>
        <input
          onChange={handleInputChange}
          value={state.title}
          type="text"
          name="title"
          id="title"
          placeholder="Título do produto"
          required
          className="rounded border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
        />
        <label htmlFor="description" className="w-fit font-bold uppercase">
          Descrição
        </label>
        <TextareaAutosize
          onChange={handleInputChange}
          value={state.description}
          name="description"
          id="description"
          placeholder="Descrição do produto"
          className="resize-none rounded border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
        />
        <label htmlFor="main-category" className="w-fit font-bold uppercase">
          Categoria Principal
        </label>
        <select
          onChange={handleInputChange}
          value={state.mainCategory}
          name="mainCategory"
          id="main-category"
          className="w-fit rounded border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="default" disabled>
            Escolha uma categoria
          </option>
          {mainCategories.map((mainCategory) => (
            <option key={mainCategory.uid} value={mainCategory.uid}>
              {mainCategory.name}
            </option>
          ))}
        </select>
        <label htmlFor="sub-category" className="w-fit font-bold uppercase">
          Categoria Secundário
        </label>
        <select
          onChange={handleInputChange}
          value={state.subCategory}
          name="subCategory"
          id="sub-category"
          className="w-fit rounded border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="default">Escolha uma sub categoria</option>
          {filteredSubCategories.map((subCategory) => (
            <option key={subCategory.uid} value={subCategory.uid}>
              {subCategory.name}
            </option>
          ))}
        </select>
        <label htmlFor="price" className="w-fit font-bold uppercase">
          Preço
        </label>
        <input
          onChange={handleInputChange}
          value={state.price}
          type="number"
          name="price"
          id="price"
          placeholder="Preço do produto"
          className="w-fit rounded border border-neutral-300 bg-slate-50 p-2 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
        />
        <label htmlFor="stock" className="w-fit font-bold uppercase">
          Em estoque
        </label>
        <input
          onChange={handleInputChange}
          value={state.stock}
          type="number"
          name="stock"
          id="stock"
          placeholder="Quantidade em estoque"
          className="w-fit rounded border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
        />
        <label htmlFor="images" className="w-fit font-bold uppercase">
          Imagens
        </label>
        <input
          onChange={handleImageInputChange}
          ref={imageInputRef}
          type="file"
          name="images"
          id="images"
          multiple
          className="w-30 border border-slate-300 p-1 dark:border-slate-700 md:w-auto"
        />
        <button
          type="submit"
          className="w-fit justify-self-center bg-orange-200 p-2 text-slate-950 transition-colors duration-300 hover:bg-orange-300"
        >
          Confirmar
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
