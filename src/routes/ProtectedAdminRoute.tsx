import { Navigate, Outlet } from "react-router-dom";

import { useStore } from "../contexts/StoreContext";

function ProtectedAdminRoute() {
  const { isAdmin } = useStore();
  console.log(isAdmin);
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedAdminRoute;
