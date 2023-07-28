import { Link, Outlet } from "react-router-dom";

function AdminProducts() {
  return (
    <div className="flex grow flex-col ">
      <div className="flex items-center gap-2 divide-x divide-neutral-300 border-b border-neutral-300 bg-neutral-50 shadow-sm dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-900">
        <Link to="/admin" className="p-2">
          Todos os produtos
        </Link>
        <Link to="/admin/add-product" className="p-2">
          Adicionar produto
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminProducts;
