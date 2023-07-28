import { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import { getProducts } from "../../firebase/firestore/products";
import { TProduct } from "../../@types/product";

function AdminAllProducts() {
  const [products, setProducts] = useState<TProduct[]>([]);

  async function getAllProducts() {
    const { databaseProducts } = await getProducts(firestore);
    setProducts(databaseProducts);
  }

  useEffect(() => {
    getAllProducts().catch((error) => {
      throw new Error(String(error));
    });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.uid} className="flex gap-2">
          <img src={product.images[0]} alt="" className="h-40" />
          <div>
            <h2>Título</h2>
            <span>{product.title}</span>
          </div>
          <div>
            <h2>UID</h2>
            <span>{product.uid}</span>
          </div>
          <div>
            <h2>Avaliações</h2>
            <span>{product.rating}</span>
          </div>
          <div>
            <h2>Preço</h2>
            <span>{product.price}</span>
          </div>
          <div>
            <h2>Em estoque</h2>
            <span>{product.stock}</span>
          </div>
          <div>
            <h2>Categorias</h2>
            {product.categories.map((category) => (
              <span key={category.uid}>{category.title}</span>
            ))}
          </div>
          <div>
            <h2>Subcategoria</h2>
            <span>{product.subcategory.title}</span>
          </div>
          <div>
            <h2>Tamanhos</h2>
            {product.sizes.map((size) => (
              <span key={size.uid}>{size.label}, </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminAllProducts;
