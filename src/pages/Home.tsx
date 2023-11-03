import { useEffect, useState } from "react";
import { limit, orderBy } from "firebase/firestore";
import { TProduct } from "@/@types/product";
import getErrorMessage from "@utils/get-error-message";
import Hero from "@components/Hero";
import ProductDisplay from "@components/ProductDisplay";
import FeatureDisplay from "@components/FeatureDisplay";
import { getProducts } from "@libs/firebase/firestore/products";
import Container from "@components/common/Container";

function Home() {
  const [products, setProducts] = useState<{
    newestProducts: TProduct[];
    highestRatedProducts: TProduct[];
  }>({ highestRatedProducts: [], newestProducts: [] });

  async function getHomeProducts() {
    try {
      const [
        { databaseProducts: newestProducts },
        { databaseProducts: highestRatedProducts },
      ] = await Promise.all([
        getProducts([orderBy("createdAt", "desc"), limit(4)]),
        getProducts([orderBy("rating", "desc"), limit(4)]),
      ]);
      setProducts({ newestProducts, highestRatedProducts });
    } catch (error) {
      throw new Error(String(error));
    }
  }

  useEffect(() => {
    getHomeProducts().catch((error) => getErrorMessage(error));
  }, []);

  return (
    <div className="grid gap-8">
      <Hero
        content="Stylist picks beat the heat"
        route={{ path: "/produtos", label: "Ver Mais" }}
      />
      <Container className="grid gap-8 py-8">
        <section className="grid gap-12">
          <h2 className="text-center font-heading text-[2rem] font-bold uppercase">
            Novos Produtos
          </h2>
          <p className="text-center font-heading text-xl text-neutral-500">
            Veja os nossos mais novos produtos
          </p>
          <ProductDisplay products={products.newestProducts} />
        </section>
        <FeatureDisplay />
        <section className="grid gap-12">
          <h2 className="text-center font-heading text-[2rem] font-bold uppercase">
            Melhor Avaliados
          </h2>
          <p className="text-center font-heading text-xl text-neutral-500">
            Os melhores produtos da nossa loja
          </p>
          <ProductDisplay products={products.highestRatedProducts} />
        </section>
      </Container>
    </div>
  );
}

export default Home;
