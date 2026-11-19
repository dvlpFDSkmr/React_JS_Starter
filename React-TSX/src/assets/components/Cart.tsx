import { useContext } from "react";
import { CartContext } from "../context/Context";
import "./components.css";

export function Cart() {
  const cartCTX = useContext(CartContext);
  if (!cartCTX) {
    throw new Error("Cart must be used inside CartProvider");
  }

  const { cart, removeFromCart, getCartTotal } = cartCTX;

  // early return instead of an if inside JSX
  if (cart.length === 0) {
    return <h2 className="cartEmpty">Your cart is empty</h2>;
  }

  return (
    <div className="cart">
      <h1>Cart</h1>

      {cart.map((item) => (
        <div className="cartItem" key={item.id}>
          <img src={item.thumbnail} alt={item.title} />
          <div className="cartInfo">
            <h3>{item.title}</h3>
            <p>
              ${item.price} x {item.quantity}
            </p>
          </div>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h2 className="cartTotal">Total: ${getCartTotal().toFixed(2)}</h2>
    </div>
  );
}
