import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail.js";
import { Spinner, Box, Text } from "@chakra-ui/react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/Firebase/firebaseConfig";

const ItemDetailContainer = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const { productId } = useParams();
  console.log(productId);

  useEffect(() => {
    const docRef = doc(db, "products", productId);

    getDoc(docRef)
      .then((response) => {
        const data = response.data();
        const productAdapted = { id: response.id, ...data };
        console.log(productAdapted);
        setProducts(productAdapted);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  console.log();

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

  return <ItemDetail product={products} />;
};

export default ItemDetailContainer;
