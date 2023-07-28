import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { useAppSelector } from "../store/store";
import { firestore } from "../firebase/config";
import { getProducts } from "../firebase/firestore/products";
import { TProduct } from "../@types/product";
import ProductCard from "../components/Product/ProductCard";
import ProductsFilter from "../components/Product/ProductsFilter";
import Spinner from "../components/Spinner";

function Products() {
  const [params] = useSearchParams();
  const sortOptions = params.get("sort");

  const { filter, subFilter } = useAppSelector((state) => state.filterReducer);

  const [products, setProducts] = useState<TProduct[]>([]);

  const [startAfterDoc, setStartAfterDoc] =
    useState<QueryDocumentSnapshot<TProduct>>();

  const [isLastDoc, setIsLastDoc] = useState(false);

  const [loading, setLoading] = useState(true);

  const [loadingMoreProducts, setLoadingMoreProducts] =
    useState<boolean>(false);

  function sortProducts(): TProduct[] {
    if (sortOptions) {
      if (sortOptions === "new") {
        return products.sort(
          (productA, productB) =>
            productB.createdAt.toDate().valueOf() -
            productA.createdAt.toDate().valueOf()
        );
      }

      if (sortOptions === "rating") {
        return products.sort(
          (productA, productB) => productB.rating - productA.rating
        );
      }
    }

    return products;
  }

  const filteredProducts = sortProducts()
    .filter((product) => {
      if (!filter) return true;
      return product.categories.some((category) => category.uid === filter);
    })
    .filter((product) => {
      if (!subFilter) return true;
      return product.subcategory.uid === subFilter;
    });

  const pageSize = 8;

  async function getAllProducts() {
    try {
      const { databaseProducts, lastDocument } = await getProducts(firestore, [
        orderBy("title", "asc"),
        limit(pageSize),
      ]);

      setProducts(databaseProducts);
      setStartAfterDoc(lastDocument);
    } catch (error) {
      throw new Error(String(error));
    }

    setLoading(false);
  }

  async function loadMoreProducts() {
    setLoadingMoreProducts(true);
    try {
      const { databaseProducts, lastDocument, isLastDocument } =
        await getProducts(firestore, [
          limit(pageSize),
          startAfter(startAfterDoc),
        ]);

      setProducts((previous) => [...previous, ...databaseProducts]);
      setStartAfterDoc(lastDocument);
      setIsLastDoc(isLastDocument);
    } catch (error) {
      throw new Error(String(error));
    }
    setLoadingMoreProducts(false);
  }

  useEffect(() => {
    getAllProducts().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return !loading ? (
    <div className="container mx-auto flex grow flex-col gap-2 p-2">
      <ProductsFilter />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
      {!isLastDoc && (
        <button
          onClick={loadMoreProducts}
          type="button"
          className="flex items-center self-center rounded bg-blue-500 px-4 py-2 text-neutral-50 shadow outline outline-2 outline-offset-0 outline-transparent transition-all duration-300 hover:bg-blue-600 focus:outline-blue-300 dark:focus:outline-blue-900"
        >
          {loadingMoreProducts ? <Spinner /> : "Carregar mais produtos"}
        </button>
      )}
    </div>
  ) : (
    <p>Carregando</p>
  );
}

export default Products;
