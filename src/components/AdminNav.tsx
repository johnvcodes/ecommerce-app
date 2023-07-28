import { NavLink } from "react-router-dom";
import Divider from "./Divider";

const routes = [
  {
    to: "/admin",
    label: "Produtos",
  },
  {
    to: "/admin/categories",
    label: "Categorias",
  },
];

function AdminNav() {
  return (
    <div className="flex min-w-[15rem] flex-col gap-2 border-r border-neutral-300 bg-neutral-50 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
      <h2>Painel de Administrador</h2>
      <Divider />
      <div className="flex flex-col gap-2">
        {routes.map((route) => (
          <NavLink key={route.label} to={route.to}>
            {route.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AdminNav;
