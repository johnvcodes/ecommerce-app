import { Bars3Icon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function NavMobileMenu() {
  const [showNavMobileMenu, setShowNavMobileMenu] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleShowNavMobileMenu = () =>
    setShowNavMobileMenu(!showNavMobileMenu);

  const handleClickOut = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowNavMobileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <div ref={menuRef} className="relative flex items-center md:hidden">
      <button
        onClick={handleShowNavMobileMenu}
        type="button"
        className="dura flex items-center p-1 transition-colors duration-300 hover:bg-slate-700"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      {showNavMobileMenu && (
        <nav className="absolute right-0 top-[calc(100%_+_0.5rem)] z-10 flex min-w-[7.5rem] flex-col justify-center border-x border-b border-slate-700 bg-slate-900">
          <Link
            onClick={handleShowNavMobileMenu}
            to="/"
            className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
          >
            Início
          </Link>
          <Link
            onClick={handleShowNavMobileMenu}
            to="/products"
            className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
          >
            Produtos
          </Link>
          <Link
            onClick={handleShowNavMobileMenu}
            to="/about"
            className="p-2 text-center transition-colors duration-300 hover:bg-slate-800"
          >
            Sobre Nós
          </Link>
        </nav>
      )}
    </div>
  );
}

export default NavMobileMenu;
