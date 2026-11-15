import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

import "./component.css";

type ProductListProps = {
  products: Product[];
  favoriteIds : number [];
  toggleFavorite : (id: number) => void;
};

export function ProductList({ products, favoriteIds, toggleFavorite }: ProductListProps) {
  return (
    <div>
      <div className="productList">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} isChecked={favoriteIds.includes(product.id)} onToggle={toggleFavorite}  />
        ))}
      </div>
    </div>
  );
}
