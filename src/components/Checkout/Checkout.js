import { CartContext } from "../../context/CartContext";
import { useContext, useState, useEffect } from "react";
import { Text, Button, Box } from "@chakra-ui/react";
import {
  query,
  collection,
  where,
  documentId,
  getDocs,
  writeBatch,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/Firebase/firebaseConfig";
const Checkout = () => {
  const { cart, clear } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getTotal = () => {
    let val = 0;
    cart.forEach((e) => {
      val += e.qty * e.price;
      setTotal(val);
    });
  };

  useEffect(() => {
    if (cart.length === 0) {
      setTotal(0);
    } else {
      getTotal();
    }
  }, [cart]);

  const generarOrden = async () => {
    setLoading(true);
    try {
      const objOrder = {
        buyer: {
          name: "Simon Rodriguez",
          phone: "3464594853",
          email: "simon.rodriguez.1997@gmail.com",
        },
        items: cart,
        total,
      };

      const batch = writeBatch(db);
      const ids = cart.map((prod) => prod.id);

      const productsRef = query(
        collection(db, "products"),
        where(documentId(), "in", ids)
      );

      const productsAddded = await getDocs(productsRef);
      const { docs } = productsAddded;
      const outOfStock = [];

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
        await batch.commit();
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        const { id } = orderAdded;
        clear();
        setOrderId(id);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        console.error("No Stock");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Generando orden</Text>;
  }
  if (orderId) {
    return <Text>El ID de su compra es {orderId}</Text>;
  }

  return (
    <Box>
      <Text>Checkout</Text>
      <Button onClick={generarOrden}>Generar Orden</Button>
    </Box>
  );
};

export default Checkout;
