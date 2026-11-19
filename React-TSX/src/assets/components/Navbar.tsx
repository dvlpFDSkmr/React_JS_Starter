import React, { useContext } from "react";
import { CartContext } from "../context/Context";

type NavbarProps = {
    onCartClick : (e: React.MouseEvent<HTMLButtonElement>)=>void
}

export function Navbar({onCartClick}: NavbarProps) {
  const cartCTX = useContext(CartContext);
  if (!cartCTX) {
    throw new Error("ProductCard must be used inside CartProvider");
  }

  const { getCartCount } = cartCTX;
  return (
    <div className="Navbar">
      <nav>
        <h1>My Store</h1>
        <button>Cart : {getCartCount()}</button>
        <button onClick={onCartClick}>Show Cart</button>
      </nav>
    </div>
  );
}
