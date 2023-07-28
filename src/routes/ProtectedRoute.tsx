import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate(-1);
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
