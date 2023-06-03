import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import ThemeButton from "./ThemeButton";
import NavMenu from "./NavMenu";
import NavMobileMenu from "./NavMobileMenu";
import CartControl from "./CartControl";

function Header() {
  return (
    <header className="flex items-center gap-1 border-b border-slate-700 bg-slate-900 p-2 text-slate-50">
      <Link
        to="/"
        className="flex items-center border-r-4 border-orange-200 px-2 font-bold uppercase tracking-widest"
      >
        Vox Clothing
      </Link>
      <NavMenu />
      <CartControl />
      <ThemeButton />
      <UserMenu />
      <NavMobileMenu />
    </header>
  );
}

export default Header;
