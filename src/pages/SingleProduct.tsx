import { Navigate, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "../contexts/StoreContext";
import ProductRating from "../components/ProductRating";
import { CartProduct } from "../@types/product";
import { useSingleProduct } from "../loaders/SingleProductLoader";
import ProductCarousel from "../components/ProductCarousel";
import isClothingSize from "../utilities/is-clothing-size";
import { ClothingSize, FootwearSize } from "../@types/sizes";

function SingleProduct() {
  const product = useSingleProduct();
  const { dispatch } = useStore();
  const navigate = useNavigate();

  const [productSize, setProductSize] = useState<ClothingSize | FootwearSize>();
  const [error, setError] = useState("");

  const errorRef = useRef<HTMLDivElement>(null);

  const handlePickSize = (pickedSize: ClothingSize | FootwearSize) => {
    if (productSize === pickedSize) return setProductSize(undefined);
    setProductSize(pickedSize);
    return setError("");
  };

  const handleAddToCart = () => {
    if (!productSize) {
      errorRef.current?.scrollIntoView();
      return setError("Por favor, escolha um tamanho");
    }
    toast(`Produto adicionado ao carrinho`, { type: "success" });
    return dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, productSize } as CartProduct,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return product ? (
    <div className="grid grow gap-2 py-5">
      <div className="m-auto grid gap-2">
        <button
          onClick={handleGoBack}
          type="button"
          className="flex w-fit items-center gap-1 self-start border border-slate-300 py-1 pe-2 ps-1 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <ChevronLeftIcon className="h-4 w-4" />
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
              {error && (
                <div
                  ref={errorRef}
                  className="w-fit border border-red-500 bg-red-200 px-2 text-red-500"
                >
                  {error}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                {product.sizes.map((size) => (
                  <button
                    onClick={() => handlePickSize(size)}
                    key={size.uid}
                    type="button"
                    className={`${
                      size.uid === productSize?.uid
                        ? "bg-slate-300 dark:bg-slate-700"
                        : "hover:bg-slate-200 dark:hover:bg-slate-800"
                    } h-10 w-10 overflow-hidden border  border-slate-300 transition-colors duration-300 dark:border-slate-700`}
                  >
                    {isClothingSize(size) && size.label
                      ? size.label
                      : size.value}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center text-xl font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </span>
              <button
                onClick={handleAddToCart}
                type="button"
                className="flex items-center gap-1 bg-orange-200 p-2 text-slate-950 transition-colors duration-300 hover:bg-orange-300"
              >
                Adicionar ao carrinho
                <ShoppingBagIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/products" />
  );
}

export default SingleProduct;
