import { useEffect, useState, useRef, useMemo, useContext } from "react"; // useContext import kiya
import type { Product } from "./types/product";
import "./App.css";
import { ProductList } from "./components/ProductList";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { SortDropdown } from "./components/SortDropdown";
import { Favorites } from "./components/Favorites";
import { ShopContext } from "./context/ShopContext"; // Context import kiya

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [retry, setRetry] = useState<number>(0);
  const listTopRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [serachItem, setSerachItem] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("");

  // Context se favoriteIds nikala
  const { favoriteIds } = useContext(ShopContext)!;

  const sortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const searchFilter = product.title.toLowerCase().includes(serachItem.toLowerCase().trim());
      const categoryFilter = category === "all" || product.category === category;
      return searchFilter && categoryFilter;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "lowHigh") return a.price - b.price;
      if (sortOrder === "highLow") return b.price - a.price;
      return 0;
    });
  }, [products, serachItem, category, sortOrder]);

  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favoriteIds.includes(p.id));
  }, [products, favoriteIds]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setIsError(false);
      try {
        const apiResponse = await fetch(`https://dummyjson.com/products`);
        const data = await apiResponse.json();
        if (!apiResponse.ok) {
          setIsError(true);
          throw new Error(`Not able to fetch`);
        }
        setIsLoading(false);
        setIsError(false);
        setProducts(data.products);
      } catch {
        setIsLoading(false);
        setIsError(true);
      }
    }
    loadProducts();
  }, [retry]);

  if (isLoading) return <h1>Loading.....</h1>;

  if (isError) {
    return (
      <div>
        <h1>Error... </h1>
        <button onClick={() => setRetry((prev) => prev + 1)}>Retry</button>
      </div>
    );
  }

  return (
    <div className="appContainer">
      <h1 ref={listTopRef}>Product List</h1>

      <div className="mainContent">
        <div className="leftSide">
          <SearchBar searchItem={serachItem} inputRef={searchInputRef} onSearchChange={setSerachItem} />
          <button onClick={() => searchInputRef.current?.focus()}>Focus</button>
          <CategoryFilter selectedCategory={category} onButtonToggle={setCategory} />
          <SortDropdown onDropdownSelect={setSortOrder} />
          
          {sortedProducts.length === 0 ? (
            <h3>No products...</h3>
          ) : (
            // Yahan se extra props hata diye
            <ProductList products={sortedProducts} />
          )}
        </div>

        <div className="rightSide">
          <Favorites favoriteProducts={favoriteProducts} />
        </div>
      </div>

      <button onClick={() => listTopRef.current?.scrollIntoView({ behavior: "smooth" })}>Back to Top</button>
    </div>
  );
}

export default App;