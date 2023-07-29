import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedAdminRoute() {
  const { userData } = useAuth();
  return userData?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedAdminRoute;
