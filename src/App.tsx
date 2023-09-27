import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

const contextClass = {
  success: "bg-emerald-500",
  error: "bg-rose-500",
  info: "bg-blue-500",
  warning: "bg-orange-500",
  default: "bg-indigo-500",
  dark: "bg-white-600 font-gray-300",
};

function App() {
  return (
    <AuthProvider>
      <Outlet />
      <ToastContainer
        toastClassName={(toast) =>
          `${contextClass[toast?.type || "default"]}
            flex items-center gap-2 p-1 w-fit mx-auto text-neutral-50 rounded
           `
        }
        hideProgressBar
        icon={false}
        position="bottom-center"
        autoClose={3000}
      />
    </AuthProvider>
  );
}

export default App;
