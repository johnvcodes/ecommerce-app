import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../store/store";
import { TCartProduct } from "../@types/product";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

type Props = { product: TCartProduct };

function CartPageItem({ product }: Props) {
  const dispatch = useAppDispatch();

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
    <div className="flex overflow-hidden rounded border border-neutral-300 bg-neutral-50 text-sm shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-col border-r border-neutral-300 dark:border-neutral-700">
        <img src={product.images[0]} alt="" className="h-40 md:h-80" />
        <button
          onClick={() => handleRemoveFromCart(product.uid)}
          type="button"
          className="p-2 transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          Remover
        </button>
      </div>
      <div className="flex grow flex-col gap-1 p-2">
        <div className="flex items-center justify-between">
          <Link
            to={`products/${product.uid}`}
            className="relative flex items-center font-bold uppercase outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:text-blue-500 hover:after:scale-x-100 focus:text-blue-500 focus:after:scale-x-100"
          >
            {product.title}
          </Link>
          <span>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>
        </div>

        <div className="flex gap-1">
          <h2>Tamanho:</h2>
          <span>{product.selectedSize.label}</span>
        </div>
        <div className="flex items-center gap-1">
          <h3>Quantidade:</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleDecreaseQuantity(product.uid)}
              type="button"
              className="flex aspect-square h-full items-center justify-center rounded outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span>{product.quantity}</span>
            <button
              onClick={() => handleIncreaseQuantity(product.uid)}
              type="button"
              className="flex aspect-square h-full items-center justify-center rounded outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
