import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@libs/store/store";
import IconButton from "@components/IconButton";
import Menu from "@components/Menu";
import CartMenuItem from "@components/CartMenuItem";

function ActionCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useAppSelector((state) => state.cartReducer);

  return (
    <>
      <div className="lg:hidden">
        <IconButton component={Link} to="/sacola" counter={cart.length}>
          <ShoppingBag strokeWidth={1.5} />
        </IconButton>
      </div>
      <div className="hidden lg:block">
        <Menu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          position="bottom-right"
          id="cart-menu"
          handler={
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              counter={cart.length}
            >
              <ShoppingBag strokeWidth={1.5} />
            </IconButton>
          }
        >
          <div className="grid max-h-[365px] w-[25rem] gap-4 overflow-y-auto p-4">
            {cart.length > 0 ? (
              cart.map((product) => (
                <CartMenuItem key={product.uid} product={product} />
              ))
            ) : (
              <h2 className="p-2">O carrinho está vazio</h2>
            )}
          </div>
        </Menu>
      </div>
    </>
  );
}

export default ActionCart;
