import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AuthLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AuthLayout;
