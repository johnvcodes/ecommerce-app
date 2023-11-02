import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  QueryDocumentSnapshot,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { ChevronRight } from "lucide-react";

import { TProduct } from "../@types/product";
import Button from "../components/Button";
import ProductDisplay from "../components/ProductDisplay";
import ProductsOptions from "../components/ProductsOptions";
import Spinner from "../components/Spinner";
import { getProducts } from "../libs/firebase/firestore/products";
import Container from "@/components/Container";

type SortParam = "maior-preço" | "menor-preço" | "novo" | "melhor-avaliados";

const sortOptions = [
  { label: "Maior Preço", value: "maior-preço" },
  { label: "Menor Preço", value: "menor-preço" },
  { label: "Mais Novos", value: "novo" },
  { label: "Melhor Avaliados", value: "melhor-avaliados" },
];

function Products() {
  const [params] = useSearchParams();

  const sortParam = params.get("ordem") as SortParam;

  const [products, setProducts] = useState<TProduct[]>([]);

  const [startAfterDoc, setStartAfterDoc] =
    useState<QueryDocumentSnapshot<TProduct>>();

  const [isLastDoc, setIsLastDoc] = useState(false);

  const [loading, setLoading] = useState(true);

  const [loadingMoreProducts, setLoadingMoreProducts] =
    useState<boolean>(false);

  function sortProducts(products: TProduct[]) {
    switch (sortParam) {
      case "novo":
        return products.sort(
          (a, b) =>
            b.createdAt.toDate().valueOf() - a.createdAt.toDate().valueOf(),
        );

      case "menor-preço":
        return products.sort((a, b) => a.price - b.price);

      case "maior-preço":
        return products.sort((a, b) => b.price - a.price);

      case "melhor-avaliados":
        return products.sort((a, b) => b.rating - a.rating);

      default:
        return products.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  function filterProducts(products: TProduct[]) {
    const categoryParam = params.getAll("categoria");

    const subcategoryParam = params.getAll("subcategoria");

    const filtered = products
      .filter((product) => {
        if (!categoryParam || categoryParam.length === 0) return products;
        return product.categories.some((category) =>
          categoryParam.includes(category.value),
        );
      })
      .filter((product) => {
        if (!subcategoryParam || subcategoryParam.length === 0) return true;
        return subcategoryParam.includes(product.subcategory.value);
      });

    return filtered;
  }

  const finalProducts = filterProducts(sortProducts(products));

  const pageSize = 8;

  async function getAllProducts() {
    try {
      const { databaseProducts, lastDocument } = await getProducts([
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
        await getProducts([
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
    <Container className="flex min-h-[calc(100vh_-_3.5rem)] flex-col gap-4 py-8 md:flex-row">
      <ProductsOptions sortOptions={sortOptions} />
      <div className="flex flex-col items-center gap-4">
        {!finalProducts || finalProducts.length === 0 ? (
          <p>Nenhum produto encontrado</p>
        ) : (
          <ProductDisplay products={finalProducts} />
        )}
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
    </Container>
  ) : (
    <p>Carregando</p>
  );
}

export default Products;
