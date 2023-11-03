import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@fontsource-variable/inter";
import "@fontsource-variable/grenze-gotisch";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import { store } from "@libs/store/store";
import App from "./App";
import Home from "@pages/Home";
import Login from "@pages/AccountLogin";
import AccountCreate from "@pages/AccountCreate";
import Products from "@pages/Products";
import SingleProduct from "@pages/SingleProduct";
import Cart from "@pages/Cart";
import About from "@pages/About";
import Profile from "@pages/Profile";
import AdminProducts from "@pages/Admin/AdminProducts";
import AdminAddProduct from "@pages/Admin/AdminAddProduct";
import Categories from "@pages/Admin/Categories";
import AdminAllProducts from "@pages/Admin/AdminAllProducts";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import "./index.css";

const browserRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/produtos", element: <Products /> },
          { path: "/produtos/:id", element: <SingleProduct /> },
          { path: "/sacola", element: <Cart /> },
          { path: "/sobre", element: <About /> },
          {
            element: <ProtectedRoute />,
            children: [{ path: "/perfil", element: <Profile /> }],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "/entrar", element: <Login /> },
          { path: "/criar-conta", element: <AccountCreate /> },
        ],
      },
      {
        element: <AdminLayout />,
        children: [
          {
            element: <ProtectedAdminRoute />,
            children: [
              {
                path: "/admin",
                element: <AdminProducts />,
                children: [
                  { index: true, element: <AdminAllProducts /> },
                  { path: "/admin/add-product", element: <AdminAddProduct /> },
                ],
              },

              { path: "/admin/categories", element: <Categories /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  </React.StrictMode>,
);
