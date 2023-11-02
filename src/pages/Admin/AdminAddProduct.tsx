import { ChangeEvent, useEffect, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Select from "react-select";
import { nanoid } from "nanoid";
import { TCategory, TSubcategory } from "../../@types/categories";
import { TSize } from "../../@types/size";
import TextInput from "../../components/TextInput";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import getErrorMessage from "../../utilities/get-error-message";
import { getCategories } from "../../libs/firebase/firestore/categories";
import { getSubcategories } from "../../libs/firebase/firestore/subcategories";
import { getSizes } from "../../libs/firebase/firestore/sizes";
import { storage } from "../../libs/firebase/config";
import { addProduct } from "../../libs/firebase/firestore/products";

type TAddProduct = {
  title: string;
  price: number;
  stock: number;
  categories: TCategory[];
  subcategory: TSubcategory;
  sizes: TSize[];
  description: string;
  images: FileList | null;
};

const defaultValues: DefaultValues<TAddProduct> = {
  title: "",
  description: "",
  price: 0,
  stock: 0,
  categories: [],
  subcategory: undefined,
  sizes: [],
  images: null,
};

function AdminAddProduct() {
  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddProduct>({
    defaultValues,
  });

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [subcategories, setSubcategories] = useState<TSubcategory[]>([]);
  const [sizes, setSizes] = useState<TSize[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getProductOptions() {
    try {
      const [databaseCategories, databaseSubcategories, databaseSizes] =
        await Promise.all([getCategories(), getSubcategories(), getSizes()]);
      setCategories(databaseCategories);
      setSubcategories(databaseSubcategories);
      setSizes(databaseSizes);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  const onSubmit: SubmitHandler<TAddProduct> = async (data) => {
    const uid = nanoid(21);
    setLoading(true);
    try {
      if (!data.images) return;
      const uploadURLS = await Promise.all(
        Array.from(data.images).map((image, index) =>
          uploadBytes(ref(storage, `products/${uid}-${index + 1}`), image),
        ),
      );
      const downloadURLS = await Promise.all(
        uploadURLS.map((url) => getDownloadURL(url.ref)),
      );
      await addProduct({ ...data, images: downloadURLS });
    } catch (error) {
      getErrorMessage(error);
    }
    reset(defaultValues);
    setLoading(false);
  };

  useEffect(() => {
    getProductOptions().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return (
    <>
      <div className="flex grow items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <TextInput
            {...register("title", {
              required: { value: true, message: "Título obrigatório" },
            })}
            type="text"
            id="title"
            name="title"
            label="Título"
            placeholder="Título do produto"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <Textarea
            {...register("description")}
            minRows={4}
            maxRows={4}
            id="description"
            name="description"
            label="Descrição"
            placeholder="Descrição do produto"
          />
          <div className="flex items-center gap-2">
            <TextInput
              {...register("price", {
                required: { value: true, message: "Preço obrigatório" },
              })}
              type="number"
              id="price"
              name="price"
              label="Preço"
              placeholder="Preço do produto"
            />
            <TextInput
              {...register("stock", {
                required: { value: true, message: "Estoque obrigatório" },
              })}
              type="number"
              id="stock"
              name="stock"
              label="Em estoque"
              placeholder="Quantidade em estoque"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="categories">Categorias</label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categories}
                  getOptionLabel={(options) => options.label}
                  getOptionValue={(options) => options.uid}
                  isClearable
                  isMulti
                  hideSelectedOptions
                  inputId="categories"
                  placeholder="Selecionar categorias"
                  unstyled
                  classNames={{
                    control: ({ isFocused }) =>
                      `${
                        isFocused
                          ? "border-blue-500 dark:border-blue-500"
                          : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500"
                      } border bg-neutral-50 dark:bg-neutral-900 p-2 rounded shadow-sm outline outline-transparent  outline-offset-0 outline-2 outline-dashed transition-all duration-300 `,
                    option: ({ isFocused }) =>
                      `${
                        isFocused ? "bg-neutral-200 dark:bg-neutral-500" : ""
                      } p-2`,
                    clearIndicator: () =>
                      "hover:text-red-500 transition-colors duration-300",
                    placeholder: () => "text-neutral-500",
                    indicatorSeparator: () =>
                      "bg-neutral-300 dark:bg-neutral-700 mx-2",
                    menu: () =>
                      "bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden mt-1 border border-blue-500",
                    valueContainer: () => "flex items-center gap-2",
                    multiValue: () => "rounded overflow-hidden bg-blue-500",
                    multiValueLabel: () => "px-2 text-neutral-50",
                    multiValueRemove: () =>
                      "grow hover:bg-blue-600 transition-colors text-neutral-50 duration-300 border-l p-1",
                  }}
                />
              )}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="subcategory">Subcategoria</label>
            <Controller
              name="subcategory"
              rules={{
                required: { value: true, message: "Subcategoria obrigatória" },
              }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={subcategories}
                  getOptionLabel={(options) => options.label}
                  getOptionValue={(options) => options.uid}
                  isClearable
                  maxMenuHeight={200}
                  menuPlacement="auto"
                  hideSelectedOptions
                  inputId="subcategory"
                  placeholder="Selecionar subcategorias"
                  unstyled
                  classNames={{
                    control: ({ isFocused }) =>
                      `${
                        isFocused
                          ? "border-blue-500 dark:border-blue-500"
                          : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500"
                      } border bg-neutral-50 dark:bg-neutral-900 p-2 rounded shadow-sm outline outline-transparent  outline-offset-0 outline-2 outline-dashed transition-all duration-300 `,
                    option: ({ isFocused }) =>
                      `${
                        isFocused ? "bg-neutral-200 dark:bg-neutral-500" : ""
                      } p-2`,
                    clearIndicator: () =>
                      "hover:text-red-500 transition-colors duration-300",
                    placeholder: () => "text-neutral-500",
                    indicatorSeparator: () =>
                      "bg-neutral-300 dark:bg-neutral-700 mx-2",
                    menu: () =>
                      "bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden mt-1 border border-blue-500",
                    valueContainer: () => "flex items-center gap-2",
                    multiValue: () => "rounded overflow-hidden bg-blue-500",
                    multiValueLabel: () => "px-2 text-neutral-50",
                    multiValueRemove: () =>
                      "grow hover:bg-blue-600 transition-colors text-neutral-50 duration-300 border-l p-1",
                  }}
                />
              )}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="sizes">Tamanho</label>
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={sizes}
                  getOptionLabel={(options) => options.label || options.value}
                  getOptionValue={(options) => options.uid}
                  isClearable
                  isMulti
                  maxMenuHeight={200}
                  menuPlacement="top"
                  hideSelectedOptions
                  inputId="sizes"
                  placeholder="Selecionar categorias"
                  unstyled
                  classNames={{
                    control: ({ isFocused }) =>
                      `${
                        isFocused
                          ? "border-blue-500 dark:border-blue-500"
                          : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500"
                      } border bg-neutral-50 dark:bg-neutral-900 p-2 rounded shadow-sm outline outline-transparent  outline-offset-0 outline-2 outline-dashed transition-all duration-300 `,
                    option: ({ isFocused }) =>
                      `${
                        isFocused ? "bg-neutral-200 dark:bg-neutral-500" : ""
                      } p-2`,
                    clearIndicator: () =>
                      "hover:text-red-500 transition-colors duration-300",
                    placeholder: () => "text-neutral-500",
                    indicatorSeparator: () =>
                      "bg-neutral-300 dark:bg-neutral-700 mx-2",
                    menu: () =>
                      "bg-neutral-50 dark:bg-neutral-900 rounded overflow-hidden mt-1 border border-blue-500",
                    valueContainer: () => "flex items-center gap-2",
                    multiValue: () => "rounded overflow-hidden bg-blue-500",
                    multiValueLabel: () => "px-2 text-neutral-50",
                    multiValueRemove: () =>
                      "grow hover:bg-blue-600 transition-colors text-neutral-50 duration-300 border-l p-1",
                  }}
                />
              )}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="images">Imagens</label>
            <input
              type="file"
              {...register("images", {
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                  event.target.files,
              })}
              id="images"
              multiple
              className="w-fit rounded border border-neutral-300 bg-neutral-50 pr-2 text-neutral-950 shadow-sm outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 file:border-none file:bg-neutral-200 file:p-2 file:text-inherit hover:border-neutral-500 focus:border-blue-500 focus:outline-blue-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:file:bg-neutral-800 dark:hover:border-neutral-500 dark:focus:border-blue-500 dark:focus:outline-blue-900"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {!loading ? "Confirmar" : <Spinner />}
          </Button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
}

export default AdminAddProduct;
