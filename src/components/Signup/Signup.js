import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { uploadProfilePic } from "../../services/Firebase/firestore/profilePic";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupTest() {
  const { registerUser, isUserLogged } = useContext(AuthContext);
  const { isOpen, onToggle } = useDisclosure();

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState("");
  const [url, setUrl] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(!isUserLogged());
  }, [isUserLogged]);

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  function onSubmit(values) {
    const { email, password } = values;

    const userData = {
      email: email,
      password: password,
    };

    registerUser(userData);
    uploadProfilePic(profilePicture, setProfilePicture, setUrl, url, email);
    if (!isUserLogged()) {
      setTimeout(() => {
        setIsLogged(true);
        navigate("/");
      }, 3000);
    }
  }

  return (
    <>
      {isLogged ? (
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
            bg="white"
          >
            <Stack spacing="5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    focusBorderColor="green.400"
                    type="email"
                    id="email"
                    placeholder="email"
                    {...register("email", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
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
                      focusBorderColor="green.400"
                      id="password"
                      placeholder="password"
                      {...register("password", {
                        required: "This is required",
                        minLength: {
                          value: 6,
                          message: "Minimum length should be 6",
                        },
                      })}
                      name="password"
                      type={isOpen ? "text" : "password"}
                      autoComplete="current-password"
                      required
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="image">Imagen de Perfil</FormLabel>
                  <Input
                    variant="flushed"
                    focusBorderColor="green.400"
                    type="file"
                    id="image"
                    placeholder="password"
                    {...register("image", {
                      required: "This is required",
                      message: "Este campo es requerido",
                    })}
                    onChange={handleImageChange}
                  />
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Registrarse
                </Button>
              </form>
            </Stack>
          </Box>
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
                Registro Exitoso
                <br />
                <Text as={"span"} color={"green.400"}>
                  Ahora a Comprar!
                </Text>
              </Heading>
              <Text color={"gray.500"}>
                Sera redirigido a la pagina principal
              </Text>
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
      )}
    </>
  );
}
