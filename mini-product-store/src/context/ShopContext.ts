import { createContext } from "react";

export type ShopContextType = {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
};

export const ShopContext = createContext<ShopContextType | null>(null);