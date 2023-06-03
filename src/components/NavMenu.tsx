import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <nav className="hidden grow items-center justify-center  gap-4 md:flex">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? "text-orange-200" : ""
          } font-medium transition-colors duration-300 hover:text-orange-200`
        }
      >
        Início
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `${
            isActive ? "text-orange-200" : ""
          } font-medium transition-colors duration-300 hover:text-orange-200`
        }
      >
        Produtos
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `${
            isActive ? "text-orange-200" : ""
          } font-medium transition-colors duration-300 hover:text-orange-200`
        }
      >
        Sobre Nós
      </NavLink>
    </nav>
  );
}

export default NavMenu;
