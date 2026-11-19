import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";
import type { User } from "../types/types";

interface FavoritesContextType {
  favorites: User[];
  addFavorite: (user: User) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<User[]>([]);

  const addFavorite = useCallback((user: User) => {
    setFavorites((prev) => {
      if (prev.some((u) => u.id === user.id)) return prev;
      return [...prev, user];
    });
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((u) => u.id === id),
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}