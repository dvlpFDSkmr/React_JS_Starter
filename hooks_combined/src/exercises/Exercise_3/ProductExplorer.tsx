import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./product.css";
import ProductCard from "./ProductCard";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export function ProductExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [retry, setRetry] = useState<number>(0);
  const [cartItemIds, setCartItemIds] = useState<number[]>([]);
  const [serachItem, setSearchItem] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [sortProd, setSortProd] = useState<string>("all");
  const [ratinngSort, setRatingSort] = useState<boolean>(false);

  const filteredProducts: Product[] = useMemo(() => {
    const filterOne = products.filter((product) => {
      const searchFilter: boolean = product.title.toLowerCase().includes(serachItem.trim().toLowerCase());
      const categoryFilter: boolean = category === "all" ? true : product.category === category;

      return searchFilter && categoryFilter;
    });

    return [...filterOne].sort((a, b) => {
      if (sortProd === "lowHigh") return a.price - b.price;
      if (sortProd === "highLow") return b.price - a.price;
      if (ratinngSort === true) return b.rating - a.rating;
      return 0;
    });
  }, [products, serachItem, category, sortProd, ratinngSort]);

  const handleCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const id = Number(e.currentTarget.value);
      if (cartItemIds.includes(id)) {
        return;
      }
      setCartItemIds((prev) => [...prev, id]);
    },
    [cartItemIds],
  );

  useEffect(() => {
    async function getProductsData() {
      setLoading(true);
      setError(false);
      try {
        const apiResponse = await fetch(`https://dummyjson.com/products`);
        const data = await apiResponse.json();

        if (!apiResponse.ok) {
          setLoading(false);
          setError(true);
        }

        setProducts(data.products);
        setLoading(false);
      } catch {
        setError(true);
        throw new Error(`ERROR OCCURED`);
      }
    }

    getProductsData();
  }, [retry]);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    return (
      <div>
        <h1>Error check your connection....</h1>
        <button onClick={() => setRetry((s) => s + 1)}>Retry : {retry}</button>
      </div>
    );
  }

  return (
    <div className="productPage">
      <h1>Products Explorer</h1>
      <h4>Total Products available : {products.length === 0 ? "No products" : products.length}</h4>

      <div className="filters">
        <input
          type="text"
          value={serachItem}
          placeholder="...serach products"
          onChange={(e) => setSearchItem(e.target.value)}
        />

        <select name="find_category" onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
        </select>

        <select name="sort_products" onChange={(e) => setSortProd(e.target.value)}>
          <option value="all">Default</option>
          <option value="lowHigh">Price Low to High</option>
          <option value="highLow">Price High to Low</option>
        </select>

        <button
          style={ratinngSort ? { backgroundColor: "red" } : { backgroundColor: "blue" }}
          onClick={() => setRatingSort(!ratinngSort)}>
          Rating
        </button>

        <h1>Cart : {cartItemIds.length}</h1>
      </div>
      <ProductCard products={filteredProducts} cartItemIds={cartItemIds} handleCart={handleCart} />
    </div>
  );
}
