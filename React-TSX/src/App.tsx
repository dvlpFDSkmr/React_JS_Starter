import { useEffect, useState } from "react"; // useContext import kiya
import type { Product } from "./assets/types/types";
import "./App.css";
import { Navbar } from "./assets/components/Navbar";

import { ProductList } from "./assets/components/ProductList";
import { Cart } from "./assets/components/Cart";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [retry, setRetry] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);

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
      <Navbar onCartClick={() => setShowCart(!showCart)} />
      {showCart ? <Cart /> : <></>}
      <ProductList products={products} />
    </div>
  );
}

export default App;
