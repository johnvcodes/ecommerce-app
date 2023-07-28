import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="grid gap-2 border-t border-neutral-300 p-4 dark:border-neutral-700">
      <Link
        to="/"
        className="relative flex w-fit items-center font-bold uppercase tracking-widest outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 after:absolute after:bottom-0 after:h-[0.0625rem] after:w-full after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 hover:text-blue-500 hover:after:scale-x-100 focus:text-blue-500 focus:after:scale-x-100"
      >
        Vox Clothing
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/" className="font-medium tracking-widest">
          Início
        </Link>
        <Link to="/products" className="font-medium tracking-widest">
          Produtos
        </Link>
        <Link to="/about" className="font-medium tracking-widest">
          Sobre Nós
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
