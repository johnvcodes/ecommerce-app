import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import isClothingSize from "../utilities/is-clothing-size";

function Cart() {
  const { cart, total, dispatch } = useStore();
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
    <div className="flex grow items-center justify-center p-4">
      <div className="grid gap-2">
        <div className="flex w-fit items-center justify-between shadow-sm">
          <h2 className="bg-orange-200 p-2 font-medium uppercase text-slate-950">
            Meu Carrinho
          </h2>
          <div className="flex items-center gap-2 bg-slate-900 p-2 text-slate-50">
            <span>Valor Total:</span>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div
                key={product.uid}
                className="flex items-center gap-2 border border-slate-300 bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <img src={product.images[0]} alt="" className="h-40" />
                <div className="flex grow flex-col gap-1">
                  <div>
                    <h2 className="font-medium uppercase">{product.title}</h2>
                    <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-700">
                      <span className="text-sm font-medium">Tamanho:</span>
                      <span>
                        {isClothingSize(product.productSize) &&
                        product.productSize.label
                          ? product.productSize.label
                          : product.productSize.value}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1 border-b border-slate-300 pb-1 dark:border-slate-700 ">
                    <span className="text-sm font-medium">Quantidade:</span>
                    <div className="flex items-center gap-1 border border-slate-300 dark:border-slate-700">
                      <button
                        onClick={() => handleDecreaseQuantity(product.uid)}
                        type="button"
                        className="bg-slate-200 p-1 transition-colors duration-300 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="flex items-center px-1 text-sm font-medium">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(product.uid)}
                        type="button"
                        className="bg-slate-200 p-1 transition-colors duration-300 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-1 border-b border-slate-300 pb-1 dark:border-slate-700">
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
                      className="border bg-slate-50 px-1 text-sm transition-colors duration-300 hover:border-rose-500 hover:bg-rose-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-rose-500 dark:hover:bg-rose-500"
                    >
                      Remover do carrinho
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <h2 className="p-2">O carrinho está vazio</h2>
              <Link
                to="/products"
                className="w-fit justify-self-center border border-slate-300 p-1 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Voltar aos produtos
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 justify-self-center">
          {cart.length > 0 && (
            <button
              type="button"
              className="border border-slate-300 bg-slate-50 p-1 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              Finalizar compras
            </button>
          )}
          <Link
            to="/products"
            className="border border-slate-300 bg-slate-50 p-1 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
