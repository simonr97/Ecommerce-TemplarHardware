import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadProfilePic = (image, setImage, setUrl, url, email) => {
  return new Promise((resolve, reject) => {
    const imageRef = ref(storage, `images/profilePics/${email}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            reject(error.message, "Error getting the image url");
          });
        setImage(null);
        resolve(url);
      })
      .catch((error) => {
        reject(error.message, "Error getting the image url");
      });
  });
};

export const getProfilePic = (email, setPic, pic) => {
  return new Promise((resolve, reject) => {
    console.log(email);
    const imageRef = ref(storage, `images/profilePics/${email}`);
    getDownloadURL(imageRef)
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        console.error(error.message, "Error getting the image url");
      });
  });
};
