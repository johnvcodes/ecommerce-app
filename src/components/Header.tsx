import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import ThemeButton from "./ThemeButton";
import NavMenu from "./NavMenu";
import NavMobileMenu from "./NavMobileMenu";
import CartControl from "./Cart/CartControl";

const routes = [
  {
    path: "/",
    label: "Início",
  },
  {
    path: "/products",
    label: "Produtos",
  },
  {
    path: "/about",
    label: "Sobre nós",
  },
];

function Header() {
  return (
    <header className="flex items-center gap-2 border-b border-neutral-300 px-4 py-2 dark:border-neutral-700">
      <NavMobileMenu routes={routes} />
      <Link
        to="/"
        className="relative flex items-center font-bold uppercase tracking-widest outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:text-blue-500 hover:after:scale-x-100 focus:text-blue-500 focus:after:scale-x-100"
      >
        Vox Clothing
      </Link>
      <NavMenu routes={routes} />
      <CartControl />
      <ThemeButton />
      <UserMenu />
    </header>
  );
}

export default Header;
