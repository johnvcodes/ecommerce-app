import { useAppSelector } from "../libs/store/store";
import CartPageItem from "@components/CartPageItem";
import Button from "@components/common/Button";

function Cart() {
  const { cart, total } = useAppSelector((state) => state.cartReducer);

  return (
    <div className="container mx-auto flex grow justify-center p-4 md:px-0">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="grid grow gap-4">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartPageItem key={product.uid} product={product} />
            ))
          ) : (
            <h2 className="p-2">O carrinho está vazio</h2>
          )}
        </div>
        <div className="flex max-h-60 flex-col gap-2 border border-neutral-300 p-4">
          <div className="flex gap-2">
            <h3>Produtos:</h3>
            <p>
              {Intl.NumberFormat("pt-br", {
                currency: "BRL",
                style: "currency",
              }).format(total)}
            </p>
          </div>
          <div className="flex gap-2">
            <h3>Desconto:</h3>
            <p>
              {Intl.NumberFormat("pt-br", {
                currency: "BRL",
                style: "currency",
              }).format(0)}
            </p>
          </div>
          <div className="flex grow gap-2">
            <h3>Entrega:</h3>
            <p>
              {Intl.NumberFormat("pt-br", {
                currency: "BRL",
                style: "currency",
              }).format(0)}
            </p>
          </div>
          <Button type="button">
            Total:{" "}
            {Intl.NumberFormat("pt-br", {
              currency: "BRL",
              style: "currency",
            }).format(total)}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
