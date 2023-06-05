import { Navigate, Outlet } from "react-router-dom";

import { useStore } from "../contexts/StoreContext";

function ProtectedAdminRoute() {
  const { userRole } = useStore();

  return userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedAdminRoute;
