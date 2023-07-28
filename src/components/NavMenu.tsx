import { NavLink } from "react-router-dom";

type Props = { routes: { path: string; label: string }[] };

function NavMenu({ routes }: Props) {
  return (
    <nav className="hidden grow items-center justify-center gap-2 md:flex">
      {routes.map((route) => (
        <NavLink
          key={route.label}
          to={route.path}
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "hover:after:scale-x-100 "
            } relative flex items-center outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:text-blue-500  focus:text-blue-500 focus:after:scale-x-100`
          }
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavMenu;
