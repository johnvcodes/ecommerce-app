import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "../store/store";
import IconButton from "./IconButton";
import Menu from "./Menu";
import CartPageItem from "./CartPageItem";

function ActionCart() {
  const [isOpen, setIsOpen] = useState(true);
  const { cart } = useAppSelector((state) => state.cartReducer);

  return (
    <>
      <div className="lg:hidden">
        <IconButton component={Link} to="/sacola">
          <ShoppingBag size={24} strokeWidth={1.5} />
        </IconButton>
      </div>
      <div className="hidden lg:block">
        <Menu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          position="right"
          handler={
            <IconButton onClick={() => setIsOpen(!isOpen)} type="button">
              <ShoppingBag size={24} strokeWidth={1.5} />
            </IconButton>
          }
        >
          <div className="grid w-[25rem] divide-y divide-neutral-300">
            {cart.length > 0 ? (
              cart.map((product) => (
                <CartPageItem key={product.uid} product={product} />
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
