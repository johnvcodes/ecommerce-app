import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/firebaseConfig";
import { Product } from "../@types/product";
import ProductCard from "../components/ProductCard";
import getErrorMessage from "../utilities/get-error-message";

function Home() {
  const [homeProducts, setHomeProducts] = useState<{
    newestProducts: Product[];
    highestRatedProducts: Product[];
  }>({
    newestProducts: [],
    highestRatedProducts: [],
  });
  const [loading, setLoading] = useState(true);

  const getHomeProducts = async () => {
    const databaseNewestProducts: Product[] = [];
    const databaseHighestRatedProducts: Product[] = [];

    const getNewestProductsPromise = getDocs(
      query(
        collection(firestore, "products"),
        orderBy("createdAt", "desc"),
        limit(8)
      )
    );
    const getHighestRatedProductsPromise = getDocs(
      query(
        collection(firestore, "products"),
        orderBy("rating", "desc"),
        limit(8)
      )
    );

    const [getNewestProducts, getHighestRatedProducts] = await Promise.all([
      getNewestProductsPromise,
      getHighestRatedProductsPromise,
    ]);

    getNewestProducts.forEach((newestProduct) => {
      if (!newestProduct.exists()) return;
      databaseNewestProducts.push(newestProduct.data() as Product);
    });
    getHighestRatedProducts.forEach((highestRatedProduct) => {
      if (!highestRatedProduct.exists()) return;
      databaseHighestRatedProducts.push(highestRatedProduct.data() as Product);
    });

    setHomeProducts({
      newestProducts: databaseNewestProducts,
      highestRatedProducts: databaseHighestRatedProducts,
    });
    setLoading(false);
  };

  useEffect(() => {
    getHomeProducts().catch((error) => getErrorMessage(error));
  }, []);
  return !loading ? (
    <div className="grid place-items-center p-2">
      <div className="grid gap-2">
        <div className="grid gap-2">
          <h2 className="bg-orange-200 p-2 font-medium uppercase text-slate-950">
            Mais novos
          </h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {homeProducts.newestProducts.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="bg-orange-200 p-2 font-medium uppercase text-slate-950">
            Melhor avaliados
          </h2>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {homeProducts.highestRatedProducts.map((product) => (
              <ProductCard key={product.uid} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Carregando</p>
  );
}

export default Home;
