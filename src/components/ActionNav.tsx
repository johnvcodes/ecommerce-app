import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Drawer from "@/components/common/Drawer";
import IconButton from "@/components/common/IconButton";

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
    <div className="flex md:hidden">
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position="right"
        handler={
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
            aria-haspopup="true"
            aria-controls="nav-list"
            aria-expanded={isOpen}
            title="Abrir menu"
            type="button"
          >
            <IconMenu2 aria-hidden strokeWidth={1.5} />
          </IconButton>
        }
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="mr-6 w-fit items-center self-end">
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Fechar Menu"
              aria-controls="nav-list"
              aria-expanded={isOpen}
              title="Fechar menu"
              type="button"
            >
              <IconX aria-hidden strokeWidth={1.5} />
            </IconButton>
          </div>
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
