import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedAdminRoute() {
  // return userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
  return <Outlet />;
}

export default ProtectedAdminRoute;
