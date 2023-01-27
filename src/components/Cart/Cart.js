import { CartContext } from "../../context/CartContext";
import CartWidget from "../CartWidget/CartWidget";
import { useContext, useState, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Button,
  Text,
  Container,
} from "@chakra-ui/react";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    let val = 0;
    cart.forEach((e) => {
      val += e.qty * e.price;
      setTotal(val);
    });
  };

  useEffect(() => {
    if (cart.length === 0) {
      setTotal(0);
    } else {
      getTotal();
    }
  }, [cart]);

  const handleNewPrice = ({ id, productAmount }) => {
    cart[cart.findIndex((p) => p.id === id)].qty = productAmount;
    getTotal();
  };
  return (
    <Box
      bg="white"
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
      boxShadow="md"
    >
      {cart.length ? (
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack
            borderColor="green.400"
            spacing={{ base: "8", md: "10" }}
            flex="2"
          >
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({cart.length}{" "}
              {cart.length === 1 ? "Item" : "Items"})
            </Heading>

            <Stack spacing="6">
              {cart.map((item) => (
                <CartItem
                  handleNewPrice={handleNewPrice}
                  key={item.id}
                  {...item}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary total={total} />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color={mode("blue.500", "blue.200")}>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      ) : (
        <Container maxW={"3xl"}>
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Tu carrito esta vacio <br />
              <Text as={"span"} color={"green.400"}>
                Empezemos a Comprar!
              </Text>
            </Heading>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <RouteLink to="/">
                <Button
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.200",
                  }}
                >
                  Ir a Comprar
                </Button>
              </RouteLink>
            </Stack>
          </Stack>
        </Container>
      )}
    </Box>
  );
};

export default Cart;
