import { useEffect, useContext, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
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
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";

const Item = (productList) => {
  const [hover, setHover] = useState(false);

  const { id, name, price, category, img, stock, description } =
    productList.product;

  const { addItem, isInCart } = useContext(CartContext);

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
            {/* <Text noOfLines={3}>
        {description}
      </Text> */}
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
                    addItem({ id, price, qty });
                  }}
                  mt={1}
                  bg="green.400"
                  color="#1A202C"
                  _hover={{
                    textDecoration: "none",
                    bg: useColorModeValue("green.300"),
                    color: "black",
                  }}
                >
                  Comprar
                </Button>
              </RouteLink>
              <RouteLink to={"/"}>
                <Button
                  onClick={() => {
                    addItem({ id, price, qty });
                  }}
                  variant="ghost"
                  colorScheme="black"
                >
                  Agregar al carrito
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
