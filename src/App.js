
import Navbar from './components/Navbar/Navbar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  return (
    <ChakraProvider>
    <Navbar/>
    <ItemListContainer welcomeText1={'Bienvenidos a'} welcomeText2={'Templar Hardware'}/>
    </ChakraProvider>
  );
}

export default App;
