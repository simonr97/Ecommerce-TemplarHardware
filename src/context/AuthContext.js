import { auth } from "../services/Firebase/firebaseConfig";
import { createContext } from "react";
import { useState, React } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const registerUser = (userData) => {
    const { email, password, fotoPerfil } = userData;
    console.log(fotoPerfil);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("sign user: ", res.user);
      })
      .catch((err) => console.error(err));
  };

  const logInUser = (userData) => {
    const { email, password } = userData;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsLogged(true);
        setUser(res.user);
        console.log("sign in user: ", res.user);
      })
      .catch((err) => console.error(err));
  };

  const logOutUser = () => {
    signOut(auth)
      .then((res) => {
        setIsLogged(false);
        console.log("log out user: ", res.user);
      })
      .catch((err) => console.error(err));
  };

  const sendPasswordResetEmail = (email) => {
    auth.sendPasswordResetEmail(email);
  };

  const loginWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  const isUserLogged = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return isLogged;
  };

  const getUserEmail = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      }
    });
    return user;
  };

  const updateProfilePic = (url) => {
    console.log(url);
    updateProfile(user, { photoURL: url });
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        logInUser,
        logOutUser,
        sendPasswordResetEmail,
        loginWithGoogle,
        getUserEmail,
        updateProfilePic,
        isUserLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
