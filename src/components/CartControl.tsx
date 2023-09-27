import { useAppSelector } from "../store/store";
import MobileCart from "./MobileCart";
import CartMenu from "./CartMenu";

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
