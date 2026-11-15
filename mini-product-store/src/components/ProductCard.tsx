import React from "react";
import type { Product } from "../types/product";
import "./component.css";

type ProductCardProps = {
  product: Product;
  isChecked?: boolean;
  onToggle?: (id: number) => void;
};

export const ProductCard = React.memo(function ({ product, isChecked, onToggle }: ProductCardProps) {
  const { id, title, description, price, category, thumbnail } = product;
  console.log(`Card rendered`, product.id);
  return (
    <div className="productCard">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{isChecked ? "❤️" : "🤍"}</span>
        <input type="checkbox" checked={isChecked} onChange={() => onToggle?.(id)} />
      </div>
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p style={{ textTransform: "capitalize", color: "#888" }}>{category}</p>
      <p className="price">${price}</p>
      <p>{description}</p>
    </div>
  );
});
