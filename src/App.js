import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ItemListContainer
                  welcomeText1={"Bienvenidos a"}
                  welcomeText2={"Templar Hardware"}
                />
              }
            />
            <Route
              path="/category/:categoryId"
              element={
                <ItemListContainer
                  welcomeText1={"Items"}
                  welcomeText2={"Filtrados"}
                />
              }
            />
            <Route path="/item/:productId" element={<ItemDetailContainer />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </CartProvider>
  );
}

export default App;
