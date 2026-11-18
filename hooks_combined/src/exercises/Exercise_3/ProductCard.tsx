import type React from "react";
import type { Product } from "./ProductExplorer";
import { memo } from "react";

type ProductCardProps = {
  products: Product[];
  cartItemIds: number[];
  handleCart: (e:React.MouseEvent<HTMLButtonElement>) => void;
};

 function ProductCard ({ products, cartItemIds, handleCart }: ProductCardProps) {
  return (
    <div className="productExplorer">
      {products.map((product) => {
        const isInCart = cartItemIds.includes(product.id);

        return (
          <div className="productcard" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h4>{product.title}</h4>
            <p>{product.brand}</p>
            <p>
              <b>{product.category}</b>
            </p>
            <p>
              <i>{product.price}$</i>
            </p>
            <p>{product.description}</p>
            <p>{product.rating} stars</p>

            <button
              value={product.id}
              onClick={handleCart}
              disabled={isInCart}
              style={isInCart ? { backgroundColor: "green" } : { backgroundColor: "blue" }}>
              {isInCart ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ProductCard)
