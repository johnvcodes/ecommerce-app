import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="grid gap-2 border-t border-slate-300 p-8 dark:border-slate-700">
      <Link
        to="/"
        className="flex w-fit items-center border-r-4 border-orange-200 pr-2 text-xl font-bold uppercase tracking-widest"
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
