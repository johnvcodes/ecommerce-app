import { Link } from "react-router-dom";
import { Product } from "../@types/product";
import ProductRating from "./ProductRating";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.uid}`}
      className="flex  flex-col overflow-hidden border border-slate-300 bg-slate-50 shadow-sm transition-colors duration-300 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 md:w-full"
    >
      <div className="relative grid items-center">
        <img
          src={product.images[0]}
          alt={product.description}
          className="aspect-[8_/_12] h-full grow object-cover"
        />
      </div>
      <div className="flex grow flex-col p-2">
        <h2 className="grow font-medium uppercase">{product.title}</h2>
        <ProductRating rating={product.rating} />
        <span className="justify-self-end text-emerald-500">
          R$ {product.price},00
        </span>
        <span className="opacity-50">Em estoque: {product.stock}</span>
      </div>
    </Link>
  );
}

export default ProductCard;
