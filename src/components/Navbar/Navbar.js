import { ReactNode, React, useContext } from "react";
import "./Navbar.css";
import { Link as RouteLink, NavLink as RouteNavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import Avatar from "../Avatar/Avatar";
import { GiBlackKnightHelm } from "react-icons/gi";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { CartContext } from "../../context/CartContext";

const Links = ["Fuente", "Motherboard", "Microprocesador", "Graphics"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <RouteNavLink
    className={({ isActive }) => (isActive ? "CategorySelect" : "")}
    to={`/category/${children}`}
  >
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("green.300"),
        color: "black",
      }}
      href={"#"}
    >
      {children}
    </Link>
  </RouteNavLink>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { count } = useContext(CartContext);

  return (
    <>
      <Box bg={useColorModeValue("green.400")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            color="#1A202C"
          />
          <HStack h={16} spacing={8} alignItems={"center"}>
            <RouteLink to="/">
              <GiBlackKnightHelm size="32px" />
            </RouteLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <CartWidget totalCount={count} />
            <Avatar />
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};
export default Navbar;
