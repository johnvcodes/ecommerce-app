import { Outlet } from "react-router-dom";
import AdminNav from "@components/AdminNav";
import Header from "@components/Header";

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
