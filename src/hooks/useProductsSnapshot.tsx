import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseConfig";
import { Product } from "../@types/product";

const useProductsSnapshot = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "products"),
      (snapshot) => {
        const snapshotProducts: Product[] = [];
        snapshot.forEach((snapshotProduct) => {
          if (!snapshotProduct.exists()) return;
          snapshotProducts.push(snapshotProduct.data() as Product);
        });
        setProducts(snapshotProducts);
      },
      (error) => console.log(error)
    );
    return () => unsubscribe();
  }, []);

  return products;
};

export default useProductsSnapshot;
