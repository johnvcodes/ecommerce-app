import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

type Props = { cartLength: number };

function MobileCart({ cartLength }: Props) {
  return (
    <Link
      to="/cart"
      className="relative ml-auto flex items-center rounded p-2 transition-colors duration-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 md:hidden"
    >
      <ShoppingBagIcon className="h-6 w-6" />
      {cartLength > 0 && (
        <div className="absolute right-0 top-0 flex h-4 items-center justify-center rounded-full bg-blue-500 p-1 text-xs text-neutral-50">
          {cartLength >= 10 ? "10+" : cartLength}
        </div>
      )}
    </Link>
  );
}

export default MobileCart;
