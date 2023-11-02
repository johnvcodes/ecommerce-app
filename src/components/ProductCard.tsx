import { Link } from "react-router-dom";
import { TProduct } from "../@types/product";

type Props = {
  product: TProduct;
};

function ProductCard({ product }: Props) {
  return (
    <Link to={`/produtos/${product.uid}`} className="flex flex-col gap-2">
      <img src={product.images[0]} alt="" className="" />
      <h3 className="text-center  font-extrabold">{product.title}</h3>
      <p className="text-center text-primary">
        {Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(product.price)}
      </p>
    </Link>
  );
}

export default ProductCard;
