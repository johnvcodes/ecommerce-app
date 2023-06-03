import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../contexts/StoreContext";

function ProtectedRoute() {
  const currentUser = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) navigate(-1);
  }, [currentUser, navigate]);
  return <Outlet />;
}

export default ProtectedRoute;
