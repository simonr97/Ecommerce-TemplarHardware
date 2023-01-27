import { React } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Head from "next/head";
import ItemList from "../ItemList/ItemList.js";
import { Box, Heading, Container, Text, Stack } from "@chakra-ui/react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/Firebase/firebaseConfig";

const ItemListContainer = ({ welcomeText1, welcomeText2 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const collectionRef = categoryId
      ? query(collection(db, "products"), where("category", "==", categoryId))
      : collection(db, "products");

    getDocs(collectionRef)
      .then((response) => {
        const productsAdapted = response.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(productsAdapted);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container maxW={"8xl"}>
        <Stack as={Box} textAlign={"center"} py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            {welcomeText1}
            <br />
            <Text as={"span"} color={"green.400"}>
              {welcomeText2}
            </Text>
          </Heading>
          <Text color={"gray.500"}>Work in Progress</Text>
        </Stack>
        <ItemList products={products} loading={loading} />
      </Container>
      <Container maxW="container.full"></Container>
    </>
  );
};

export default ItemListContainer;
