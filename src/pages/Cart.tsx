import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
import CartPageItem from "../components/CartPageItem";

function Cart() {
  const { cart, total } = useAppSelector((state) => state.cartReducer);

  return (
    <div className="container mx-auto flex grow justify-center p-4">
      <div className="flex grow flex-col gap-4">
        <div className="flex items-center justify-between rounded border border-neutral-300 bg-neutral-50 p-1 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
          <h2 className="font-medium uppercase text-blue-500">Meu Carrinho</h2>
          <span className="text-sm">
            Total:{" "}
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          </span>
        </div>
        <div className="grid gap-4">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartPageItem key={product.uid} product={product} />
            ))
          ) : (
            <h2 className="p-2">O carrinho está vazio</h2>
          )}
        </div>
        <div className="flex items-center gap-2 justify-self-center">
          {cart.length > 0 && (
            <button
              type="button"
              className="border border-neutral-300 bg-neutral-50 p-1 transition-colors duration-300 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Finalizar compras
            </button>
          )}
          <Link
            to="/products"
            className="border border-neutral-300 bg-neutral-50 p-1 transition-colors duration-300 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
