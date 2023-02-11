import { Text, Container, Box, Stack, Center } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, React, useContext } from "react";
import { Link as RouteLink } from "react-router-dom";
const Toast = () => {
  const { isUserLogged } = useContext(AuthContext);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(isUserLogged());
  }, [isUserLogged]);
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      {isLogged ? (
        ""
      ) : (
        <RouteLink to="/login">
          <Stack spacing="8">
            <Box
              pos="absolute"
              top="120px"
              left="10px"
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg="green.400"
              boxShadow={{ base: "none", sm: "md" }}
              borderRadius={{ base: "none", sm: "xl" }}
              color="white"
            >
              <Box>
                <Center>
                  <Text>Necesitas estar logeado para hacer compras</Text>
                </Center>
              </Box>
            </Box>
          </Stack>
        </RouteLink>
      )}
    </Container>
  );
};

export default Toast;
