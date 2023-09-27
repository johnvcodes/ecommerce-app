import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import "@fontsource-variable/inter";
import "@fontsource/lato";
import { store } from "./store/store";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminProducts from "./pages/Admin/AdminProducts";
import Categories from "./pages/Admin/Categories";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import AuthLayout from "./layouts/AuthLayout";
import AdminAllProducts from "./pages/Admin/AdminAllProducts";
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
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "/entrar", element: <Login /> },
          { path: "/criar-conta", element: <Register /> },
        ],
      },
    ],
  },
]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminProducts />}>
            <Route index element={<AdminAllProducts />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
          </Route>
          <Route path="/admin/categories" element={<Categories />} />
        </Route>
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  </React.StrictMode>,
);
