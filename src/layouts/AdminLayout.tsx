import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AdminNav from "../components/AdminNav";

function AdminLayout() {
  return (
    <>
      <Header />
      <div className="flex grow ">
        <AdminNav />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
