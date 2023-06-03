import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import ProductsFilter from "../components/ProductsFilter";

import { firestore } from "../firebase/firebaseConfig";
import getErrorMessage from "../utilities/get-error-message";
import { Product } from "../@types/product";
import { CategoriesContext } from "../loaders/CategoriesLoader";

function Products() {
  const { categories } = useLoaderData() as CategoriesContext;

  const [products, setProducts] = useState<Product[]>([]);
  const [startAfterDoc, setStartAfterDoc] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [isLastDoc, setIsLastDoc] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageSize = 8;

  const [filter, setFilter] = useState<string>("");
  const [subFilter, setSubFilter] = useState<string>("");

  const filteredProducts = products
    .filter((product) => {
      if (!filter || filter === "") return true;
      return product.categories.includes(filter);
    })
    .filter((product) => {
      if (!subFilter || subFilter.length === 0) return true;
      return product.subCategory === subFilter;
    });

  const getProducts = () => {
    getDocs(
      query(
        collection(firestore, "products"),
        orderBy("title", "asc"),
        limit(pageSize)
      )
    )
      .then((queryProducts) => {
        const lastDocument = queryProducts.docs[queryProducts.size - 1];
        const databaseProducts: Product[] = [];
        queryProducts.forEach((product) =>
          databaseProducts.push(product.data() as Product)
        );
        setProducts(databaseProducts);
        setStartAfterDoc(lastDocument);
        setLoading(false);
      })
      .catch((error) => getErrorMessage(error));
  };

  const loadMoreProducts = () => {
    getDocs(
      query(
        collection(firestore, "products"),
        orderBy("title", "asc"),
        limit(pageSize),
        startAfter(startAfterDoc)
      )
    )
      .then((doc) => {
        const lastDocument = doc.docs[doc.size - 1];
        const databaseProducts: Product[] = [];

        doc.forEach((item) => {
          if (!item.exists()) return;
          databaseProducts.push(item.data() as Product);
        });
        setProducts((previous) => [...previous, ...databaseProducts]);
        setStartAfterDoc(lastDocument);
        setIsLastDoc(doc.size < 1);
      })
      .catch((error) => getErrorMessage(error));
  };

  useEffect(() => {
    getProducts();
  }, []);
  return !loading ? (
    <div className="flex flex-col gap-2 p-2">
      <ProductsFilter
        categories={categories}
        filter={filter}
        setFilter={setFilter}
        subFilter={subFilter}
        setSubFilter={setSubFilter}
      />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
      {!isLastDoc && (
        <button
          onClick={loadMoreProducts}
          type="button"
          className="border border-slate-300 p-2 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Carregar mais produtos
        </button>
      )}
    </div>
  ) : (
    <p>Carregando</p>
  );
}

export default Products;
