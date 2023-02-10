import { useContext, useState } from "react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import {
  Collapse,
  Box,
  useColorModeValue,
  Card,
  Image,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Item = (productList) => {
  const [hover, setHover] = useState(false);

  const { id, name, price, category, img, stock, description } =
    productList.product;

  const { addItem } = useContext(CartContext);
  const { subscribeToAuth } = useContext(AuthContext);
  console.log(subscribeToAuth());

  const qty = 1;

  return (
    <RouteLink to={`/item/${id}`}>
      <Card
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        bg="White"
        maxW="sm"
        boxShadow={!hover ? "md" : "2xl"}
      >
        <CardBody>
          <Box align="center">
            <Image
              src={img}
              alt={category}
              borderRadius="lg"
              boxSize="200px"
              objectFit="scale-down"
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Heading isTruncated size="md">
              {name}
            </Heading>
            <Text noOfLines={3}>{stock >= 1 ? "En Stock" : "Sin Stock"}</Text>
            <Text colorScheme="black" fontSize="2xl">
              ${price}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Collapse in={hover} animateOpacity>
            <ButtonGroup spacing="2">
              <RouteLink to={"/cart"}>
                <Button
                  onClick={() => {
                    addItem({
                      id,
                      name,
                      price,
                      category,
                      img,
                      stock,
                      description,
                      qty,
                    });
                  }}
                  mt={1}
                  bg="green.400"
                  color="#1A202C"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("green.300"),
                    color: "black",
                  }}
                  disabled={!subscribeToAuth()}
                >
                  Comprar
                </Button>
              </RouteLink>
              <RouteLink to={useLocation().pathname}>
                <Button
                  onClick={() => {
                    addItem({
                      id,
                      name,
                      price,
                      category,
                      img,
                      stock,
                      description,
                      qty,
                    });
                  }}
                  variant="ghost"
                  colorScheme="black"
                >
                  Agregar al Carrito
                </Button>
              </RouteLink>
            </ButtonGroup>
          </Collapse>
        </CardFooter>
      </Card>
    </RouteLink>
  );
};

export default Item;
