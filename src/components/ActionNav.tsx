import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";

type Props = {
  routes: { path: string; label: string }[];
};

function ActionNav({ routes }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflowY = isOpen ? "hidden" : "visible";
    return () => {
      document.documentElement.style.overflowY = "visible";
    };
  }, [isOpen]);

  return (
    <div className="flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menu"
        aria-haspopup="true"
        aria-controls="nav-list"
        aria-expanded={isOpen}
        title="Abrir menu"
        type="button"
        className="flex items-center md:hidden"
      >
        <Menu aria-hidden size={24} strokeWidth={1.5} />
      </button>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} position="right">
        <div className="flex flex-col gap-4 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Fechar Menu"
            aria-controls="nav-list"
            aria-expanded={isOpen}
            title="Fechar menu"
            type="button"
            className="mr-6 flex w-fit items-center self-end"
          >
            <X aria-hidden size={24} strokeWidth={1.5} />
          </button>
          <ul
            id="nav-list"
            aria-hidden={!isOpen}
            className="bg-neutral-50 text-neutral-950"
          >
            {routes.map((route) => (
              <li key={route.label} className="flex w-full">
                <Link
                  onClick={() => setIsOpen(!open)}
                  to={route.path}
                  className="w-full border-t border-neutral-200 p-4 transition-colors duration-200 hover:bg-neutral-200"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </div>
  );
}

export default ActionNav;
