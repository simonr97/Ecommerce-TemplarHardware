import {
  CloseButton,
  Flex,
  Link,
  InputGroup,
  SelectProps,
  InputLeftElement,
  NumberInput,
  InputRightElement,
  Button,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useState, useContext, useEffect } from "react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { CartContext } from "../../context/CartContext";
import { MdLocalShipping } from "react-icons/md";

export const CartItem = (props) => {
  const { addItem, isInCart, removeItem, clear } = useContext(CartContext);
  const {
    id,
    name,
    qty,
    img,
    currency,
    price,
    onClickDelete,
    stock,
    handleNewPrice,
  } = props;
  const [lastPrice, setLastPrice] = useState(price * qty);
  const [productAmount, setProductAmount] = useState(qty);
  useEffect(() => {});
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={name} image={img} />
      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <NumberInput
          size="md"
          onChange={(e) => setProductAmount(parseInt(e, 10))}
          maxW={24}
          defaultValue={qty}
          min={1}
          max={stock}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() => {
                setLastPrice(() => price * productAmount);
                handleNewPrice({ id, price, productAmount });
              }}
            />
            <NumberDecrementStepper
              onClick={() => {
                1 === productAmount
                  ? setLastPrice(price)
                  : setLastPrice((prev) => prev - price);
                handleNewPrice({ id, lastPrice, productAmount });
              }}
            />
          </NumberInputStepper>
        </NumberInput>
        <PriceTag price={lastPrice} currency={currency} />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            removeItem(id);
          }}
        />
      </Flex>
      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <NumberInput size="md" maxW={24} defaultValue={qty} min={1} max={stock}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper
              onChange={() => setLastPrice((prev) => prev + price)}
            />
            <NumberDecrementStepper
              onChange={() => setLastPrice((prev) => prev - price)}
            />
          </NumberInputStepper>
        </NumberInput>
        <PriceTag price={lastPrice} currency={currency} />
      </Flex>
    </Flex>
  );
};
