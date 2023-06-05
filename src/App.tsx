import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { StoreProvider } from "./contexts/StoreContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

const contextClass = {
  success: "border-emerald-500 bg-emerald-300 text-emerald-900",
  error: "border-rose-500 bg-rose-300 text-rose-900",
  info: "bg-blue-500",
  warning: "bg-orange-500",
  default: "bg-indigo-500",
  dark: "bg-white-600 font-gray-300",
};

// Images aspect ratio 8:12
function App() {
  return (
    <StoreProvider>
      <div className="flex h-full flex-col">
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer
          toastClassName={(toast) =>
            `${contextClass[toast?.type || "default"]}
            flex items-center gap-2 p-1 w-fit mx-auto
           `
          }
          hideProgressBar
          icon={false}
          position="bottom-center"
          autoClose={3000}
        />
      </div>
    </StoreProvider>
  );
}

export default App;
