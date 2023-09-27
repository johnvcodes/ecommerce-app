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
import { ChevronRight } from "lucide-react";
import Spinner from "../components/Spinner";
import ProductDisplay from "../components/ProductDisplay";
import Button from "../components/Button";
import ProductsHeader from "../components/ProductsHeader";

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
            productA.createdAt.toDate().valueOf(),
        );
      }

      if (sortOptions === "rating") {
        return products.sort(
          (productA, productB) => productB.rating - productA.rating,
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
          orderBy("title", "asc"),
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
    <div className="flex flex-col items-center gap-4 py-4">
      <ProductsHeader />
      <ProductDisplay products={filteredProducts} />
      {!isLastDoc && (
        <Button
          onClick={loadMoreProducts}
          type="button"
          size="small"
          endIcon={<ChevronRight size={20} strokeWidth={1.5} />}
        >
          {loadingMoreProducts ? <Spinner /> : "Carregar mais produtos"}
        </Button>
      )}
    </div>
  ) : (
    <p>Carregando</p>
  );
}

export default Products;
