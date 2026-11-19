import { useContext } from "react";
import type { Product } from "../types/types";
import "./components.css";
import { CartContext } from "../context/Context";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const cartCTX = useContext(CartContext);
  if (!cartCTX) {
    throw new Error("ProductCard must be used inside CartProvider");
  }
  const { addToCart } = cartCTX;
  const { title, price, category, thumbnail } = product;
  return (
    <div className="productCard">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p style={{ textTransform: "capitalize", color: "#888" }}>{category}</p>
      <p className="price">${price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
