import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Props = { routes: { path: string; label: string }[] };

function NavMobileMenu({ routes }: Props) {
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
        className="flex items-center rounded p-1 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      {showNavMobileMenu && (
        <nav className="absolute left-0 top-[calc(100%_+_0.25rem)] z-10 flex min-w-[7.5rem] flex-col justify-center divide-y divide-neutral-300 overflow-hidden rounded border border-neutral-300 bg-neutral-50 py-1 shadow dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-900">
          {routes.map((route) => (
            <Link
              key={route.label}
              onClick={handleShowNavMobileMenu}
              to={route.path}
              className="p-1 text-center outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 active:bg-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:active:bg-neutral-600"
            >
              {route.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export default NavMobileMenu;
