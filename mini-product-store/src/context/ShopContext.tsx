import React, { useCallback, useState } from "react";
import { ShopContext } from "./ShopContext"; 

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((ele) => ele !== id) : [...prev, id]));
  }, []);

  return (
    <ShopContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </ShopContext.Provider>
  );
}