import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconChevronsRight,
  IconCopyright,
} from "@tabler/icons-react";
import IconButton from "./IconButton";
import List from "./List";

const productRoutes = ["Todos", "Novos", "Mais Vendidos", "Promoções"];
const clientRoutes = [
  "Entrega",
  "Devolução",
  "Pagamento",
  "Segurança",
  "Pedidos",
];
const companyRoutes = ["Sobre Nós", "Trabalhe Conosco", "Fale Conosco"];

function Footer() {
  return (
    <div className="mt-8 bg-neutral-200/30">
      <footer className="container mx-auto grid gap-8 px-6 py-4 md:px-0">
        <section className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <List header="Produtos">
            {productRoutes.map((route) => (
              <li key={route}>
                <Link to="/">{route}</Link>
              </li>
            ))}
          </List>
          <List header="Cliente">
            {clientRoutes.map((route) => (
              <li key={route}>
                <Link to="/">{route}</Link>
              </li>
            ))}
          </List>
          <List header="Empresa">
            {companyRoutes.map((route) => (
              <li key={route}>
                <Link to="/">{route}</Link>
              </li>
            ))}
          </List>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-6"
          >
            <label htmlFor="contact" className="font-extrabold">
              Fique por dentro
            </label>
            <div className="flex items-stretch">
              <input
                type="text"
                name="contact"
                id="contact"
                placeholder="Inserir e-mail"
                className="w-full border-b border-neutral-950 bg-transparent py-4"
              />
              <button type="submit">
                <IconChevronsRight strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </section>
        <hr className="border-neutral-200" />
        <section className="flex justify-between gap-4">
          <h4 className="flex items-center gap-1">
            <IconCopyright strokeWidth={1.5} /> 2023 North Star
          </h4>
          <div className="flex items-center gap-2">
            <IconButton component={Link} to="/">
              <IconBrandInstagram aria-label="Instagram" strokeWidth={1.5} />
            </IconButton>
            <IconButton component={Link} to="/">
              <IconBrandFacebook aria-label="Facebook" strokeWidth={1.5} />
            </IconButton>
            <IconButton component={Link} to="/">
              <IconBrandLinkedin aria-label="LinkedIn" strokeWidth={1.5} />
            </IconButton>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
