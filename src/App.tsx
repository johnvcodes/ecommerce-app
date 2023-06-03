import { Outlet } from "react-router-dom";
import { StoreProvider } from "./contexts/StoreContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Images aspect ratio 8:12
function App() {
  return (
    <StoreProvider>
      <div className="flex h-full flex-col">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;
