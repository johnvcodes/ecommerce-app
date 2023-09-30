import { TProduct } from "../@types/product";
import ProductCard from "./ProductCard";

type Props = {
  title?: string;
  description?: string;
  products: TProduct[];
};

function ProductDisplay({ title, description, products }: Props) {
  return (
    <section className="container mx-auto grid gap-4 px-4 md:px-0">
      {title && (
        <h2 className="text-center text-2xl uppercase leading-normal">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-center text-xl leading-normal text-neutral-500">
          {description}
        </p>
      )}
      <div className="grid auto-rows-fr grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductDisplay;
