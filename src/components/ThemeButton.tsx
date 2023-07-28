import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleTheme } from "../store/themeSlice";

function ThemeButton() {
  const theme = useAppSelector((state) => state.themeReducer.darkMode);
  const dispatch = useAppDispatch();

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
      onClick={() => dispatch(toggleTheme())}
      type="button"
      className="flex items-center rounded p-1 outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
