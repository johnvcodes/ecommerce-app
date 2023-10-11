import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
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
          { path: "/criar-conta", element: <Register /> },
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
