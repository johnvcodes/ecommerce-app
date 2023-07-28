import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { limit, orderBy } from "firebase/firestore";
import { TProduct } from "../@types/product";
import { firestore } from "../firebase/config";
import { getProducts } from "../firebase/firestore/products";
import getErrorMessage from "../utilities/get-error-message";
import ProductCard from "../components/Product/ProductCard";
import Divider from "../components/Divider";

function Home() {
  const [homeProducts, setHomeProducts] = useState<{
    newestProducts: TProduct[];
    highestRatedProducts: TProduct[];
  }>({
    newestProducts: [],
    highestRatedProducts: [],
  });

  const [loading, setLoading] = useState(true);

  async function getHomeProducts() {
    try {
      const [
        { databaseProducts: newestProducts },
        { databaseProducts: highestRatedProducts },
      ] = await Promise.all([
        getProducts(firestore, [orderBy("createdAt", "desc"), limit(4)]),
        getProducts(firestore, [orderBy("rating", "desc"), limit(4)]),
      ]);
      setHomeProducts({ newestProducts, highestRatedProducts });
    } catch (error) {
      throw new Error(String(error));
    }
    setLoading(false);
  }

  useEffect(() => {
    getHomeProducts().catch((error) => getErrorMessage(error));
  }, []);

  return !loading ? (
    <div className="container mx-auto flex items-center justify-center p-4">
      <div className="grid gap-4">
        <div className="grid gap-4">
          <h2 className="uppercase">Mais novos</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {homeProducts.newestProducts.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
          <Link
            to="/products?sort=new"
            className="flex w-fit items-center gap-2 self-center rounded bg-blue-500 px-4 py-2 text-neutral-50 shadow outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 hover:bg-blue-600 focus:outline-blue-300 dark:focus:outline-blue-900"
          >
            Ver mais
          </Link>
          <Divider />
        </div>
        <div className="grid gap-4">
          <h2 className="uppercase">Melhor avaliados</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {homeProducts.highestRatedProducts.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
          <Link
            to="/products?sort=rating"
            className="flex w-fit items-center gap-2 self-center rounded bg-blue-500 px-4 py-2 text-neutral-50 shadow outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 hover:bg-blue-600 focus:outline-blue-300 dark:focus:outline-blue-900"
          >
            Ver mais
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <p>Carregando</p>
  );
}

export default Home;
