import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@libs/store/store";
import Button from "@components/common/Button";
import IconButton from "@/components/common/IconButton";
import Menu from "@/components/common/Menu";
import CartMenuItem from "@components/CartMenuItem";

function ActionCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useAppSelector((state) => state.cartReducer);

  return (
    <>
      <div className="lg:hidden">
        <IconButton
          component={Link}
          to="/sacola"
          counter={cart.length}
          aria-label="Ir para o carrinho"
          title="Ir para o carrinho"
        >
          <ShoppingBag aria-hidden strokeWidth={1.5} />
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
              counter={cart.length}
              type="button"
              aria-label="Menu da Sacola"
              aria-haspopup="true"
              aria-controls="cart-menu"
              aria-expanded={isOpen}
              title="Menu da Sacola"
            >
              <ShoppingBag aria-hidden strokeWidth={1.5} />
            </IconButton>
          }
        >
          <div className="grid">
            <div className="flex items-center justify-between p-4">
              <p className="font-heading uppercase text-primary">
                Meu carrinho
              </p>
              <Button
                component={Link}
                to="/sacola"
                variant="secondary"
                size="small"
                className="p-0"
              >
                Ir ao carrinho
              </Button>
            </div>
            <div className="grid max-h-[365px] w-[25rem] gap-4 overflow-y-auto px-4 pb-4">
              {cart.length > 0 ? (
                cart.map((product) => (
                  <CartMenuItem key={product.uid} product={product} />
                ))
              ) : (
                <p>O carrinho está vazio</p>
              )}
            </div>
          </div>
        </Menu>
      </div>
    </>
  );
}

export default ActionCart;
