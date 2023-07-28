import { Link } from "react-router-dom";
import { TProduct } from "../../@types/product";
import ProductRating from "./ProductRating";

type Props = {
  product: TProduct;
};

function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.uid}`}
      className="flex flex-col rounded border border-neutral-300 bg-neutral-50 shadow-sm outline outline-2 outline-offset-0 outline-transparent transition-colors duration-300 hover:bg-neutral-300 focus:bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
    >
      <img
        src={product.images[0]}
        alt={product.description}
        className="rounded-t"
        loading="lazy"
      />
      <div className="flex grow flex-col p-2">
        <h2 className="font-bold uppercase">{product.title}</h2>
        <ProductRating rating={product.rating} />
        <span className="text-blue-500">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </span>
        <span className="opacity-50">Em estoque: {product.stock}</span>
      </div>
    </Link>
  );
}

export default ProductCard;
