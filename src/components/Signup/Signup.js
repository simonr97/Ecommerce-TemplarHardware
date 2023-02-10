import {
  Button,
  Container,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Center,
  AspectRatio,
  Text,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { uploadProfilePic } from "../../services/Firebase/firestore/profilePic";

const Signup = () => {
  const { registerUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  const handleSubmit = () => {
    uploadProfilePic(image, setImage, setUrl, url, userData.email);
  };
  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Box
        py={{
          base: "0",
          sm: "8",
        }}
        px={{
          base: "4",
          sm: "10",
        }}
        bg={{
          base: "transparent",
          sm: "bg-surface",
        }}
        boxShadow={{
          base: "none",
          sm: "md",
        }}
        borderRadius={{
          base: "none",
          sm: "xl",
        }}
      >
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              required
              onChange={({ target }) =>
                setUserData({ ...userData, email: target.value })
              }
              focusBorderColor="green.400"
              placeholder="testemail@random.com"
              id="email"
              type="email"
            />
            <FormLabel my="3" htmlFor="password">
              Password
            </FormLabel>
            <Input
              required
              onChange={({ target }) =>
                setUserData({ ...userData, password: target.value })
              }
              focusBorderColor="green.400"
              id="password"
              type="password"
            />
            <FormLabel my="3" htmlFor="email">
              Foto de Perfil
            </FormLabel>
            <Center my="3">
              <AspectRatio width="32">
                <Box
                  borderColor="gray.300"
                  borderStyle="dashed"
                  borderWidth="2px"
                  rounded="md"
                  shadow="sm"
                  role="group"
                  transition="all 150ms ease-in-out"
                  _hover={{
                    shadow: "md",
                  }}
                  as={motion.div}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <Box position="relative" height="100%" width="100%">
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      height="100%"
                      width="100%"
                      display="flex"
                      flexDirection="column"
                    >
                      <Stack
                        height="100%"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justify="center"
                        spacing="4"
                      >
                        <Stack p="8" textAlign="center" spacing="1">
                          <Text fontWeight="light">
                            click para buscar la imagen
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                    <Input
                      type="file"
                      height="100%"
                      width="100%"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Box>
                </Box>
              </AspectRatio>
            </Center>
            <Center>
              <RouteLink to="/login">
                <Button
                  onClick={() => {
                    registerUser(userData);
                    handleSubmit();
                  }}
                  type="submit"
                  mt={10}
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.200",
                  }}
                >
                  Registrarme
                </Button>
              </RouteLink>
            </Center>
          </FormControl>
        </Stack>
      </Box>
    </Container>
  );
};

export default Signup;
