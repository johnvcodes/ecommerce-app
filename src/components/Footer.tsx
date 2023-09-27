import {
  ChevronsRight,
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import FooterList from "./FooterList";

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
    <div className="bg-neutral-200/30">
      <footer className="container mx-auto grid gap-8 px-6 py-4 md:px-0">
        <section className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <FooterList title="Produtos" items={productRoutes} />
          <FooterList title="Cliente" items={clientRoutes} />
          <FooterList title="Empresa" items={companyRoutes} />
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
                <ChevronsRight />
              </button>
            </div>
          </form>
        </section>
        <hr className="border-neutral-200" />
        <section className="flex justify-between gap-4">
          <h4 className="flex items-center gap-1">
            <Copyright size={20} strokeWidth={1.5} /> 2023 North Star
          </h4>
          <div className="flex items-center gap-2">
            <Instagram aria-label="Instagram" size={20} strokeWidth={1.5} />
            <Facebook aria-label="Facebook" size={20} strokeWidth={1.5} />
            <Linkedin aria-label="LinkedIn" size={20} strokeWidth={1.5} />
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
