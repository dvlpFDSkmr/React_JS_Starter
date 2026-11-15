import type { Product } from "../types/product";
import "./component.css";

type FavoritesProps = {
  favoriteProducts: Product[];
};

export function Favorites({ favoriteProducts }: FavoritesProps) {
  if (favoriteProducts.length === 0) {
    return <p>No favourites yet.</p>; // Empty state
  }

  return (
    <div className="favourites">
      {favoriteProducts.map((product) => (
        <div key={product.id} className="favorite-item">
          <span>{product.title}</span> - <span>${product.price}</span>
        </div>
      ))}
    </div>
  );
}
