import { toast } from "react-toastify";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch } from "../store/store";
import { TCartProduct } from "../@types/product";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";
import IconButton from "./IconButton";

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
    <div className="flex max-h-60 bg-neutral-50">
      <img src={product.images[0]} />
      <div className="flex grow flex-col gap-2 p-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-extrabold leading-normal text-primary">
            {product.title}
          </span>
          <IconButton onClick={() => handleRemoveFromCart(product.uid)}>
            <Trash2 size={20} strokeWidth={1.5} />
          </IconButton>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold">Tamanho:</span>
          <p className="text-sm">{product.selectedSize.label}</p>
        </div>
        <div className="mt-auto flex items-center gap-2 border-t border-neutral-200">
          <span className="text-sm font-extrabold">Quantidade:</span>
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => handleDecreaseQuantity(product.uid)}
              type="button"
            >
              <Minus size={16} strokeWidth={1.5} />
            </IconButton>
            <span className="text-sm">{product.quantity}</span>
            <IconButton
              onClick={() => handleIncreaseQuantity(product.uid)}
              type="button"
            >
              <Plus size={16} strokeWidth={1.5} />
            </IconButton>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold">Preço:</span>
          <p className="text-sm">
            {Intl.NumberFormat("pt-br", {
              currency: "BRL",
              style: "currency",
            }).format(product.price)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold">Total:</span>
          <p className="text-sm">
            {Intl.NumberFormat("pt-br", {
              currency: "BRL",
              style: "currency",
            }).format(product.price * product.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartPageItem;
