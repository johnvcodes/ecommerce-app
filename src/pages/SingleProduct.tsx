/* eslint-disable react/jsx-no-bind */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select, { SingleValue } from "react-select";
import { ChevronLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { TSize } from "../@types/size";
import { TProduct } from "../@types/product";
import { firestore } from "../firebase/config";
import { useAppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { getProduct } from "../firebase/firestore/products";
import ProductCarousel from "../components/Product/ProductCarousel";
import ProductRating from "../components/Product/ProductRating";
import Button from "../components/Button";

function SingleProduct() {
  const { productId } = useParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [product, setProduct] = useState<TProduct | null>(null);

  const [selectedSize, setSelectedSize] = useState<TSize | null>(null);

  const [productError, setProductError] = useState("");

  const getSingleProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const databaseProduct = await getProduct(firestore, productId);
      setProduct(databaseProduct);
    } catch (error) {
      throw new Error(String(error));
    }
  }, [productId]);

  function handleChange(newValue: SingleValue<TSize>) {
    setProductError("");
    setSelectedSize(newValue);
  }

  function handleAddToCart() {
    if (!product) return;
    if (!selectedSize) {
      setProductError("Selecione um tamanho");
    } else {
      toast(`Produto adicionado ao carrinho`, { type: "success" });
      dispatch(addToCart({ ...product, selectedSize }));
    }
  }

  function handleGoBack() {
    return navigate(-1);
  }

  useEffect(() => {
    getSingleProduct().catch((error) => {
      throw new Error(String(error));
    });
  }, [getSingleProduct]);

  return product ? (
    <div className="container mx-auto flex grow items-center justify-center py-2">
      <div className="grid items-center gap-2">
        <button
          onClick={handleGoBack}
          type="button"
          className="flex h-fit w-fit items-center gap-1 rounded border border-neutral-300 bg-neutral-50 px-2 py-1 shadow-sm outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-200 focus:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
        >
          <ChevronLeftIcon aria-hidden className="h-4 w-4" />
          Voltar
        </button>
        <div className="grid gap-2 md:flex">
          <ProductCarousel images={product.images} />
          <div className="flex w-80 flex-col gap-2">
            <h1 className="rounded text-left text-3xl uppercase">
              {product.title}
            </h1>
            <div className="flex justify-between">
              <ProductRating rating={product.rating} />
              <span className="opacity-50">Em estoque: {product.stock}</span>
            </div>
            <h2 className="font-medium uppercase">Descrição</h2>
            <p className="grow text-sm">{product.description}</p>
            <div className="grid gap-1">
              <label htmlFor="sizes">Tamanho</label>
              <Select
                onChange={handleChange}
                options={product.sizes}
                isClearable
                inputId="sizes"
                placeholder="Escolher tamanho"
                unstyled
                classNames={{
                  control: ({ isFocused }) =>
                    `${
                      isFocused
                        ? "border-blue-500 dark:border-blue-500"
                        : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500"
                    } border bg-neutral-50 w-60 dark:bg-neutral-900 p-2 rounded shadow-sm outline outline-transparent  outline-offset-0 outline-2 outline-dashed transition-all duration-300 `,
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
              {productError && (
                <span className="text-xs text-rose-500">{productError}</span>
              )}
            </div>
            <div className="grid items-center justify-start gap-2">
              <span className="flex items-center text-xl font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </span>
              <Button onClick={handleAddToCart} type="button">
                Adicionar ao carrinho
                <ShoppingBagIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Carregando produto...</p>
  );
}

export default SingleProduct;
