import { useState } from "react";
import { toast } from "react-toastify";
import Select, { SingleValue } from "react-select";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { TCartProduct } from "../../@types/product";
import { useAppDispatch } from "../../store/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import { TSize } from "../../@types/size";

type Props = { product: TCartProduct };

function CartPageItem({ product }: Props) {
  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState<TSize | null>(
    product.selectedSize
  );

  function handleIncreaseQuantity(productUID: string) {
    dispatch(increaseQuantity(productUID));
  }

  function handleDecreaseQuantity(productUID: string) {
    dispatch(decreaseQuantity(productUID));
  }

  function handleRemoveFromCart(productUID: string) {
    toast("Produto removido do carrinho", { type: "error" });
    dispatch(removeFromCart(productUID));
  }

  return (
    <div className="flex gap-2">
      <img src={product.images[0]} alt="" className="h-40" />
      <div className="flex grow flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3>{product.title}</h3>
          <button
            onClick={() => handleRemoveFromCart(product.uid)}
            type="button"
          >
            X
          </button>
        </div>
        <span>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price * product.quantity)}
        </span>
        {/* <div>
          <label htmlFor={`sizes-${product.uid}`} className="sr-only">
            Tamanho
          </label>
          <Select
            onChange={(newValue) => setSelectedSize(newValue)}
            options={product.sizes}
            value={selectedSize}
            isSearchable={false}
            isClearable={false}
            inputId={`sizes-${product.uid}`}
            placeholder="Escolher tamanho"
            unstyled
            classNames={{
              control: ({ isFocused }) =>
                `${
                  isFocused
                    ? "border-blue-500 dark:border-blue-500"
                    : "border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500"
                } border bg-neutral-50 w-20 dark:bg-neutral-900 px-2 py-1 rounded shadow-sm outlineoutline-transparent  outline-offset-0 outline-2 outline-dashed transition-all duration-300 `,
              option: ({ isFocused }) =>
                `${
                  isFocused ? "bg-neutral-200 dark:bg-neutral-500" : ""
                } px-2 py-1 flex items-center`,
              clearIndicator: () =>
                "hover:text-red-500 transition-colors duration-300",
              placeholder: () => "text-neutral-500",
              indicatorSeparator: () =>
                "bg-neutral-300 dark:bg-neutral-700 mx-2",
              menu: () =>
                "bg-neutral-50 dark:bg-neutral-900 rounded border mt-1 border-blue-500 overflow-hidden",
              menuList: () => "",

              valueContainer: () => "flex items-center",
              container: () => "w-20",
            }}
          />
        </div> */}
        <div className="flex items-center">
          <button
            onClick={() => handleDecreaseQuantity(product.uid)}
            type="button"
            className="border"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="border">{product.quantity}</span>
          <button
            onClick={() => handleIncreaseQuantity(product.uid)}
            type="button"
            className="h-full border"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
