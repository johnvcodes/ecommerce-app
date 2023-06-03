import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Accordion from "./Accordion";

function AdminNav() {
  const [showNav, setShowNav] = useState(false);

  const adminMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOut = (event: MouseEvent) => {
    if (
      adminMenuRef.current &&
      !adminMenuRef.current.contains(event.target as Node)
    ) {
      setShowNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  });

  return (
    <div className="relative h-fit border-b border-slate-300 bg-slate-50 p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        onClick={() => setShowNav(!showNav)}
        type="button"
        className="transition-colors duration-300 hover:text-orange-200"
      >
        Painel de Administrador
      </button>
      {showNav && (
        <div
          ref={adminMenuRef}
          className="absolute top-full flex min-w-[240px] flex-col border-x border-neutral-300 shadow-sm dark:border-neutral-700"
        >
          <Accordion
            title="Produtos"
            content={
              <>
                <NavLink
                  to="/admin"
                  className="bg-slate-50 px-1 transition-colors  duration-300 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  Todos os produtos
                </NavLink>
                <NavLink
                  to="/admin/add-product"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? " bg-slate-300 dark:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-200 dark:bg-slate-900  dark:hover:bg-slate-800"
                    }  px-1 transition-colors duration-300`
                  }
                >
                  Adicionar produto
                </NavLink>
              </>
            }
          />
          <Accordion
            title="Categorias"
            content={
              <>
                <NavLink
                  to="/admin/categories"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? " bg-slate-300 dark:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-200 dark:bg-slate-900  dark:hover:bg-slate-800"
                    }  px-1 transition-colors duration-300`
                  }
                >
                  Categorias
                </NavLink>
                <NavLink
                  to="/admin/add-categories"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? " bg-slate-300 dark:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-200 dark:bg-slate-900  dark:hover:bg-slate-800"
                    }  px-1 transition-colors duration-300`
                  }
                >
                  Adicionar Categorias
                </NavLink>
                <NavLink
                  to="/admin/add-sub-categories"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? " bg-slate-300 dark:bg-slate-700"
                        : "bg-slate-50 hover:bg-slate-200 dark:bg-slate-900  dark:hover:bg-slate-800"
                    }  px-1 transition-colors duration-300`
                  }
                >
                  Adicionar Sub Categorias
                </NavLink>
              </>
            }
          />
        </div>
      )}
    </div>
  );
}

export default AdminNav;
