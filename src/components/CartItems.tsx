import { toast } from "react-toastify";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TCartProduct } from "../@types/product";
import { useAppDispatch } from "../store/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import Divider from "./Divider";

type Props = {
  product: TCartProduct;
};

function CartItems({ product }: Props) {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };
  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
    toast("Produto removido do carrinho", { type: "error" });
  };

  return (
    <div className="flex overflow-hidden rounded border border-neutral-300 text-sm dark:border-neutral-700">
      <img src={product.images[0]} alt="" className="h-40" />
      <div className="flex grow flex-col gap-2 p-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase">{product.title}</h2>
          <button
            onClick={() => handleRemoveFromCart(product.uid)}
            type="button"
            title="Remover do carrinho"
            className="flex items-center justify-center rounded outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 hover:text-rose-500 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <Divider />
        <span className="flex items-center ">
          Tamanho: {product.selectedSize.label}
        </span>
        <div className="flex items-center justify-between gap-1">
          <span className="">Quantidade:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleDecreaseQuantity(product.uid)}
              type="button"
              title="Diminuir quantia"
              className="rounded p-1 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <MinusIcon className="h-3 w-3" />
            </button>
            <span className="flex items-center px-1 ">{product.quantity}</span>
            <button
              onClick={() => handleIncreaseQuantity(product.uid)}
              type="button"
              title="Aumentar quantia"
              className="rounded p-1 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
        <span className="mt-auto flex items-center">
          Preço:{" "}
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </span>
      </div>
    </div>
  );
}

export default CartItems;
