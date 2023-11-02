import { TProduct } from "../@types/product";
import ProductCard from "@components/ProductCard";

type Props = {
  products: TProduct[];
};

function ProductDisplay({ products }: Props) {
  return (
    <div className="grid auto-rows-fr grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.uid} product={product} />
      ))}
    </div>
  );
}

export default ProductDisplay;
