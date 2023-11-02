import { useAppSelector } from "@libs/store/store";
import CartMenu from "@components/CartMenu";
import MobileCart from "@components/MobileCart";

function CartControl() {
  const cart = useAppSelector((state) => state.cartReducer.cart);

  return (
    <>
      <MobileCart cartLength={cart.length} />
      <CartMenu />
    </>
  );
}

export default CartControl;
