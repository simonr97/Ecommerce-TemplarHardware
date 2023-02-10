// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKnHVPTh_DOXsdfOIobW1G6VNlZG_iJxg",
  authDomain: "ecommercecoderhouse-e1fed.firebaseapp.com",
  projectId: "ecommercecoderhouse-e1fed",
  storageBucket: "ecommercecoderhouse-e1fed.appspot.com",
  messagingSenderId: "946032693525",
  appId: "1:946032693525:web:cb1ac05e63b709da07991c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FirebaseAuth
export const auth = getAuth();

//Initalize Storage
export const storage = getStorage(app);

export const db = getFirestore(app);
