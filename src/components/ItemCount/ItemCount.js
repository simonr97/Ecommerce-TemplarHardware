import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Button, useColorModeValue, HStack, Text } from "@chakra-ui/react";

const ItemCount = ({ stock, onAdd, onBuy, id }) => {
  const [count, setCount] = useState(1);
  const [disableBuy, setDisableBuy] = useState(false);
  const { cart } = useContext(CartContext);
  let quantity = 0;
  if (cart[cart.findIndex((p) => p.id === id)]) {
    const { qty } = cart[cart.findIndex((p) => p.id === id)];
    quantity = qty;
    console.log(count, stock, id, cart, qty);
  }

  useEffect(() => {
    if (quantity + count > stock) {
      setDisableBuy(true);
    } else {
      setDisableBuy(false);
    }
  }, [count, stock, quantity]);

  return (
    <>
      <HStack align="center" justify="center">
        <Button
          bg="green.400"
          color="#1A202C"
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("green.300"),
            color: "black",
          }}
          onClick={() => setCount(count + 1)}
          disabled={(stock === count ? true : false) || disableBuy}
        >
          +
        </Button>
        <Text px={10}>{count}</Text>
        <Button
          bg="green.400"
          color="#1A202C"
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("green.300"),
            color: "black",
          }}
          onClick={() => setCount(count - 1)}
          disabled={count === 1 ? true : false}
        >
          -
        </Button>
      </HStack>

      <Button
        mt={1}
        bg="green.400"
        color="#1A202C"
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("green.300"),
          color: "black",
        }}
        disabled={disableBuy}
        onClick={() => onAdd(count)}
      >
        Agregar
      </Button>
    </>
  );
};

export default ItemCount;
