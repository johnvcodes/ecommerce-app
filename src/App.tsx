import Header from "./components/Header";

function App() {
  document.documentElement.classList.add("dark");
  return (
    <div className="flex h-full flex-col">
      <Header />
    </div>
  );
}

export default App;
