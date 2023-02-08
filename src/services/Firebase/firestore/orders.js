import {
  query,
  collection,
  where,
  documentId,
  getDocs,
  writeBatch,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createOrder = (
  cart,
  ids,
  objOrder,
  clear,
  setOrderId,
  navigate
) => {
  return new Promise((resolve, reject) => {
    const batch = writeBatch(db);
    const productsRef = query(
      collection(db, "products"),
      where(documentId(), "in", ids)
    );
    const productsAddded = getDocs(productsRef);
    console.log(productsAddded);
    const { docs } = productsAddded;
    const outOfStock = [];
    console.log(docs);
    docs.forEach((doc) => {
      const dataDoc = doc.data();
      const stockDb = dataDoc.stock;
      const productAddedToCart = cart.find((prod) => prod.id === doc.id);
      const prodQuantity = productAddedToCart.qty;
      if (stockDb >= prodQuantity) {
        console.log(doc.ref);
        batch.update(doc.ref, { stock: stockDb - prodQuantity });
      } else {
        outOfStock.push({ id: doc.id, ...dataDoc });
      }
    });
    if (outOfStock.length === 0) {
      console.log("entro");
      batch.commit();
      const orderRef = collection(db, "orders");
      const orderAdded = addDoc(orderRef, objOrder);
      const { id } = orderAdded;
      clear();
      setOrderId(id);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      reject("No Stock");
    }
  });
};
