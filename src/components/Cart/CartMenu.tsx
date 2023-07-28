import { useEffect, useRef, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import CartProduct from "./CartItems";

function CartMenu() {
  const cart = useAppSelector((state) => state.cartReducer.cart);
  const total = cart.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );

  const [showCartMenu, setShowCartMenu] = useState<boolean>(true);

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

  return (
    <div ref={menuRef} className="relative ml-auto hidden md:block">
      <button
        onClick={handleShowCartMenu}
        type="button"
        className="flex items-center rounded p-1 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        <ShoppingBagIcon className="h-6 w-6" />
        {cart.length > 0 && (
          <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded bg-blue-500 text-xs text-neutral-50">
            {cart.length}
          </div>
        )}
      </button>
      {showCartMenu && (
        <div className="absolute right-0 top-[calc(100%_+_0.25rem)] z-10">
          <div className="relative grid max-h-[26.5rem] min-w-[22rem] overflow-x-hidden rounded border border-neutral-300 bg-neutral-50  shadow-md dark:border-neutral-700 dark:bg-neutral-900">
            <div className="sticky top-0 grid bg-neutral-50 text-sm dark:bg-neutral-900">
              <h2 className="px-2 pt-2 font-bold uppercase text-blue-500">
                Meu Carrinho
              </h2>
              <div className="flex items-center justify-between p-2">
                <Link
                  to="/cart"
                  className="outline outline-2 outline-offset-0 outline-transparent hover:text-blue-500 focus:text-blue-500"
                >
                  Ver ou Editar carrinho
                </Link>
                <span>
                  Total:{" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}
                </span>
              </div>
              <hr className="border-neutral-300 dark:border-neutral-700" />
            </div>
            <div className="grid gap-2 p-2">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <CartProduct key={product.uid} product={product} />
                ))
              ) : (
                <span className="flex items-center text-sm">
                  Carrinho está vazio
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartMenu;
