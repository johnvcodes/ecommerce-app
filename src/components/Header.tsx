import { Link } from "react-router-dom";
import ActionUser from "@components/ActionUser";
import ActionNav from "@components/ActionNav";
import ActionCart from "@components/ActionCart";

const routes = [
  {
    path: "/",
    label: "Início",
  },
  {
    path: "/produtos?categoria=masculino",
    label: "Masculino",
  },
  {
    path: "/produtos?categoria=feminino",
    label: "Feminino",
  },
  {
    path: "/sobre",
    label: "Sobre nós",
  },
];

function Header() {
  return (
    <header className="flex h-14 items-center border-b border-neutral-200 bg-neutral-50">
      <nav className="container mx-auto flex w-full items-center justify-between px-6 py-4 md:px-0">
        <Link to="/" className="font-brand text-2xl text-primary">
          North Star
        </Link>
        <ul className="hidden gap-4 lg:flex">
          {routes.map((route) => (
            <li key={route.label}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ActionUser />
          <ActionCart />
          <ActionNav routes={routes} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
