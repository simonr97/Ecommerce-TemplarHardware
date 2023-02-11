import { CartContext } from "../../context/CartContext";
import { useContext, useState, useEffect } from "react";
import {
  Text,
  Button,
  Box,
  Container,
  Stack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import {
  query,
  collection,
  where,
  documentId,
  getDocs,
  writeBatch,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/Firebase/firebaseConfig";
import { AuthContext } from "../../context/AuthContext";
const Checkout = () => {
  const { cart, clear } = useContext(CartContext);
  const { getUserEmail } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const generarOrden = async () => {
    setLoading(true);
    try {
      const objOrder = {
        buyer: {
          email: getUserEmail(),
        },
        items: cart,
        total,
      };

      const batch = writeBatch(db);
      const ids = cart.map((prod) => prod.id);

      const productsRef = query(
        collection(db, "products"),
        where(documentId(), "in", ids)
      );

      const productsAddded = await getDocs(productsRef);
      const { docs } = productsAddded;
      const outOfStock = [];

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;
        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const prodQuantity = productAddedToCart.qty;
        if (stockDb >= prodQuantity) {
          console.log(doc.ref);
          batch.update(doc.ref, { stock: stockDb - prodQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });
      if (outOfStock.length === 0) {
        console.log("entro");
        await batch.commit();
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        const { id } = orderAdded;
        clear();
        setOrderId(id);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        console.error("No Stock");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        bg="white"
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
        boxShadow="md"
      >
        <Box m={10} textAlign={"center"}>
          <Spinner size="xl" />
          <Text colorScheme="black" fontSize="2xl">
            Cargando...
          </Text>
        </Box>
      </Box>
    );
  }
  if (orderId) {
    return (
      <Box
        bg="white"
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "6", md: "8", lg: "12" }}
        boxShadow="md"
      >
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
              Compra Realizada!
              <br />
              <Text as={"span"} color={"green.400"}>
                El ID de tu compra es {orderId}
              </Text>
            </Heading>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            ></Stack>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      maxW={{ base: "3xl", lg: "7xl" }}
      mx="auto"
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
      boxShadow="md"
    >
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
            Orden Generada
            <br />
            <Text as={"span"} color={"green.400"}>
              Haga click para confirmar la compra
            </Text>
          </Heading>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              onClick={generarOrden}
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.200",
              }}
            >
              Generar Orden
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Checkout;
