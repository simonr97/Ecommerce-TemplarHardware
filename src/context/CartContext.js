import { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    if (!isInCart(item.id)) {
      setCart((prev) => {
        return [...prev, item];
      });
    } else {
      cart[cart.findIndex((p) => p.id === item.id)].qty += item.qty;
    }
    console.log(cart);
  };

  const removeItem = (id) => {
    cart.splice(
      cart.findIndex((p) => p.id === id),
      1
    );
    console.log(cart);
  };

  const clear = () => {
    setCart([]);
    console.log(cart);
  };

  const isInCart = (id) => cart.some((product) => product.id === id);

  console.log(cart);

  return (
    <CartContext.Provider value={{ addItem, isInCart, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
};
