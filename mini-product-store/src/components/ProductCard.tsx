import React, { useContext } from "react";
import type { Product } from "../types/product";
import { ShopContext } from "../context/ShopContext";
import "./component.css";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = React.memo(function ({ product }: ProductCardProps) {
  const { favoriteIds, toggleFavorite } = useContext(ShopContext)!;
  const { id, title, price, category, thumbnail } = product;
  
  const isChecked = favoriteIds.includes(id);

  console.log(`Card rendered`, product.id);

  return (
    <div className="productCard">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{isChecked ? "❤️" : "🤍"}</span>
        <input type="checkbox" checked={isChecked} onChange={() => toggleFavorite(id)} />
      </div>
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p style={{ textTransform: "capitalize", color: "#888" }}>{category}</p>
      <p className="price">${price}</p>
    </div>
  );
});