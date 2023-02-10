import Item from "../Item/Item.js";
import { SimpleGrid, Spinner, Text, Box } from "@chakra-ui/react";

const ItemList = ({ products, loading }) => {
  if (loading) {
    return (
      <Box m={10} textAlign={"center"}>
        <Spinner size="xl" />
        <Text colorScheme="black" fontSize="2xl">
          Cargando...
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {products.map((prod) => {
        return <Item key={prod.id} product={prod} />;
      })}
    </SimpleGrid>
  );
};

export default ItemList;
