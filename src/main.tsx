import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Admin from "./pages/Admin";
import AdminAddProduct from "./routes/AdminAddProduct";
import AdminProducts from "./routes/AdminProducts";
import { SingleProductLoader } from "./loaders/SingleProductLoader";
import AdminAddCategories from "./routes/AdminAddCategories";
import AdminCategories from "./routes/AdminCategories";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLoader from "./loaders/AdminLoader";
import AdminAddSubCategories from "./routes/AdminAddSubCategories";
import CategoriesLoader from "./loaders/CategoriesLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/products"
        element={<Products />}
        loader={CategoriesLoader}
      />
      <Route
        path="/products/:productId"
        element={<SingleProduct />}
        loader={SingleProductLoader}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} loader={AdminLoader}>
        <Route index element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/add-categories" element={<AdminAddCategories />} />
        <Route
          path="/admin/add-sub-categories"
          element={<AdminAddSubCategories />}
        />
      </Route>
      <Route path="/about" element={<About />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
