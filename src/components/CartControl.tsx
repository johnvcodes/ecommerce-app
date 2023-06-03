import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { useStore } from "../contexts/StoreContext";
import isClothingSize from "../utilities/is-clothing-size";

function CartControl() {
  const { cart, total, dispatch } = useStore();
  const [showCartMenu, setShowCartMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleShowCartMenu = () => setShowCartMenu(!showCartMenu);

  const handleClickOut = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowCartMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  const handleIncreaseQuantity = (productId: string) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: productId });
  };
  const handleDecreaseQuantity = (productId: string) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  return (
    <>
      <Link
        to="/cart"
        className="relative ml-auto flex items-center p-1 transition-colors duration-300 hover:bg-slate-700 md:hidden"
      >
        <ShoppingBagIcon className="h-6 w-6" />
        <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-200 text-xs text-slate-950">
          {cart.length}
        </div>
      </Link>
      <div ref={menuRef} className="relative ml-auto hidden md:block">
        <button
          onClick={handleShowCartMenu}
          type="button"
          className="p-1 transition-colors duration-300 hover:bg-slate-700"
        >
          <ShoppingBagIcon className="h-6 w-6" />
          <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-orange-200 text-xs text-slate-950">
            {cart.length}
          </div>
        </button>
        {showCartMenu && (
          <div className="absolute right-0 top-[calc(100%_+_0.5rem)] z-10 grid max-h-[26.5rem] min-w-[30rem] gap-2 overflow-y-scroll border-x border-b border-slate-700 bg-slate-900 p-2 pt-4 text-slate-50 shadow-md">
            <div className="flex w-80 items-center justify-between bg-slate-900">
              <h2 className="font-medium uppercase text-orange-200">
                Meu Carrinho
              </h2>
              <div className="flex items-center gap-2">
                <span>Valor Total:</span>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(total)}
              </div>
            </div>
            <div className="grid gap-2">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <div
                    key={product.uid}
                    className="flex gap-2 border-b border-slate-700 py-2"
                  >
                    <img src={product.images[0]} alt="" className="h-40" />
                    <div className="grid grow gap-1">
                      <h2 className="font-medium uppercase">{product.title}</h2>
                      <div className="flex items-center justify-between border-b border-slate-700">
                        <span className="text-sm font-medium">Tamanho:</span>
                        <span>
                          {isClothingSize(product.productSize) &&
                          product.productSize.label
                            ? product.productSize.label
                            : product.productSize.value}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-1 border-b border-slate-700 pb-1 ">
                        <span className="text-sm font-medium">Quantidade:</span>
                        <div className="flex items-center gap-1 border border-slate-700">
                          <button
                            onClick={() => handleDecreaseQuantity(product.uid)}
                            type="button"
                            className="bg-slate-800 p-1 transition-colors duration-300 hover:bg-slate-700"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          <span className="flex items-center px-1 text-sm font-medium">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(product.uid)}
                            type="button"
                            className="bg-slate-800 p-1 transition-colors duration-300 hover:bg-slate-700"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="grid gap-1 border-b border-slate-700 pb-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-medium">Preço:</span>
                          <span className="text-sm font-medium">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(product.price)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-medium">Total:</span>
                          <span className="text-sm font-medium">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(product.price * product.quantity)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => handleRemoveFromCart(product.uid)}
                          type="button"
                          className="border border-slate-700 bg-slate-900 px-1 text-sm transition-colors duration-300 hover:border-rose-500 hover:bg-rose-500"
                        >
                          Remover do carrinho
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="flex items-center border-t border-slate-700 pt-2">
                  Carrinho está vazio
                </span>
              )}
              {cart.length > 0 && (
                <Link
                  to="/cart"
                  className="flex w-fit items-center border border-slate-700 p-1 transition-colors hover:bg-slate-800"
                >
                  Continuar ao carrinho
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartControl;
