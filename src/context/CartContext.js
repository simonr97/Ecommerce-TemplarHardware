import { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  let count = 0;

  const addItem = (item) => {
    if (!isInCart(item.id)) {
      setCart((prev) => {
        return [...prev, item];
      });
    } else {
      cart[cart.findIndex((p) => p.id === item.id)].qty += item.qty;
    }
  };

  const removeItem = (id) => {
    let duplicatedCart = [...cart];
    duplicatedCart.splice(
      duplicatedCart.findIndex((p) => p.id === id),
      1
    );
    setCart(duplicatedCart);
    count = cart.length - 1;
  };

  const clear = () => {
    setCart([]);
    count = 0;
  };

  const isInCart = (id) => cart.some((product) => product.id === id);

  count = cart.length;

  return (
    <CartContext.Provider
      value={{ addItem, isInCart, removeItem, clear, count, cart }}
    >
      {children}
    </CartContext.Provider>
  );
};
