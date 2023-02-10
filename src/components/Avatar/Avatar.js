import { useState, useEffect, React, useContext } from "react";
import {
  Avatar as ProfilePic,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { Link as RouteLink } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { getProfilePic } from "../../services/Firebase/firestore/profilePic";

const Avatar = () => {
  const { subscribeToAuth, logOutUser, isUserLogged, updateProfilePic } =
    useContext(AuthContext);
  const { clear } = useContext(CartContext);
  const [isLogged, setIsLogged] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState("test");
  useEffect(() => {
    setIsLogged(isUserLogged());
  }, [isUserLogged, subscribeToAuth]);
  getProfilePic(subscribeToAuth()).then((url) => setUserProfilePicture(url));
  updateProfilePic(userProfilePicture);
  return (
    <HStack ml={650}>
      {isLogged ? (
        <Menu>
          <MenuButton>
            <ProfilePic src={userProfilePicture} size="md" />
          </MenuButton>
          <MenuList>
            <RouteLink to="/login">
              <MenuItem>Ir a Login</MenuItem>
            </RouteLink>
            <MenuItem
              onClick={() => {
                logOutUser();
                clear();
              }}
            >
              Log Off
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <RouteLink to="/login">
          <AiOutlineUser size="32px" />
        </RouteLink>
      )}
    </HStack>
  );
};

export default Avatar;
