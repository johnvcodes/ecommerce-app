/* eslint-disable react/jsx-no-bind */
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TProduct } from "@/@types/product";
import numberToCurrency from "@utils/number-to-currency";
import Button from "@components/common/Button";
import Container from "@components/common/Container";
import ProductCarousel from "@components/ProductCarousel";
import Rating from "@components/Rating";
import { useAppDispatch } from "@libs/store/store";
import { getProduct } from "@libs/firebase/firestore/products";
import { addToCart } from "@libs/store/cartSlice";

function SingleProduct() {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<TProduct | null>(null);

  const [selectedSize, setSelectedSize] = useState<string>("");

  const [productError, setProductError] = useState("");

  const getSingleProduct = useCallback(async () => {
    if (!id) return;
    try {
      const databaseProduct = await getProduct(id);
      setProduct(databaseProduct);
    } catch (error) {
      throw new Error(String(error));
    }
  }, [id]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedSize(event.target.value);
    setProductError("");
  }

  function handleAddToCart() {
    if (!product) return;
    const selected = product.sizes.find((size) => size.uid === selectedSize);
    if (!selected) {
      setProductError("Selecione um tamanho");
    } else {
      toast(`Produto adicionado ao carrinho`, { type: "success" });
      dispatch(addToCart({ ...product, selectedSize: selected }));
    }
  }

  useEffect(() => {
    getSingleProduct().catch((error) => {
      throw new Error(String(error));
    });
  }, [getSingleProduct]);

  return (
    product && (
      <Container>
        <main className="grid gap-4 py-8 md:grid-cols-2">
          <ProductCarousel images={product.images} />
          <div className="flex flex-col gap-6 md:gap-12">
            {productError && <p>Escolha um tamanho</p>}
            <div className="grid gap-3">
              <h1 className="font-heading text-2xl font-black uppercase">
                {product.title}
              </h1>
              <div className="flex items-center justify-between">
                <Rating rating={product.rating} />
                <span className="text-sm text-neutral-500">
                  Em estoque: {product.stock}
                </span>
              </div>
              <span className="font-heading text-2xl text-primary">
                {numberToCurrency(product.price)}
              </span>
            </div>
            <p className="text-neutral-700">{product.description}</p>
            <div>
              <p className="text-neutral-700">
                Categoria(s):{" "}
                {product.categories
                  .map((category) => category.label)
                  .join(", ")}
              </p>
              <p className="text-neutral-700">
                Subcategoria: {product.subcategory.label}
              </p>
            </div>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <div key={size.uid}>
                  <input
                    onChange={handleChange}
                    type="radio"
                    id={size.uid}
                    value={size.uid}
                    name="pick-size"
                    className="peer hidden"
                  />
                  <Button
                    component="label"
                    htmlFor={size.uid}
                    variant="secondary"
                    size="small"
                    className="border border-neutral-950 text-neutral-950 peer-checked:bg-neutral-950 peer-checked:text-neutral-50"
                  >
                    {size.label}
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={() => handleAddToCart()}
              type="button"
              className="w-fit"
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </main>
      </Container>
    )
  );
}

export default SingleProduct;
