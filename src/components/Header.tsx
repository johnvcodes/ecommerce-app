import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { FormEvent } from "react";
import { Link } from "react-router-dom";

function Header() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="grid">
      <div className="flex gap-2 border-b border-neutral-300 p-2 dark:border-neutral-800">
        <Link
          to="/"
          className="flex items-center gap-2 rounded p-1 font-mono font-bold uppercase tracking-widest"
        >
          Shoppy
        </Link>
        <button type="button" className="ml-auto flex items-center rounded p-1">
          <SunIcon className="h-6 w-6" />
        </button>
        <button type="button" className="flex items-center rounded p-1">
          <UserIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex gap-2 border-b border-neutral-300 p-2 dark:border-neutral-800">
        <button type="button" className="flex items-center rounded p-1">
          <Bars3BottomLeftIcon className="h-6 w-6" />
        </button>
        <form onSubmit={handleSubmit} className="flex grow items-center gap-2">
          <label htmlFor="search-products" className="sr-only">
            O que procura?
          </label>
          <input
            type="text"
            name=""
            id="search-products"
            placeholder="O que procura?"
            className="grow bg-transparent p-2"
          />
          <button type="submit" className="flex items-center rounded p-1">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </form>
        <button type="button" className="flex items-center rounded p-1">
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
