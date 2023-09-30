import { useEffect, useState } from "react";
import { limit, orderBy } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { getProducts } from "../firebase/firestore/products";
import { TProduct } from "../@types/product";
import getErrorMessage from "../utilities/get-error-message";
import Hero from "../components/Hero";
import ProductDisplay from "../components/ProductDisplay";
import FeatureDisplay from "../components/FeatureDisplay";

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
        getProducts(firestore, [orderBy("createdAt", "desc"), limit(4)]),
        getProducts(firestore, [orderBy("rating", "desc"), limit(4)]),
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
      <Hero />
      <ProductDisplay
        title="Mais novos"
        description="Veja nossos produtos mais novos"
        products={products.newestProducts}
      />
      <FeatureDisplay />
      <ProductDisplay
        title="Mais vendidos"
        description="Os produtos mais vendidos da loja"
        products={products.highestRatedProducts}
      />
    </div>
  );
}

export default Home;
