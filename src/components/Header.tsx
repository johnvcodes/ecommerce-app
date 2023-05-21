import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

import { FormEvent } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import ThemeButton from "./ThemeButton";

function Header() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <header className="grid">
      <div className="flex gap-2 p-2">
        <Link
          to="/"
          className="flex items-center gap-2 rounded bg-blue-700 p-1 font-bold uppercase tracking-widest text-neutral-50"
        >
          <BuildingStorefrontIcon aria-hidden className="h-6 w-6" />
          Shoppy
        </Link>
        <ThemeButton />
        <UserMenu />
      </div>
      <nav className="flex gap-2 border-y border-neutral-300 bg-blue-700 p-2 text-neutral-50 shadow-sm dark:border-neutral-700">
        <button
          type="button"
          className="flex items-center rounded p-1 md:hidden"
        >
          <Bars3BottomLeftIcon className="h-6 w-6" />
        </button>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/products">Início</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/products">Sobre Nós</Link>
        </div>
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
