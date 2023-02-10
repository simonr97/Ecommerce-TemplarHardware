import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Center,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { GiBlackKnightHelm } from "react-icons/gi";
import { Link as RouteLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useContext, useState, useRef } from "react";

const Login = () => {
  const { logInUser, subscribeToAuth, logOutUser, isUserLogged } =
    useContext(AuthContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const [isLogged, setIsLogged] = useState(false);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };
  useEffect(() => {
    setIsLogged(isUserLogged());
  }, [isUserLogged]);
  return (
    <>
      {!isLogged ? (
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
          <Stack spacing="8">
            <Stack spacing="6">
              <Center>
                <GiBlackKnightHelm size="60px" />
              </Center>
              <Stack
                spacing={{
                  base: "2",
                  md: "3",
                }}
                textAlign="center"
              >
                <Heading
                  size={{
                    base: "xs",
                    md: "sm",
                  }}
                >
                  Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">No tenes cuenta?</Text>
                  <RouteLink to="/signup">
                    <Button variant="link" color="green.400">
                      Registrar
                    </Button>
                  </RouteLink>
                </HStack>
              </Stack>
            </Stack>
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
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      onChange={({ target }) =>
                        setUserData({ ...userData, email: target.value })
                      }
                      focusBorderColor="green.400"
                      id="email"
                      type="email"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                      <InputRightElement>
                        <IconButton
                          variant="link"
                          aria-label={
                            isOpen ? "Mask password" : "Reveal password"
                          }
                          icon={isOpen ? <HiEyeOff /> : <HiEye />}
                          onClick={onClickReveal}
                        />
                      </InputRightElement>
                      <Input
                        onChange={({ target }) =>
                          setUserData({ ...userData, password: target.value })
                        }
                        focusBorderColor="green.400"
                        id="password"
                        name="password"
                        type={isOpen ? "text" : "password"}
                        autoComplete="current-password"
                        required
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
                <HStack justify="space-between">
                  <Checkbox colorScheme="green" defaultChecked>
                    Remember me
                  </Checkbox>
                  <Button variant="link" color="green.400" size="sm">
                    Forgot password?
                  </Button>
                </HStack>
                <Stack spacing="6">
                  <Button
                    onClick={() => {
                      logInUser(userData);
                      setIsLogged(subscribeToAuth());
                      if (isLogged) {
                        console.log("is logged");
                      }
                    }}
                    variant="primary"
                  >
                    Sign in
                  </Button>
                  <HStack>
                    <Divider borderColor="green.400" />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                      or continue with
                    </Text>
                    <Divider borderColor="green.400" />
                  </HStack>
                  <OAuthButtonGroup />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      ) : (
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
                Usuario ya registrado
                <br />
                <Text as={"span"} color={"green.400"}>
                  Hora de Comprar
                </Text>
              </Heading>
              <Text color={"gray.500"}>
                Si no es tu cuenta, podes deslogearte haciendo click en el boton
              </Text>
              <Stack
                direction={"column"}
                spacing={3}
                align={"center"}
                alignSelf={"center"}
                position={"relative"}
              >
                <Button
                  onClick={() => {
                    logOutUser();
                  }}
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "green.200",
                  }}
                >
                  Sign off
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Login;
