import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
import CartPageItem from "../components/Cart/CartPageItem";

function Cart() {
  const { cart, total } = useAppSelector((state) => state.cartReducer);

  return (
    <div className="container mx-auto flex grow justify-center p-2">
      <div className="flex flex-col gap-2">
        <div className="flex w-fit items-center justify-between shadow-sm">
          <h2 className="bg-orange-200 p-2 font-medium uppercase text-neutral-950">
            Meu Carrinho
          </h2>
          <div className="flex items-center gap-2 bg-neutral-900 p-2 text-neutral-50">
            <span>Valor Total:</span>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total)}
          </div>
        </div>
        <div className="grid">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartPageItem key={product.uid} product={product} />
            ))
          ) : (
            <>
              <h2 className="p-2">O carrinho está vazio</h2>
              <Link
                to="/products"
                className="flex w-fit items-center justify-self-center border border-neutral-300 p-1 transition-colors duration-300 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800"
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
