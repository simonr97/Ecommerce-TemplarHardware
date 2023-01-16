
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ItemListContainer welcomeText1={'Bienvenidos a'} welcomeText2={'Templar Hardware'}/>}/>
          <Route path='/category/:categoryId' element={<ItemListContainer welcomeText1={'Items'} welcomeText2={'Filtrados'}/>}/>
          <Route path='/item/:productId' element={<ItemDetailContainer/>}/>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
