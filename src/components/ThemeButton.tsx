import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function ThemeButton() {
  const [theme, setTheme] = useState<boolean>(false);

  function handleChangeTheme() {
    setTheme(!theme);
  }

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
      setTheme(true);
  }, []);

  useEffect(() => {
    if (theme === true) {
      localStorage.setItem("theme", "dark");
      return document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", "light");
    return document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <button
      onClick={handleChangeTheme}
      type="button"
      className="p-1 transition-colors duration-300 hover:bg-slate-700"
    >
      {theme ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6  w-6" />
      )}
    </button>
  );
}

export default ThemeButton;
