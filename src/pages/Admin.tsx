import { Outlet, useLoaderData } from "react-router-dom";
import { AdminContext } from "../loaders/AdminLoader";
import AdminNav from "../components/AdminNav";

function Admin() {
  const store = useLoaderData() as AdminContext;

  return (
    <div className="flex grow flex-col">
      <AdminNav />
      <Outlet context={store} />
    </div>
  );
}

export default Admin;
